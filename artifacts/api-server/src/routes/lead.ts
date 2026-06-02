import { Router } from "express";
import { db, leadsTable, insertLeadSchema } from "@workspace/db";
import { z } from "zod";

const router: Router = Router();

const trPhoneRegex = /^(\+90|0)?5\d{9}$/;

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-().]/g, "");
}

const createLeadBody = z.object({
  name: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır."),
  phone: z
    .string()
    .transform((v) => normalizePhone(v))
    .refine((v) => trPhoneRegex.test(v), "Geçerli bir Türkiye telefon numarası giriniz (05XX XXX XX XX)"),
  district: z.string().min(1, "Lütfen bir ilçe seçiniz."),
  message: z.string().min(5, "Mesajınız en az 5 karakter olmalıdır."),
});

router.post("/lead", async (req, res): Promise<void> => {
  const parsed = createLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();

  req.log.info({ leadId: lead.id, district: lead.district }, "New lead created");

  sendEmailNotification(lead, req.log).catch(() => {});
  sendWhatsAppNotification(lead, req.log).catch(() => {});

  res.status(201).json({ id: lead.id });
});

async function sendEmailNotification(
  lead: { id: number; name: string; phone: string; district: string; message: string },
  log: { warn: (obj: object, msg: string) => void; info: (obj: object, msg: string) => void },
) {
  const resendApiKey = process.env["RESEND_API_KEY"];
  const fromEmail = process.env["RESEND_FROM_EMAIL"] ?? "onboarding@resend.dev";
  const notifyEmail = process.env["RESEND_NOTIFY_EMAIL"];

  if (!resendApiKey || !notifyEmail) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: `Diafon İstanbul <${fromEmail}>`,
      to: [notifyEmail],
      subject: `🔔 Yeni Keşif Talebi — ${lead.name} / ${lead.district}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:0 auto;padding:24px">
          <h2 style="color:#0ea5e9;margin-bottom:16px">Yeni Ücretsiz Keşif Talebi</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:130px">Ad Soyad</td><td style="padding:8px 0;font-weight:600">${lead.name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Telefon</td><td style="padding:8px 0;font-weight:600"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666">İlçe</td><td style="padding:8px 0">${lead.district}</td></tr>
            <tr><td style="padding:8px 0;color:#666;vertical-align:top">Mesaj</td><td style="padding:8px 0">${lead.message}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Tarih</td><td style="padding:8px 0;font-size:13px;color:#888">${new Date().toLocaleString("tr-TR")}</td></tr>
          </table>
          <hr style="margin:20px 0;border-color:#eee">
          <p style="font-size:12px;color:#aaa">Bu e-posta Diafon İstanbul web sitesi formu tarafından otomatik olarak oluşturulmuştur.</p>
        </div>
      `,
    });

    log.info({ leadId: lead.id }, "Email notification sent");
  } catch (err) {
    log.warn({ err }, "Email notification failed");
  }
}

async function sendWhatsAppNotification(
  lead: { id: number; name: string; phone: string; district: string; message: string },
  log: { warn: (obj: object, msg: string) => void; info: (obj: object, msg: string) => void },
) {
  const sid = process.env["TWILIO_ACCOUNT_SID"];
  const token = process.env["TWILIO_AUTH_TOKEN"];
  const from = process.env["TWILIO_WHATSAPP_FROM"];
  const to = process.env["TWILIO_WHATSAPP_TO"];

  if (!sid || !token || !from || !to) return;

  try {
    const twilio = (await import("twilio")).default;
    const client = twilio(sid, token);

    await client.messages.create({
      from,
      to,
      body:
        `🔔 *Yeni Keşif Talebi*\n\n` +
        `👤 *Ad:* ${lead.name}\n` +
        `📞 *Telefon:* ${lead.phone}\n` +
        `📍 *İlçe:* ${lead.district}\n` +
        `📝 *Mesaj:* ${lead.message}`,
    });

    log.info({ leadId: lead.id }, "WhatsApp notification sent");
  } catch (err) {
    log.warn({ err }, "WhatsApp notification failed");
  }
}

export default router;

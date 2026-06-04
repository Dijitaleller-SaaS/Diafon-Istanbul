import { Router } from "express";
import { db, siteContentTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: Router = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "diafon2024";

const DEFAULT_CONTENT: Record<string, unknown> = {
  hero_title_main: "İstanbul Diafon Montaj",
  hero_title_accent: "ve Servis",
  hero_title_suffix: "Uzmanı",
  hero_subtitle:
    "Görüntülü diafon sistemleri, tesisat keşfi ve kablo yenileme projelerinde 10 yıllık deneyimimizle kalıcı ve garantili çözümler sunuyoruz.",
  phone: "05320615758",
  stats: [
    { val: "500+", label: "Başarılı Montaj" },
    { val: "10+", label: "Yıl Deneyim" },
    { val: "39", label: "İlçe" },
    { val: "7/24", label: "Servis" },
  ],
  about_text:
    "10 yılı aşkın deneyimimizle İstanbul'un 39 ilçesinde diafon montajı, kablo yenileme ve 7/24 arıza servisi sunuyoruz. \"Kaliteye Güven\" prensibimizle yüzlerce konut ve ticari projeye imza attık.",
};

router.get("/content", async (req, res): Promise<void> => {
  try {
    const rows = await db.select().from(siteContentTable);
    const stored: Record<string, unknown> = {};
    for (const row of rows) {
      try {
        stored[row.key] = JSON.parse(row.value);
      } catch {
        stored[row.key] = row.value;
      }
    }
    res.json({ ...DEFAULT_CONTENT, ...stored });
  } catch {
    res.json(DEFAULT_CONTENT);
  }
});

const updateBody = z.object({
  value: z.unknown(),
  password: z.string(),
});

router.put("/content/:key", async (req, res): Promise<void> => {
  const parsed = updateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Geçersiz istek." });
    return;
  }

  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Yetkisiz erişim." });
    return;
  }

  const key = req.params["key"];
  if (!key || !/^[a-z_]+$/.test(key)) {
    res.status(400).json({ error: "Geçersiz anahtar." });
    return;
  }

  const value = JSON.stringify(parsed.data.value);

  await db
    .insert(siteContentTable)
    .values({ key, value })
    .onConflictDoUpdate({
      target: siteContentTable.key,
      set: { value, updatedAt: new Date() },
    });

  req.log.info({ key }, "Site content updated");
  res.json({ ok: true });
});

export default router;

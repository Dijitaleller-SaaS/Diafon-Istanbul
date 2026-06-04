import { Router } from "express";
import { db, leadsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: Router = Router();

const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "diafon2024";

router.get("/leads", async (req, res): Promise<void> => {
  const { password } = req.query;
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Yetkisiz erişim." });
    return;
  }

  try {
    const leads = await db
      .select()
      .from(leadsTable)
      .orderBy(leadsTable.createdAt);

    res.json(leads.reverse());
  } catch {
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

const updateStatusBody = z.object({
  status: z.enum(["new", "contacted", "closed"]),
  password: z.string(),
});

router.put("/leads/:id/status", async (req, res): Promise<void> => {
  const parsed = updateStatusBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Geçersiz istek." });
    return;
  }

  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Yetkisiz erişim." });
    return;
  }

  const id = Number(req.params["id"]);
  if (!id || isNaN(id)) {
    res.status(400).json({ error: "Geçersiz ID." });
    return;
  }

  await db
    .update(leadsTable)
    .set({ status: parsed.data.status })
    .where(eq(leadsTable.id, id));

  res.json({ ok: true });
});

export default router;

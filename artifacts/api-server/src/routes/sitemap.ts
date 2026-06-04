import { Router } from "express";
import { db, productsTable } from "@workspace/db";
import { asc } from "drizzle-orm";

const router: Router = Router();

router.get("/sitemap.xml", async (req, res): Promise<void> => {
  try {
    const products = await db
      .select({ slug: productsTable.slug, created_at: productsTable.created_at })
      .from(productsTable)
      .orderBy(asc(productsTable.sort_order));

    const baseUrl = "https://diafonistanbul.com";
    const today = new Date().toISOString().slice(0, 10);

    const productEntries = products
      .map((p) => {
        const lastmod = p.created_at
          ? p.created_at.toISOString().slice(0, 10)
          : today;
        return `  <url>
    <loc>${baseUrl}/urunler/${p.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/urunler</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${productEntries}
</urlset>`;

    res.set("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  } catch (err) {
    req.log.error(err, "Failed to generate sitemap");
    res.status(500).send("Sitemap oluşturulamadı.");
  }
});

export default router;

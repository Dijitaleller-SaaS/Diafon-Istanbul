import { useState, useEffect } from "react";

export interface SiteStat {
  val: string;
  label: string;
}

export interface SiteContent {
  hero_title_main: string;
  hero_title_accent: string;
  hero_title_suffix: string;
  hero_subtitle: string;
  phone: string;
  stats: SiteStat[];
  about_text: string;
}

const DEFAULTS: SiteContent = {
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

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        setContent({ ...DEFAULTS, ...data });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { content, loading };
}

export async function saveSiteContent(
  key: keyof SiteContent,
  value: unknown,
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/content/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value, password }),
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error ?? "Hata oluştu." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Sunucuya ulaşılamadı." };
  }
}

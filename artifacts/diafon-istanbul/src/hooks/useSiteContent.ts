import { useState, useEffect, useContext, createContext, useCallback, type ReactNode } from "react";
import { createElement } from "react";

export interface SiteStat {
  val: string;
  label: string;
}

export interface ServiceCard {
  icon: string;
  title: string;
  desc: string;
  color: string;
  featured?: boolean;
}

export interface SiteContent {
  hero_title_main: string;
  hero_title_accent: string;
  hero_title_suffix: string;
  hero_subtitle: string;
  phone: string;
  phone_display: string;
  whatsapp_number: string;
  contact_email: string;
  stats: SiteStat[];
  about_text: string;
  service_cards: ServiceCard[];
}

export const DEFAULT_SERVICE_CARDS: ServiceCard[] = [
  { icon: "Monitor", title: "Görüntülü Diafon Sistemleri", desc: "Yüksek çözünürlüklü ekranlarla kapıyı görerek konuşun. Gece görüşlü kamera seçenekleri mevcut.", color: "primary" },
  { icon: "Phone", title: "Sesli Diafon Sistemleri", desc: "Ekonomik ve güvenilir sesli iletişim. Tek daire veya çok katlı binalara uygun çözümler.", color: "emerald" },
  { icon: "ShieldCheck", title: "Yedek Parça & Aksesuar", desc: "Tüm marka ve modellere uyumlu orijinal ve muadil yedek parça. Uzman danışmanlık ile doğru seçim.", color: "rose" },
  { icon: "Building2", title: "Site & Apartman Sistemleri", desc: "Çok kapılı, çok bloklu binalara özel merkezi yönetim sistemleri. Güvenlik kameraları ile entegre.", color: "amber" },
  { icon: "Video", title: "Görüntülü Diafon Montajı", desc: "Apartman ve siteler için en son teknoloji yüksek çözünürlüklü, gece görüşlü ve şifreli geçiş özellikli sistemler.", color: "primary", featured: true },
];

export const DEFAULTS: SiteContent = {
  hero_title_main: "İstanbul Diafon Montaj",
  hero_title_accent: "ve Servis",
  hero_title_suffix: "Uzmanı",
  hero_subtitle:
    "Görüntülü diafon sistemleri, tesisat keşfi ve kablo yenileme projelerinde 10 yıllık deneyimimizle kalıcı ve garantili çözümler sunuyoruz.",
  phone: "05320615758",
  phone_display: "0532 061 57 58",
  whatsapp_number: "905320615758",
  contact_email: "info@diafonistanbul.com",
  stats: [
    { val: "500+", label: "Başarılı Montaj" },
    { val: "10+", label: "Yıl Deneyim" },
    { val: "39", label: "İlçe" },
    { val: "7/24", label: "Servis" },
  ],
  about_text:
    "10 yılı aşkın deneyimimizle İstanbul'un 39 ilçesinde diafon montajı, kablo yenileme ve 7/24 arıza servisi sunuyoruz. \"Kaliteye Güven\" prensibimizle yüzlerce konut ve ticari projeye imza attık.",
  service_cards: DEFAULT_SERVICE_CARDS,
};

type ContextValue = {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
};

const SiteContentContext = createContext<ContextValue>({
  content: DEFAULTS,
  loading: true,
  refresh: async () => {},
});

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setContent({ ...DEFAULTS, ...data });
    } catch {
      // silently ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return createElement(
    SiteContentContext.Provider,
    { value: { content, loading, refresh } },
    children
  );
}

export function useSiteContent(): ContextValue {
  return useContext(SiteContentContext);
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

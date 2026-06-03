import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  CheckCircle2, Phone, ChevronRight, ArrowRight,
  Video, Wifi, Monitor, Building2, Home as HomeIcon, Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import QuoteModal from "@/components/QuoteModal";
import { Button } from "@/components/ui/button";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const MODEL_CATEGORIES = [
  {
    icon: Monitor,
    title: "Analog Görüntülü Diafon",
    subtitle: "Klasik & güvenilir",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    desc: "2 veya 4 telli kablo üzerinden çalışan, mevcut tesisatla uyumlu sistemler. Basit kurulum ve uzun ömür.",
    useCases: ["Tekli daire", "Küçük apartman (2–10 daire)", "Eski bina yenileme"],
    specs: ["4.3\" – 7\" renkli TFT ekran", "Gece görüşlü kamera", "Kapı kilit kontrolü", "Dahili güç kaynağı"],
    priceRange: "₺3.500 – ₺18.000",
    brands: ["Audio", "Netelsan", "Nade"],
  },
  {
    icon: Wifi,
    title: "IP / Akıllı Görüntülü Diafon",
    subtitle: "Yeni nesil",
    color: "text-primary",
    bg: "bg-primary/5 dark:bg-primary/10",
    border: "border-primary/20",
    popular: true,
    desc: "İnternet üzerinden çalışan, mobil uygulama ile her yerden kapı izleme ve açma imkânı sunan sistemler.",
    useCases: ["Tekli villa / rezidans", "Yeni bina projeleri", "Akıllı ev entegrasyonu"],
    specs: ["7\" – 10\" dokunmatik ekran", "1080p HD kamera", "Mobil uygulama", "SIP protokolü", "Alexa / Google Home"],
    priceRange: "₺8.000 – ₺35.000+",
    brands: ["Nade IP", "Multitek IP", "Hikvision"],
  },
  {
    icon: Building2,
    title: "Çok Aboneli Apartman Sistemi",
    subtitle: "10–256 daire",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    desc: "Büyük apartman ve siteler için merkezi yönetim paneli, birden fazla giriş kapısı desteği.",
    useCases: ["20+ daireli apartman", "Toplu konut / site", "Çok girişli yapılar"],
    specs: ["Merkezi yönetim paneli", "Çok giriş kapısı", "Güvenlik kamera entegrasyonu", "Yönetici konsolu"],
    priceRange: "₺18.000 – ₺60.000+",
    brands: ["Audio", "Netelsan", "Multitek"],
  },
  {
    icon: HomeIcon,
    title: "Villa & Müstakil Ev Sistemi",
    subtitle: "Özel yapılar için",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    desc: "Birden fazla giriş noktası, bahçe kapısı ve garaj entegrasyonu için özel yapılandırılmış sistemler.",
    useCases: ["Müstakil ev / villa", "Çift kapılı yapılar", "Bahçe kapısı entegrasyonu"],
    specs: ["2 dış panel desteği", "Garaj kapısı kontrol", "Şifre + kart okuyucu", "2 iç monitör"],
    priceRange: "₺6.000 – ₺20.000",
    brands: ["Audio", "Nade", "Multitek"],
  },
];

const COMPARISON = [
  { feature: "Ekran Boyutu", analog: "4.3\" – 7\"", ip: "7\" – 10\"", cok: "7\" – 10\"", villa: "4.3\" – 7\"" },
  { feature: "Kamera Kalitesi", analog: "720p", ip: "1080p HD", cok: "720p – 1080p", villa: "720p – 1080p" },
  { feature: "Mobil Uygulama", analog: "—", ip: "✓", cok: "Opsiyonel", villa: "Opsiyonel" },
  { feature: "Kurulum Kolaylığı", analog: "Kolay", ip: "Orta", cok: "Uzman gerekir", villa: "Orta" },
  { feature: "Başlangıç Fiyatı", analog: "₺3.500", ip: "₺8.000", cok: "₺18.000", villa: "₺6.000" },
  { feature: "Eski Tesisatla Uyum", analog: "✓", ip: "Kısmen", cok: "✓", villa: "✓" },
];

const FAQS = [
  {
    q: "Hangi markalar öneriliyor?",
    a: "Audio, Netelsan, Nade ve Multitek Türkiye'nin en güvenilir görüntülü diafon markaları arasındadır. Her biri için yetkili servis sunuyoruz.",
  },
  {
    q: "Eski analog sistemimi IP'ye çevirebilir miyim?",
    a: "Evet, mevcut kablonuzu koruyarak IP adaptör ile sisteminizi akıllı hale getirmek mümkündür. Keşifte değerlendiriyoruz.",
  },
  {
    q: "Kaç daire için hangi model uygundur?",
    a: "1–4 daire için tekli analog set, 5–20 daire için çok aboneli analog sistem, 20+ daire için merkezi panel sistemi genellikle önerilir.",
  },
  {
    q: "IP diafon için İnternet bağlantısı şart mı?",
    a: "Mobil uygulama ve uzaktan erişim için internet gerekir. İnternet olmadan da kendi LAN ağı üzerinden çalışabilir.",
  },
];

export default function GoruntulDiafonModelleri() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        productName={selectedModel ?? "Görüntülü Diafon Modeli"}
      />

      <main className="flex-1">

        {/* Hero */}
        <section className="pt-[53px] bg-background">
          <div className="bg-gradient-to-br from-primary/8 via-background to-background border-b border-border">
            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
              <motion.div {...fade()} className="max-w-2xl">
                <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                  <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href="/goruntulu-diafon" className="hover:text-primary transition-colors">Görüntülü Diafon</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-foreground font-medium">Modeller</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5 leading-[1.1]">
                  Görüntülü Diafon<br />
                  <span className="text-primary">Modelleri & Rehberi</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Analog'dan IP'ye, tekli daireden büyük siteye — ihtiyacınıza en uygun
                  görüntülü diafon modelini bu rehberle bulun.
                </p>
                <Button size="lg" onClick={() => setQuoteOpen(true)} className="rounded-lg h-12 px-6 gap-2 shadow-md shadow-primary/20">
                  <ChevronRight className="w-4 h-4" /> Ücretsiz Fiyat Al
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Model kategorileri */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Model Kategorileri</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Yapı tipinize ve ihtiyaçlarınıza göre doğru kategoriyi seçin.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {MODEL_CATEGORIES.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.div key={cat.title} {...fade(i * 0.1)}
                    className={`relative rounded-2xl border-2 ${cat.border} ${cat.bg} p-6`}
                  >
                    {cat.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">Önerilen</span>
                      </div>
                    )}
                    <div className={`w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center mb-4 ${cat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{cat.title}</h3>
                    <p className={`text-xs font-semibold ${cat.color} mb-3`}>{cat.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cat.desc}</p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-5">
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Kullanım Alanları</p>
                        <ul className="space-y-1.5">
                          {cat.useCases.map(u => (
                            <li key={u} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> {u}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Özellikler</p>
                        <ul className="space-y-1.5">
                          {cat.specs.slice(0, 4).map(s => (
                            <li key={s} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Zap className="w-3.5 h-3.5 text-primary shrink-0" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/60">
                      <div>
                        <p className="text-xs text-muted-foreground">Fiyat aralığı</p>
                        <p className="font-bold text-primary text-sm">{cat.priceRange}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href="/urunler" className="flex items-center gap-1 text-xs text-primary hover:underline font-medium transition-colors">
                          Detaylı İncele <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Button
                          size="sm"
                          className="rounded-xl"
                          onClick={() => { setSelectedModel(cat.title); setQuoteOpen(true); }}
                        >
                          Fiyat Al
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Karşılaştırma tablosu */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Model Karşılaştırması</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Dört ana kategori arasındaki farkları tek tabloda görün.</p>
            </motion.div>
            <motion.div {...fade(0.1)} className="overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Özellik</th>
                    <th className="px-4 py-3.5 font-semibold text-blue-600 text-center">Analog</th>
                    <th className="px-4 py-3.5 font-semibold text-primary text-center">IP / Akıllı</th>
                    <th className="px-4 py-3.5 font-semibold text-violet-600 text-center">Çok Aboneli</th>
                    <th className="px-4 py-3.5 font-semibold text-emerald-600 text-center">Villa</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                      <td className="px-5 py-3 font-medium text-foreground">{row.feature}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.analog}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.ip}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.cok}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.villa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-3">Model Seçimi Hakkında Sorular</h2>
            </motion.div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div key={i} {...fade(i * 0.06)} className="border border-border rounded-2xl overflow-hidden">
                  <button
                    className="w-full text-left px-6 py-4 font-semibold text-foreground text-sm flex items-center justify-between gap-4 hover:bg-muted/40 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.a}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* İlgili sayfalar */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-6 flex flex-wrap gap-4 justify-center">
            <Link href="/goruntulu-diafon" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:border-primary/50 text-sm font-medium transition-all">
              <ArrowRight className="w-4 h-4 text-primary" /> Görüntülü Diafon Montajı
            </Link>
            <Link href="/goruntulu-diafon-fiyatlari" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:border-primary/50 text-sm font-medium transition-all">
              <ArrowRight className="w-4 h-4 text-primary" /> Görüntülü Diafon Fiyatları
            </Link>
            <Link href="/urunler" className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:border-primary/50 text-sm font-medium transition-all">
              <ArrowRight className="w-4 h-4 text-primary" /> Tüm Ürünler
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Hangi Model Size Uygun?</h2>
            <p className="text-white/70 mb-8 max-w-sm mx-auto text-sm">Ücretsiz keşifte uzman ekibimiz en uygun modeli belirler.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" onClick={() => setQuoteOpen(true)} className="bg-white text-primary hover:bg-white/90 rounded-lg h-12 px-6 gap-2 font-bold">
                <ChevronRight className="w-4 h-4" /> Ücretsiz Fiyat Al
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 rounded-lg h-12 px-6 gap-2">
                <a href="tel:+905320615758"><Phone className="w-4 h-4" /> Hemen Ara</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground py-8 border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-white">Diafon İstanbul</span>
          </Link>
          <p className="text-secondary-foreground/60 text-sm">&copy; {new Date().getFullYear()} Diafon İstanbul</p>
          <a href="tel:+905320615758" className="text-secondary-foreground/80 hover:text-white font-semibold transition-colors flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4" /> 0532 061 57 58
          </a>
        </div>
      </footer>
    </div>
  );
}

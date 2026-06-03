import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Phone, ChevronRight, ArrowRight, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import QuoteModal from "@/components/QuoteModal";
import { Button } from "@/components/ui/button";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const PRICE_TIERS = [
  {
    title: "Tekli Daire",
    subtitle: "1 daire için temel sistem",
    range: "₺3.500 – ₺6.500",
    color: "border-emerald-200 dark:border-emerald-800",
    accent: "bg-emerald-50 dark:bg-emerald-950/30",
    badge: "bg-emerald-500",
    features: [
      "4.3\" renkli ekran",
      "Gece görüşlü kamera",
      "Kapı kilit kontrolü",
      "Montaj dahil",
      "1 yıl garanti",
    ],
  },
  {
    title: "Küçük Apartman",
    subtitle: "2–10 daire arası",
    range: "₺8.000 – ₺18.000",
    color: "border-primary/30",
    accent: "bg-primary/5 dark:bg-primary/10",
    badge: "bg-primary",
    popular: true,
    features: [
      "7\" dokunmatik ekran seçeneği",
      "Çoklu daire paneli",
      "Güç kaynağı dahil",
      "Kablo yenileme dahil",
      "2 yıl garanti",
    ],
  },
  {
    title: "Büyük Apartman / Site",
    subtitle: "10+ daire, geniş sistemler",
    range: "₺18.000 – ₺60.000+",
    color: "border-violet-200 dark:border-violet-800",
    accent: "bg-violet-50 dark:bg-violet-950/30",
    badge: "bg-violet-500",
    features: [
      "IP / akıllı sistem seçeneği",
      "Merkezi yönetim paneli",
      "Çok giriş kapısı desteği",
      "Güvenlik entegrasyonu",
      "2 yıl garanti + öncelikli servis",
    ],
  },
];

const FACTORS = [
  { title: "Daire Sayısı", desc: "Sistemin kaç daireye hizmet edeceği, panel ve ahize maliyetini doğrudan belirler." },
  { title: "Ekran Boyutu & Tipi", desc: "4.3\" analog ile 10\" dokunmatik IP ekran arasında fiyat farkı önemlidir." },
  { title: "Kablo & Tesisat Durumu", desc: "Eski binadaki kablo yenileme, toplam maliyetin %20–40'ını oluşturabilir." },
  { title: "Marka & Ürün Kalitesi", desc: "Audio, Netelsan, Nade, Multitek gibi markalar farklı fiyat ve kalite seviyelerindedir." },
  { title: "Akıllı Özellikler", desc: "Wi-Fi, mobil uygulama, SIP protokolü gibi özellikler fiyatı artırır." },
  { title: "Giriş Sayısı", desc: "Sitede birden fazla giriş kapısı varsa her biri için ek panel maliyeti oluşur." },
];

const FAQS = [
  {
    q: "Görüntülü diafon fiyatına montaj dahil mi?",
    a: "Evet, tüm fiyat tekliflerimiz işçilik ve montaj dahildir. Gizli ücret uygulanmaz.",
  },
  {
    q: "Eski sistemi söktürmem gerekiyor mu?",
    a: "Hayır. Eski analog sisteminizi uyumlu görüntülü diyafon ile yükseltebilirsiniz. Söküm de ücretsiz yapılır.",
  },
  {
    q: "Peşin mi, taksitli mi ödeme yapılıyor?",
    a: "Her iki seçenek de mevcuttur. Nakit, havale veya 12 aya kadar taksitli ödeme imkânı sunuyoruz.",
  },
  {
    q: "Keşif ücreti alıyor musunuz?",
    a: "Hayır. Yerinde keşif, ölçüm ve yazılı fiyat teklifi tamamen ücretsizdir.",
  },
];

export default function GoruntulDiafonFiyatlari() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} productName="Görüntülü Diafon Fiyat Teklifi" />

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
                  <span className="text-foreground font-medium">Fiyatlar</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-5 leading-[1.1]">
                  Görüntülü Diafon<br />
                  <span className="text-primary">Fiyatları 2025</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  İstanbul'da görüntülü diyafon kurulumu için güncel fiyat rehberi.
                  Tekli daireden büyük sitelere, tüm bütçelere uygun çözümler.
                </p>
                <Button size="lg" onClick={() => setQuoteOpen(true)} className="rounded-lg h-12 px-6 gap-2 shadow-md shadow-primary/20">
                  <ChevronRight className="w-4 h-4" /> Ücretsiz Fiyat Teklifi Al
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Uyarı bandı */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 py-3">
          <div className="container mx-auto px-4 md:px-6 flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300">
            <Info className="w-4 h-4 shrink-0" />
            <span>Aşağıdaki fiyatlar <strong>tahmini aralıklardır</strong>. Kesin fiyat için ücretsiz keşif yapılması gerekmektedir.</span>
          </div>
        </div>

        {/* Fiyat Paketleri */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Fiyat Aralıkları</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Bina tipine ve sistem ihtiyacına göre tahmini maliyetler.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {PRICE_TIERS.map((tier, i) => (
                <motion.div key={tier.title} {...fade(i * 0.1)}
                  className={`relative rounded-2xl border-2 ${tier.color} ${tier.accent} p-6 flex flex-col`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">En Çok Tercih Edilen</span>
                    </div>
                  )}
                  <div className={`inline-block w-3 h-3 rounded-full ${tier.badge} mb-4`} />
                  <h3 className="font-bold text-foreground text-lg mb-1">{tier.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tier.subtitle}</p>
                  <div className="text-2xl font-bold text-primary mb-6">{tier.range}</div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => setQuoteOpen(true)} className="w-full rounded-xl" variant={tier.popular ? "default" : "outline"}>
                      Fiyat Al
                    </Button>
                    <Link href="/urunler" className="flex items-center justify-center gap-1 text-xs text-primary hover:underline font-medium py-1 transition-colors">
                      Detaylı İncele <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fiyatı Etkileyen Faktörler */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Fiyatı Etkileyen Faktörler</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Kesin fiyat keşif sonrası belirlenir. İşte belirleyici etkenler:</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {FACTORS.map((f, i) => (
                <motion.div key={f.title} {...fade(i * 0.07)} className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-semibold text-foreground mb-2 text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-3">Fiyat Hakkında Sorular</h2>
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

        {/* İlgili */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-6 flex flex-wrap gap-4 justify-center">
            <Link href="/goruntulu-diafon" className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:border-primary/50 text-sm font-medium transition-all">
              <ArrowRight className="w-4 h-4 text-primary" /> Görüntülü Diafon Montajı
            </Link>
            <Link href="/goruntulu-diafon-modelleri" className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:border-primary/50 text-sm font-medium transition-all">
              <ArrowRight className="w-4 h-4 text-primary" /> Görüntülü Diafon Modelleri
            </Link>
            <Link href="/urunler" className="group flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:border-primary/50 text-sm font-medium transition-all">
              <ArrowRight className="w-4 h-4 text-primary" /> Tüm Ürünler
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Kesin Fiyat İçin Ücretsiz Keşif</h2>
            <p className="text-white/70 mb-8 max-w-sm mx-auto text-sm">Yazılı teklif, taahhütsüz, aynı gün keşif.</p>
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

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  CheckCircle2, Phone, ShieldCheck, Clock, Wrench,
  Video, ChevronRight, Star, MapPin, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const FEATURES = [
  { title: "HD Renkli Ekran", desc: "4.3\" ile 10\" arası dokunmatik TFT ekranlar, gece görüşlü kamera." },
  { title: "Kapı Kilit Kontrolü", desc: "Elektrikli kilit ve kapı açma rölesi ile güvenli uzaktan erişim." },
  { title: "Çoklu Daire Desteği", desc: "Tek bir giriş panelinden 4'ten 256 daireye kadar ölçeklenebilir." },
  { title: "Mobil Uygulama", desc: "IP tabanlı modellerde cep telefonunuzdan kapıyı izleyin ve açın." },
  { title: "Akıllı Ev Entegrasyonu", desc: "Modeme bağlı sistemler Alexa, Google Home ile uyumlu çalışır." },
  { title: "2 Yıl Garanti", desc: "Tüm montaj işleri ve ürünlerde yazılı 2 yıl servis garantisi." },
];

const FAQS = [
  {
    q: "Görüntülü diafon kurulumu ne kadar sürer?",
    a: "Tek daire için montaj 2–4 saat, apartman sistemleri 1–3 gün arasında tamamlanır. Keşif sonrası kesin süre verilir.",
  },
  {
    q: "Eski tesisat olan binaya montaj yapılabilir mi?",
    a: "Evet. Eski 2-telli sistemlerin üzerine uyumlu görüntülü diyafon kurulabilir; ihtiyaç halinde kablo yenileme de yapıyoruz.",
  },
  {
    q: "Kaç yıl garanti veriliyor?",
    a: "Tüm ürün ve montajlarda 2 yıl yazılı garanti, garanti dışı arızalarda ise ömür boyu teknik servis desteği sunuyoruz.",
  },
  {
    q: "İstanbul'un her ilçesine hizmet veriyor musunuz?",
    a: "Evet, Anadolu ve Avrupa yakasının tüm ilçelerine aynı gün keşif ve montaj hizmeti sunuyoruz.",
  },
  {
    q: "Sistem bozulursa ne yapılıyor?",
    a: "Garanti kapsamındaki arızalarda ücretsiz müdahale yapıyoruz. Garanti sonrasında da yerinde teknik servis hizmetimiz devam eder.",
  },
];

const DISTRICTS = ["Kadıköy","Beşiktaş","Üsküdar","Şişli","Maltepe","Ataşehir","Kartal","Bakırköy"];

export default function GoruntulDiafon() {
  const { content } = useSiteContent();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} productName="Görüntülü Diafon Montajı" />

      <main className="flex-1">

        {/* Hero */}
        <section className="pt-[53px] bg-background">
          <div className="bg-gradient-to-br from-primary/8 via-background to-background border-b border-border">
            <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
              <motion.div {...fade()} className="max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  İstanbul Genelinde Aktif Servis
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5 leading-[1.1]">
                  Görüntülü Diafon Montajı<br />
                  <span className="text-primary">İstanbul</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  İstanbul'un tüm ilçelerinde görüntülü diyafon kurulumu, tesisat yenileme ve teknik servis.
                  10 yıllık deneyim, aynı gün keşif, 2 yıl garanti.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" onClick={() => setQuoteOpen(true)} className="rounded-lg h-12 px-6 gap-2 shadow-md shadow-primary/20">
                    <ChevronRight className="w-4 h-4" />
                    Ücretsiz Fiyat Al
                  </Button>
                  <Button size="lg" variant="outline" asChild className="rounded-lg h-12 px-6 gap-2">
                    <a href={`tel:+${content.whatsapp_number}`}><Phone className="w-4 h-4" /> Hemen Ara</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Özellikler */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Görüntülü Diafon Özellikleri</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Modern görüntülü diyafon sistemlerinin sunduğu tüm avantajlar.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} {...fade(i * 0.07)} className="p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Neden Biz */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <motion.div {...fade()}>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Neden Diafon İstanbul?</h2>
                <ul className="space-y-4">
                  {[
                    { icon: Clock, text: "Aynı gün ücretsiz keşif ve fiyat teklifi" },
                    { icon: ShieldCheck, text: "Tüm montajlarda 2 yıl yazılı garanti" },
                    { icon: Wrench, text: "Eski binalar için özel tesisat çözümleri" },
                    { icon: Video, text: "Audio, Netelsan, Nade, Multitek yetkili servis" },
                    { icon: MapPin, text: "İstanbul'un tüm 39 ilçesine hizmet" },
                    { icon: Star, text: "5.000+ tamamlanan kurulum projesi" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...fade(0.15)} className="bg-card border border-border rounded-2xl p-8">
                <h3 className="font-bold text-foreground text-lg mb-2">Ücretsiz Keşif Talep Et</h3>
                <p className="text-sm text-muted-foreground mb-6">Uzman teknisyenimiz aynı gün gelir, ücretsiz analiz yapar, yazılı teklif sunar.</p>
                <Button onClick={() => setQuoteOpen(true)} className="w-full rounded-xl gap-2">
                  <ChevronRight className="w-4 h-4" /> Fiyat Teklifi Al
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">Taahhüt yok · 7/24 hizmet</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hizmet Bölgeleri */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.div {...fade()}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Hizmet Verdiğimiz İlçeler</h2>
              <p className="text-muted-foreground mb-10 max-w-lg mx-auto">İstanbul'un 39 ilçesinde görüntülü diafon montajı yapıyoruz.</p>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-2">
              {DISTRICTS.map((d, i) => (
                <motion.div key={d} {...fade(i * 0.04)}>
                  <Link
                    href={`/${d.toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c")}-diafon-kurulumu`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-sm font-medium transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" /> {d}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* İlgili sayfalar */}
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fade()} className="text-center mb-10">
              <h2 className="text-xl font-bold text-foreground mb-2">Daha Fazla Bilgi</h2>
              <p className="text-muted-foreground text-sm">Fiyatlar ve modeller hakkında detaylı bilgi alın.</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link href="/goruntulu-diafon-fiyatlari" className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">Görüntülü Diafon Fiyatları →</p>
                  <p className="text-xs text-muted-foreground mt-0.5">2025 güncel fiyat rehberi</p>
                </div>
              </Link>
              <Link href="/goruntulu-diafon-modelleri" className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">Görüntülü Diafon Modelleri →</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Karşılaştırmalı model rehberi</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Sıkça Sorulan Sorular</h2>
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

        {/* Bottom CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Hemen Ücretsiz Fiyat Alın</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">Aynı gün keşif, yazılı teklif, taahhütsüz hizmet.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" onClick={() => setQuoteOpen(true)} className="bg-white text-primary hover:bg-white/90 rounded-lg h-12 px-6 gap-2 font-bold">
                <ChevronRight className="w-4 h-4" /> Ücretsiz Fiyat Al
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10 rounded-lg h-12 px-6 gap-2">
                <a href={`tel:+${content.whatsapp_number}`}><Phone className="w-4 h-4" /> {content.phone_display}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

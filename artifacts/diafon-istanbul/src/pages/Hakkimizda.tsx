import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Settings,
  Video,
  Users,
  ShieldCheck,
  Phone,
  Clock,
  ChevronRight,
} from "lucide-react";

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-cyan-500/5 -z-10" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              <span className="w-8 h-px bg-primary"></span>
              Kurumsal
              <span className="w-8 h-px bg-primary"></span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Hakkımızda
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              İstanbul Diafon ve Güvenlik Sistemleri Kurulum Merkezi — 10 yılı aşkın
              deneyim, 500+ başarılı proje.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 divide-x divide-secondary-foreground/10 text-center">
            {[
              ["500+", "Başarılı Montaj"],
              ["10+", "Yıl Deneyim"],
              ["39", "İlçeye Hizmet"],
              ["7/24", "Teknik Destek"],
            ].map(([val, label]) => (
              <div key={label} className="px-4">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                  {val}
                </div>
                <div className="text-sm text-secondary-foreground/80">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkımızda İçerik */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="space-y-8">
                <div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    <strong className="text-foreground">Diafon İstanbul</strong> olarak,
                    İstanbul genelinde diafon sistemleri, interkom teknolojileri, akıllı
                    bina çözümleri ve profesyonel güvenlik sistemleri konusunda öncü bir
                    kurulum merkezi olarak hizmet vermekteyiz.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Teknolojinin hızla geliştiği çağımızda, yaşam alanlarınızın ve
                    ticari işletmelerinizin güvenlik standartlarını en üst seviyeye
                    taşımayı hedefliyoruz.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full inline-block shrink-0"></span>
                    Misyonumuz
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Müşterilerimizin ihtiyaçlarını en doğru şekilde analiz ederek,
                    yüksek kaliteli diafon ve güvenlik ürünlerini İstanbul'un tüm
                    ilçelerinde hızlı, güvenilir ve ekonomik kurulum çözümleriyle
                    birleştirmektir. "Kaliteye Güven" prensibimizden ödün vermeden,
                    satış sonrası teknik desteğimizle müşteri memnuniyetini sürekli
                    kılmak temel gayemizdir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full inline-block shrink-0"></span>
                    Vizyonumuz
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    İstanbul diafon ve interkom sistemleri sektöründe, dijitalleşen
                    dünyanın gerekliliklerine uyum sağlayan, yenilikçi yaklaşımıyla
                    referans gösterilen ve güvenin sembolü olan lider bir marka haline
                    gelmektir.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full inline-block shrink-0"></span>
                  Neden Diafon İstanbul?
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      title: "İstanbul Genelinde Uzman Hizmet",
                      desc: "İstanbul'un her noktasına hızlı kurulum, servis ve montaj hizmeti sunuyoruz.",
                    },
                    {
                      icon: Settings,
                      title: "Geniş Ürün Yelpazesi",
                      desc: "Farklı marka seçenekleriyle, bütçenize ve ihtiyacınıza en uygun diafon ve interkom sistemleri.",
                    },
                    {
                      icon: Video,
                      title: "Teknolojik Çözümler",
                      desc: "İnternet üzerinden yönetilebilir, yeni nesil görüntülü ve sesli güvenlik sistemleri.",
                    },
                    {
                      icon: Users,
                      title: "Müşteri Odaklı Yaklaşım",
                      desc: "Siparişlerinizden montaj sürecine kadar her aşamada şeffaf bilgilendirme ve profesyonel iş takibi.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Garantili Hizmet",
                      desc: "Tüm montaj ve onarım hizmetlerimiz garantilidir. Sorun çözülene kadar yanınızdayız.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 p-4 rounded-xl bg-muted/40 border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          {item.title}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Bizimle Çalışmak İster misiniz?
            </h2>
            <p className="text-muted-foreground mb-8">
              Ücretsiz keşif talebinde bulunun, uzmanlarımız en kısa sürede sizi arasın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#iletisim">
                <Button size="lg" className="gap-2">
                  Ücretsiz Keşif Talep Et <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+905320615758">
                <Button size="lg" variant="outline" className="gap-2">
                  <Phone className="w-4 h-4" />
                  0532 061 57 58
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 mt-auto border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs">
              D
            </div>
            <span className="font-bold text-white">Diafon İstanbul</span>
          </div>
          <div className="flex items-center gap-4 text-secondary-foreground/70 text-sm">
            <a href="tel:+905320615758" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> 0532 061 57 58
            </a>
            <span>·</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 7/24</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Beşiktaş, İstanbul</span>
          </div>
          <Link href="/" className="text-secondary-foreground/70 hover:text-white transition-colors text-sm">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </footer>
    </div>
  );
}

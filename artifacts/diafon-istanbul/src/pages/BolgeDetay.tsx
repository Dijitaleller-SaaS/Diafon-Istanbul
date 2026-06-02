import { useParams, Link } from "wouter";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

type DistrictInfo = {
  name: string;
  description: string;
  longDescription: string;
  neighborhoods: string[];
  highlights: { icon: typeof CheckCircle2; title: string; text: string }[];
};

const districtData: Record<string, DistrictInfo> = {
  kadikoy: {
    name: "Kadıköy",
    description:
      "Anadolu yakasının gözde merkezi Kadıköy'de görüntülü diafon kurulumu, modernizasyon ve teknik servis hizmetleri sunuyoruz.",
    longDescription:
      "Kadıköy; Moda, Bağdat Caddesi, Fikirtepe ve Göztepe gibi birbirinden farklı dokudaki mahalleleri barındıran dinamik bir ilçe. Eski tesisat sorunlarından yeni yapı projelerine kadar her ihtiyaca özel diafon çözümleri tasarlıyoruz.",
    neighborhoods: ["Moda", "Bağdat Caddesi", "Fikirtepe", "Göztepe", "Fenerbahçe", "Suadiye"],
    highlights: [
      {
        icon: Clock,
        title: "Aynı Gün Keşif",
        text: "Kadıköy ve çevresine aynı gün ücretsiz keşif organizasyonu yapıyoruz.",
      },
      {
        icon: ShieldCheck,
        title: "2 Yıl Garanti",
        text: "Tüm kurulum ve malzemelerde 2 yıl yazılı garanti sunuyoruz.",
      },
      {
        icon: Wrench,
        title: "Eski Tesisat Uzmanı",
        text: "Kadıköy'ün yaşlı bina stoğuna özel paslanmaz kablo ve panel çözümleri.",
      },
    ],
  },
  besiktas: {
    name: "Beşiktaş",
    description:
      "Beşiktaş'taki villa, rezidans ve tarihi apartmanlara özel görüntülü interkom ve güvenlik sistemleri kuruyoruz.",
    longDescription:
      "Beşiktaş; Nispetiye, Levent, Ulus ve Etiler gibi prestijli semtleriyle İstanbul'un en seçkin ilçelerinden. Yüksek beklentilere yanıt veren IP tabanlı diafon sistemlerinden klasik analog çözümlere kadar geniş ürün yelpazemizle hizmetinizdeyiz.",
    neighborhoods: ["Levent", "Etiler", "Ulus", "Nispetiye", "Bebek", "Ortaköy"],
    highlights: [
      {
        icon: ShieldCheck,
        title: "Lüks Konut Deneyimi",
        text: "Villa ve rezidanslara özel HD görüntülü, şifreli ve kart okuyuculu sistemler.",
      },
      {
        icon: Clock,
        title: "Esnek Randevu",
        text: "Yoğun çalışma hayatınıza uygun sabah-akşam randevu seçenekleri.",
      },
      {
        icon: Wrench,
        title: "Marka Bağımsız Servis",
        text: "Farklı markaların mevcut sistemlerine entegrasyon ve teknik destek.",
      },
    ],
  },
  bakirkoy: {
    name: "Bakırköy",
    description:
      "Bakırköy ve çevresinde eski diafon tesisatı yenileme, görüntülü sistem modernizasyonu ve 7/24 teknik servis.",
    longDescription:
      "Bakırköy; Yeşilköy, Florya ve Ataköy gibi köklü semtleriyle birlikte hızla dönüşen bir ilçe. Onlarca yıllık eski sistemlerin modernizasyonu konusunda bölgede deneyimli ekibimiz, en güncel IP diafon çözümlerini ekonomik maliyetlerle sunuyor.",
    neighborhoods: ["Ataköy", "Yeşilköy", "Florya", "Kartaltepe", "Zuhuratbaba"],
    highlights: [
      {
        icon: Wrench,
        title: "Modernizasyon Uzmanı",
        text: "Analog sistemden dijital IP sisteme geçiş işlemlerinde komple çözüm.",
      },
      {
        icon: ShieldCheck,
        title: "Temiz İşçilik",
        text: "Kablo kanalları ve duvara sıfır montaj; estetik ve uzun ömürlü kurulum.",
      },
      {
        icon: Clock,
        title: "Hızlı Müdahale",
        text: "Acil arıza ve bakım taleplerine Bakırköy bölgesinde ortalama 2 saat içinde yanıt.",
      },
    ],
  },
  sisli: {
    name: "Şişli",
    description:
      "Şişli'deki rezidans, plaza ve apartmanlara kurumsal ve bireysel diafon ile güvenlik sistemi kurulumu.",
    longDescription:
      "Şişli; Nişantaşı, Mecidiyeköy ve Osmanbey ile ticari ve konut kullanımının iç içe geçtiği bir ilçe. Siteden tekil daireye, plazadan butik ofise kadar her ölçekteki binaya özel diafon ve erişim kontrol çözümleri tasarlıyoruz.",
    neighborhoods: ["Nişantaşı", "Mecidiyeköy", "Osmanbey", "Fulya", "Bomonti"],
    highlights: [
      {
        icon: ShieldCheck,
        title: "Kurumsal Çözümler",
        text: "Kart okuyucu, parmak izi ve yüz tanıma entegrasyonlu erişim sistemleri.",
      },
      {
        icon: Wrench,
        title: "Çoklu Kapı Yönetimi",
        text: "Giriş, otopark ve servis kapılarını tek panel üzerinden yöneten sistemler.",
      },
      {
        icon: Clock,
        title: "Proje Tabanlı Fiyatlandırma",
        text: "Büyük sitelere ve binalara özel paket fiyatlar ve öncelikli servis.",
      },
    ],
  },
  sariyer: {
    name: "Sarıyer",
    description:
      "Sarıyer'deki lüks villa ve konut projelerine özel görüntülü diafon ve akıllı ev entegrasyonları.",
    longDescription:
      "Sarıyer; Tarabya, Büyükdere ve Zekeriyaköy gibi yeşilin ve denizin buluştuğu semtleriyle İstanbul'un en değerli konut bölgelerinden. Akıllı ev sistemleriyle entegre çalışan IP diafon çözümleri ve uzak erişim uygulamalarıyla konforunuzu bir üst seviyeye taşıyoruz.",
    neighborhoods: ["Tarabya", "Büyükdere", "Zekeriyaköy", "Maslak", "İstinye"],
    highlights: [
      {
        icon: ShieldCheck,
        title: "Akıllı Ev Entegrasyonu",
        text: "KNX, Z-Wave ve uyumlu akıllı ev sistemleriyle entegre diafon çözümleri.",
      },
      {
        icon: Wrench,
        title: "Mobil Erişim",
        text: "Telefonunuzdan kapıyı görün ve açın; siz evde olmasanız bile.",
      },
      {
        icon: Clock,
        title: "Özel Danışmanlık",
        text: "Proje aşamasından kabulüne kadar birebir teknik danışmanlık hizmeti.",
      },
    ],
  },
  uskudar: {
    name: "Üsküdar",
    description:
      "Üsküdar'daki apartman yönetimlerine ve sitelere profesyonel diafon kurulumu ve teknik danışmanlık.",
    longDescription:
      "Üsküdar; tarihi dokusu ve hızla büyüyen yeni konut alanlarıyla İstanbul'un en kalabalık ilçelerinden. Eski Ermeni ve Rum yapılarının tadilatından yeni TOKİ sitelerine kadar geniş bir proje yelpazesinde bölgeye hâkim ekibimizle çalışıyoruz.",
    neighborhoods: ["Çamlıca", "Acıbadem", "Bağlarbaşı", "Kuzguncuk", "Beylerbeyi"],
    highlights: [
      {
        icon: Wrench,
        title: "Site Yönetimi Odaklı",
        text: "Büyük sitelerde toplu kurulum, eş zamanlı komisyon ve indirimli paketler.",
      },
      {
        icon: ShieldCheck,
        title: "Teknik Danışmanlık",
        text: "Hangi sistemin doğru seçenek olduğunu bağımsız olarak değerlendiriyoruz.",
      },
      {
        icon: Clock,
        title: "Periyodik Bakım",
        text: "Yıllık bakım anlaşması ile sistem ömrünü 2 katına çıkarın.",
      },
    ],
  },
};

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const BolgeDetay = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const SUFFIX = "-diafon-kurulumu";
  const isDistrictPage = slug.endsWith(SUFFIX);
  const bolge = isDistrictPage ? slug.slice(0, -SUFFIX.length) : "";
  const data = districtData[bolge];

  useEffect(() => {
    if (data) {
      document.title = `${data.name} Diafon Kurulumu — Diafon İstanbul`;
    }
  }, [data]);

  if (!isDistrictPage || !data) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-[53px] py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-cyan-500/5 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
              <MapPin className="w-4 h-4" />
              İstanbul / {data.name}
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 max-w-2xl">
              {data.name} Diafon Kurulumu
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-8">
              {data.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.22}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#iletisim">
                <Button size="lg" className="gap-2 rounded-xl px-7 h-13 text-base font-semibold shadow-lg shadow-primary/20">
                  Ücretsiz Keşif İste
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+905320000000">
                <Button variant="outline" size="lg" className="gap-2 rounded-xl px-7 h-13 text-base">
                  <Phone className="w-4 h-4" />
                  Hemen Ara
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Long description + neighborhoods */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                {data.name}'da Diafon Hizmeti
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{data.longDescription}</p>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                  Hizmet Verdiğimiz Semtler
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center gap-1.5 bg-muted text-foreground text-sm px-3 py-1.5 rounded-full border border-border"
                    >
                      <MapPin className="w-3 h-3 text-primary" />
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-4">
                {data.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-2xl bg-muted/40 border border-border"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <h.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-semibold mb-1">{h.title}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                {data.name} için Ücretsiz Keşif Alın
              </h2>
              <p className="text-muted-foreground mb-6">
                Teknik ekibimiz en kısa sürede {data.name} adresinizdeki sistemi değerlendirir ve
                size en uygun çözümü önerir. Keşif tamamen ücretsizdir.
              </p>
              <Link href="/#iletisim">
                <Button size="lg" className="gap-2 rounded-xl px-8 shadow-lg shadow-primary/20">
                  Keşif Talep Et
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Other areas */}
      <section className="py-14">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-5 text-center">
              Diğer Hizmet Bölgelerimiz
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.entries(districtData)
                .filter(([slug]) => slug !== bolge)
                .map(([slug, d]) => (
                  <Link key={slug} href={`/${slug}-diafon-kurulumu`}>
                    <span className="inline-flex items-center gap-1.5 bg-card border border-border text-sm px-4 py-2 rounded-full hover:border-primary/60 hover:text-primary transition-colors cursor-pointer">
                      <MapPin className="w-3 h-3" />
                      {d.name}
                    </span>
                  </Link>
                ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="py-6 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between flex-wrap gap-3 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Diafon İstanbul. Tüm hakları saklıdır.</span>
          <Link href="/" className="hover:text-primary transition-colors">
            Ana Sayfaya Dön
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default BolgeDetay;

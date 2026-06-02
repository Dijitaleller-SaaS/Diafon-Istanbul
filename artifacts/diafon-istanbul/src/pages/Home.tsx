import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Phone,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Settings,
  Wrench,
  Video,
  Home as HomeIcon,
  Sun,
  Moon,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Ad soyad en az 2 karakter olmalıdır." }),
  phone: z
    .string()
    .min(10, { message: "Geçerli bir telefon numarası giriniz." }),
  district: z.string().min(1, { message: "Lütfen bir ilçe seçiniz." }),
  message: z
    .string()
    .min(10, { message: "Mesajınız en az 10 karakter olmalıdır." }),
});

const ISTANBUL_DISTRICTS = [
  "Adalar",
  "Arnavutköy",
  "Ataşehir",
  "Avcılar",
  "Bağcılar",
  "Bahçelievler",
  "Bakırköy",
  "Başakşehir",
  "Bayrampaşa",
  "Beşiktaş",
  "Beykoz",
  "Beylikdüzü",
  "Beyoğlu",
  "Büyükçekmece",
  "Çatalca",
  "Çekmeköy",
  "Esenler",
  "Esenyurt",
  "Eyüpsultan",
  "Fatih",
  "Gaziosmanpaşa",
  "Güngören",
  "Kadıköy",
  "Kağıthane",
  "Kartal",
  "Küçükçekmece",
  "Maltepe",
  "Pendik",
  "Sancaktepe",
  "Sarıyer",
  "Silivri",
  "Sultanbeyli",
  "Sultangazi",
  "Şile",
  "Şişli",
  "Tuzla",
  "Ümraniye",
  "Üsküdar",
  "Zeytinburnu",
];

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const HERO_IMAGES = [
  {
    src: "/technician.jpg",
    alt: "Diafon İstanbul teknisyeni apartman koridorunda görüntülü diafon sistemi kuruyor",
    label: "Montaj Hizmeti",
  },
  {
    src: "/technician.jpg",
    alt: "Görüntülü diafon panel kurulumu",
    label: "Panel Kurulumu",
  },
  {
    src: "/technician.jpg",
    alt: "Kablo tesisat çalışması",
    label: "Tesisat",
  },
];

const HeroGallery = () => {
  const [active, setActive] = useState(0);
  const count = HERO_IMAGES.length;

  const prev = () => setActive((p) => (p - 1 + count) % count);
  const next = () => setActive((p) => (p + 1) % count);

  return (
    <FadeIn delay={0.2} className="hidden md:block">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted" style={{ aspectRatio: "3/4" }}>
        {/* Main image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={HERO_IMAGES[active].src}
            alt={HERO_IMAGES[active].alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            width={600}
            height={800}
            loading="eager"
          />
        </AnimatePresence>

        {/* Dark gradient bottom */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* Trust badge */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-border flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Garantili İşçilik</p>
            <p className="text-sm font-semibold text-foreground">7/24 Servis</p>
          </div>
        </div>

        {/* Prev / Next */}
        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Önceki fotoğraf"
              data-testid="gallery-prev"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Sonraki fotoğraf"
              data-testid="gallery-next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Fotoğraf ${i + 1}`}
              data-testid={`gallery-dot-${i}`}
              className={cn(
                "rounded-full transition-all duration-300",
                i === active ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3">
        {HERO_IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            data-testid={`gallery-thumb-${i}`}
            className={cn(
              "relative flex-1 rounded-xl overflow-hidden transition-all duration-300",
              i === active ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-90"
            )}
            style={{ aspectRatio: "1" }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className={cn(
              "absolute inset-x-0 bottom-0 py-1 text-center text-[10px] font-semibold text-white bg-black/50",
              i === active ? "opacity-100" : "opacity-0"
            )}>
              {img.label}
            </div>
          </button>
        ))}
      </div>
    </FadeIn>
  );
};

const Counter = ({
  from = 0,
  to,
  duration = 2,
}: {
  from?: number;
  to: number;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min(
          (timestamp - startTimestamp) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, to, from, duration]);

  return <span ref={ref}>{count}</span>;
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      district: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Keşif talebiniz başarıyla alındı!", {
      description:
        "Teknik ekibimiz en kısa sürede sizinle iletişime geçecektir.",
    });
    form.reset();
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ── Sticky Navbar ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-border py-3 shadow-sm"
            : "bg-background border-border py-3"
        )}
        data-testid="header"
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 shrink-0"
            data-testid="logo-button"
          >
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm">
              D
            </div>
            <span className="font-display font-bold text-base tracking-tight text-foreground">
              Diafon İstanbul
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 mx-auto">
            {[
              { label: "Hizmetler", id: "hizmetler" },
              { label: "Bölgeler", id: "neden-biz" },
              { label: "Referanslar", id: "referanslar" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Tema değiştir"
              data-testid="theme-toggle"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="tel:+905320615758"
              className="text-sm font-medium text-foreground hidden lg:block"
              data-testid="nav-phone"
            >
              0532 061 57 58
            </a>

            <Button
              onClick={() => scrollTo("iletisim")}
              size="sm"
              className="rounded-md flex items-center gap-2"
              data-testid="nav-cta"
            >
              <Phone className="w-3.5 h-3.5" />
              Servis Çağır
            </Button>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border text-muted-foreground"
              aria-label="Tema değiştir"
              data-testid="theme-toggle-mobile"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[53px] z-40 bg-background/95 backdrop-blur-sm md:hidden flex flex-col items-center justify-center gap-8 border-t border-border">
          <button
            onClick={() => scrollTo("hizmetler")}
            className="text-xl font-medium text-foreground hover:text-primary"
          >
            Hizmetler
          </button>
          <button
            onClick={() => scrollTo("neden-biz")}
            className="text-xl font-medium text-foreground hover:text-primary"
          >
            Bölgeler
          </button>
          <button
            onClick={() => scrollTo("referanslar")}
            className="text-xl font-medium text-foreground hover:text-primary"
          >
            Referanslar
          </button>
          <button
            onClick={() => scrollTo("sss")}
            className="text-xl font-medium text-foreground hover:text-primary"
          >
            SSS
          </button>
          <div className="flex flex-col items-center gap-4 mt-4">
            <a
              href="tel:+905320615758"
              className="text-lg font-semibold flex items-center gap-2 text-primary"
            >
              <Phone className="h-5 w-5" />
              0532 061 57 58
            </a>
            <Button
              size="lg"
              onClick={() => scrollTo("iletisim")}
              className="rounded-md w-full max-w-[200px] flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Servis Çağır
            </Button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="pt-[53px] min-h-[92vh] flex items-center bg-background overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24">
              {/* Left: Text content */}
              <div>
                <FadeIn>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    İstanbul Genelinde Aktif Servis
                  </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                    İstanbul Diafon Montaj{" "}
                    <span className="text-primary">ve Servis</span> Uzmanı
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                    Görüntülü diafon sistemleri, tesisat keşfi ve kablo
                    yenileme projelerinde 10 yıllık deneyimimizle kalıcı ve
                    garantili çözümler sunuyoruz.
                  </p>
                </FadeIn>

                <FadeIn
                  delay={0.3}
                  className="flex flex-wrap items-center gap-3 mb-10"
                >
                  <Button
                    size="lg"
                    asChild
                    className="rounded-md h-12 px-6 flex items-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all"
                    data-testid="hero-cta-call"
                  >
                    <a href="tel:+905320615758">
                      <Phone className="w-4 h-4" />
                      Hemen Ara
                    </a>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-md h-12 px-6 flex items-center gap-2 border-border hover:bg-muted"
                    data-testid="hero-cta-whatsapp"
                  >
                    <a
                      href="https://wa.me/905320615758?text=Merhaba%2C%20%C3%BCcretsiz%20ke%C5%9Fif%20talep%20etmek%20istiyorum"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-green-600"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp
                    </a>
                  </Button>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["M", "A", "B"].map((initial, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary"
                        >
                          {initial}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-bold text-foreground">5.000+</span>{" "}
                      İstanbul evine teknik destek
                    </p>
                  </div>
                </FadeIn>
              </div>

              {/* Right: Image Gallery */}
              <HeroGallery />
            </div>

            {/* Trust strip */}
            <FadeIn
              delay={0.5}
              className="flex flex-wrap justify-center gap-6 md:gap-12 pb-12 pt-4 border-t border-border/50"
            >
              {[
                { icon: <Clock className="w-4 h-4" />, label: "7/24 Servis" },
                {
                  icon: <ShieldCheck className="w-4 h-4" />,
                  label: "Garantili İşçilik",
                },
                {
                  icon: <MapPin className="w-4 h-4" />,
                  label: "İstanbul 39 İlçe",
                },
                {
                  icon: <Users className="w-4 h-4" />,
                  label: "Ücretsiz Keşif",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                >
                  <span className="text-primary">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </FadeIn>
          </div>
        </section>

        {/* Problem to Solution */}
        <section className="py-20 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <FadeIn delay={0.1}>
                <Card className="bg-background border-border shadow-sm h-full hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-bl-full -z-10 group-hover:bg-destructive/10 transition-colors"></div>
                  <CardHeader>
                    <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center mb-4">
                      <Settings className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">
                      Kapı ziliniz çalışmıyor mu?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Kopan kablolar, arızalı paneller veya çalışmayan zil
                      butonları güvenliğinizi riske atar.
                    </p>
                    <div className="flex items-start gap-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Hızlı arıza tespiti ve aynı gün kalıcı onarım.</span>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Card className="bg-background border-border shadow-sm h-full hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -z-10 group-hover:bg-amber-500/10 transition-colors"></div>
                  <CardHeader>
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">
                      Eski tesisat sorunları?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Yıllanmış, paslanmış veya yanlış çekilmiş kablolar sürekli
                      arızalara neden olur.
                    </p>
                    <div className="flex items-start gap-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>
                        Eski kabloları yeniliyor, sistemi modernize ediyoruz.
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.3}>
                <Card className="bg-background border-border shadow-sm h-full hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                      <Video className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">
                      Görüntülüye mi geçmek istiyorsunuz?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Eski sesli diafonunuz kimin geldiğini görmenize imkan
                      tanımaz.
                    </p>
                    <div className="flex items-start gap-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>
                        Yüksek çözünürlüklü ekranlarla güvenliğinizi artırın.
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section id="hizmetler" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Profesyonel Çözümler
                </h2>
                <p className="text-muted-foreground text-lg">
                  İhtiyacınıza uygun teknolojik altyapılar ve anahtar teslim
                  kurulum hizmetleri.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px]">
              <FadeIn delay={0.1} className="md:col-span-2 md:row-span-2">
                <div className="relative h-full w-full rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-secondary"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20 opacity-80"></div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <div className="w-14 h-14 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-auto border border-primary/30 text-primary-foreground">
                      <Video className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Görüntülü Diafon Montajı
                    </h3>
                    <p className="text-white/80 max-w-md">
                      Apartman ve siteler için en son teknoloji yüksek
                      çözünürlüklü, gece görüşlü ve şifreli geçiş özellikli
                      sistemler.
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                    <Video className="w-96 h-96 text-white" />
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="md:col-span-1 md:row-span-1">
                <div className="bg-card border border-border h-full rounded-3xl p-6 flex flex-col group hover:border-primary/50 transition-colors shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sesli Diafon</h3>
                  <p className="text-sm text-muted-foreground mt-auto">
                    Ekonomik ve pratik sesli iletişim sistemleri kurulumu.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3} className="md:col-span-1 md:row-span-1">
                <div className="bg-card border border-border h-full rounded-3xl p-6 flex flex-col group hover:border-primary/50 transition-colors shadow-sm">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Arıza & Servis</h3>
                  <p className="text-sm text-muted-foreground mt-auto">
                    7/24 acil müdahale, panel ve şube tamiri.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4} className="md:col-span-2 md:row-span-1">
                <div className="bg-card border border-border h-full rounded-3xl p-6 flex items-center gap-6 group hover:border-primary/50 transition-colors shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 text-primary z-10">
                    <HomeIcon className="w-8 h-8" />
                  </div>
                  <div className="z-10">
                    <h3 className="text-xl font-bold mb-2">
                      Akıllı Ev Entegrasyonu
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Diafon sisteminizi akıllı telefonunuzdan yönetin. Uzaktan
                      kapı açma ve izleme özellikleri.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn
                delay={0.5}
                className="md:col-span-1 md:row-span-1 lg:col-span-2"
              >
                <div className="bg-card border border-border h-full rounded-3xl p-6 flex flex-col group hover:border-primary/50 transition-colors shadow-sm">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Tesisat & Kablo Yenileme
                  </h3>
                  <p className="text-sm text-muted-foreground mt-auto">
                    Eski ve sorunlu kablo altyapısının tespiti ve sıfırdan
                    çekilmesi.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Why Us / Stats */}
        <section
          id="neden-biz"
          className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden"
        >
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-secondary-foreground/10">
              <FadeIn delay={0.1} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  <Counter to={500} />+
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-foreground/80">
                  Başarılı Montaj
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  <Counter to={10} />+
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-foreground/80">
                  Yıl Deneyim
                </div>
              </FadeIn>
              <FadeIn delay={0.3} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  <Counter to={39} />
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-foreground/80">
                  İlçeye Hizmet
                </div>
              </FadeIn>
              <FadeIn delay={0.4} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  7/24
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-foreground/80">
                  Teknik Destek
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ + Form */}
        <section id="sss" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              {/* FAQ */}
              <div>
                <FadeIn>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Sıkça Sorulan Sorular
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Aklınıza takılan soruların cevaplarını burada
                    bulabilirsiniz. Daha fazla bilgi için hemen arayın.
                  </p>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                        Eski diafon tesisatım görüntülü sistem için çalışır mı?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Ücretsiz keşif ziyaretimizde mevcut kabloların uygunluğunu
                        test ediyoruz. Uygunsa kablo değişikliği yapmadan yeni
                        sistemi kurabiliriz, böylece maliyet düşer.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                        Montaj ne kadar sürer?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Standart bir apartman için kablo değişimi dahil kurulum
                        genellikle 1 günde tamamlanır. Büyük siteler için süre
                        daire sayısına göre değişir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                        Hangi markalarla çalışıyorsunuz?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Audio, Netelsan, Nade, Multitek gibi Türkiye'nin en çok
                        tercih edilen ve yedek parçası bol, garantili
                        yerli/yabancı markalarıyla çalışıyoruz.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                        Görüntülü diafonun fiyatı nedir?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Fiyatlar daire sayısına, seçilen markaya, ekran boyutuna
                        ve kablo yenilemesi gerekip gerekmediğine göre değişir.
                        Kesin fiyat için ücretsiz keşif talep edebilirsiniz.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                        İstanbul'un her ilçesine hizmet veriyor musunuz?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Evet, İstanbul'un 39 ilçesinde Anadolu ve Avrupa yakası
                        fark etmeksizin mobil servis araçlarımızla hizmet
                        veriyoruz.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </FadeIn>
              </div>

              {/* Form */}
              <div id="iletisim" className="relative scroll-mt-24">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-cyan-400/20 blur-2xl -z-10 rounded-3xl opacity-50"></div>
                <Card className="border-border/50 shadow-2xl bg-card/95 backdrop-blur-xl rounded-2xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-cyan-400"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold">
                      Ücretsiz Keşif Talep Edin
                    </CardTitle>
                    <CardDescription className="text-base">
                      Formu doldurun, uzman ekibimiz sizi arayıp ücretsiz keşif
                      randevusu oluştursun.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                      >
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">
                                Ad Soyad / Yönetici
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Örn: Ahmet Yılmaz"
                                  data-testid="input-fullname"
                                  className="bg-background border-border focus-visible:ring-primary"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">
                                  Telefon Numarası
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="05XX XXX XX XX"
                                    data-testid="input-phone"
                                    className="bg-background border-border focus-visible:ring-primary"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">
                                  İlçe
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger
                                      data-testid="select-district"
                                      className="bg-background border-border focus-visible:ring-primary"
                                    >
                                      <SelectValue placeholder="İlçe seçiniz" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-[300px]">
                                    {ISTANBUL_DISTRICTS.map((d) => (
                                      <SelectItem key={d} value={d}>
                                        {d}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">
                                Talebiniz / Daire Sayısı
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Örn: 15 daireli apartmanımız için görüntülü diafon fiyatı almak istiyoruz."
                                  className="min-h-[100px] resize-none bg-background border-border focus-visible:ring-primary"
                                  data-testid="textarea-message"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          size="lg"
                          data-testid="button-submit"
                          className="w-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl h-14 group"
                        >
                          Keşif Talep Et
                          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="referanslar"
          className="py-20 bg-muted/30 border-t border-border"
        >
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Müşterilerimiz Ne Diyor?
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  text: '"Eski bozuk zil sistemimizi 1 gün içinde yüksek çözünürlüklü kameralı sistemle değiştirdiler. Ekip çok profesyonel, temiz çalıştı. Gönül rahatlığıyla tavsiye ederim."',
                  name: "Mehmet K.",
                  role: "Kardelen Apt. Yöneticisi, Kadıköy",
                  delay: 0.1,
                },
                {
                  text: '"Kapı paneli gece arızalandı, kilitli kaldık. Gece 02:00\'de aramama rağmen geldiler ve arızayı giderdiler. 7/24 hizmetleri gerçekten çalışıyor. Teşekkürler."',
                  name: "Ayşe S.",
                  role: "Güzeltepe Sitesi, Ataşehir",
                  delay: 0.2,
                },
                {
                  text: '"Ücretsiz keşif için aynı gün geldiler. Ne gerekiyorsa abartmadan net bir dille anlattılar. Fiyat/performans olarak İstanbul\'un en iyisi."',
                  name: "Burak D.",
                  role: "Deniz Apt., Beşiktaş",
                  delay: 0.3,
                },
              ].map((t) => (
                <FadeIn key={t.name} delay={t.delay}>
                  <Card className="bg-background border-border shadow-sm">
                    <CardContent className="pt-6">
                      <div className="flex text-amber-500 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">
                        {t.text}
                      </p>
                      <div>
                        <p className="font-semibold text-foreground">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 md:py-16 border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm">
                  D
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-white">
                  Diafon İstanbul
                </span>
              </div>
              <p className="text-secondary-foreground/70 mb-6 max-w-sm">
                İstanbul geneli 39 ilçede uzman kadromuzla görüntülü ve sesli
                diafon montajı, kablo yenileme ve 7/24 arıza servis hizmeti
                sunuyoruz.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">İletişim</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+905320615758"
                    className="flex items-center gap-3 text-secondary-foreground/80 hover:text-white transition-colors group"
                    data-testid="footer-phone"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary-foreground/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-lg">0532 061 57 58</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-secondary-foreground/80">
                  <div className="w-8 h-8 rounded-full bg-secondary-foreground/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>7 Gün 24 Saat Açık</span>
                </li>
                <li className="flex items-center gap-3 text-secondary-foreground/80">
                  <div className="w-8 h-8 rounded-full bg-secondary-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>İstanbul Tüm İlçeler</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Hızlı Menü</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollTo("hizmetler")}
                    className="text-secondary-foreground/80 hover:text-white transition-colors"
                  >
                    Hizmetlerimiz
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("neden-biz")}
                    className="text-secondary-foreground/80 hover:text-white transition-colors"
                  >
                    Hakkımızda
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("sss")}
                    className="text-secondary-foreground/80 hover:text-white transition-colors"
                  >
                    Sıkça Sorulan Sorular
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("iletisim")}
                    className="text-secondary-foreground/80 hover:text-white transition-colors"
                  >
                    Keşif Talep Et
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
            <p>&copy; {new Date().getFullYear()} Diafon İstanbul. Tüm hakları saklıdır.</p>
            <p>İstanbul'un Güvenliği Bize Emanet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

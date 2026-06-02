import { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Phone, ShieldCheck, Clock, MapPin, CheckCircle2, ChevronRight, Menu, X, ArrowRight, Settings, Wrench, Video, Home as HomeIcon, Zap, Smartphone, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Ad soyad en az 2 karakter olmalıdır." }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz." }),
  district: z.string().min(1, { message: "Lütfen bir ilçe seçiniz." }),
  message: z.string().min(10, { message: "Mesajınız en az 10 karakter olmalıdır." })
});

const ISTANBUL_DISTRICTS = [
  "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", 
  "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", 
  "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", 
  "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", 
  "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", 
  "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
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

const Counter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
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
      message: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Keşif talebiniz başarıyla alındı!", {
      description: "Teknik ekibimiz en kısa sürede sizinle iletişime geçecektir.",
    });
    form.reset();
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Navbar */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border py-3 shadow-sm" : "bg-background border-transparent py-5"
      )}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}>
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">Diafon İstanbul</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('hizmetler')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Hizmetler</button>
            <button onClick={() => scrollTo('neden-biz')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Neden Biz</button>
            <button onClick={() => scrollTo('sss')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">SSS</button>
            <button onClick={() => scrollTo('iletisim')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">İletişim</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+905320615758" className="text-sm font-semibold flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              0532 061 57 58
            </a>
            <Button onClick={() => scrollTo('iletisim')} className="rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
              Ücretsiz Keşif
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-40 bg-background/95 backdrop-blur-sm md:hidden flex flex-col items-center justify-center gap-8 border-t border-border">
          <button onClick={() => scrollTo('hizmetler')} className="text-xl font-medium text-foreground hover:text-primary">Hizmetler</button>
          <button onClick={() => scrollTo('neden-biz')} className="text-xl font-medium text-foreground hover:text-primary">Neden Biz</button>
          <button onClick={() => scrollTo('sss')} className="text-xl font-medium text-foreground hover:text-primary">SSS</button>
          <button onClick={() => scrollTo('iletisim')} className="text-xl font-medium text-foreground hover:text-primary">İletişim</button>
          <div className="flex flex-col items-center gap-4 mt-8">
             <a href="tel:+905320615758" className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Phone className="h-5 w-5" />
              0532 061 57 58
            </a>
            <Button size="lg" onClick={() => scrollTo('iletisim')} className="rounded-full w-full max-w-[200px]">Ücretsiz Keşif</Button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10 translate-y-1/2 translate-x-1/3"></div>

          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  7/24 Kesintisiz Hizmet
                </div>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                  İstanbul Diafon Montaj <br className="hidden md:block" /> ve Servis <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Uzmanı</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                  Apartman, site, villa ve ofisler için profesyonel görüntülü ve sesli diafon sistemleri. Eski tesisatınızı yeniliyor, güvenliğinizi en üst düzeye çıkarıyoruz.
                </p>
              </FadeIn>

              <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button size="lg" onClick={() => scrollTo('iletisim')} className="rounded-full w-full sm:w-auto text-base h-14 px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                  Ücretsiz Keşif Talep Et
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full w-full sm:w-auto text-base h-14 px-8 bg-background/50 backdrop-blur border-border hover:bg-muted">
                  <a href="tel:+905320615758" className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    0532 061 57 58
                  </a>
                </Button>
              </FadeIn>

              <FadeIn delay={0.4} className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm md:text-base font-medium text-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>7/24 Servis</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base font-medium text-foreground">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>Garantili İşçilik</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base font-medium text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>İstanbul Geneli</span>
                </div>
              </FadeIn>
            </div>
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
                    <CardTitle className="text-xl">Kapı ziliniz çalışmıyor mu?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Kopan kablolar, arızalı paneller veya çalışmayan zil butonları güvenliğinizi riske atar.</p>
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
                    <CardTitle className="text-xl">Eski tesisat sorunları?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Yıllanmış, paslanmış veya yanlış çekilmiş kablolar sürekli arızalara neden olur.</p>
                    <div className="flex items-start gap-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Eski kabloları yeniliyor, sistemi modernize ediyoruz.</span>
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
                    <CardTitle className="text-xl">Görüntülüye mi geçmek istiyorsunuz?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Eski sesli diafonunuz kimin geldiğini görmenize imkan tanımaz.</p>
                    <div className="flex items-start gap-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Yüksek çözünürlüklü ekranlarla güvenliğinizi artırın.</span>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Profesyonel Çözümler</h2>
                <p className="text-muted-foreground text-lg">İhtiyacınıza uygun teknolojik altyapılar ve anahtar teslim kurulum hizmetleri.</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px]">
              {/* Flagship - takes 2 cols and 2 rows */}
              <FadeIn delay={0.1} className="md:col-span-2 md:row-span-2">
                <div className="relative h-full w-full rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-secondary"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20 opacity-80"></div>
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <div className="w-14 h-14 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-auto border border-primary/30 text-primary-foreground">
                      <Video className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Görüntülü Diafon Montajı</h3>
                    <p className="text-white/80 max-w-md">Apartman ve siteler için en son teknoloji yüksek çözünürlüklü, gece görüşlü ve şifreli geçiş özellikli sistemler.</p>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                    <Video className="w-96 h-96 text-white" />
                  </div>
                </div>
              </FadeIn>

              {/* Service 2 */}
              <FadeIn delay={0.2} className="md:col-span-1 md:row-span-1">
                <div className="bg-card border border-border h-full rounded-3xl p-6 flex flex-col group hover:border-primary/50 transition-colors shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sesli Diafon</h3>
                  <p className="text-sm text-muted-foreground mt-auto">Ekonomik ve pratik sesli iletişim sistemleri kurulumu.</p>
                </div>
              </FadeIn>

              {/* Service 3 */}
              <FadeIn delay={0.3} className="md:col-span-1 md:row-span-1">
                <div className="bg-card border border-border h-full rounded-3xl p-6 flex flex-col group hover:border-primary/50 transition-colors shadow-sm">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Arıza & Servis</h3>
                  <p className="text-sm text-muted-foreground mt-auto">7/24 acil müdahale, panel ve şube tamiri.</p>
                </div>
              </FadeIn>

              {/* Service 4 */}
              <FadeIn delay={0.4} className="md:col-span-2 md:row-span-1">
                <div className="bg-card border border-border h-full rounded-3xl p-6 flex items-center gap-6 group hover:border-primary/50 transition-colors shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 text-primary z-10">
                    <HomeIcon className="w-8 h-8" />
                  </div>
                  <div className="z-10">
                    <h3 className="text-xl font-bold mb-2">Akıllı Ev Entegrasyonu</h3>
                    <p className="text-sm text-muted-foreground">Diafon sisteminizi akıllı telefonunuzdan yönetin. Uzaktan kapı açma ve izleme özellikleri.</p>
                  </div>
                </div>
              </FadeIn>

               {/* Service 5 */}
               <FadeIn delay={0.5} className="md:col-span-1 md:row-span-1 lg:col-span-2">
                <div className="bg-card border border-border h-full rounded-3xl p-6 flex flex-col group hover:border-primary/50 transition-colors shadow-sm">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Tesisat & Kablo Yenileme</h3>
                  <p className="text-sm text-muted-foreground mt-auto">Eski ve sorunlu kablo altyapısının tespiti ve sıfırdan çekilmesi.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Why Us section */}
        <section id="neden-biz" className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-secondary-foreground/10">
              <FadeIn delay={0.1} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  <Counter to={500} />+
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-foreground/80">Başarılı Montaj</div>
              </FadeIn>
              
              <FadeIn delay={0.2} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  <Counter to={10} />+
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-foreground/80">Yıl Deneyim</div>
              </FadeIn>

              <FadeIn delay={0.3} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  <Counter to={39} />
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-foreground/80">İlçeye Hizmet</div>
              </FadeIn>

              <FadeIn delay={0.4} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  7/24
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-foreground/80">Teknik Destek</div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Lead Capture Form & FAQ Grid */}
        <section id="sss" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              
              {/* FAQ */}
              <div>
                <FadeIn>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Sıkça Sorulan Sorular</h2>
                  <p className="text-muted-foreground mb-8">Aklınıza takılan soruların cevaplarını burada bulabilirsiniz. Daha fazla bilgi için hemen arayın.</p>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">Eski diafon tesisatım görüntülü sistem için çalışır mı?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Çoğu durumda eski DT8 kablo altyapısı görüntülü sistemleri desteklemez. Yeni nesil sistemler için genellikle CAT6 veya 2 telli özel kablo çekilmesi gerekir. Keşif sırasında kablo durumunuzu kontrol ediyoruz.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">Apartmana montaj ne kadar sürer?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Daire sayısına ve tesisat durumuna bağlı olmakla birlikte, ortalama 10 daireli bir binanın montajı ve kablo çekimi 1 iş günü içerisinde tamamlanıp teslim edilmektedir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">Hangi markalarla çalışıyorsunuz?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Audio, Netelsan, Nade, Multitek gibi Türkiye'nin en çok tercih edilen ve yedek parçası bol, garantili yerli/yabancı markalarıyla çalışıyoruz.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">Görüntülü diafonun fiyatı nedir?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Fiyatlar daire sayısına, seçilen markaya, ekran boyutuna (4.3" veya 7" gibi) ve kablo yenilemesi gerekip gerekmediğine göre değişiklik gösterir. Kesin fiyat için ücretsiz keşif talep edebilirsiniz.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className="border-border">
                      <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">İstanbul'un her ilçesine hizmet veriyor musunuz?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Evet, İstanbul'un 39 ilçesinde Anadolu ve Avrupa yakası fark etmeksizin mobil servis araçlarımızla hizmet veriyoruz.
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
                    <CardTitle className="text-2xl font-bold">Ücretsiz Keşif Talep Edin</CardTitle>
                    <CardDescription className="text-base">
                      Formu doldurun, uzman ekibimiz sizi arayıp ücretsiz keşif randevusu oluştursun.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Ad Soyad / Yönetici</FormLabel>
                              <FormControl>
                                <Input placeholder="Örn: Ahmet Yılmaz" className="bg-background border-border focus-visible:ring-primary" {...field} />
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
                                <FormLabel className="text-foreground">Telefon Numarası</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="05XX XXX XX XX" className="bg-background border-border focus-visible:ring-primary" {...field} />
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
                                <FormLabel className="text-foreground">İlçe</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-background border-border focus-visible:ring-primary">
                                      <SelectValue placeholder="İlçe seçiniz" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-[300px]">
                                    {ISTANBUL_DISTRICTS.map((d) => (
                                      <SelectItem key={d} value={d}>{d}</SelectItem>
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
                              <FormLabel className="text-foreground">Talebiniz / Daire Sayısı</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Örn: 15 daireli apartmanımız için görüntülü diafon fiyatı almak istiyoruz." 
                                  className="min-h-[100px] resize-none bg-background border-border focus-visible:ring-primary" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" size="lg" className="w-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl h-14 group">
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
        <section className="py-20 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Müşterilerimiz Ne Diyor?</h2>
            </FadeIn>
            <div className="grid md:grid-cols-3 gap-8">
              <FadeIn delay={0.1}>
                <Card className="bg-background border-border shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex text-amber-500 mb-4">
                      {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /></svg>)}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"Eski bozuk zil sistemimizi 1 gün içinde yüksek çözünürlüklü kameralı sistemle değiştirdiler. Ekip çok profesyonel, temiz çalıştı ve çöpleri bile kendileri attı. Gönül rahatlığıyla tavsiye ederim."</p>
                    <div>
                      <p className="font-semibold text-foreground">Mehmet K.</p>
                      <p className="text-sm text-muted-foreground">Kardelen Apt. Yöneticisi, Kadıköy</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Card className="bg-background border-border shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex text-amber-500 mb-4">
                       {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /></svg>)}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"Sitemizin kapı paneli gece arızalandı, kilitli kaldık. Gece 02:00'de aramama rağmen geldiler ve arızayı giderdiler. 7/24 hizmetleri gerçekten çalışıyor. Teşekkürler Diafon İstanbul."</p>
                    <div>
                      <p className="font-semibold text-foreground">Ayşe S.</p>
                      <p className="text-sm text-muted-foreground">Güzeltepe Sitesi, Ataşehir</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.3}>
                <Card className="bg-background border-border shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex text-amber-500 mb-4">
                       {[...Array(5)].map((_, i) => <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /></svg>)}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"Fiyat araştırması yaparken denk geldik. Ücretsiz keşif için aynı gün geldiler. Ne gerekiyorsa abartmadan net bir dille anlattılar. Fiyat/performans olarak İstanbul'un en iyisi."</p>
                    <div>
                      <p className="font-semibold text-foreground">Burak D.</p>
                      <p className="text-sm text-muted-foreground">Deniz Apt., Beşiktaş</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
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
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight text-white">Diafon İstanbul</span>
              </div>
              <p className="text-secondary-foreground/70 mb-6 max-w-sm">
                İstanbul geneli 39 ilçede uzman kadromuzla görüntülü ve sesli diafon montajı, kablo yenileme ve 7/24 arıza servis hizmeti sunuyoruz.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">İletişim</h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+905320615758" className="flex items-center gap-3 text-secondary-foreground/80 hover:text-white transition-colors group">
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
                <li><button onClick={() => scrollTo('hizmetler')} className="text-secondary-foreground/80 hover:text-white transition-colors">Hizmetlerimiz</button></li>
                <li><button onClick={() => scrollTo('neden-biz')} className="text-secondary-foreground/80 hover:text-white transition-colors">Hakkımızda</button></li>
                <li><button onClick={() => scrollTo('sss')} className="text-secondary-foreground/80 hover:text-white transition-colors">Sıkça Sorulan Sorular</button></li>
                <li><button onClick={() => scrollTo('iletisim')} className="text-secondary-foreground/80 hover:text-white transition-colors">Keşif Talep Et</button></li>
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

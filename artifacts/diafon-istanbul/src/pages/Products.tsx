import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Video,
  Bell,
  Shield,
  Camera,
  Package,
  ChevronRight,
  Star,
  CheckCircle2,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { useSiteContent } from "@/hooks/useSiteContent";
import Navbar from "@/components/Navbar";
import QuoteModal from "@/components/QuoteModal";

const CATEGORIES = [
  {
    id: "goruntulu",
    label: "Görüntülü Diafonlar",
    icon: Video,
    description: "HD kameralı, renkli ekranlı kapı zili sistemleri",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    detailUrl: "/goruntulu-diafon",
  },
  {
    id: "goruntusuz",
    label: "Görüntüsüz Diafonlar",
    icon: Phone,
    description: "Ekonomik ve güvenilir sesli iletişim sistemleri",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    detailUrl: "/urunler",
  },
  {
    id: "telefonlar",
    label: "Telefonlar",
    icon: Phone,
    description: "Daire içi ahize ve handsfree cihazlar",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-200 dark:border-violet-800",
    detailUrl: "/urunler",
  },
  {
    id: "zil-panelleri",
    label: "Zil Panelleri",
    icon: Bell,
    description: "Giriş kapısı çağrı panelleri ve buton sistemleri",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    detailUrl: "/urunler",
  },
  {
    id: "giris-kontrol",
    label: "Giriş Kontrol Ürünler",
    icon: Shield,
    description: "Kart, şifre ve biyometrik giriş kontrol sistemleri",
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    detailUrl: "/urunler",
  },
  {
    id: "kamera",
    label: "Güvenlik Kamera Sistemleri",
    icon: Camera,
    description: "IP kamera, NVR ve DVR güvenlik çözümleri",
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    border: "border-cyan-200 dark:border-cyan-800",
    detailUrl: "/urunler",
  },
  {
    id: "paket",
    label: "Audio Diafon Paket Fiyatları",
    icon: Package,
    description: "Apartman ve site için hazır komple paketler",
    color: "text-primary",
    bg: "bg-primary/5 dark:bg-primary/10",
    border: "border-primary/20",
    detailUrl: "/urunler",
  },
];

const PRODUCTS: Record<string, {
  id: string;
  name: string;
  brand: string;
  image: string;
  tag?: string;
  tagColor?: string;
  features: string[];
  price?: string;
  rating: number;
}[]> = {
  goruntulu: [
    {
      id: "g1",
      name: "Görüntülü Diafon Seti 4.3\"",
      brand: "Audio",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop&q=80",
      tag: "Çok Satan",
      tagColor: "bg-primary text-white",
      features: ["4.3\" Renkli TFT Ekran", "Gece görüşlü kamera", "Hafıza fotoğraf", "Kapı kilit kontrolü"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "g2",
      name: "Görüntülü Diafon Seti 7\"",
      brand: "Netelsan",
      image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=220&fit=crop&q=80",
      tag: "Yeni",
      tagColor: "bg-emerald-500 text-white",
      features: ["7\" Dokunmatik Ekran", "HD kamera 1080p", "Çoklu daire desteği", "Akıllı ev entegrasyonu"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "g3",
      name: "IP Görüntülü Diafon",
      brand: "Nade",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=220&fit=crop&q=80",
      features: ["Wi-Fi bağlantı", "Mobil uygulama", "Uzaktan izleme", "SIP protokolü"],
      price: "Teklif Alın",
      rating: 4,
    },
    {
      id: "g4",
      name: "Villa Görüntülü Set",
      brand: "Multitek",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=220&fit=crop&q=80",
      features: ["2 dış panel", "2 iç monitor", "Anahtar kilit", "Şifre girişi"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "g5",
      name: "Çok Katlı Apartman Seti",
      brand: "Audio",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=220&fit=crop&q=80",
      tag: "Popüler",
      tagColor: "bg-amber-500 text-white",
      features: ["20+ daire kapasitesi", "Merkezi panel", "Güç kaynağı dahil", "Garanti 2 yıl"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "g6",
      name: "Kablosuz Görüntülü Set",
      brand: "Nade",
      image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=220&fit=crop&q=80",
      features: ["Wi-Fi çalışma", "Pil veya şebeke", "Kolay montaj", "Mobil bildirim"],
      price: "Teklif Alın",
      rating: 4,
    },
  ],
  goruntusuz: [
    {
      id: "s1",
      name: "Sesli Diafon Seti Tekli",
      brand: "Audio",
      image: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=400&h=220&fit=crop&q=80",
      tag: "En Ekonomik",
      tagColor: "bg-emerald-500 text-white",
      features: ["1 daire için", "Bas-konuş sistemi", "Basit montaj", "Uzun ömürlü"],
      price: "Teklif Alın",
      rating: 4,
    },
    {
      id: "s2",
      name: "Çok Aboneli Sesli Set",
      brand: "Netelsan",
      image: "https://images.unsplash.com/photo-1580587771525-4e5e26e0b7c4?w=400&h=220&fit=crop&q=80",
      features: ["10+ daire", "Merkezi panel", "Dahili hat", "Kapı açma rölesi"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "s3",
      name: "Handsfree Sesli Diafon",
      brand: "Multitek",
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=220&fit=crop&q=80",
      features: ["Ahizesiz konuşma", "Yüksek ses kalitesi", "Gürültü filtresi", "Duvar montajı"],
      price: "Teklif Alın",
      rating: 4,
    },
  ],
  telefonlar: [
    {
      id: "t1",
      name: "Ahizeli Daire Telefonu",
      brand: "Audio",
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=220&fit=crop&q=80",
      features: ["Standart ahize", "Tüm sistemlerle uyumlu", "Kapı açma butonu", "LED gösterge"],
      price: "Teklif Alın",
      rating: 4,
    },
    {
      id: "t2",
      name: "Handsfree Daire Cihazı",
      brand: "Nade",
      image: "https://images.unsplash.com/photo-1596003906949-67221c37965c?w=400&h=220&fit=crop&q=80",
      tag: "Yeni",
      tagColor: "bg-emerald-500 text-white",
      features: ["Ahizesiz", "Ses seviyesi ayarı", "Şık tasarım", "Beyaz/Siyah renk"],
      price: "Teklif Alın",
      rating: 5,
    },
  ],
  "zil-panelleri": [
    {
      id: "z1",
      name: "Tekli Çağrı Paneli",
      brand: "Audio",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop&q=80",
      features: ["1 buton", "Paslanmaz çelik", "IP54 korumalı", "Led aydınlatma"],
      price: "Teklif Alın",
      rating: 4,
    },
    {
      id: "z2",
      name: "Çok Aboneli Çağrı Paneli",
      brand: "Netelsan",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=220&fit=crop&q=80",
      tag: "Popüler",
      tagColor: "bg-amber-500 text-white",
      features: ["12/24 buton seçeneği", "İsim kartlıklı", "Yağmur korumalı", "Gece ışığı"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "z3",
      name: "Şifreli Giriş Paneli",
      brand: "Multitek",
      image: "https://images.unsplash.com/photo-1574114783-e81f6c1c77e5?w=400&h=220&fit=crop&q=80",
      features: ["PIN kodu girişi", "100 kullanıcı", "Saldırı alarmı", "Paslanmaz"],
      price: "Teklif Alın",
      rating: 5,
    },
  ],
  "giris-kontrol": [
    {
      id: "gc1",
      name: "Kartlı Geçiş Sistemi",
      brand: "Multitek",
      image: "https://images.unsplash.com/photo-1609771700714-7c9a2ec9c49a?w=400&h=220&fit=crop&q=80",
      tag: "Çok Satan",
      tagColor: "bg-primary text-white",
      features: ["Mifare kart okuyucu", "500 kart kapasitesi", "Zaman kısıtlama", "Raporlama"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "gc2",
      name: "Biyometrik Parmak İzi",
      brand: "Nade",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=220&fit=crop&q=80",
      features: ["500 parmak izi", "Hızlı okuma 0.5s", "Yedek PIN kodu", "Anti-spoofing"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "gc3",
      name: "Elektromanyetik Kilit",
      brand: "Audio",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=220&fit=crop&q=80",
      features: ["600 kg tutma gücü", "12V DC", "Yatay/Dikey montaj", "LED gösterge"],
      price: "Teklif Alın",
      rating: 4,
    },
  ],
  kamera: [
    {
      id: "k1",
      name: "IP Dome Kamera 2MP",
      brand: "Netelsan",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=220&fit=crop&q=80",
      features: ["1080p Full HD", "Gece görüşü 30m", "IP66 su geçirmez", "H.265 sıkıştırma"],
      price: "Teklif Alın",
      rating: 4,
    },
    {
      id: "k2",
      name: "4 Kameralı NVR Set",
      brand: "Nade",
      image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=400&h=220&fit=crop&q=80",
      tag: "Hazır Paket",
      tagColor: "bg-cyan-500 text-white",
      features: ["4 IP kamera dahil", "4 kanal NVR", "2TB HDD", "Uzak izleme"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "k3",
      name: "PTZ Speed Dome Kamera",
      brand: "Multitek",
      image: "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?w=400&h=220&fit=crop&q=80",
      features: ["360° döner", "30x optik zoom", "Otomatik takip", "IR 100m"],
      price: "Teklif Alın",
      rating: 5,
    },
  ],
  paket: [
    {
      id: "p1",
      name: "Küçük Apartman Paketi",
      brand: "Diafon İstanbul",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=220&fit=crop&q=80",
      tag: "6-10 Daire",
      tagColor: "bg-primary text-white",
      features: ["Sesli diafon sistemi", "Kablo dahil", "Montaj dahil", "1 yıl garanti"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "p2",
      name: "Orta Ölçek Apartman Paketi",
      brand: "Diafon İstanbul",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=220&fit=crop&q=80",
      tag: "10-20 Daire",
      tagColor: "bg-primary text-white",
      features: ["Görüntülü diafon", "Kablo yenileme", "Montaj dahil", "2 yıl garanti"],
      price: "Teklif Alın",
      rating: 5,
    },
    {
      id: "p3",
      name: "Site & Büyük Bina Paketi",
      brand: "Diafon İstanbul",
      image: "https://images.unsplash.com/photo-1580587771525-4e5e26e0b7c4?w=400&h=220&fit=crop&q=80",
      tag: "20+ Daire",
      tagColor: "bg-primary text-white",
      features: ["IP diafon sistemi", "Tam kablo altyapısı", "Akıllı ev entegrasyonu", "3 yıl garanti"],
      price: "Teklif Alın",
      rating: 5,
    },
  ],
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
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Products() {
  const { content } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("goruntulu");
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");

  const openQuote = (productName: string) => {
    setQuoteProduct(productName);
    setQuoteOpen(true);
  };

  const currentCat = CATEGORIES.find((c) => c.id === activeCategory)!;
  const products = PRODUCTS[activeCategory] ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} productName={quoteProduct} />

      <main className="flex-1">
        {/* Hero banner */}
        <section className="pt-[calc(53px+2.5rem)] pb-10 md:pb-14 bg-muted/40 border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Ana Sayfaya Dön
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Diafon Ürün Kataloğu
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Türkiye'nin önde gelen marklarının görüntülü diafon, sesli diafon, kamera ve güvenlik ürünlerini İstanbul'da montajı ile sunuyoruz.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar: Category list */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-[73px]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">
                  Kategoriler
                </p>
                <nav className="flex flex-col gap-1">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        data-testid={`cat-${cat.id}`}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                          activeCategory === cat.id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-5 h-5 shrink-0",
                            activeCategory === cat.id ? "text-primary-foreground" : cat.color
                          )}
                        />
                        <span className="text-sm font-medium leading-tight">{cat.label}</span>
                        {activeCategory === cat.id && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* CTA */}
                <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-1">Fiyat almak ister misiniz?</p>
                  <p className="text-xs text-muted-foreground mb-3">Uzmanlarımız sizi arasın, ücretsiz keşif yapalım.</p>
                  <Button asChild size="sm" className="w-full rounded-lg">
                    <a href={`tel:+${content.whatsapp_number}`}>
                      <Phone className="w-3.5 h-3.5 mr-2" />
                      Hemen Ara
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main: Product grid */}
            <div className="flex-1 min-w-0">
              {/* Category header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={cn("flex items-center gap-3 p-4 rounded-2xl border mb-8", currentCat.bg, currentCat.border)}>
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", currentCat.bg)}>
                      <currentCat.icon className={cn("w-5 h-5", currentCat.color)} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{currentCat.label}</h2>
                      <p className="text-sm text-muted-foreground">{currentCat.description}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                      {products.length} ürün
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {products.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        data-testid={`product-${product.id}`}
                        className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-lg transition-all duration-200"
                      >
                        {/* Product image */}
                        <div className="relative h-44 overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          {product.tag && (
                            <span className={cn("absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow", product.tagColor)}>
                              {product.tag}
                            </span>
                          )}
                          <div className={cn("absolute bottom-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center", currentCat.bg)}>
                            <currentCat.icon className={cn("w-4 h-4", currentCat.color)} />
                          </div>
                        </div>

                        {/* Card content */}
                        <div className="p-5 flex flex-col flex-1">
                          {/* Info */}
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                            {product.brand}
                          </p>
                          <h3 className="font-bold text-foreground text-base mb-3 leading-snug">
                            {product.name}
                          </h3>

                          {/* Stars */}
                          <div className="flex gap-0.5 mb-4">
                            {[...Array(5)].map((_, idx) => (
                              <Star
                                key={idx}
                                className={cn(
                                  "w-3.5 h-3.5",
                                  idx < product.rating ? "fill-amber-400 text-amber-400" : "text-border"
                                )}
                              />
                            ))}
                          </div>

                          {/* Features */}
                          <ul className="flex flex-col gap-1.5 mb-5">
                            {product.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>

                          {/* CTA */}
                          <div className="mt-auto flex flex-col gap-2">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="flex-1 rounded-lg group-hover:shadow-sm group-hover:shadow-primary/20"
                                onClick={() => openQuote(product.name)}
                              >
                                Fiyat Al
                              </Button>
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="rounded-lg border-border"
                              >
                              <a
                                href={`https://wa.me/${content.whatsapp_number}?text=${encodeURIComponent(`Merhaba, "${product.name}" ürünü hakkında bilgi almak istiyorum.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                              </a>
                              </Button>
                            </div>
                            <Link
                              href={currentCat.detailUrl}
                              className="flex items-center justify-center gap-1 text-xs text-primary hover:underline font-medium py-0.5 transition-colors"
                            >
                              Detaylı İncele <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-10 border-t border-secondary-foreground/10 mt-16">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-white">Diafon İstanbul</span>
          </div>
          <p className="text-secondary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Diafon İstanbul — İstanbul'un Güvenliği Bize Emanet.
          </p>
          <a href={`tel:+${content.whatsapp_number}`} className="text-secondary-foreground/80 hover:text-white font-semibold transition-colors flex items-center gap-2">
            <Phone className="w-4 h-4" /> {content.phone_display}
          </a>
        </div>
      </footer>
    </div>
  );
}

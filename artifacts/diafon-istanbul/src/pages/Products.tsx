import { useState, useEffect } from "react";
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
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { useSiteContent } from "@/hooks/useSiteContent";
import Navbar from "@/components/Navbar";
import QuoteModal from "@/components/QuoteModal";

interface ApiProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  brand: string;
  short_desc: string;
  images: string;
  features: string;
  tag: string | null;
  tag_color: string | null;
  rating: number;
}

function parseJson<T>(s: string, fallback: T): T {
  try { return JSON.parse(s) as T; } catch { return fallback; }
}

const CATEGORIES = [
  { id: "goruntulu", label: "Görüntülü Diafonlar", icon: Video, description: "HD kameralı, renkli ekranlı kapı zili sistemleri", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800" },
  { id: "goruntusuz", label: "Görüntüsüz Diafonlar", icon: Phone, description: "Ekonomik ve güvenilir sesli iletişim sistemleri", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800" },
  { id: "telefonlar", label: "Telefonlar", icon: Phone, description: "Daire içi ahize ve handsfree cihazlar", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-200 dark:border-violet-800" },
  { id: "zil-panelleri", label: "Zil Panelleri", icon: Bell, description: "Giriş kapısı çağrı panelleri ve buton sistemleri", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800" },
  { id: "giris-kontrol", label: "Giriş Kontrol Ürünler", icon: Shield, description: "Kart, şifre ve biyometrik giriş kontrol sistemleri", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800" },
  { id: "kamera", label: "Güvenlik Kamera Sistemleri", icon: Camera, description: "IP kamera, NVR ve DVR güvenlik çözümleri", color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-950/30", border: "border-cyan-200 dark:border-cyan-800" },
  { id: "paket", label: "Audio Diafon Paket Fiyatları", icon: Package, description: "Apartman ve site için hazır komple paketler", color: "text-primary", bg: "bg-primary/5 dark:bg-primary/10", border: "border-primary/20" },
];

const ProductSkeleton = () => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden">
    <div className="h-44 bg-muted animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-16 bg-muted rounded animate-pulse" />
      <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
      <div className="h-3 w-full bg-muted rounded animate-pulse" />
      <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
      <div className="h-9 w-full bg-muted rounded-lg animate-pulse mt-4" />
    </div>
  </div>
);

export default function Products() {
  const { content } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("goruntulu");
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?category=${activeCategory}`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const openQuote = (productName: string) => {
    setQuoteProduct(productName);
    setQuoteOpen(true);
  };

  const currentCat = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} productName={quoteProduct} />

      <main className="flex-1">
        <section className="pt-[calc(53px+2.5rem)] pb-10 md:pb-14 bg-muted/40 border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Diafon Ürün Kataloğu</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Türkiye'nin önde gelen markalarının görüntülü diafon, sesli diafon, kamera ve güvenlik ürünlerini İstanbul'da montajı ile sunuyoruz.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-[73px]">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">Kategoriler</p>
                <nav className="flex flex-col gap-1">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                          activeCategory === cat.id ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 shrink-0", activeCategory === cat.id ? "text-primary-foreground" : cat.color)} />
                        <span className="text-sm font-medium leading-tight">{cat.label}</span>
                        {activeCategory === cat.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <p className="text-sm font-semibold text-foreground mb-1">Fiyat almak ister misiniz?</p>
                  <p className="text-xs text-muted-foreground mb-3">Uzmanlarımız sizi arasın, ücretsiz keşif yapalım.</p>
                  <Button asChild size="sm" className="w-full rounded-lg">
                    <a href={`tel:+${content.whatsapp_number}`}>
                      <Phone className="w-3.5 h-3.5 mr-2" /> Hemen Ara
                    </a>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
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
                      {loading ? "…" : `${products.length} ürün`}
                    </Badge>
                  </div>

                  {loading ? (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {[1, 2, 3].map((i) => <ProductSkeleton key={i} />)}
                    </div>
                  ) : products.length === 0 ? (
                    <div className="py-16 text-center text-muted-foreground">
                      <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p>Bu kategoride henüz ürün yok.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {products.map((product, i) => {
                        const images = parseJson<string[]>(product.images, []);
                        const features = parseJson<string[]>(product.features, []);
                        const image = images[0] ?? "";
                        return (
                          <motion.div
                            key={product.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.06 }}
                            className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-lg transition-all duration-200"
                          >
                            <div className="relative h-44 overflow-hidden bg-muted">
                              {image && (
                                <img
                                  src={image}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                              {product.tag && (
                                <span className={cn("absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow", product.tag_color ?? "bg-primary text-white")}>
                                  {product.tag}
                                </span>
                              )}
                              <div className={cn("absolute bottom-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center", currentCat.bg)}>
                                <currentCat.icon className={cn("w-4 h-4", currentCat.color)} />
                              </div>
                            </div>

                            <div className="p-5 flex flex-col flex-1">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</p>
                              <h3 className="font-bold text-foreground text-base mb-3 leading-snug">{product.name}</h3>

                              <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, idx) => (
                                  <Star key={idx} className={cn("w-3.5 h-3.5", idx < product.rating ? "fill-amber-400 text-amber-400" : "text-border")} />
                                ))}
                              </div>

                              <ul className="flex flex-col gap-1.5 mb-5">
                                {features.slice(0, 4).map((f) => (
                                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" /> {f}
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-auto flex flex-col gap-2">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="flex-1 rounded-lg"
                                    onClick={() => openQuote(product.name)}
                                  >
                                    Fiyat Al
                                  </Button>
                                  <Button asChild size="sm" variant="outline" className="rounded-lg border-border">
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
                                  href={`/urunler/${product.slug}`}
                                  className="flex items-center justify-center gap-1 text-xs text-primary hover:underline font-medium py-0.5 transition-colors"
                                >
                                  Detaylı İncele <ChevronRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

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

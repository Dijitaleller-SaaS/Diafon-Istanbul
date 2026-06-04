import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  Star,
  CheckCircle2,
  ChevronRight,
  Tag,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import QuoteModal from "@/components/QuoteModal";
import { useSiteContent } from "@/hooks/useSiteContent";

interface ApiProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  brand: string;
  short_desc: string;
  long_desc: string;
  images: string;
  features: string;
  tag: string | null;
  tag_color: string | null;
  rating: number;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  goruntulu: "Görüntülü Diafonlar",
  goruntusuz: "Görüntüsüz Diafonlar",
  telefonlar: "Telefonlar",
  "zil-panelleri": "Zil Panelleri",
  "giris-kontrol": "Giriş Kontrol Ürünler",
  kamera: "Güvenlik Kamera Sistemleri",
  paket: "Audio Diafon Paket Fiyatları",
};

function parseJson<T>(s: string, fallback: T): T {
  try { return JSON.parse(s) as T; }
  catch { return fallback; }
}

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setOgMeta(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

const DEFAULT_TITLE = "İstanbul Diafon Montaj & Servis | 7/24 Görüntülü Diafon";
const DEFAULT_DESC = "İstanbul tüm ilçelerde görüntülü ve sesli diafon montajı, arıza ve servis. 7/24 hizmet, ücretsiz keşif. 0532 061 57 58";

export default function UrunDetay() {
  const { slug } = useParams<{ slug: string }>();
  const { content } = useSiteContent();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    fetch(`/api/products/${slug}`)
      .then(async (res) => {
        if (res.status === 404) { setNotFound(true); return; }
        const data = await res.json();
        setProduct(data);
        setActiveImage(0);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;
    const title = `${product.name} | ${categoryLabel} — Diafon İstanbul`;
    const desc = product.short_desc
      ? `${product.short_desc} İstanbul'da profesyonel montaj ve servis hizmeti.`
      : `${product.name} — İstanbul'da profesyonel diafon montaj ve servis hizmeti. Ücretsiz keşif.`;

    document.title = title;
    setMeta("description", desc);
    setOgMeta("og:title", title);
    setOgMeta("og:description", desc);
    setOgMeta("og:type", "product");

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta("description", DEFAULT_DESC);
      setOgMeta("og:title", DEFAULT_TITLE);
      setOgMeta("og:description", DEFAULT_DESC);
      setOgMeta("og:type", "website");
    };
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const images = parseJson<string[]>(product.images, []);
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.short_desc || product.name,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      ...(images[0] ? { image: images } : {}),
      ...(product.rating
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              bestRating: 5,
              worstRating: 1,
              reviewCount: 1,
            },
          }
        : {}),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "product-schema-ld-json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById("product-schema-ld-json");
      if (el) el.remove();
    };
  }, [product]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground text-sm animate-pulse">Yükleniyor…</div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <Package className="w-12 h-12 text-muted-foreground/30" />
          <h1 className="text-2xl font-bold text-foreground">Ürün Bulunamadı</h1>
          <p className="text-muted-foreground">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <Button asChild variant="outline">
            <Link href="/urunler"><ArrowLeft className="w-4 h-4 mr-2" />Ürün Kataloğuna Dön</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = parseJson<string[]>(product.images, []);
  const features = parseJson<string[]>(product.features, []);
  const mainImage = images[activeImage] ?? images[0] ?? "";
  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} productName={product.name} />

      <main className="flex-1 pt-[calc(53px+2rem)]">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 md:px-6 mb-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/urunler" className="hover:text-primary transition-colors">Ürünler</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/urunler?cat=${product.category}`} className="hover:text-primary transition-colors">{categoryLabel}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 md:px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: Image gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3 lg:sticky lg:top-[80px]"
            >
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/3]">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Package className="w-16 h-16 opacity-20" />
                  </div>
                )}
                {product.tag && (
                  <span className={cn("absolute top-4 right-4 text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg", product.tag_color ?? "bg-primary text-white")}>
                    {product.tag}
                  </span>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "relative flex-1 aspect-square rounded-xl overflow-hidden transition-all duration-200 border-2",
                        i === activeImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-90"
                      )}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">{categoryLabel}</Badge>
                  {product.tag && (
                    <span className={cn("text-xs font-bold uppercase px-2.5 py-0.5 rounded-full", product.tag_color ?? "bg-primary text-white")}>
                      {product.tag}
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {product.brand}
                </p>

                <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>

                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn("w-4 h-4", i < product.rating ? "fill-amber-400 text-amber-400" : "text-border")}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1.5 self-center">{product.rating}/5</span>
                </div>

                {product.short_desc && (
                  <p className="text-base text-muted-foreground leading-relaxed">{product.short_desc}</p>
                )}
              </div>

              {features.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Özellikler</h3>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 rounded-xl h-12 gap-2 shadow-md shadow-primary/20"
                    onClick={() => setQuoteOpen(true)}
                  >
                    <Tag className="w-4 h-4" />
                    Fiyat Teklifi Al
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-xl h-12 px-4"
                  >
                    <a
                      href={`https://wa.me/${content.whatsapp_number}?text=${encodeURIComponent(`Merhaba, "${product.name}" ürünü hakkında bilgi almak istiyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </a>
                  </Button>
                </div>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl h-12 gap-2"
                >
                  <a href={`tel:+${content.whatsapp_number}`}>
                    <Phone className="w-4 h-4" />
                    {content.phone_display} — Hemen Ara
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground">Ücretsiz keşif ve teknik danışmanlık · Montaj garantili</p>
              </div>
            </motion.div>
          </div>

          {/* Long description */}
          {product.long_desc && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 max-w-3xl"
            >
              <div className="border-t border-border pt-10">
                <h2 className="text-xl font-bold text-foreground mb-6">Ürün Detayları</h2>
                <div
                  className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground [&_h2]:text-foreground [&_h2]:text-lg [&_h2]:font-bold [&_h3]:text-foreground [&_h3]:font-semibold [&_ul]:space-y-1 [&_li]:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.long_desc }}
                />
              </div>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <div className="mt-14 bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl">
            <div>
              <h3 className="text-lg font-bold text-foreground">Kurulum için ücretsiz keşif alın</h3>
              <p className="text-muted-foreground text-sm mt-1">Uzman ekibimiz yerinde inceleme yaparak en uygun çözümü önerir.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button size="lg" className="rounded-xl gap-2" onClick={() => setQuoteOpen(true)}>
                <Tag className="w-4 h-4" /> Teklif Al
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl gap-2">
                <Link href="/urunler"><ArrowLeft className="w-4 h-4" /> Kataloğa Dön</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-secondary text-secondary-foreground py-8 border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm">D</div>
            <span className="font-bold text-white">Diafon İstanbul</span>
          </div>
          <a href={`tel:+${content.whatsapp_number}`} className="text-secondary-foreground/80 hover:text-white font-semibold transition-colors flex items-center gap-2">
            <Phone className="w-4 h-4" /> {content.phone_display}
          </a>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readMinutes: number;
  published: boolean;
  coverImage?: string;
}

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Görüntülü Diafon Sistemi Nasıl Çalışır?",
    slug: "goruntulu-diafon-sistemi-nasil-calisir",
    excerpt: "Apartman ve villa güvenliğinin temel taşı olan görüntülü diafon sistemlerinin teknik yapısı, bileşenleri ve çalışma prensibi hakkında bilmeniz gerekenler.",
    content: `<h2>Görüntülü Diafon Sistemi Nedir?</h2>
<p>Görüntülü diafon sistemi, bir binanın giriş kapısında bulunan dış panel ile daire içindeki iç monitör arasında sesli ve görüntülü iletişim sağlayan güvenlik sistemidir.</p>

<h2>Temel Bileşenler</h2>
<ul>
  <li><strong>Dış Panel:</strong> Binanın giriş kapısına monte edilen, kamera, hoparlör ve zil butonlarını içeren birim</li>
  <li><strong>İç Monitör:</strong> Daire içinde kullanılan, ekran ve ahize/handsfree özellikli iletişim cihazı</li>
  <li><strong>Güç Kaynağı:</strong> Tüm sistemi besleyen elektronik güç birimi</li>
  <li><strong>Kablo Altyapısı:</strong> Panel ve monitörleri birbirine bağlayan tel tesisatı</li>
</ul>

<h2>Çalışma Prensibi</h2>
<p>Ziyaretçi dış paneldeki daire numarasına bastığında, ilgili dairenin iç monitörü çalar. Ev sahibi monitörden ziyaretçiyi görüntüleyebilir, ses alışverişi yapabilir ve kapıyı uzaktan açabilir.</p>

<h2>Montaj Süreci</h2>
<p>Profesyonel montaj ekibimiz, binanızın yapısına göre en uygun kablo güzergahını belirler ve uzman elleriyle sistemi kurar. Montaj sonrası test ve kullanım eğitimi de hizmetimize dahildir.</p>`,
    category: "Teknik Bilgi",
    author: "Diafon İstanbul Ekibi",
    date: "2025-05-15",
    readMinutes: 5,
    published: true,
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Apartman Diafon Sisteminde Sık Karşılaşılan Arızalar",
    slug: "apartman-diafon-arizalari",
    excerpt: "Ses gelmiyor, görüntü yok, kapı açılmıyor — diafon sistemlerinde en sık rastlanan arızalar ve çözüm yolları hakkında kapsamlı rehber.",
    content: `<h2>En Sık Görülen Arızalar</h2>
<p>Diafon sistemleri uzun yıllar sorunsuz çalışabilir, ancak zamanla bazı teknik sorunlar ortaya çıkabilir.</p>

<h2>Ses Gelmeme Sorunu</h2>
<p>Bu durum genellikle ahize/hoparlör bağlantısının kopması, kablo hasarı veya güç kaynağı arızasından kaynaklanır. Bağlantı noktaları kontrol edilmeli, gerekirse kablo değişimi yapılmalıdır.</p>

<h2>Görüntü Sorunu</h2>
<p>Kamera kirlenmesi, lens hasarı veya video kablolarındaki kopukluk görüntü problemine yol açar. Kamera temizliği basit bir çözüm olabilirken, lens veya kablo değişimi profesyonel müdahale gerektirir.</p>

<h2>Kapı Açılmama Sorunu</h2>
<p>Elektrikli kilit rölesinin arızalanması veya kilit mekanizmasının bozulması bu sorunun başlıca sebebidir. Röle değişimi veya kilit ayarı gerekebilir.</p>

<h2>Ne Zaman Profesyonel Yardım Almalısınız?</h2>
<p>Kendi başınıza çözemediğiniz arızalarda, sistemi söküp takmadan önce mutlaka uzman bir teknisyen çağırın. Yanlış müdahale sistemin tamamını kullanılamaz hale getirebilir.</p>`,
    category: "Bakım & Onarım",
    author: "Diafon İstanbul Ekibi",
    date: "2025-06-01",
    readMinutes: 4,
    published: true,
    coverImage: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&h=400&fit=crop&q=80",
  },
  {
    id: "3",
    title: "İstanbul'da Diafon Montajı: Sık Sorulan Sorular",
    slug: "istanbul-diafon-montaji-sss",
    excerpt: "Montaj süreci ne kadar sürer? Eski sistemi yenilemek ne kadar tutar? Garanti kapsamı nedir? İstanbul'daki müşterilerimizin en çok sorduğu soruları yanıtlıyoruz.",
    content: `<h2>Montaj Süreci Ne Kadar Sürer?</h2>
<p>Standart bir apartman için diafon montajı, daire sayısına ve mevcut altyapıya bağlı olarak 1-3 iş günü arasında tamamlanır. Kablo altyapısı mevcut olan binalarda bu süre daha kısa olabilir.</p>

<h2>Eski Sistemi Yenilemek Ne Kadar Tutar?</h2>
<p>Fiyatlandırma, binanın daire sayısı, seçilen marka ve model ile mevcut altyapı durumuna göre değişir. Ücretsiz keşif hizmetimizle binanızı inceleyip size özel teklif sunuyoruz.</p>

<h2>Hangi Bölgelere Hizmet Veriyorsunuz?</h2>
<p>İstanbul'un tüm ilçelerinde aktif servis ağımızla hizmet veriyoruz. Anadolu ve Avrupa yakasındaki tüm ilçeleri kapsamaktadır.</p>

<h2>Garanti Kapsamı Nedir?</h2>
<p>Montajını yaptığımız tüm sistemlere 2 yıl işçilik garantisi ve ürüne göre 1-3 yıl cihaz garantisi sunuyoruz.</p>

<h2>Acil Servis Var Mı?</h2>
<p>Evet, 7/24 acil teknik servis hizmetimiz mevcuttur. Sisteminizdeki kritik arızalar için 0532 061 57 58 numaralı hattı arayabilirsiniz.</p>`,
    category: "Bilgi",
    author: "Diafon İstanbul Ekibi",
    date: "2025-06-10",
    readMinutes: 3,
    published: true,
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop&q=80",
  },
];

const STORAGE_KEY = "diafon_blog_posts";

export function getBlogPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_POSTS;
}

export function saveBlogPosts(posts: BlogPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
          {post.coverImage && (
            <div className="h-48 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {post.category}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readMinutes} dk okuma
              </span>
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
              <span className="text-xs font-medium text-primary group-hover:underline">
                Devamını Oku →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function PostDetail({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const posts = getBlogPosts();
    const found = posts.find((p) => p.slug === slug && p.published);
    setPost(found ?? null);
  }, [slug]);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 pt-[53px] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Yazı bulunamadı</h1>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Bloga Dön
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 pt-[53px]">
        {post.coverImage && (
          <div className="w-full h-64 md:h-80 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="container mx-auto px-4 md:px-6 py-10 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Bloga Dön
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary">
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readMinutes} dk okuma
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>

          <article
            className="prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground mb-4">Bu yazı faydalı oldu mu? Daha fazla bilgi için bizi arayın:</p>
            <Button asChild>
              <a href="tel:+905320615758">0532 061 57 58</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Blog() {
  const [, params] = useRoute("/blog/:slug");

  if (params?.slug) {
    return <PostDetail slug={params.slug} />;
  }

  return <BlogList />;
}

function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  useEffect(() => {
    setPosts(getBlogPosts().filter((p) => p.published));
  }, []);

  const categories = ["Tümü", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filtered = posts.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "Tümü" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 pt-[53px]">
        <section className="py-12 md:py-16 bg-muted/40 border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Blog</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
              Diafon sistemleri, güvenlik teknolojileri ve montaj hizmetleri hakkında faydalı yazılar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Yazı ara..."
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              Aramanızla eşleşen yazı bulunamadı.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Diafon İstanbul. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

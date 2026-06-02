import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, LogOut, ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getBlogPosts, saveBlogPosts, type BlogPost } from "./Blog";

const ADMIN_PASSWORD = "diafon2024";
const AUTH_KEY = "diafon_blog_auth";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/\s+/g, "-");
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "1");
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="bg-primary text-primary-foreground w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl mx-auto mb-4">
            D
          </div>
          <h1 className="text-2xl font-bold text-foreground">Blog Yönetimi</h1>
          <p className="text-muted-foreground text-sm mt-1">Giriş yapın</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={error ? "border-destructive" : ""}
            autoFocus
          />
          {error && <p className="text-destructive text-sm">Hatalı şifre.</p>}
          <Button type="submit" className="w-full">Giriş Yap</Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Varsayılan şifre: <code className="bg-muted px-1 rounded">diafon2024</code>
        </p>
        <div className="text-center mt-4">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Bloga Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

const EMPTY_POST: Omit<BlogPost, "id"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "Diafon İstanbul Ekibi",
  date: new Date().toISOString().split("T")[0],
  readMinutes: 3,
  published: false,
  coverImage: "",
};

function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post: Partial<BlogPost> & { id?: string };
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<BlogPost, "id">>({
    ...EMPTY_POST,
    ...(post.id ? post : {}),
  });

  const set = (field: keyof typeof form, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Başlık ve içerik zorunludur.");
      return;
    }
    onSave({
      ...form,
      id: post.id ?? String(Date.now()),
      slug: form.slug || generateSlug(form.title),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="container mx-auto px-4 md:px-6 py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            {post.id ? "Yazıyı Düzenle" : "Yeni Yazı"}
          </h2>
          <button onClick={onCancel} className="p-2 rounded-md hover:bg-muted text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Başlık *</label>
            <Input
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Yazı başlığı"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">URL (slug)</label>
            <Input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="url-dostu-baslik"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Kategori</label>
              <Input
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Örn: Teknik Bilgi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Tarih</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Yazar</label>
              <Input
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Okuma Süresi (dk)</label>
              <Input
                type="number"
                min="1"
                value={form.readMinutes}
                onChange={(e) => set("readMinutes", Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Kapak Görseli URL</label>
            <Input
              value={form.coverImage ?? ""}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Özet</label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Yazının kısa özeti (liste sayfasında gösterilir)"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">İçerik (HTML desteklenir) *</label>
            <Textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="<h2>Başlık</h2><p>İçerik...</p>"
              rows={14}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <label htmlFor="published" className="text-sm font-medium text-foreground">
              Yayınla (kapalıysa taslak olarak kaydedilir)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Kaydet
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              İptal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BlogAdmin() {
  const [authed, setAuthed] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null | "new">(null);

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) setPosts(getBlogPosts());
  }, [authed]);

  const handleSave = (post: BlogPost) => {
    const updated = posts.some((p) => p.id === post.id)
      ? posts.map((p) => (p.id === post.id ? post : p))
      : [...posts, post];
    saveBlogPosts(updated);
    setPosts(updated);
    setEditing(null);
    toast.success("Yazı kaydedildi.");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    const updated = posts.filter((p) => p.id !== id);
    saveBlogPosts(updated);
    setPosts(updated);
    toast.success("Yazı silindi.");
  };

  const handleTogglePublish = (id: string) => {
    const updated = posts.map((p) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    saveBlogPosts(updated);
    setPosts(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-background">
      {editing && (
        <PostEditor
          post={editing === "new" ? {} : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border py-3">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm">D</div>
              <span className="font-semibold text-foreground">Blog Yönetimi</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setEditing("new")}
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Yeni Yazı
            </Button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-4">
          <p className="text-muted-foreground text-sm">Toplam {posts.length} yazı · {posts.filter(p => p.published).length} yayında</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="mb-4">Henüz yazı yok.</p>
            <Button onClick={() => setEditing("new")}>
              <PlusCircle className="w-4 h-4 mr-2" />
              İlk Yazıyı Ekle
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-sm transition-shadow"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground truncate">{post.title}</span>
                    {post.published ? (
                      <Badge className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-200">Yayında</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">Taslak</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {post.category} · {post.date}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleTogglePublish(post.id)}
                    className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title={post.published ? "Yayından Kaldır" : "Yayınla"}
                  >
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setEditing(post)}
                    className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    title="Düzenle"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <button
                      className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Görüntüle"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, LogOut, ArrowLeft, Save, X, Layout, FileText, Settings, MessageSquare, Phone, Mail, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getBlogPosts, saveBlogPosts, type BlogPost } from "./Blog";
import { useSiteContent, saveSiteContent, type SiteContent, type SiteStat } from "@/hooks/useSiteContent";

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

function HomepageEditor() {
  const { content, loading, refresh } = useSiteContent();
  const [form, setForm] = useState<SiteContent>(content);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) setForm(content);
  }, [loading]);

  const save = async (key: keyof SiteContent, value: unknown) => {
    setSaving(key);
    const result = await saveSiteContent(key, value, ADMIN_PASSWORD);
    setSaving(null);
    if (result.ok) {
      toast.success("Kaydedildi.");
      await refresh();
    } else {
      toast.error(result.error ?? "Kayıt hatası.");
    }
  };

  const setField = (key: keyof SiteContent, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setStat = (i: number, field: "val" | "label", value: string) =>
    setForm((prev) => {
      const stats = prev.stats.map((s, idx) => idx === i ? { ...s, [field]: value } : s);
      return { ...prev, stats };
    });

  if (loading) {
    return <div className="py-16 text-center text-muted-foreground text-sm">Yükleniyor…</div>;
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Hero Başlık */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Layout className="w-4 h-4 text-primary" /> Hero Başlık
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Ana Metin</label>
            <Input value={form.hero_title_main} onChange={(e) => setField("hero_title_main", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Renkli Kısım</label>
            <Input value={form.hero_title_accent} onChange={(e) => setField("hero_title_accent", e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Son Kısım</label>
            <Input value={form.hero_title_suffix} onChange={(e) => setField("hero_title_suffix", e.target.value)} />
          </div>
        </div>
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
          Önizleme: <strong>{form.hero_title_main}</strong> <span className="text-primary">{form.hero_title_accent}</span> {form.hero_title_suffix}
        </div>
        <Button
          size="sm"
          disabled={saving === "hero_title_main"}
          onClick={() => {
            save("hero_title_main", form.hero_title_main);
            save("hero_title_accent", form.hero_title_accent);
            save("hero_title_suffix", form.hero_title_suffix);
          }}
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {saving === "hero_title_main" ? "Kaydediliyor…" : "Başlığı Kaydet"}
        </Button>
      </div>

      {/* Hero Alt Başlık */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Hero Alt Başlık</h3>
        <Textarea
          rows={3}
          value={form.hero_subtitle}
          onChange={(e) => setField("hero_subtitle", e.target.value)}
        />
        <Button size="sm" disabled={saving === "hero_subtitle"} onClick={() => save("hero_subtitle", form.hero_subtitle)}>
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {saving === "hero_subtitle" ? "Kaydediliyor…" : "Kaydet"}
        </Button>
      </div>

      {/* İstatistikler */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground">İstatistikler (4 kutu)</h3>
        <div className="grid grid-cols-2 gap-3">
          {form.stats.map((stat, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={stat.val}
                onChange={(e) => setStat(i, "val", e.target.value)}
                placeholder="500+"
                className="w-20 shrink-0"
              />
              <Input
                value={stat.label}
                onChange={(e) => setStat(i, "label", e.target.value)}
                placeholder="Başarılı Montaj"
              />
            </div>
          ))}
        </div>
        <Button size="sm" disabled={saving === "stats"} onClick={() => save("stats", form.stats)}>
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {saving === "stats" ? "Kaydediliyor…" : "Kaydet"}
        </Button>
      </div>

      {/* Hakkımızda Metni */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Hakkımızda Paragrafı</h3>
        <Textarea
          rows={4}
          value={form.about_text}
          onChange={(e) => setField("about_text", e.target.value)}
        />
        <Button size="sm" disabled={saving === "about_text"} onClick={() => save("about_text", form.about_text)}>
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {saving === "about_text" ? "Kaydediliyor…" : "Kaydet"}
        </Button>
      </div>
    </div>
  );
}

interface Lead {
  id: number;
  name: string;
  phone: string;
  district: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

function AyarlarEditor() {
  const { content, loading, refresh } = useSiteContent();
  const [form, setForm] = useState({ phone_display: "", whatsapp_number: "", contact_email: "" });
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      setForm({
        phone_display: content.phone_display,
        whatsapp_number: content.whatsapp_number,
        contact_email: content.contact_email,
      });
    }
  }, [loading, content]);

  const save = async (key: "phone_display" | "whatsapp_number" | "contact_email") => {
    setSaving(key);
    const result = await saveSiteContent(key, form[key], ADMIN_PASSWORD);
    setSaving(null);
    if (result.ok) {
      toast.success("Kaydedildi.");
      await refresh();
    } else {
      toast.error(result.error ?? "Kayıt hatası.");
    }
  };

  if (loading) return <div className="py-16 text-center text-muted-foreground text-sm">Yükleniyor…</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary" /> İletişim Bilgileri
        </h3>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground">Gösterilen Telefon</label>
          <p className="text-xs text-muted-foreground mb-1.5">Sitede görünen formatlı numara (ör. 0532 061 57 58)</p>
          <div className="flex gap-2">
            <Input
              value={form.phone_display}
              onChange={(e) => setForm((p) => ({ ...p, phone_display: e.target.value }))}
              placeholder="0532 061 57 58"
            />
            <Button size="sm" disabled={saving === "phone_display"} onClick={() => save("phone_display")}>
              <Save className="w-3.5 h-3.5 mr-1.5" />
              {saving === "phone_display" ? "…" : "Kaydet"}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground">WhatsApp / tel: Numarası</label>
          <p className="text-xs text-muted-foreground mb-1.5">Ülke kodu dahil rakam (ör. 905320615758)</p>
          <div className="flex gap-2">
            <Input
              value={form.whatsapp_number}
              onChange={(e) => setForm((p) => ({ ...p, whatsapp_number: e.target.value }))}
              placeholder="905320615758"
            />
            <Button size="sm" disabled={saving === "whatsapp_number"} onClick={() => save("whatsapp_number")}>
              <Save className="w-3.5 h-3.5 mr-1.5" />
              {saving === "whatsapp_number" ? "…" : "Kaydet"}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> E-posta
          </label>
          <div className="flex gap-2">
            <Input
              value={form.contact_email}
              onChange={(e) => setForm((p) => ({ ...p, contact_email: e.target.value }))}
              placeholder="info@diafonistanbul.com"
            />
            <Button size="sm" disabled={saving === "contact_email"} onClick={() => save("contact_email")}>
              <Save className="w-3.5 h-3.5 mr-1.5" />
              {saving === "contact_email" ? "…" : "Kaydet"}
            </Button>
          </div>
        </div>
      </div>

      {/* Bildirim Kurulumu */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" /> Bildirim Kurulumu
        </h3>
        <p className="text-sm text-muted-foreground">Yeni form talebi geldiğinde otomatik e-posta almak için aşağıdaki ortam değişkenlerini Replit Secrets'a ekleyin.</p>

        <div className="rounded-xl bg-muted/60 border border-border p-4 space-y-3 text-sm font-mono">
          <div className="space-y-1">
            <p className="font-semibold text-foreground not-italic text-xs uppercase tracking-wider">Resend (E-posta)</p>
            <p><span className="text-primary">RESEND_API_KEY</span> — Resend.com hesabınızdan API anahtarı</p>
            <p><span className="text-primary">RESEND_FROM_EMAIL</span> — Gönderici adres (ör. noreply@resend.dev)</p>
            <p><span className="text-primary">RESEND_NOTIFY_EMAIL</span> — Bildirimlerin gönderileceği admin e-postası</p>
          </div>
          <div className="space-y-1 pt-2 border-t border-border">
            <p className="font-semibold text-foreground not-italic text-xs uppercase tracking-wider">Twilio (WhatsApp)</p>
            <p><span className="text-primary">TWILIO_ACCOUNT_SID</span> — Twilio hesap SID</p>
            <p><span className="text-primary">TWILIO_AUTH_TOKEN</span> — Twilio auth token</p>
            <p><span className="text-primary">TWILIO_WHATSAPP_FROM</span> — Twilio numarası (ör. whatsapp:+14155238886)</p>
            <p><span className="text-primary">TWILIO_WHATSAPP_TO</span> — Mesajın gideceği WhatsApp numarası (ör. whatsapp:+90532...)</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Bu değişkenler tanımlı değilse bildirimler sessizce atlanır, site çalışmaya devam eder.</p>
      </div>
    </div>
  );
}

const STATUS_LABELS: Record<Lead["status"], string> = {
  new: "Yeni",
  contacted: "İletişime Geçildi",
  closed: "Kapatıldı",
};

const STATUS_COLORS: Record<Lead["status"], string> = {
  new: "bg-blue-500/10 text-blue-600 border-blue-200",
  contacted: "bg-amber-500/10 text-amber-600 border-amber-200",
  closed: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
};

function TaleplerPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leads?password=${ADMIN_PASSWORD}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeads(data);
    } catch {
      toast.error("Talepler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: number, status: Lead["status"]) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/leads/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, password: ADMIN_PASSWORD }),
      });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
      toast.success("Durum güncellendi.");
    } catch {
      toast.error("Güncelleme başarısız.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return (
    <div className="py-16 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
      <RefreshCw className="w-5 h-5 animate-spin" /> Yükleniyor…
    </div>
  );

  if (leads.length === 0) return (
    <div className="py-16 text-center text-muted-foreground">
      <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
      <p>Henüz talep yok.</p>
    </div>
  );

  const byStatus = (s: Lead["status"]) => leads.filter((l) => l.status === s).length;

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-sm">
          <span className="flex items-center gap-1.5 text-blue-600"><Clock className="w-3.5 h-3.5" /> {byStatus("new")} yeni</span>
          <span className="flex items-center gap-1.5 text-amber-600"><Phone className="w-3.5 h-3.5" /> {byStatus("contacted")} görüşüldü</span>
          <span className="flex items-center gap-1.5 text-emerald-600"><CheckCircle2 className="w-3.5 h-3.5" /> {byStatus("closed")} kapatıldı</span>
        </div>
        <Button size="sm" variant="outline" onClick={fetchLeads} className="flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5" /> Yenile
        </Button>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground">{lead.name}</span>
                  <Badge className={`text-xs ${STATUS_COLORS[lead.status]}`}>{STATUS_LABELS[lead.status]}</Badge>
                  {lead.district && (
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{lead.district}</span>
                  )}
                </div>
                <a href={`tel:${lead.phone}`} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                  <Phone className="w-3.5 h-3.5" /> {lead.phone}
                </a>
                {lead.message && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{lead.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleString("tr-TR")}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                {(["new", "contacted", "closed"] as Lead["status"][]).map((s) => (
                  <button
                    key={s}
                    disabled={lead.status === s || updatingId === lead.id}
                    onClick={() => updateStatus(lead.id, s)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors disabled:opacity-50 ${
                      lead.status === s
                        ? STATUS_COLORS[s]
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogAdmin() {
  const [authed, setAuthed] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null | "new">(null);
  const [activeTab, setActiveTab] = useState<"blog" | "homepage" | "ayarlar" | "talepler">("blog");

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
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm">D</div>
              <span className="font-semibold text-foreground">Admin Paneli</span>
            </div>
            <div className="flex items-center gap-1 ml-4 border border-border rounded-lg p-0.5 bg-muted/40">
              <button
                onClick={() => setActiveTab("blog")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "blog" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <FileText className="w-3.5 h-3.5" /> Blog
              </button>
              <button
                onClick={() => setActiveTab("homepage")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "homepage" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Layout className="w-3.5 h-3.5" /> Ana Sayfa
              </button>
              <button
                onClick={() => setActiveTab("ayarlar")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "ayarlar" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Settings className="w-3.5 h-3.5" /> Ayarlar
              </button>
              <button
                onClick={() => setActiveTab("talepler")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === "talepler" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> Talepler
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "blog" && (
              <Button size="sm" onClick={() => setEditing("new")} className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> Yeni Yazı
              </Button>
            )}
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
        {activeTab === "homepage" ? (
          <HomepageEditor />
        ) : activeTab === "ayarlar" ? (
          <AyarlarEditor />
        ) : activeTab === "talepler" ? (
          <TaleplerPanel />
        ) : (
          <>
            <div className="mb-4">
              <p className="text-muted-foreground text-sm">Toplam {posts.length} yazı · {posts.filter(p => p.published).length} yayında</p>
            </div>
            {posts.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="mb-4">Henüz yazı yok.</p>
                <Button onClick={() => setEditing("new")}>
                  <PlusCircle className="w-4 h-4 mr-2" /> İlk Yazıyı Ekle
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
                      <p className="text-xs text-muted-foreground">{post.category} · {post.date}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => handleTogglePublish(post.id)} className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title={post.published ? "Yayından Kaldır" : "Yayınla"}>
                        {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setEditing(post)} className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Düzenle">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Sil">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Görüntüle">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

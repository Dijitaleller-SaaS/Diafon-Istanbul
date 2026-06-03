import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import { toast } from "sonner";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSent(false);
      setName("");
      setPhone("");
      setNote(productName ? `${productName} hakkında fiyat almak istiyorum.` : "");
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen, productName]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          district: "",
          message: note || (productName ? `${productName} - fiyat talebi` : "Modal fiyat talebi"),
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      toast.success("Fiyat talebiniz alındı!", { description: "Ekibimiz en kısa sürede sizi arayacak." });
    } catch {
      toast.error("Gönderim başarısız", { description: "Lütfen daha sonra tekrar deneyin." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {sent ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Talebiniz Alındı!</h3>
                  <p className="text-muted-foreground text-sm mb-6">Ekibimiz en kısa sürede sizinle iletişime geçecek.</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Kapat
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                    <div>
                      <h2 className="font-bold text-foreground text-lg">Ücretsiz Fiyat Teklifi Al</h2>
                      {productName && (
                        <p className="text-xs text-muted-foreground mt-0.5">{productName}</p>
                      )}
                    </div>
                    <button
                      onClick={onClose}
                      className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Adınız Soyadınız <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={firstInputRef}
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Telefon Numaranız <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Notunuz <span className="text-muted-foreground font-normal">(isteğe bağlı)</span>
                      </label>
                      <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        rows={3}
                        placeholder="Bina tipi, daire sayısı, mevcut sistem vb."
                        className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 active:scale-[.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      Fiyat Teklifi İste
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      Veya hemen arayın:{" "}
                      <a href="tel:+905320615758" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
                        <Phone className="w-3 h-3" /> 0532 061 57 58
                      </a>
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

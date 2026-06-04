import { Link } from "wouter";
import { Phone, Clock, MapPin, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 md:py-16 border-t border-secondary-foreground/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 w-fit">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm">
                D
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                Diafon İstanbul
              </span>
            </Link>
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
                  href={`tel:+${content.whatsapp_number}`}
                  className="flex items-center gap-3 text-secondary-foreground/80 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary-foreground/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-lg">{content.phone_display}</span>
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
              {[
                { label: "Hizmetlerimiz", href: "/#hizmetler" },
                { label: "Ürünlerimiz", href: "/urunler" },
                { label: "Blog", href: "/blog" },
                { label: "Hakkımızda", href: "/#hakkimizda" },
                { label: "Sıkça Sorulan Sorular", href: "/#sss" },
                { label: "Keşif Talep Et", href: "/#iletisim" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center gap-1 text-secondary-foreground/80 hover:text-white transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Diafon İstanbul. Tüm hakları saklıdır.</p>
          <p>İstanbul'un Güvenliği Bize Emanet.</p>
        </div>
      </div>
    </footer>
  );
}

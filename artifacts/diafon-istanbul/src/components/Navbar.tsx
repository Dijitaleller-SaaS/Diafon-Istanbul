import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";

const NAV_ITEMS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Hizmetler", anchor: "hizmetler" },
  { label: "Hakkımızda", anchor: "hakkimizda" },
  { label: "İletişim", anchor: "iletisim" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleAnchorClick = (anchor: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${anchor}`;
    }
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-border py-3 shadow-sm"
            : "bg-background border-border py-3"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm">
              D
            </div>
            <span className="font-display font-bold text-base tracking-tight text-foreground">
              Diafon İstanbul
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 mx-auto">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleAnchorClick(item.anchor!)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Tema değiştir"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="tel:+905320615758"
              className="text-sm font-medium text-foreground hidden lg:block"
            >
              0532 061 57 58
            </a>
            <Button
              onClick={() => handleAnchorClick("iletisim")}
              size="sm"
              className="rounded-md flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              Servis Çağır
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border text-muted-foreground"
              aria-label="Tema değiştir"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[53px] z-40 bg-background/95 backdrop-blur-sm md:hidden flex flex-col items-center justify-center gap-8 border-t border-border">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-xl font-medium transition-colors",
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleAnchorClick(item.anchor!)}
                className="text-xl font-medium text-foreground hover:text-primary"
              >
                {item.label}
              </button>
            )
          )}
          <div className="flex flex-col items-center gap-4 mt-4">
            <a
              href="tel:+905320615758"
              className="text-lg font-semibold flex items-center gap-2 text-primary"
            >
              <Phone className="h-5 w-5" />
              0532 061 57 58
            </a>
          </div>
        </div>
      )}
    </>
  );
}

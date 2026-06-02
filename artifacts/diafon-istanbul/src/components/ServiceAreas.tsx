import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const districts = [
  {
    name: "Kadıköy",
    slug: "kadikoy",
    description: "Modern diafon sistemleri için profesyonel keşif ve kurulum desteği.",
  },
  {
    name: "Beşiktaş",
    slug: "besiktas",
    description: "Villa ve apartmanlar için akıllı interkom ve güvenlik çözümleri.",
  },
  {
    name: "Bakırköy",
    slug: "bakirkoy",
    description: "Eski tesisatın modernizasyonu ve kesintisiz dijital iletişim.",
  },
  {
    name: "Şişli",
    slug: "sisli",
    description: "Kurumsal ve bireysel bina güvenlik sistemleri kurulumu.",
  },
  {
    name: "Sarıyer",
    slug: "sariyer",
    description: "Lüks konut projeleri için özel diafon entegrasyonları.",
  },
  {
    name: "Üsküdar",
    slug: "uskudar",
    description: "Apartman yönetimlerine özel profesyonel teknik danışmanlık.",
  },
];

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
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ServiceAreas = () => {
  return (
    <section id="hizmet-bolgeleri" className="py-24 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block">
              Hizmet Bölgelerimiz
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              İstanbul'un Her Köşesindeyiz
            </h2>
            <p className="text-muted-foreground text-lg">
              Avrupa ve Anadolu yakasında seçkin ilçelerde profesyonel kurulum ve keşif
              ekibimizle yanınızdayız.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {districts.map((d, i) => (
            <FadeIn key={d.slug} delay={0.07 * i}>
              <Link href={`/${d.slug}-diafon-kurulumu`}>
                <div className="group bg-card border border-border rounded-2xl p-7 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      İstanbul
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                    {d.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-primary text-sm font-semibold">
                    Keşif Talebi Oluştur
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;

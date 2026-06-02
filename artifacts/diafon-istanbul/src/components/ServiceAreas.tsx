import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const districts = [
  {
    name: "Kadıköy",
    slug: "kadikoy",
    description: "Modern diafon sistemleri için profesyonel keşif ve kurulum desteği.",
    image: "/district-kadikoy.jpg",
  },
  {
    name: "Beşiktaş",
    slug: "besiktas",
    description: "Villa ve apartmanlar için akıllı interkom ve güvenlik çözümleri.",
    image: "/district-besiktas.jpg",
  },
  {
    name: "Bakırköy",
    slug: "bakirkoy",
    description: "Eski tesisatın modernizasyonu ve kesintisiz dijital iletişim.",
    image: "/district-bakirkoy.jpg",
  },
  {
    name: "Şişli",
    slug: "sisli",
    description: "Kurumsal ve bireysel bina güvenlik sistemleri kurulumu.",
    image: "/district-sisli.jpg",
  },
  {
    name: "Sarıyer",
    slug: "sariyer",
    description: "Lüks konut projeleri için özel diafon entegrasyonları.",
    image: "/district-sariyer.jpg",
  },
  {
    name: "Üsküdar",
    slug: "uskudar",
    description: "Apartman yönetimlerine özel profesyonel teknik danışmanlık.",
    image: "/district-uskudar.jpg",
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
                <div
                  className="group relative rounded-2xl overflow-hidden h-[260px] cursor-pointer bg-gradient-to-br from-slate-700 to-slate-900"
                  style={{
                    backgroundImage: `url(${d.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Gradient overlay — image stays visible in upper half */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 group-hover:from-black/65 transition-all duration-400" />

                  {/* Glassmorphism content panel at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 backdrop-blur-md bg-white/10 border-t border-white/15 group-hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3 h-3 text-white/70" />
                      <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.15em]">
                        İstanbul
                      </span>
                    </div>
                    <h3 className="text-white text-lg font-bold mb-1 group-hover:text-sky-200 transition-colors duration-200">
                      {d.name}
                    </h3>
                    <p className="text-white/75 text-xs leading-relaxed mb-3 line-clamp-2">
                      {d.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-sky-300 text-xs font-semibold">
                      Keşif Talebi Oluştur
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
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

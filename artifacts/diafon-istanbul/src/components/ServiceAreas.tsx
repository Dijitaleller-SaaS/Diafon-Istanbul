import { motion, useAnimation, PanInfo } from "framer-motion";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useRef, useCallback } from "react";

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

const GAP = 20;

function getVisibleCount(width: number): number {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const totalPages = Math.ceil(districts.length / visibleCount);
  const maxIndex = districts.length - visibleCount;

  const getCardWidth = useCallback(() => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const totalGap = GAP * (visibleCount - 1);
    return (containerWidth - totalGap) / visibleCount;
  }, [visibleCount]);

  const getTranslateX = useCallback(
    (index: number) => {
      const cardWidth = getCardWidth();
      return -(index * (cardWidth + GAP));
    },
    [getCardWidth]
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clamped);
      controls.start({ x: getTranslateX(clamped), transition: { type: "spring", stiffness: 300, damping: 30 } });
    },
    [maxIndex, controls, getTranslateX]
  );

  useEffect(() => {
    const update = () => {
      const newCount = getVisibleCount(window.innerWidth);
      setVisibleCount(newCount);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const newMax = districts.length - visibleCount;
    const clamped = Math.min(currentIndex, newMax);
    setCurrentIndex(clamped);
    controls.start({ x: getTranslateX(clamped), transition: { duration: 0 } });
  }, [visibleCount]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const cardWidth = getCardWidth();
    const threshold = cardWidth * 0.25;
    if (info.offset.x < -threshold) {
      goTo(currentIndex + 1);
    } else if (info.offset.x > threshold) {
      goTo(currentIndex - 1);
    } else {
      controls.start({ x: getTranslateX(currentIndex), transition: { type: "spring", stiffness: 300, damping: 30 } });
    }
  };

  const currentPage = Math.round(currentIndex / Math.max(1, visibleCount));

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

        <FadeIn delay={0.1}>
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Önceki"
              className={[
                "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10",
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-black/60 border border-white/15 text-white shadow-lg",
                "hover:bg-black/80 transition-all duration-200",
                currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-90 hover:opacity-100",
              ].join(" ")}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => goTo(currentIndex + 1)}
              disabled={currentIndex >= maxIndex}
              aria-label="Sonraki"
              className={[
                "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10",
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-black/60 border border-white/15 text-white shadow-lg",
                "hover:bg-black/80 transition-all duration-200",
                currentIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : "opacity-90 hover:opacity-100",
              ].join(" ")}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Track */}
            <div ref={containerRef} className="overflow-hidden rounded-2xl">
              <motion.div
                drag="x"
                dragConstraints={{ left: getTranslateX(maxIndex), right: 0 }}
                dragElastic={0.08}
                animate={controls}
                onDragEnd={handleDragEnd}
                className="flex"
                style={{ gap: GAP, cursor: "grab" }}
                whileTap={{ cursor: "grabbing" }}
              >
                {districts.map((d) => (
                  <div
                    key={d.slug}
                    className="flex-shrink-0"
                    style={{ width: `calc((100% - ${GAP * (visibleCount - 1)}px) / ${visibleCount})` }}
                  >
                    <Link href={`/${d.slug}-diafon-kurulumu`}>
                      <div
                        className="group relative rounded-2xl overflow-hidden h-[260px] cursor-pointer bg-gradient-to-br from-slate-700 to-slate-900"
                        style={{
                          backgroundImage: `url(${d.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 group-hover:from-black/65 transition-all duration-400" />

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
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <button
                  key={pageIdx}
                  onClick={() => goTo(pageIdx * visibleCount)}
                  aria-label={`Sayfa ${pageIdx + 1}`}
                  className={[
                    "rounded-full transition-all duration-300",
                    currentPage === pageIdx
                      ? "w-5 h-2 bg-primary"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ServiceAreas;

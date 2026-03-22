"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

const SLIDES_DATA = [
  {
    titulo: "CAN-AM <span class='text-slate-400'>RYKER</span>",
    desc: "Dominio absoluto en asfalto y ciudad.",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1600",
    link: "/vehiculo/can-am-ryker",
    ref: "RO-SLIDE-01",
  },
  {
    titulo: "SPYDER <span class='text-slate-400'>F3-S</span>",
    desc: "Estabilidad y confort en tres ruedas.",
    img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1600",
    link: "/vehiculo/spyder-f3-s",
    ref: "RO-SLIDE-02",
  },
  {
    titulo: "SPYDER <span class='text-slate-400'>RT</span>",
    desc: "Poder off-road sin límites.",
    img: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1600",
    link: "/vehiculo/spyder-rt",
    ref: "RO-SLIDE-03",
  },
];

const AUTO_PLAY_INTERVAL = 6000;

export default function HomeHeroCarouselRosimo() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lógica de Navegación Manual (Adelantar/Retroceder)
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length,
    );
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Reiniciar temporizadores en cada cambio de slide manual o automático
    timerRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    const progressTimer = setInterval(() => {
      setProgress((prev) =>
        prev + (50 / AUTO_PLAY_INTERVAL) * 100 > 100
          ? 100
          : prev + (50 / AUTO_PLAY_INTERVAL) * 100,
      );
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearInterval(progressTimer);
    };
  }, [mounted, nextSlide, currentSlide]);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "20%" : "-20%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "20%" : "-20%",
      opacity: 0,
      transition: { duration: 0.6 },
    }),
  };

  if (!mounted) return null;

  const currentData = SLIDES_DATA[currentSlide];

  return (
    <main className="relative h-screen bg-white overflow-hidden flex flex-col px-4 md:px-6">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col py-8 lg:py-12 relative z-10">
        <div className="text-center pt-20 md:pt-24 mb-6">
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block">
            Rosimo_OS // Concessionaire
          </span>
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-950 leading-none">
            Selecciona tu <span className="text-slate-400">Máquina</span>
          </h1>
        </div>

        {/* CONTENEDOR PRINCIPAL RESPONSIVO */}
        <div className="flex-1 relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-slate-200 bg-slate-950 flex flex-col justify-end p-8 md:p-16 lg:pr-32 shadow-2xl">
          <AnimatePresence mode="wait" custom={currentSlide}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={currentData.img}
                alt={currentData.titulo}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* CONTROLES MANUALES (ADELANTAR / RETROCEDER) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 md:left-8 md:right-8 lg:right-12 flex justify-between lg:justify-end lg:gap-4 z-30 pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-slate-950/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all"
            >
              <span className="text-xl md:text-2xl">←</span>
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-slate-950/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all"
            >
              <span className="text-xl md:text-2xl">→</span>
            </button>
          </div>

          <div className="relative z-10 text-center md:text-left max-w-2xl">
            <h2
              className="text-3xl md:text-6xl font-black uppercase italic text-white mb-4 tracking-tighter leading-none"
              dangerouslySetInnerHTML={{ __html: currentData.titulo }}
            />
            <p className="text-slate-400 text-sm md:text-base font-medium italic mb-8 max-w-sm mx-auto md:mx-0">
              "{currentData.desc}"
            </p>
            <Link
              href={currentData.link}
              className="inline-block bg-red-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-xl shadow-red-600/20"
            >
              Ver Especificaciones // RO_OS
            </Link>
          </div>

          <div className="absolute top-0 left-0 w-full h-1 bg-white/10 animate-scan pointer-events-none" />
        </div>

        {/* INDICADORES DE TELEMETRÍA DINÁMICOS */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between items-center gap-4 lg:pr-28">
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
            {SLIDES_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group flex-1 md:flex-initial flex flex-col items-start"
              >
                {/* <span
                  className={`font-mono text-[8px] md:text-[9px] font-bold mb-1 transition-colors ${currentSlide === index ? "text-red-600" : "text-slate-300"}`}
                >
                  PHASE_0{index + 1}
                </span> */}
                <div className="h-1.5 w-full md:w-32 lg:w-48 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  {currentSlide === index && (
                    <motion.div
                      className="h-full bg-red-600"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
          <p className="hidden md:block text-[8px] font-mono uppercase tracking-[0.3em] text-slate-400">
            Rosimo_Authorized_Concessionaire // 2026
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 6s linear infinite;
        }
      `}</style>
    </main>
  );
}

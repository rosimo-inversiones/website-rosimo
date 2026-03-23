"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { SEDES } from "@/data/sedes";

const slides = [
  {
    id: 1,
    title: "DOMINA EL <span class='text-red-600'>TERRENO</span>",
    subtitle: "Raptor 700R // Edición Limitada",
    desc: "Ingeniería de precisión para el desierto y la duna. Siente el torque absoluto de Yamaha.",
    image:
      "https://images.unsplash.com/photo-1531327431456-837da4b1d562?q=80&w=2000",
    link: "/catalogo/motos",
  },
  {
    id: 2,
    title: "VELOCIDAD <span class='text-red-600'>PURA</span>",
    subtitle: "R1 Gytr // Performance Track",
    desc: "Nacida en la pista, domada para el asfalto. ADN de competición en cada centímetro cúbico.",
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2000",
    link: "/catalogo/motos",
  },
  {
    id: 3,
    title: "FUERZA <span class='text-red-600'>BRUTA</span>",
    subtitle: "Kodiak 450 // Utility Pro",
    desc: "El socio incansable para el trabajo pesado. Tracción total y resistencia a prueba de todo.",
    image:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=2000",
    link: "/catalogo/motos",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const sedePrincipal = SEDES.find((s) => s.isCentral);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants: Variants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8 },
    },
  };

  const textVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5 + i * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative h-screen w-full bg-[#050505] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] z-1 pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[current].image}
            alt={slides[current].subtitle}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-[#050505]/50 z-2" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600/30 animate-scan pointer-events-none z-3" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENIDO TEXTUAL RESPONSIVO */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center text-center px-6 pt-10 sm:pt-24">
        {/* BADGE DE RADAR (Ajustado para móviles) */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 max-w-full overflow-hidden"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <p className="text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-white/80 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-red-500">STATUS:</span>{" "}
            {sedePrincipal?.nombre || "Pucallpa"} ONLINE
            <span className="text-slate-400 ml-1 hidden md:inline">
              // Envíos Ucayali / San Martín Certificados
            </span>
          </p>
        </motion.div>

        {/* TÍTULO PRINCIPAL (Ajuste de tamaños responsivos) */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-black uppercase italic tracking-tighter text-white leading-[0.9] mb-4"
          dangerouslySetInnerHTML={{ __html: slides[current].title }}
        />

        {/* SUBTÍTULO DE UNIDAD (Ajuste de tamaño) */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] text-red-600 mb-6"
        >
          {slides[current].subtitle}
        </motion.p>

        {/* DESCRIPCIÓN TÉCNICA (Ancho máximo controlado) */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-slate-300 text-xs sm:text-sm md:text-lg max-w-xl sm:max-w-2xl leading-relaxed mb-8 sm:mb-12 font-medium"
        >
          {slides[current].desc}
        </motion.p>

        {/* BOTONES DE ACCIÓN (Flexibles para apilarse en móvil) */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <Link
            href={slides[current].link}
            className="bg-red-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] hover:bg-white hover:text-slate-950 transition-all shadow-xl shadow-red-600/20 text-center"
          >
            Analizar Inventario
          </Link>
          <Link
            href="/financiamiento"
            className="bg-transparent text-white border-2 border-white/20 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] hover:bg-white/10 hover:border-white/40 transition-all text-center"
          >
            Simular Crédito
          </Link>
        </motion.div>
      </div>

      {/* INDICADORES DE PAGINACIÓN (Ocultos en móvil pequeño para limpiar UI) */}
      <div className="absolute left-6 sm:left-8 bottom-10 sm:bottom-12 z-20 flex flex-col gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="flex items-center gap-3 group"
          >
            <span
              className={`h-px transition-all duration-500 ${current === index ? "w-8 sm:w-10 bg-red-600" : "w-4 bg-white/20 group-hover:bg-white/50"}`}
            />
            <span
              className={`font-mono text-[9px] sm:text-[10px] ${current === index ? "text-white" : "text-white/30 group-hover:text-white/60"}`}
            >
              0{index + 1}
            </span>
          </button>
        ))}
      </div>

      {/* PIE TÉCNICO (Solo Desktop) */}
      <div className="absolute right-10 bottom-10 z-20 text-right opacity-30 hidden lg:block">
        <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500">
          Rosimo_Concessionaire // Engineering_Matrix // 2026
        </p>
      </div>

      <style jsx global>{`
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
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
}

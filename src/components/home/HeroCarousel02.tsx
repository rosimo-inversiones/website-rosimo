"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Base de datos de diapositivas (Se mantiene igual)
const HERO_SLIDES = [
  {
    id: 1,
    title: "Yamaha Raptor 700R",
    subtitle: "Dominio Off-Road Táctico",
    desc: "Inyección electrónica de combustible y suspensión híbrida. Diseñada para conquistar dunas y desiertos sin piedad.",
    img: "https://images.unsplash.com/photo-1531327431456-837da4b1d562?q=80&w=2000&auto=format&fit=crop",
    link: "/catalogo/motos/raptor-700r",
    ref: "MODELO_2025 // RO-R700R",
  },
  {
    id: 2,
    title: "Rethink Your Ride",
    subtitle: "Movilidad Urbana Vanguardista",
    desc: "La fusión perfecta entre estilo, agilidad y eficiencia. Tu ciudad, tus reglas.",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2000&auto=format&fit=crop",
    link: "/catalogo/motos",
    ref: "URBAN_SERIES // RO-RIDE",
  },
  {
    id: 3,
    title: "Rosimo Logistics Pro",
    subtitle: "Fuerza de Carga Certificada",
    desc: "Capacidad de carga superior y motorización de alto torque. La herramienta definitiva para tu flota comercial.",
    img: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=2000&auto=format&fit=crop",
    link: "/catalogo/trimotos",
    ref: "LOGISTICS // RO-PRO",
  },
];

// Variantes de animación Framer Motion (Se mantienen igual)
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const imageVariants: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroCarouselResponsive() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    // CAMBIO TÁCTICO: Altura responsiva (min-h-[70vh] en móvil, h-screen en desktop)
    <section className="relative min-h-[70vh] lg:h-screen w-full bg-slate-950 overflow-hidden group">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}">0${index + 1}</span>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next-hero",
          prevEl: ".swiper-button-prev-hero",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full w-full"
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            {({ isActive }) => (
              <div className="relative h-full w-full flex items-center">
                {/* FONDO DE IMAGEN ANIMADO (Se mantiene igual) */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute inset-0 z-0 h-full w-full"
                    >
                      <Image
                        src={slide.img}
                        alt={slide.title}
                        fill
                        priority={index === 0}
                        className="object-cover object-center"
                        sizes="100vw"
                      />
                      {/* Overlay oscuro para legibilidad (Se mantiene igual) */}
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent z-10" />

                      {/* Textura blueprint táctica sutil */}
                      <div
                        className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none"
                        style={{
                          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CONTENIDO TEXTUAL RESPONSIVO */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-24 md:pt-0 md:pb-0">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          {/* Referencia Táctica (Sutil y responsive) */}
                          <motion.span
                            custom={0}
                            variants={textVariants}
                            className="block font-mono text-[9px] sm:text-[10px] uppercase text-red-600 tracking-[0.4em] mb-3 sm:mb-4"
                          >
                            {slide.ref}
                          </motion.span>

                          {/* Subtítulo (Responsive text size) */}
                          <motion.p
                            custom={1}
                            variants={textVariants}
                            className="font-medium text-xs sm:text-sm md:text-base uppercase text-white/90 tracking-widest italic mb-2 sm:mb-3"
                          >
                            {slide.subtitle}
                          </motion.p>

                          {/* Título Principal (Responsive text size y interlineado controlado) */}
                          <motion.h1
                            custom={2}
                            variants={textVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase text-white italic tracking-tighter leading-[0.9] mb-5 sm:mb-6"
                          >
                            {slide.title}
                          </motion.h1>

                          {/* Descripción (Responsive padding y ancho) */}
                          <motion.p
                            custom={3}
                            variants={textVariants}
                            className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl leading-relaxed mb-8 sm:mb-10 pl-3 border-l border-white/10"
                          >
                            {slide.desc}
                          </motion.p>

                          {/* Botones CTA (Responsive layout) */}
                          <motion.div
                            custom={4}
                            variants={textVariants}
                            className="flex flex-col sm:flex-row gap-4 sm:items-center"
                          >
                            <Link
                              href={slide.link}
                              className="inline-block bg-red-600 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all shadow-xl shadow-red-600/20 text-center"
                            >
                              Explorar Máquina
                            </Link>
                            <Link
                              href="/financiamiento"
                              className="inline-block bg-white/5 border border-white/10 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-center"
                            >
                              Simular Crédito
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Número de fondo (Oculto en móvil) */}
                <div className="absolute right-0 bottom-0 z-10 font-black text-[25vw] text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter hidden lg:block">
                  0{slide.id}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* NAVEGACIÓN TÁCTICA CUSTOM (Oculta en móvil) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 z-30 swiper-button-prev-hero hidden md:flex w-12 h-12 rounded-full bg-slate-950/50 border border-white/10 items-center justify-center text-white/60 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all cursor-pointer opacity-0 group-hover:opacity-100">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-30 swiper-button-next-hero hidden md:flex w-12 h-12 rounded-full bg-slate-950/50 border border-white/10 items-center justify-center text-white/60 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all cursor-pointer opacity-0 group-hover:opacity-100">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      {/* ESTILOS GLOBALES SWIPER (Se mantienen igual) */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: transparent !important;
          opacity: 1 !important;
          color: rgba(255, 255, 255, 0.4);
          font-family: monospace;
          font-size: 10px;
          font-weight: bold;
          margin: 0 8px !important;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
        }
        .swiper-pagination-bullet::before {
          content: "";
          display: inline-block;
          width: 0;
          height: 1px;
          background: #dc2626;
          transition: all 0.3s;
          margin-right: 0;
        }
        .swiper-pagination-bullet-active {
          color: #dc2626 !important;
        }
        .swiper-pagination-bullet-active::before {
          width: 20px;
          margin-right: 8px;
        }
        .swiper-pagination {
          bottom: 40px !important;
          left: 50px !important;
          text-align: left !important;
          width: auto !important;
          z-index: 30 !important;
        }
        @media (max-width: 768px) {
          .swiper-pagination {
            left: 0 !important;
            width: 100% !important;
            text-align: center !important;
            bottom: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

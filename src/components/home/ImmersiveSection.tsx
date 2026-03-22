"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ImmersiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Reemplazo de GSAP: Hook de Scroll de Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // La animación ocurre mientras la sección cruza la pantalla
  });

  // 2. Mapeo fluido de valores (Scrub constante)
  // El texto sube, se hace visible en el centro y desaparece al final
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [150, 0, -150]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
  );
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1.5]);

  // La imagen de fondo hace un zoom suave constante
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen bg-[#050505] flex items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* 3. IMAGEN DE FONDO CON PARALLAX Y ZOOM */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
        <img
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600"
          className="w-full h-full object-cover opacity-40"
          alt="Inmersive Terrain"
        />
      </motion.div>

      {/* Degradado para fundirse con las secciones anterior y posterior */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10" />

      {/* 4. INTERFAZ TÁCTICA HUD (Head-Up Display) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10 opacity-40">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[8px] md:text-[10px] text-red-600 tracking-[0.4em] uppercase">
            Rosimo_OS // System_Override
          </span>
          <span className="font-mono text-[8px] md:text-[10px] text-white tracking-widest text-right flex flex-col gap-1">
            <span>COORD: 12.0464° S, 77.0428° W</span>
            <span className="text-red-600">TERRAIN_MAPPING: ACTIVE</span>
          </span>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-16 md:w-32 h-px bg-red-600/50" />
          <div className="w-16 md:w-32 h-px bg-red-600/50" />
        </div>
      </div>

      {/* EFECTO SCANNER CONSTANTE */}
      <div className="absolute top-0 left-0 w-full h-2 bg-red-600/20 animate-scan pointer-events-none z-20" />

      {/* 5. TEXTO INMERSIVO ANIMADO AL SCROLL */}
      <motion.div
        style={{ y: textY, opacity: textOpacity, scale: textScale }}
        className="relative z-30 px-6 text-center w-full"
      >
        <h2 className="text-white text-5xl md:text-7xl lg:text-9xl font-black uppercase italic leading-none tracking-tighter drop-shadow-2xl">
          No hay <br className="hidden md:block" />{" "}
          <span className="text-red-600">Caminos</span>{" "}
          <br className="hidden md:block" /> Imposibles
        </h2>
        <p className="mt-8 text-white/50 font-mono text-[10px] uppercase tracking-[0.5em] hidden md:block">
          Rosimo_Precision_Engineering // Unleash_Power
        </p>
      </motion.div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { RUTAS } from "@/data/rutas"; // 1. Importamos la base de datos dinámica

export default function HomeRoutes() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <section className="relative py-20 md:py-32 bg-white border-y border-slate-100 overflow-hidden px-6">
      {/* TEXTURA BLUEPRINT LIGHT */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ENCABEZADO TÁCTICO */}
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center">
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-black">
            Cartografía // Rosimo_OS
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-950 leading-[0.85] mb-6">
            Rutas y <span className="text-slate-300">Exploración</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl text-sm md:text-base">
            Conoce los mejores trayectos en Ucayali para poner a prueba la
            ingeniería de tu máquina. Datos telemétricos y recomendaciones
            oficiales de la Sede Central.
          </p>
        </div>

        {/* GRID DE RUTAS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* 2. Mapeamos usando la data importada RUTAS */}
          {RUTAS.map((ruta) => (
            <motion.div
              key={ruta.slug}
              variants={itemVariants}
              className="group relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-red-600/30 transition-all duration-500 flex flex-col"
            >
              {/* IMAGEN DE LA RUTA */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-[8px] font-mono font-bold text-white uppercase tracking-widest">
                    {ruta.idFicha} {/* 3. Usamos idFicha */}
                  </span>
                </div>
                <img
                  src={ruta.imgHero}
                  alt={ruta.nombre}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />

                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="text-2xl font-black italic text-white tracking-tight uppercase">
                    {ruta.nombre}
                  </h3>
                </div>
              </div>

              {/* DATOS TELEMÉTRICOS */}
              <div className="p-8 flex flex-col grow bg-slate-50/50">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border border-slate-100 p-3 rounded-xl">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                      Distancia
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-950">
                      {ruta.distancia}
                    </span>
                  </div>
                  <div className="bg-white border border-slate-100 p-3 rounded-xl">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                      Terreno
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-950 truncate block">
                      {ruta.terreno}
                    </span>
                  </div>
                </div>

                <div className="mb-6 grow">
                  <span className="text-[9px] font-black uppercase tracking-widest text-red-600 block mb-2">
                    Dificultad: {ruta.dificultad}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {ruta.descCorta} {/* 5. Usamos descCorta */}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">
                      Máquina Recomendada
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-950">
                      {ruta.vehiculoRecomendado}
                    </span>
                  </div>

                  {/* 6. Enlace dinámico a la página de la ruta */}
                  <Link
                    href={`/rutas/${ruta.slug}`}
                    className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:bg-red-600 transition-colors"
                  >
                    <span className="text-xs font-mono group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>

              {/* ESCANER LÁSER */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none transition-opacity z-30" />
            </motion.div>
          ))}
        </motion.div>
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
        .group:hover .animate-scan {
          animation: scan 2.5s linear infinite;
        }
      `}</style>
    </section>
  );
}

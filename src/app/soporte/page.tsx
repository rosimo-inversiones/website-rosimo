"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { SOPORTE_DATA } from "@/data/soporte";

export default function SoportePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-white text-slate-950 pt-32 pb-24 overflow-hidden">
      {/* TEXTURA BLUEPRINT */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER TÁCTICO */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-black">
            Rosimo_OS // Base de Conocimiento
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-950 leading-[0.85] mb-6">
            Centro de <span className="text-slate-300">Operaciones</span>
          </h1>
          <p className="text-slate-500 font-medium text-base md:text-lg">
            Protocolos de mantenimiento técnico y guías de supervivencia
            mecánica diseñadas específicamente para el terreno y clima de la
            Amazonía.
          </p>
        </div>

        {/* GRID DE MANUALES */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {SOPORTE_DATA.map((manual) => (
            <motion.div key={manual.idProtocolo} variants={itemVariants}>
              <Link
                href={`/soporte/${manual.slug}`}
                className="group block h-full"
              >
                <div className="relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-red-600/30 transition-all duration-500 h-full flex flex-col">
                  {/* IMAGEN DEL PROTOCOLO */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <span className="text-[8px] font-mono font-bold text-white uppercase tracking-widest">
                        {manual.categoria}
                      </span>
                    </div>
                    <img
                      src={manual.imgHero}
                      alt={manual.titulo}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                  </div>

                  {/* DATOS DEL MANUAL */}
                  <div className="p-8 flex flex-col grow bg-slate-50/50">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {manual.idProtocolo}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                          manual.nivel === "Básico"
                            ? "bg-slate-200 text-slate-700"
                            : manual.nivel === "Intermedio"
                              ? "bg-slate-950 text-white"
                              : "bg-red-600 text-white"
                        }`}
                      >
                        Nivel: {manual.nivel}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black italic text-slate-950 tracking-tight uppercase mb-3 group-hover:text-red-600 transition-colors">
                      {manual.titulo}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6 grow">
                      {manual.extracto}
                    </p>

                    <div className="pt-5 border-t border-slate-200/60 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">
                          T. Ejecución
                        </span>
                        <span className="font-mono text-[10px] font-bold text-slate-950">
                          {manual.tiempoEjecucion}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-950 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors border border-slate-200">
                        <span className="text-xs font-mono group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ESCANER LÁSER */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none transition-opacity z-30" />
                </div>
              </Link>
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
    </main>
  );
}

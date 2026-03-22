"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link"; // Importación necesaria para los nuevos enlaces

export default function NosotrosCentrado() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-white pt-40 pb-24 px-6 overflow-hidden text-center">
      {/* 1. DECORACIÓN BLUEPRINT DE FONDO */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      {/* TEXTO PARALLAX DE FONDO */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <h2 className="text-[25vw] font-black uppercase italic leading-none text-transparent [-webkit-text-stroke:2px_#0f172a] whitespace-nowrap">
          NOSOTROS
        </h2>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* ENCABEZADO CENTRADO */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">
            Corporate_Identity // Rosimo_OS v1.1
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-slate-950 leading-none mb-8">
            Nuestra <span className="text-slate-400">Historia</span>
          </h1>
          <div className="h-1 w-20 bg-red-600 mx-auto" />
        </motion.div>

        {/* CONTENIDO PRINCIPAL CENTRADO */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12 mb-32 relative z-10"
        >
          <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight italic">
            "En Rosimo, no solo ensamblamos vehículos; diseñamos experiencias de
            dominio absoluto sobre cualquier terreno."
          </p>
          <p className="text-slate-500 leading-relaxed text-lg mx-auto max-w-2xl">
            Nuestra trayectoria está marcada por la búsqueda incansable de la
            perfección técnica. Cada motor, chasis y sistema electrónico es
            verificado bajo el protocolo Rosimo_Engineering para garantizar que
            tu máquina responda con precisión quirúrgica.
          </p>
        </motion.div>

        {/* STATS CENTRADOS (Grid Responsivo) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 relative z-10">
          {[
            { label: "Años_Exp", val: "10+", ref: "RO-ST-01" },
            { label: "Modelos_OS", val: "24", ref: "RO-ST-02" },
            { label: "Soporte", val: "24/7", ref: "RO-ST-03" },
            { label: "Calidad", val: "A++", ref: "RO-ST-04" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true, amount: 0.5 }} // Animación al hacer scroll
              className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] hover:border-red-600/30 transition-all group"
            >
              <div className="text-red-600 font-mono text-[9px] font-bold tracking-widest block mb-2 opacity-50">
                {stat.ref}
              </div>
              <div className="text-3xl font-black italic text-slate-950 group-hover:text-red-600 transition-colors">
                {stat.val}
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. NUEVA SECCIÓN: PROTOCOLO DE ACTIVACIÓN (CTA) */}
        {/* Reemplaza el antiguo "Grid de Valores" */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="mb-16 text-center relative z-10"
        >
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-10 block">
            Experience the Matrix // Protocol_Activate
          </span>

          {/* Tarjeta de Ingeniería Única (Estilo Rosimo) */}
          <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-10 md:p-16 max-w-4xl mx-auto shadow-sm relative overflow-hidden group hover:border-red-600/30 transition-all duration-700">
            {/* Efecto Scanner Rosimo */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600/10 group-hover:bg-red-600 animate-scan pointer-events-none transition-colors" />

            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-slate-950 mb-6 leading-none">
              ¿Listo para Tomar <span className="text-red-600">Control</span>{" "}
              Absoluto?
            </h2>

            <p className="text-slate-500 leading-relaxed text-lg italic max-w-2xl mx-auto mb-10">
              "La verdadera ingeniería se siente en el asfalto. Activa tu
              Protocolo de Pilotaje y domina la Matrix Rosimo hoy mismo."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/catalogo"
                className="w-full sm:w-auto bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-950 transition-all shadow-xl shadow-red-600/20"
              >
                Explorar Inventario // RO-OS
              </Link>
              <Link
                href="/contacto"
                className="w-full sm:w-auto bg-white/5 text-slate-950 border-2 border-slate-200 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-950 hover:text-white transition-all"
              >
                Agendar Prueba de Manejo
              </Link>
            </div>
          </div>
        </motion.section>

        {/* PIE TÉCNICO DE SECCIÓN */}
        <div className="mt-20 opacity-30 relative z-10">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500">
            About_Verified // Rosimo_Engineering // 2026
          </p>
        </div>
      </div>

      {/* Estilo CSS para la animación del scanner */}
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
    </main>
  );
}

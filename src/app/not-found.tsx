"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export default function NotFoundRosimoLight() {
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <main className="relative min-h-screen bg-white text-slate-950 flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* 1. DECORACIÓN BLUEPRINT DE FONDO */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      {/* 2. MARCA DE AGUA GIGANTE 404 (Sutil en light) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03] z-0">
        <h2 className="text-[35vw] font-black uppercase italic leading-none whitespace-nowrap text-red-600">
          404
        </h2>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center max-w-2xl w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="flex flex-col items-center w-full"
        >
          {/* INDICADOR DE ALERTA HUD */}
          <div className="flex items-center gap-4 mb-10">
            <span className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
            <span className="text-red-600 font-mono text-[11px] uppercase tracking-[0.5em]">
              System_Error // 404_Not_Found
            </span>
            <span className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
          </div>

          <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Ruta <span className="text-slate-400">Perdida</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed italic mb-12 max-w-lg">
            "Las coordenadas de navegación actuales no coinciden con ninguna
            unidad verificada en el inventario activo de Rosimo."
          </p>

          {/* BOTONES DE REDIRECCIÓN TÁCTICA */}
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto bg-slate-950 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-red-600 transition-all shadow-xl shadow-slate-950/10 flex items-center justify-center gap-3"
            >
              Volver a Inicio
            </Link>
            <Link
              href="/catalogo"
              className="w-full sm:w-auto bg-white text-slate-950 border-2 border-slate-200 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-100 hover:border-slate-300 transition-all flex items-center justify-center gap-3"
            >
              Ver Inventario Activo
            </Link>
          </div>
        </motion.div>
      </div>

      {/* EFECTO SCANNER GLOBAL LENTO */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600/10 animate-scan pointer-events-none z-20" />

      {/* PIE TÉCNICO DE SECCIÓN */}
      <div className="absolute bottom-10 left-0 right-0 text-center opacity-30 z-10">
        <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500">
          Error_Report // Rosimo_Engineering // 2026
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
          animation: scan 6s linear infinite;
        }
      `}</style>
    </main>
  );
}

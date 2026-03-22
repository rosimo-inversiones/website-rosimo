"use client";
import { motion } from "framer-motion";

export default function LoadingRosimoGlobal() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden text-center px-6">
      {/* 1. DECORACIÓN BLUEPRINT */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      {/* TEXTO PARALLAX SUTIL DE FONDO */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <h2 className="text-[20vw] font-black uppercase italic leading-none text-transparent [-webkit-text-stroke:2px_#0f172a] whitespace-nowrap">
          CARGANDO...
        </h2>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* INDICADOR KINÉTICO ROJO */}
        <div className="flex gap-1.5 items-end justify-center mb-6">
          <motion.span
            animate={{ height: [12, 32, 12] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            className="w-1.5 h-8 bg-red-600 rounded-full"
          />
          <motion.span
            animate={{ height: [12, 32, 12] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-1.5 h-8 bg-red-600 rounded-full"
          />
          <motion.span
            animate={{ height: [12, 32, 12] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-1.5 h-8 bg-red-600 rounded-full"
          />
        </div>

        {/* MENSAJE TÉCNICO MONOESPACIADO */}
        <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] block">
          ROSIMO_ SYSTEM_OS // INICIALIZANDO
        </span>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-950">
          Cargando Interfaz
        </h3>
      </div>

      {/* Efecto scanner lento */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600/10 animate-scan-slow pointer-events-none" />

      <style jsx global>{`
        @keyframes scan-slow {
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
        .animate-scan-slow {
          animation: scan-slow 5s linear infinite;
        }
      `}</style>
    </div>
  );
}

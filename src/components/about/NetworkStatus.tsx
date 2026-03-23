"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { SEDES } from "@/data/sedes";

export default function NetworkStatus() {
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
    <section className="relative py-20 md:py-32 bg-white border-t border-slate-100 overflow-hidden px-6">
      {/* BACKGROUND BLUEPRINT */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER TÁCTICO RESPONSIVE */}
        <div className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-black italic">
              Network_Telemetry // Rosimo_OS
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-950 leading-[0.85]">
              Estado de <span className="text-slate-300">Red Global</span>
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-6 py-4 rounded-2xl flex items-center gap-4 w-fit mx-auto md:mx-0">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-950">
              {SEDES.filter((s) => s.estado === "ONLINE").length} Activos //{" "}
              {SEDES.filter((s) => s.estado === "STANDBY").length} Proyectados
            </span>
          </div>
        </div>

        {/* GRID DINÁMICO: 1 col (mobile), 2 cols (tablet), 3 cols (desktop) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SEDES.map((nodo) => {
            const isPrincipal = nodo.isCentral;
            const isOnline = nodo.estado === "ONLINE";

            const CardContent = (
              <motion.div
                variants={itemVariants}
                className={`group relative h-full p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col overflow-hidden
                  ${!isOnline ? "opacity-60 grayscale cursor-not-allowed border-dashed border-slate-200 bg-slate-50/50" : "shadow-sm hover:shadow-2xl"}
                  ${isOnline && isPrincipal ? "bg-slate-950 text-white border-slate-800 hover:border-red-600/50" : ""}
                  ${isOnline && !isPrincipal ? "bg-white text-slate-950 border-slate-200 hover:border-red-600/30" : ""}
                `}
              >
                {/* Scanner effect solo si está online */}
                {isOnline && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none transition-opacity" />
                )}

                <div className="flex justify-between items-start mb-8">
                  <span
                    className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${isPrincipal ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {nodo.idFicha}
                  </span>
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isPrincipal ? "bg-white/5 border-white/10" : "bg-white border-slate-100"}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${isOnline ? "bg-red-600 animate-pulse" : "bg-slate-300"}`}
                    />
                    <span
                      className={`text-[8px] font-black uppercase tracking-widest ${isOnline ? "text-red-600" : "text-slate-400"}`}
                    >
                      {nodo.estado}
                    </span>
                  </div>
                </div>

                <div className="mb-8 grow">
                  <h4
                    className={`text-3xl font-black uppercase italic tracking-tighter mb-1 transition-colors ${isOnline && "group-hover:text-red-600"} ${isPrincipal ? "text-white" : "text-slate-950"} ${!isOnline && "text-slate-300"}`}
                  >
                    {nodo.nombre}
                  </h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest block mb-4 ${isPrincipal ? "text-slate-500" : "text-slate-400"}`}
                  >
                    Región {nodo.region}
                  </span>
                  <p
                    className={`text-xs leading-relaxed font-medium ${isPrincipal ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {isOnline
                      ? nodo.descripcion
                      : "Protocolo de apertura inicializado. Próximamente activaremos este nodo para soporte técnico regional."}
                  </p>
                </div>

                <div
                  className={`mt-auto pt-6 border-t flex items-center justify-between ${isPrincipal ? "border-white/5" : "border-slate-100"}`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-[9px] font-mono uppercase tracking-[0.2em] ${isPrincipal ? "text-slate-600" : "text-slate-400"}`}
                    >
                      {isOnline
                        ? isPrincipal
                          ? "Sede Central (Activa)"
                          : "Sucursal Activa"
                        : "Fase de Despliegue"}
                    </span>
                    {!isOnline && (
                      <span className="text-[8px] font-bold text-red-600/50 uppercase tracking-widest mt-1">
                        Apertura_Estimada // 2026_Q4
                      </span>
                    )}
                  </div>
                  {isOnline && (
                    <span className="text-red-600 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  )}
                </div>
              </motion.div>
            );

            return isOnline ? (
              <Link key={nodo.slug} href={`/sedes/${nodo.slug}`}>
                {CardContent}
              </Link>
            ) : (
              <div key={nodo.slug}>{CardContent}</div>
            );
          })}
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

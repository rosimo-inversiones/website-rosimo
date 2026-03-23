"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { SEDES } from "@/data/sedes"; // Importamos los datos centralizados

export default function HomeLocationQuickView() {
  // Buscamos dinámicamente la sede principal
  const sedePrincipal = SEDES.find((s) => s.isCentral || s.slug === "pucallpa");

  // Si no hay sede principal (error de data), no renderizamos nada
  if (!sedePrincipal) return null;

  return (
    <section className="relative py-16 md:py-24 bg-slate-50 border-y border-slate-200 overflow-hidden px-6">
      {/* 1. DECORACIÓN BLUEPRINT DE FONDO */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 text-center md:text-left">
        {/* COLUMNA IZQUIERDA: MENSAJE TÁCTICO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex-1 space-y-4"
        >
          <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] font-black italic">
              Rosimo_Network // Sede Central ONLINE
            </span>
          </div>

          <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-950 leading-[0.9]">
            Punto de Despacho <span className="text-red-600">Pucallpa</span>
          </h3>

          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
            Nuestra base operativa en Ucayali es el único{" "}
            <span className="text-slate-950 font-bold">
              nodo físico autorizado
            </span>
            . Desde aquí calibramos y despachamos cada unidad con envíos
            certificados a toda la Amazonía.
          </p>
        </motion.div>

        {/* COLUMNA DERECHA: FICHA TÉCNICA RÁPIDA (Responsive) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-full md:w-auto flex flex-col items-center md:items-start shrink-0"
        >
          <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-[2.5rem] shadow-xl w-full md:w-80 relative overflow-hidden group">
            {/* Pequeño escaner interno táctico */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/20 animate-scan-fast pointer-events-none" />

            <div className="flex flex-col items-center text-center mb-6">
              <span className="text-4xl mb-2">📍</span>
              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                {sedePrincipal.idFicha} // HQ
              </span>
              <p className="text-[11px] font-bold text-red-600 font-mono italic">
                Sistemas de Navegación ONLINE
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  Coordenadas_GPS
                </span>
                <p className="font-mono text-xs text-slate-950 truncate">
                  {sedePrincipal.direccion}
                </p>
                <p className="font-mono text-[10px] text-slate-500">
                  {sedePrincipal.region}
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  Línea_Ventas_HUB
                </span>
                <p className="font-mono text-xs text-slate-950">
                  {sedePrincipal.telefono}
                </p>
              </div>
            </div>

            <Link
              href={`/sedes/${sedePrincipal.slug}`}
              className="w-full bg-slate-950 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] text-center hover:bg-red-600 transition-all flex items-center justify-center gap-2"
            >
              Ver Ficha Táctica →
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scan-fast {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan-fast {
          animation: scan-fast 3s linear infinite;
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
}

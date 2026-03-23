"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEDES } from "@/data/sedes";

interface SedePageProps {
  params: Promise<{ slug: string }>;
}

export default function SedeDinamicaLight({ params }: SedePageProps) {
  // Desenvolvemos la promesa de params para evitar errores de Next.js 15
  const resolvedParams = React.use(params);
  const sede = SEDES.find((s) => s.slug === resolvedParams.slug);

  if (!sede) notFound();

  return (
    <main className="relative min-h-screen bg-white text-slate-950 pt-32 pb-24 overflow-x-hidden">
      {/* BACKGROUND BLUEPRINT LIGHT */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER TÁCTICO LIGHT */}
        <div className="mb-12 md:mb-16">
          <Link
            href="/contacto"
            className="text-red-600 text-[10px] font-black uppercase tracking-widest hover:text-slate-950 transition-colors mb-6 inline-block"
          >
            ← Volver a la Red de Sedes
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
            <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
              {sede.idFicha} // {sede.isCentral ? "Sede_Central" : "Sucursal"}{" "}
              // Online
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Base <span className="text-slate-300">{sede.nombre}</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
            {sede.descripcion}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* COLUMNA VISUAL: FOTO Y MAPA */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-64 md:h-[450px] bg-slate-100 rounded-[2.5rem] border border-slate-200 overflow-hidden group shadow-sm"
            >
              <img
                src={sede.imagen}
                alt={sede.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              {/* Efecto scanner táctico */}
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20 animate-scan pointer-events-none" />
            </motion.div>

            {/* CONTENEDOR DE MAPA RESPONSIVO */}
            <div className="h-64 bg-slate-50 rounded-[2.5rem] border border-slate-200 flex items-center justify-center relative overflow-hidden">
              <span className="text-slate-300 font-mono text-[10px] uppercase tracking-widest z-10">
                Google_Maps_Interface // GPS_Signal
              </span>
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
                }}
              />
            </div>
          </div>

          {/* COLUMNA DE DATOS: PANEL DE CONTROL DARK PARA CONTRASTE */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <div className="bg-slate-950 text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <h3 className="text-red-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-8 pb-4 border-b border-white/10">
                Data_Navigation
              </h3>
              <div className="space-y-8">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-2">
                    Ubicación Actual
                  </span>
                  <p className="font-bold text-lg leading-tight mb-1">
                    {sede.direccion}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {sede.region}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-2">
                    Contacto Directo
                  </span>
                  <p className="text-2xl font-black italic tracking-tighter text-red-600">
                    {sede.telefono}
                  </p>
                </div>
                <button className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-slate-950 transition-all shadow-lg shadow-red-600/20">
                  Abrir Coordenadas GPS
                </button>
              </div>
            </div>

            {/* HORARIOS LIGHT */}
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
              <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                Operación_Semanal
              </h3>
              <div className="space-y-4">
                {Object.entries(sede.horarios).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0"
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {key}
                    </span>
                    <span className="text-xs font-black text-slate-950">
                      {val as string}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICIOS DISPONIBLES */}
            <div className="grid grid-cols-2 gap-4">
              {sede.servicios.map((srv, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center flex flex-col items-center justify-center"
                >
                  <span className="text-2xl mb-2 block">{srv.icono}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                    {srv.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </main>
  );
}

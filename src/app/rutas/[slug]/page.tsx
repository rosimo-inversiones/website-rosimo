"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RUTAS } from "@/data/rutas";

interface RutaPageProps {
  params: Promise<{ slug: string }>;
}

export default function RutaDinamicaPage({ params }: RutaPageProps) {
  // Desenvolvemos la promesa de los params de Next.js 15+
  const resolvedParams = React.use(params);
  const ruta = RUTAS.find((r) => r.slug === resolvedParams.slug);

  if (!ruta) notFound();

  return (
    <main className="relative min-h-screen bg-white text-slate-950 pt-32 pb-24 overflow-x-hidden">
      {/* BACKGROUND BLUEPRINT */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER DE CARTOGRAFÍA */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-red-600 text-[10px] font-black uppercase tracking-widest hover:text-slate-950 transition-colors mb-6 inline-block"
          >
            ← Volver al Radar Global
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
            <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
              Cartografía // {ruta.idFicha}
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6">
            {ruta.nombre.split(" ")[0]}{" "}
            <span className="text-slate-300">
              {ruta.nombre.split(" ").slice(1).join(" ")}
            </span>
          </h1>
        </div>

        {/* IMAGEN HERO DE LA RUTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-64 md:h-[500px] bg-slate-100 rounded-[2.5rem] border border-slate-200 overflow-hidden group shadow-sm mb-12 md:mb-16"
        >
          <img
            src={ruta.imgHero}
            alt={ruta.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                Dificultad: {ruta.dificultad.split("//")[0].trim()}
              </span>
              <p className="font-mono text-white text-sm">
                Punto de Partida: Sede Central Pucallpa
              </p>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20 animate-scan pointer-events-none" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* COLUMNA IZQUIERDA: DETALLES Y PROTOCOLO (8 Columnas) */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 text-slate-950">
                Briefing de Ruta
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                {ruta.descLarga}
              </p>
            </div>

            {/* TIPS TÉCNICOS */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem]">
              <h3 className="text-red-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-6 pb-4 border-b border-slate-200">
                Protocolo de Navegación // Tips Tácticos
              </h3>
              <ul className="space-y-4">
                {ruta.tipsTecnicos.map((tip, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="text-red-600 font-mono text-sm mt-0.5">
                      0{index + 1}.
                    </span>
                    <span className="text-slate-700 font-medium text-sm">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* GALERÍA DE RECONOCIMIENTO */}
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-6 text-slate-950">
                Capturas de Terreno
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ruta.galeria.map((img, idx) => (
                  <div
                    key={idx}
                    className="h-48 rounded-[2rem] overflow-hidden bg-slate-100 border border-slate-200"
                  >
                    <img
                      src={img}
                      alt={`Reconocimiento ${idx}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: PANEL DE TELEMETRÍA (4 Columnas) */}
          <div className="lg:col-span-4 space-y-6 sticky top-32">
            <div className="bg-slate-950 text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-8 pb-4 border-b border-white/10">
                Data_Telemétrica
              </h3>

              <div className="space-y-6 mb-10">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                    Distancia Total
                  </span>
                  <p className="text-2xl font-black italic tracking-tighter text-white">
                    {ruta.distancia}
                  </p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                    Tipo de Terreno
                  </span>
                  <p className="font-mono text-sm text-white">{ruta.terreno}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                    Tiempo de Ejecución
                  </span>
                  <p className="font-mono text-sm text-white">
                    {ruta.tiempoEstimado}
                  </p>
                </div>
              </div>

              {/* MÁQUINA RECOMENDADA - CTA */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <span className="text-[8px] font-black uppercase tracking-widest text-red-600 block mb-2">
                  Máquina Oficial para la Ruta
                </span>
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4">
                  {ruta.vehiculoRecomendado}
                </h4>

                <Link
                  href={`/vehiculo/${ruta.slugVehiculo}`}
                  className="w-full block bg-white text-slate-950 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] text-center hover:bg-red-600 hover:text-white transition-all"
                >
                  Ver Especificaciones →
                </Link>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full pointer-events-none" />
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

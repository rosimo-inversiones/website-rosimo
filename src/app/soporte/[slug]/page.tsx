"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOPORTE_DATA } from "@/data/soporte";

interface SoportePageProps {
  params: Promise<{ slug: string }>;
}

export default function ManualDinamicoPage({ params }: SoportePageProps) {
  // Resolución de Promesa para Next.js 15+
  const resolvedParams = React.use(params);
  const manual = SOPORTE_DATA.find((m) => m.slug === resolvedParams.slug);

  if (!manual) notFound();

  return (
    <main className="relative min-h-screen bg-white text-slate-950 pt-32 pb-24 overflow-x-hidden">
      {/* BACKGROUND BLUEPRINT */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')` }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* CABECERA DEL MANUAL */}
        <div className="mb-12">
          <Link href="/soporte" className="text-red-600 text-[10px] font-black uppercase tracking-widest hover:text-slate-950 transition-colors mb-6 inline-block">
            ← Volver a la Base de Conocimiento
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                  Protocolo // {manual.idProtocolo}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6">
                {manual.titulo}
              </h1>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                {manual.extracto}
              </p>
            </div>
            
            {/* Etiquetas de Estado Rápidas */}
            <div className="flex gap-4 pb-2">
              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">Nivel</span>
                <span className="font-mono text-xs font-bold text-slate-950">{manual.nivel}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1">T. Ejecución</span>
                <span className="font-mono text-xs font-bold text-slate-950">{manual.tiempoEjecucion}</span>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGEN HERO DEL MANUAL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative h-64 md:h-[400px] bg-slate-100 rounded-[2.5rem] border border-slate-200 overflow-hidden group shadow-sm mb-16"
        >
          <img src={manual.imgHero} alt={manual.titulo} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 z-20 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <span className="text-[9px] font-mono text-white uppercase tracking-widest">Sector: {manual.categoria}</span>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20 animate-scan pointer-events-none" />
        </motion.div>

        {/* ÁREA DE CONTENIDO DIVIDIDA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: PROCEDIMIENTO (8 Columnas) */}
          <div className="lg:col-span-8">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-8 text-slate-950">
              Secuencia de <span className="text-red-600">Operación</span>
            </h3>
            
            <div className="space-y-8">
              {manual.pasos?.map((paso, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  key={index} 
                  className="flex gap-6 md:gap-8 bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100 relative overflow-hidden group hover:border-red-600/20 transition-colors"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-red-600 transition-colors" />
                  
                  <div className="shrink-0 pt-1">
                    <span className="text-4xl md:text-5xl font-black italic text-slate-200 group-hover:text-red-600/20 transition-colors tracking-tighter">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-black uppercase italic tracking-tighter mb-3 text-slate-950">
                      {paso.titulo}
                    </h4>
                    <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">
                      {paso.detalle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: SIDEBAR TÁCTICO (4 Columnas) */}
          <div className="lg:col-span-4 space-y-6 sticky top-32">
            
            {/* Panel de Máquina Asociada */}
            <div className="bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-6 pb-4 border-b border-white/10">
                Máquina_Referencia
              </h3>
              
              <div className="mb-8">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                  Ingeniería Compatible
                </span>
                <p className="text-3xl font-black italic tracking-tighter text-white mb-2">
                  {manual.vehiculoReferencia}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  Este protocolo está optimizado y testeado oficialmente en la plataforma del {manual.vehiculoReferencia}.
                </p>
              </div>

              {manual.slugVehiculo && (
                <Link 
                  href={`/vehiculo/${manual.slugVehiculo}`}
                  className="w-full block bg-red-600 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] text-center hover:bg-white hover:text-slate-950 transition-all shadow-lg shadow-red-600/20"
                >
                  Ver Ficha de Ingeniería →
                </Link>
              )}
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full pointer-events-none" />
            </div>

            {/* Aviso de Soporte */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem]">
              <span className="text-2xl mb-4 block">🔧</span>
              <h4 className="text-sm font-black uppercase italic tracking-tighter mb-2 text-slate-950">
                ¿Asistencia Técnica?
              </h4>
              <p className="text-xs text-slate-500 font-medium mb-4">
                Si detectas desgaste irregular o requieres reemplazo de piezas, visita nuestro centro de servicio en Pucallpa.
              </p>
              <Link href="/sedes/pucallpa" className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-slate-950 transition-colors">
                Ver Horarios de Taller →
              </Link>
            </div>

          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scan { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan 3s linear infinite; }
      `}</style>
    </main>
  );
}
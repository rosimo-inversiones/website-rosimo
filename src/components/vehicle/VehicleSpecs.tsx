"use client";
import { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Vehiculo } from "@/types";

export default function VehicleSpecsLight({
  vehiculo,
}: {
  vehiculo: Vehiculo;
}) {
  // 1. Especificaciones de Alta Ingeniería para Rosimo
  const technicalSpecs = useMemo(
    () => [
      {
        label: "Propulsión",
        value: vehiculo.specs?.cc || "N/A",
        detail: "Módulo de Combustión Pro",
        icon: "⚡",
      },
      {
        label: "Masa Estructural",
        value: vehiculo.specs?.peso || "N/A",
        detail: "Aleación de Aluminio Serie-7",
        icon: "⚖️",
      },
      {
        label: "IA Predictiva",
        value: "Rosimo-Link v1",
        detail: "Asistente de Curva Activo",
        icon: "🧠",
      },
      {
        label: "Frenado",
        value: vehiculo.frenos,
        detail: "Discos Ventilados de Alto Flujo",
        icon: "🛑",
      },
      {
        label: "Aerodinámica",
        value: "Active Winglet",
        detail: "Carga Aerodinámica Variable",
        icon: "✈️",
      },
      {
        label: "Transmisión",
        value: vehiculo.transmision,
        detail: "Quickshifter Rosimo-7",
        icon: "⚙️",
      },
    ],
    [vehiculo],
  );

  // 2. Variantes con Tipado Estricto
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative py-24 bg-white text-slate-950 px-6 overflow-hidden border-t border-slate-100">
      {/* DECORACIÓN DE FONDO: GRILLA DE PLANO TÉCNICO */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CABECERA TÉCNICA ROSIMO */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-3 block">
              Rosimo Engineering // Data Matrix
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              Especificaciones <span className="text-slate-200">Críticas</span>
            </h2>
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-[10px] font-mono text-slate-400 uppercase leading-relaxed">
              Sistema de Verificación Rosimo-OS <br />
              Status:{" "}
              <span className="text-emerald-600">Optimal Performance</span>
            </p>
          </div>
        </div>

        {/* GRID DE TELEMETRÍA (Responsivo) */}
        {/* lg:pr-32 protege el área del botón de WhatsApp */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:pr-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {technicalSpecs.map((spec, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-red-600/30 transition-all duration-500"
            >
              {/* Indicador de Línea Táctica Rosimo */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-700" />

              <div className="flex justify-between items-start mb-8">
                <span className="text-2xl opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  {spec.icon}
                </span>
                <span className="font-mono text-[9px] text-slate-300 group-hover:text-red-600 transition-colors">
                  RO-0{index + 1}
                </span>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  {spec.label}
                </h4>
                <p className="text-3xl font-black uppercase italic tracking-tighter text-slate-950 mb-2">
                  {spec.value}
                </p>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest italic border-t border-slate-200 pt-3">
                  {spec.detail}
                </p>
              </div>
            </motion.div>
          ))}

          {/* TARJETA DE RESUMEN DE MARCA ROSIMO */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 lg:col-span-1 bg-red-600 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group shadow-xl shadow-red-600/10"
          >
            <div className="relative z-10 text-white">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-2">
                Rosimo Build Quality
              </h4>
              <p className="text-2xl font-black uppercase italic leading-tight">
                Ingeniería Pro de {vehiculo.marca}
              </p>
            </div>
            <p className="text-[11px] font-medium text-white/90 leading-relaxed italic relative z-10 mt-6">
              "{vehiculo.descripcion}"
            </p>

            {/* Animación de scanner (Color suavizado para tema light) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20 animate-scan pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* PIE DE FICHA TÉCNICA */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center opacity-40 gap-4">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em]">
            Serial Check: {vehiculo.nombre.substring(0, 3).toUpperCase()}
            -RO-2026
          </p>
          <div className="h-px flex-1 bg-slate-200 hidden md:block mx-8" />
          <p className="text-[9px] font-mono uppercase tracking-[0.3em]">
            Rosimo Precision Testing Certified
          </p>
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
    </section>
  );
}

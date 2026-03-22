"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const ESTILOS_DATA = [
  {
    id: "naked",
    nombre: "Naked",
    ref: "RO-CHASIS-01",
    img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
    desc: "Chasis expuesto y entrega de torque directa. Posición de ataque agresiva para la ciudad.",
  },
  {
    id: "deportiva",
    nombre: "Deportiva",
    ref: "RO-AERO-02",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800",
    desc: "Carenado aerodinámico y semimanillares bajos para exprimir el máximo RPM en pista.",
  },
  {
    id: "custom",
    nombre: "Custom",
    ref: "RO-ERGO-03",
    img: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800",
    desc: "Distancia entre ejes extendida y centro de gravedad bajo. Puro torque en línea recta.",
  },
  {
    id: "dual-sport",
    nombre: "Dual-Sport",
    ref: "RO-SUSP-04",
    img: "https://images.unsplash.com/photo-1531327431456-837da4b1d562?q=80&w=800",
    desc: "Suspensión de largo recorrido y neumáticos mixtos. Transición perfecta asfalto-tierra.",
  },
];

export default function MotoStyles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-slate-100 px-6">
      {/* DECORACIÓN BLUEPRINT */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      {/* MARCA DE AGUA (Watermark Técnica) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <h2 className="text-[18vw] font-black uppercase italic leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:2px_#0f172a]">
          GEOMETRÍA
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ENCABEZADO CENTRADO */}
        <div className="mb-16 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-3 block"
          >
            Configuración_de_Chasis // Rosimo_OS
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-950 leading-none"
          >
            Gama de <span className="text-slate-400">Estilos</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: false }}
            className="h-1 bg-red-600 mt-8"
          />
        </div>

        {/* GRID CENTRADO RESPONSIVO */}
        {/* Usamos pb-12 para dar margen de seguridad al botón flotante de WhatsApp sin romper el centrado */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center pb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }} // Animación Constante
        >
          {ESTILOS_DATA.map((estilo) => (
            <motion.div
              key={estilo.id}
              variants={itemVariants}
              className="group flex justify-center"
            >
              <Link
                href={`/catalogo/${estilo.id}`}
                className="block relative w-full h-[450px] rounded-[2.5rem] overflow-hidden border border-slate-200 bg-slate-950 shadow-lg transition-all duration-700 hover:border-red-600/50 hover:-translate-y-2"
              >
                {/* Imagen */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={estilo.img}
                    alt={estilo.nombre}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                </div>

                {/* Marcadores Centrados Superiores */}
                <div className="absolute top-6 left-0 w-full flex flex-col items-center z-10">
                  <span className="text-red-600 font-mono text-[9px] font-bold uppercase tracking-widest block mb-1">
                    {estilo.ref}
                  </span>
                  <div className="w-6 h-px bg-red-600 group-hover:w-16 transition-all duration-700" />
                </div>

                {/* Contenido Centrado Inferior */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                  <h3 className="text-3xl font-black uppercase italic text-white mb-3 tracking-tighter group-hover:text-red-600 transition-colors">
                    {estilo.nombre}
                  </h3>
                  <p className="text-slate-400 text-[11px] md:text-xs font-medium leading-relaxed italic opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 max-w-[200px]">
                    "{estilo.desc}"
                  </p>
                </div>

                {/* Escáner Táctico */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />
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
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
}

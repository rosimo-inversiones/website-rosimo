"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const FEATURED_DATA = [
  {
    slug: "can-am-ryker",
    nombre: "Can-Am Ryker",
    ref: "RO-UNIT-01",
    specs: "900cc // 82 HP",
    desc: "Cilindrada optimizada para máxima entrega de potencia. Transmisión automática CVT.",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800",
  },
  {
    slug: "spyder-f3-s",
    nombre: "Spyder F3-S",
    ref: "RO-UNIT-02",
    specs: "1330cc // 115 HP",
    desc: "Torque brutal de 130 Nm. Centro de gravedad calibrado para curvas de alta velocidad.",
    img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
  },
  {
    slug: "spyder-rt",
    nombre: "Spyder RT",
    ref: "RO-UNIT-03",
    specs: "1330cc // Touring",
    desc: "Plataforma extendida de alta resistencia. Amortiguación neumática adaptativa.",
    img: "https://images.unsplash.com/photo-1531327431456-837da4b1d562?q=80&w=800",
  },
];

export default function FeaturedVehicles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <section className="relative py-32 bg-[#050505] text-white overflow-hidden border-t border-white/5">
      {/* TEXTURA DE CARBONO */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
        }}
      />

      {/* MARCA DE AGUA (Watermark Motera) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <h2 className="text-[14vw] font-black uppercase italic leading-none whitespace-nowrap text-white">
          TOP_PERFORMANCE
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ENCABEZADO CENTRADO */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} // Animación Constante
            className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block"
          >
            Telemetry_Verified // High_Displacement
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
          >
            Unidades de <span className="text-white/20">Élite</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: false }}
            className="h-1 bg-red-600 mt-8"
          />
        </div>

        {/* GRID CENTRADO RESPONSIVO */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center pb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // Animación Constante
        >
          {FEATURED_DATA.map((unit) => (
            <motion.div
              key={unit.slug}
              variants={cardVariants}
              className="group flex justify-center"
            >
              <Link
                href={`/vehiculo/${unit.slug}`}
                className="block relative w-full h-[550px] rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900 transition-all duration-700 hover:border-red-600/50 shadow-2xl hover:-translate-y-2"
              >
                {/* Imagen */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={unit.img}
                    alt={unit.nombre}
                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                </div>

                {/* Marcadores Centrados Superiores */}
                <div className="absolute top-8 left-0 w-full flex flex-col items-center z-10">
                  <span className="text-red-600 font-mono text-[9px] font-bold uppercase tracking-widest block mb-2">
                    {unit.ref} // {unit.specs}
                  </span>
                  <div className="w-6 h-px bg-red-600 group-hover:w-20 transition-all duration-700" />
                </div>

                {/* Contenido Centrado Inferior */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                  <h3 className="text-4xl font-black uppercase italic text-white mb-4 tracking-tighter group-hover:text-red-600 transition-colors">
                    {unit.nombre}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium italic leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 max-w-[240px] mb-6">
                    "{unit.desc}"
                  </p>

                  {/* Botón CTA Táctico que aparece al hover */}
                  <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="bg-red-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[9px]">
                      Ver Ficha Técnica
                    </span>
                  </div>
                </div>

                {/* Escáner Táctico */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />
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

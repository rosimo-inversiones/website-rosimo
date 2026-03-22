"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const TYPES_DATA = [
  {
    id: "motos",
    titulo: "Dos Ruedas",
    ref: "RO-CHASIS-01",
    desc: "Agilidad urbana y entrega de torque instantáneo para dominar el asfalto.",
    img: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800",
    link: "/catalogo/motos",
  },
  {
    id: "trimotos",
    titulo: "Trimóviles",
    ref: "RO-CHASIS-02",
    desc: "Estabilidad de tres puntos de apoyo con aerodinámica deportiva.",
    img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
    link: "/catalogo/trimotos",
  },
  {
    id: "cuatrimotos",
    titulo: "Off-Road 4x4",
    ref: "RO-CHASIS-03",
    desc: "Tracción total independiente para conquistar las rutas más hostiles.",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800",
    link: "/catalogo/cuatrimotos",
  },
];

export default function VehicleTypes() {
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

      {/* MARCA DE AGUA MOTERA (Watermark) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <h2 className="text-[18vw] font-black uppercase italic leading-none whitespace-nowrap text-white">
          RIDE_DYNAMICS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ENCABEZADO CENTRADO */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }} // Animación constante
            className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block"
          >
            Categorías_de_Pilotaje // Rosimo_OS
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }} // Animación constante
            className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
          >
            Chasis y <span className="text-white/20">Cilindradas</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: false }}
            className="h-1 bg-red-600 mt-8"
          />
        </div>

        {/* GRID TÉCNICO CENTRADO */}
        {/* Usamos mx-auto y padding balanceado para centrado perfecto, manteniendo espacio para WhatsApp (pb-12) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center pb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // Se reactiva al hacer scroll
        >
          {TYPES_DATA.map((type) => (
            <motion.div
              key={type.id}
              variants={cardVariants}
              className="group flex justify-center"
            >
              <Link
                href={type.link}
                className="block relative w-full h-[450px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-900 transition-all duration-700 hover:border-red-600/50 shadow-2xl hover:-translate-y-2"
              >
                {/* Imagen con Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={type.img}
                    alt={type.titulo}
                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                {/* Marcadores Centrados */}
                <div className="absolute top-8 left-0 w-full flex flex-col items-center z-10">
                  <span className="text-red-600 font-mono text-[9px] font-bold uppercase tracking-widest block mb-2">
                    {type.ref}
                  </span>
                  <div className="w-6 h-px bg-red-600 group-hover:w-16 transition-all duration-700" />
                </div>

                {/* Contenido Centrado */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                  <h3 className="text-3xl md:text-4xl font-black uppercase italic text-white mb-3 tracking-tighter group-hover:text-red-600 transition-colors">
                    {type.titulo}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium italic leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 max-w-[220px]">
                    "{type.desc}"
                  </p>
                </div>

                {/* Efecto Scanner */}
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

"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const BRANDS_DATA = [
  {
    id: "can-am",
    nombre: "Can-Am",
    ref: "RO-BRAND-01",
    img: "https://images.unsplash.com/photo-1531327431456-837da4b1d562?q=80&w=800",
    link: "/catalogo/motos?marca=Can-Am",
    size: "large",
    desc: "Ingeniería de vanguardia dominando las rutas On y Off-Road.",
  },
  {
    id: "Honda",
    nombre: "Honda",
    ref: "RO-BRAND-02",
    img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
    link: "/catalogo/motos?marca=Honda",
    size: "small",
    desc: "Estilo urbano. Agarre perfecto en curvas cerradas.",
  },
  {
    id: "Yamaha",
    nombre: "Yamaha",
    ref: "RO-BRAND-03",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800",
    link: "/catalogo/motos?marca=Yamaha",
    size: "small",
    desc: "El pináculo del Touring deportivo de tres ejes.",
  },
  {
    id: "Kawasaki",
    nombre: "Kawasaki",
    ref: "RO-BRAND-04",
    img: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800",
    link: "/catalogo/motos?marca=Kawasaki",
    size: "medium",
    desc: "Aceleración marina y control aerodinámico sobre el agua.",
  },
];

export default function BrandsBentoGrid() {
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

      {/* MARCA DE AGUA (Watermark Escuderías) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <h2 className="text-[15vw] font-black uppercase italic leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:2px_#0f172a]">
          ESCUDERÍAS
        </h2>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ENCABEZADO CENTRADO */}
        <div className="mb-16 text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block"
          >
            Partner_Network // Marcas_Asociadas
          </motion.span>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-950 leading-none"
          >
            Nuestras <span className="text-slate-400">Marcas</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: false }}
            className="h-1 bg-red-600 mt-8"
          />
        </div>

        {/* BENTO GRID CENTRADO */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 pb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }} // Animación constante
        >
          {BRANDS_DATA.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-950 shadow-lg transition-all duration-700 hover:border-red-600/50 hover:-translate-y-2
                ${brand.size === "large" ? "md:col-span-2 md:row-span-2 h-[450px] md:h-[620px]" : ""}
                ${brand.size === "medium" ? "md:col-span-2 h-[300px]" : ""}
                ${brand.size === "small" ? "md:col-span-1 h-[300px]" : ""}
              `}
            >
              <Link href={brand.link} className="block w-full h-full relative">
                {/* Imagen */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={brand.img}
                    alt={brand.nombre}
                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
                </div>

                {/* Marcadores Centrados Superiores */}
                <div className="absolute top-8 left-0 w-full flex flex-col items-center z-10">
                  <span className="text-red-600 font-mono text-[9px] font-bold uppercase tracking-widest block mb-2">
                    {brand.ref}
                  </span>
                  <div className="w-6 h-px bg-red-600 group-hover:w-16 transition-all duration-700" />
                </div>

                {/* Contenido Centrado Inferior */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                  <h3
                    className={`font-black uppercase italic text-white mb-3 tracking-tighter group-hover:text-red-600 transition-colors
                    ${brand.size === "large" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}
                  `}
                  >
                    {brand.nombre}
                  </h3>
                  <p className="text-slate-400 text-[10px] md:text-xs font-medium leading-relaxed italic opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 max-w-[220px]">
                    "{brand.desc}"
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

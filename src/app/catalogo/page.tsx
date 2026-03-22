"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const CATEGORIAS = [
  {
    id: "motos",
    titulo: "Motos",
    ref: "RO-CAT-01",
    desc: "Dominio absoluto en asfalto y ciudad.",
    link: "/catalogo/motos",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800",
  },
  {
    id: "trimotos",
    titulo: "Trimóviles",
    ref: "RO-CAT-02",
    desc: "Estabilidad y confort en tres ruedas.",
    link: "/catalogo/trimotos",
    img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
  },
  {
    id: "cuatrimotos",
    titulo: "Cuatrimotos",
    ref: "RO-CAT-03",
    desc: "Poder off-road sin límites y confort en cuatro ruedas.",
    link: "/catalogo/cuatrimotos",
    img: "https://images.unsplash.com/photo-1531327431456-837da4b1d562?q=80&w=800",
  },
];

export default function CatalogoLobbyPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
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
    <main className="relative min-h-screen lg:h-screen bg-white flex flex-col pt-32 lg:pt-40 pb-10 px-6 overflow-hidden">
      {/* 1. DECORACIÓN BLUEPRINT DE FONDO */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      {/* MARCA DE AGUA (Watermark Técnica) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <h2 className="text-[18vw] font-black uppercase italic leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:2px_#0f172a]">
          INVENTARIO
        </h2>
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10">
        {/* ENCABEZADO CENTRADO (Separado del Navbar gracias a pt-32/pt-40) */}
        <div className="text-center mb-10 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-3 block"
          >
            System_Directory // Rosimo_OS
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter text-slate-950 leading-none mb-2"
          >
            Selecciona tu <span className="text-slate-400">Máquina</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="text-slate-500 font-medium italic text-sm md:text-base max-w-xl mx-auto mt-4"
          >
            Explora nuestro inventario segmentado por categoría.
          </motion.p>
        </div>

        {/* GRID CENTRADO QUE OCUPA EL ALTO DISPONIBLE (flex-1) */}
        {/* lg:pr-28 evita que el botón de WhatsApp tape la tercera tarjeta en pantallas grandes */}
        <motion.div
          className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 lg:pr-28 justify-center min-h-100"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {CATEGORIAS.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              className="group flex justify-center h-full"
            >
              <Link
                href={cat.link}
                className="block relative w-full h-100 md:h-full rounded-[2.5rem] overflow-hidden border border-slate-200 bg-slate-950 shadow-xl transition-all duration-700 hover:border-red-600/50 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Imagen Oscurecida para Contraste */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.img}
                    alt={cat.titulo}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-30 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                </div>

                {/* Marcadores Centrados Superiores */}
                <div className="absolute top-8 left-0 w-full flex flex-col items-center z-10">
                  <span className="text-red-600 font-mono text-[9px] font-bold uppercase tracking-widest block mb-1">
                    {cat.ref}
                  </span>
                  <div className="w-6 h-px bg-red-600 group-hover:w-16 transition-all duration-700" />
                </div>

                {/* Contenido Centrado Inferior */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center">
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white mb-3 tracking-tighter group-hover:text-red-600 transition-colors">
                    {cat.titulo}
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed italic opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 max-w-55">
                    "{cat.desc}"
                  </p>
                </div>

                {/* Escáner Táctico Rosimo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* PIE TÉCNICO DE SECCIÓN */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center opacity-40 gap-4 lg:pr-28">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500">
            System_Lobby // User_Interface_Verified // 2026
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
            <span className="text-[9px] font-black text-slate-950 uppercase tracking-widest italic">
              Rosimo Engineering Matrix
            </span>
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
          animation: scan 4s linear infinite;
        }
      `}</style>
    </main>
  );
}

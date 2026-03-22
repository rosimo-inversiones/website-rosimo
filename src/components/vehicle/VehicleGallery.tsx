"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Vehiculo } from "@/types";

export default function VehicleGallery({ vehiculo }: { vehiculo: Vehiculo }) {
  const [mounted, setMounted] = useState(false);

  // 1. Control de hidratación para Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Mapeo de activos visuales de Rosimo con validación de seguridad
  const galleryAssets = useMemo(() => {
    // Verificamos si existe vehiculo.fotos; si no, usamos un array vacío
    const images = vehiculo.fotos || [];

    return [
      {
        label: "VISTA_PRINCIPAL",
        url: vehiculo.imagen,
        size: "large",
        ref: "RO-DRIVE-01",
      },
      {
        label: "DETALLE_ESTRUCTURA",
        url: images[0] || vehiculo.imagen,
        size: "small",
        ref: "RO-BODY-02",
      },
      {
        label: "SISTEMA_CONTROL",
        url: images[1] || vehiculo.imagen,
        size: "small",
        ref: "RO-DASH-03",
      },
      {
        label: "VISTA_POSTERIOR",
        url: images[2] || vehiculo.imagen,
        size: "large",
        ref: "RO-REAR-04",
      },
    ];
  }, [vehiculo]);

  // 3. Variantes de animación con tipado estricto
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-slate-100 px-6">
      {/* TEXTO DE FONDO (Parallax sutil) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black uppercase italic leading-none text-transparent [-webkit-text-stroke:2px_#0f172a] whitespace-nowrap">
          {vehiculo.nombre}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CABECERA ROSIMO ENGINEERING */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">
            Visual Matrix // Rosimo Engineering
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 uppercase italic tracking-tighter">
            Galería de <span className="text-slate-400">Componentes</span>
          </h2>
        </div>

        {/* GRID DE IMÁGENES (Responsivo y protegido contra solapamientos) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:pr-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {galleryAssets.map((asset, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden p-4 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:bg-white
                ${asset.size === "large" ? "md:col-span-2" : "col-span-1"}
              `}
            >
              {/* Info técnica del activo */}
              <div className="flex justify-between items-center mb-4 px-4">
                <span className="text-[9px] font-mono text-slate-300 group-hover:text-red-600 transition-colors">
                  {asset.ref}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {asset.label}
                </span>
              </div>

              {/* Contenedor de Imagen */}
              <div className="aspect-video md:aspect-auto md:h-64 flex items-center justify-center overflow-hidden rounded-2xl">
                <img
                  src={asset.url}
                  alt={asset.label}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Footer de la tarjeta con estilo Rosimo */}
              <div className="mt-4 px-4 flex justify-between items-center">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-red-600 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-red-600/50 rounded-full" />
                </div>
                <span className="text-[8px] font-bold text-slate-300 uppercase">
                  Rosimo_Visual_System
                </span>
              </div>
            </motion.div>
          ))}

          {/* TARJETA DE RESUMEN (Bento Box Destacado) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-1 bg-red-600 p-10 rounded-[2.5rem] flex flex-col justify-between text-white relative overflow-hidden group shadow-xl shadow-red-600/10"
          >
            <div className="relative z-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">
                Build Quality
              </h4>
              <p className="text-2xl font-black uppercase italic leading-tight">
                Ingeniería Pro de Rosimo
              </p>
            </div>

            <div className="absolute top-0 left-0 w-full h-1 bg-white/20 animate-scan pointer-events-none" />
            <p className="text-[10px] font-medium text-white/80 leading-relaxed italic border-l-2 border-white/20 pl-4">
              Explorando los límites de la tracción y el diseño industrial.
            </p>
          </motion.div>
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
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
}

"use client";
import { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Vehiculo } from "@/types";

export default function VehicleFAQ({ vehiculo }: { vehiculo: Vehiculo }) {
  const faqs = useMemo(
    () => [
      {
        q: `¿Qué garantía tiene la ${vehiculo.nombre}?`,
        a: "Ofrecemos 2 años de garantía total o 20,000 km, lo que ocurra primero.",
        ref: "RO-GRTY-01",
      },
      {
        q: "¿Cuentan con planes de financiamiento?",
        a: "Sí, tenemos alianzas con los principales bancos para ofrecerte tasas preferenciales desde el 10% de enganche.",
        ref: "RO-FIN-02",
      },
      {
        q: "¿Tienen repuestos originales disponibles?",
        a: "Contamos con stock permanente de repuestos genuinos para asegurar que tu máquina nunca se detenga.",
        ref: "RO-SPARE-03",
      },
    ],
    [vehiculo],
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-white text-slate-950 px-6 border-t border-slate-100 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <div className="mb-16 text-center md:text-left">
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-2 block">
            Support Database // Rosimo EngineeringMatrix
          </span>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            Consultas <span className="text-slate-400">Frecuentes</span>
          </h2>
        </div>

        {/* pr-20 para proteger el área de WhatsApp */}
        <motion.div
          className="space-y-4 md:pr-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((f, i) => (
            <motion.details
              key={i}
              variants={itemVariants}
              className="group border border-slate-100 bg-slate-50 rounded-[2rem] p-6 md:p-8 cursor-pointer hover:bg-white hover:border-red-600/20 transition-all duration-300"
            >
              <summary className="list-none flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-red-600 font-bold">
                    {f.ref}
                  </span>
                  <span className="text-lg md:text-xl font-black uppercase italic tracking-tight group-hover:text-red-600 transition-colors">
                    {f.q}
                  </span>
                </div>
                <span className="text-2xl text-slate-300 group-open:rotate-180 transition-transform">
                  ↓
                </span>
              </summary>
              <div className="mt-6 pt-6 border-t border-slate-200/50">
                <p className="text-slate-500 text-sm md:text-base leading-relaxed italic">
                  {f.a}
                </p>
              </div>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

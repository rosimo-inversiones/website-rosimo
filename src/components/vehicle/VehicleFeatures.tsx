"use client";
import { motion, Variants } from "framer-motion";

export default function VehicleFeaturesRosimo() {
  // Variantes para la aparición del texto técnico
  const textVariants: Variants = {
    hidden: { opacity: 0.2, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Columna Izquierda: Imagen Táctica Sticky */}
        <div className="lg:w-1/2 lg:sticky lg:top-32 h-fit">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
            <img
              src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1000"
              className="w-full h-[500px] lg:h-[700px] object-cover group-hover:scale-105 transition-transform duration-1000"
              alt="Rosimo Engineering Focus"
            />
            {/* Overlay de telemetría sutil */}
            <div className="absolute top-8 left-8 bg-red-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
              Live_Visual_Scan // RO-04
            </div>
          </div>
        </div>

        {/* Columna Derecha: Análisis de Ingeniería */}
        <div className="lg:w-1/2 space-y-32 py-10 lg:py-20">
          {[
            {
              title: "Ingeniería de Precisión",
              desc: "Componentes forjados bajo estándares aeroespaciales para un rendimiento constante.",
              ref: "RO-ENG-01",
            },
            {
              title: "Seguridad Inteligente",
              desc: "Sistemas de control de tracción Rosimo-Link v1 que se adaptan en milisegundos.",
              ref: "RO-SAFE-02",
            },
            {
              title: "Diseño Aero-Táctico",
              desc: "Líneas de flujo optimizadas en túnel de viento para reducir el arrastre dinámico.",
              ref: "RO-AERO-03",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.6 }}
              className="relative pl-8 border-l-2 border-slate-100 hover:border-red-600 transition-colors duration-500"
            >
              <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">
                {feature.ref} // Rosimo_Matrix
              </span>
              <h3 className="text-4xl lg:text-5xl font-black uppercase italic mb-6 tracking-tighter">
                {feature.title.split(" ")[0]}{" "}
                <span className="text-slate-400">
                  {feature.title.split(" ")[1]}
                </span>
              </h3>
              <p className="text-lg text-slate-500 leading-relaxed italic max-w-md">
                "{feature.desc}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

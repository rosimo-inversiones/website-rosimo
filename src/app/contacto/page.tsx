"use client";
import { motion } from "framer-motion";

export default function ContactoDinamico() {
  return (
    <main className="relative min-h-screen bg-white pt-40 pb-24 px-6 text-center">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* HEADER DE PROTOCOLO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          className="mb-20"
        >
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">
            Signal_Broadcasting // Rosimo_OS
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-slate-950 leading-none">
            Centro de <span className="text-slate-400">Contacto</span>
          </h1>
        </motion.div>

        {/* NODOS DE CONTACTO INTERACTIVOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              type: "Asesoría_Ventas",
              val: "ventas@rosimo.pe",
              status: "Online",
            },
            {
              type: "Soporte_Técnico",
              val: "tech@rosimo.pe",
              status: "Active",
            },
            {
              type: "Central_Lima",
              val: "+51 940 989 397",
              status: "Verified",
            },
          ].map((node, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: false }}
              className="p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] group hover:border-red-600 transition-all"
            >
              <div className="flex justify-center gap-2 mb-4">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600">
                  {node.status}
                </span>
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                {node.type}
              </h4>
              <p className="text-lg font-black italic text-slate-950">
                {node.val}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FORMULARIO DE INGENIERÍA CON SCANNER */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          viewport={{ once: false }}
          className="relative bg-white border border-slate-200 p-8 md:p-16 rounded-[4rem] shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20 animate-scan pointer-events-none" />

          <form className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 focus:border-red-600 outline-none font-mono text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 focus:border-red-600 outline-none font-mono text-sm"
              />
            </div>
            <textarea
              placeholder="Mensaje"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 h-48 focus:border-red-600 outline-none font-mono text-sm"
            ></textarea>

            <button className="w-full bg-red-600 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-slate-950 transition-all shadow-xl shadow-red-600/30">
              Enviar // RO-SEND_OS
            </button>
          </form>
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
    </main>
  );
}

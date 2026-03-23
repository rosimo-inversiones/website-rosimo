"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import NetworkStatus from "@/components/about/NetworkStatus";

export default function ContactoResponsive() {
  return (
    <main className="relative min-h-screen bg-white pt-32 md:pt-40 pb-0 text-center overflow-x-hidden">
      {/* BACKGROUND BLUEPRINT */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 px-6 pb-16 md:pb-24">
        {/* HEADER DE PROTOCOLO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">
            Signal_Broadcasting // Rosimo_OS
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-slate-950 leading-none">
            Centro de <span className="text-slate-300">Contacto</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 text-left items-stretch">
          {/* FICHA TÉCNICA DE SEDE (RESPONSIVE) */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-slate-950 text-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl h-full flex flex-col justify-between border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full pointer-events-none" />

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Sede_Central // RO-HQ-01
                  </span>
                </div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
                  Pucallpa
                </h2>
                <p className="text-slate-400 text-xs font-mono mb-8 italic">
                  "Centro neurálgico en el corazón de Ucayali."
                </p>

                <div className="space-y-4 mb-10">
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <span className="text-[8px] font-black uppercase tracking-widest text-red-600 block mb-1">
                      Línea_Ventas
                    </span>
                    <p className="text-sm font-bold font-mono text-white tracking-tight">
                      +51 940 989 397
                    </p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                      Protocolo_Email
                    </span>
                    <p className="text-sm font-bold font-mono text-white">
                      ventas@rosimo.pe
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/sedes/pucallpa"
                className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] text-center hover:bg-red-600 hover:text-white transition-all shadow-lg"
              >
                Ficha Técnica de Sede
              </Link>

              <div className="absolute top-0 left-0 w-full h-1 bg-red-600/30 opacity-0 group-hover:opacity-100 animate-scan pointer-events-none" />
            </div>
          </div>

          {/* FORMULARIO DE INGENIERÍA (RESPONSIVE) */}
          <div className="lg:col-span-8 bg-slate-50 border border-slate-200 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-950 mb-8">
              Transmisión_de_Datos
            </h3>

            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">
                    ID_Usuario
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 focus:border-red-600 outline-none font-mono text-xs transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">
                    Email_Protocol
                  </label>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 focus:border-red-600 outline-none font-mono text-xs transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">
                  Mensaje_Estructurado
                </label>
                <textarea
                  placeholder="Escribe tu requerimiento técnico..."
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 h-44 focus:border-red-600 outline-none font-mono text-xs resize-none transition-colors"
                ></textarea>
              </div>

              <button className="w-full md:w-auto md:px-16 bg-red-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-950 transition-all shadow-xl shadow-red-600/20">
                Enviar // RO-SEND_OS
              </button>
            </form>

            <div className="absolute top-0 left-0 w-full h-1 bg-red-600/10 animate-scan pointer-events-none" />
          </div>
        </div>
      </div>

      <NetworkStatus />

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

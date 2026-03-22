"use client";
import { motion } from "framer-motion";
import { Vehiculo } from "@/types";
import Link from "next/link";

export default function VehicleCTA({ vehiculo }: { vehiculo: Vehiculo }) {
  return (
    // SECCIÓN FONDO CLARO
    <section className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* MARGEN DE SEGURIDAD PARA WHATSAPP: lg:pr-28 */}
        <div className="lg:pr-28">
          {/* CARD TEMA DARK: Bloque táctico Rosimo */}
          <div className="bg-slate-950 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            {/* Grilla de plano (ahora sutil sobre fondo oscuro) */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
              }}
            />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">
                Final Action Protocol // Rosimo EngineeringMatrix
              </span>

              <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic leading-none tracking-tighter mb-8">
                ¿Listo para dominar <br className="hidden md:block" /> el
                asfalto?
              </h2>

              <p className="text-slate-400 mb-12 max-w-lg mx-auto text-sm md:text-base font-medium italic">
                Agenda una prueba de manejo para la {vehiculo.nombre} o solicita
                un plan de financiamiento personalizado Rosimo hoy mismo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contacto"
                  className="w-full sm:w-auto bg-red-600 text-white px-12 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-slate-950 transition-all shadow-xl shadow-red-600/20"
                >
                  Contactar Asesor
                </Link>
                <button className="w-full sm:w-auto bg-white/5 text-white border-2 border-white/10 px-12 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-slate-950 transition-all">
                  Descargar Ficha PDF
                </button>
              </div>
            </motion.div>

            {/* Decoración Táctica de Esquina (Texto blanco sutil) */}
            <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] pointer-events-none hidden md:block">
              <span className="text-9xl font-black italic text-white">
                ROSIMO
              </span>
            </div>

            {/* Animación de escaneo (Coherencia con FinanceSimulator) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600/10 animate-scan pointer-events-none" />
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
    </section>
  );
}

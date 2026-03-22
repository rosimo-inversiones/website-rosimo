"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VehicleCard({
  v,
  isSelected,
  mounted,
  toggleComparador,
  itemVariants,
}: any) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative bg-slate-950 rounded-[2rem] border border-slate-800 hover:border-red-600/50 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
    >
      <div className="relative h-56 overflow-hidden bg-slate-900 z-0">
        <img
          src={v.imagen}
          className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
          alt={v.nombre}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 bg-white text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
          ${mounted ? v.precio.toLocaleString() : v.precio}
        </div>
        <div className="absolute top-4 left-4">
          <span className="text-red-600 font-mono text-[8px] font-bold uppercase tracking-widest bg-slate-950/80 px-2 py-1 rounded">
            RO-UNIT-{v.id}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col grow relative z-10">
        <div className="mb-4">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
            {v.marca}
          </span>
          <h3 className="text-xl font-black text-white uppercase italic truncate group-hover:text-red-500 transition-colors">
            {v.nombre}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6 text-[9px] uppercase font-bold text-slate-400">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col items-start">
            <span className="text-slate-500 font-mono mb-1">Cilindrada</span>
            <span className="text-white">{v.specs.cc}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col items-start">
            <span className="text-slate-500 font-mono mb-1">Frenado</span>
            <span className="text-white truncate">{v.frenos}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/vehiculo/${v.slug}`}
            className="flex-1 text-center py-4 bg-red-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-colors"
          >
            Analizar Datos
          </Link>
          <button
            onClick={() => toggleComparador(v.id)}
            className={`w-14 flex items-center justify-center rounded-xl border transition-all ${isSelected ? "bg-white border-white text-slate-950" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
            title="Añadir al comparador"
          >
            ⚖️
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-red-600/30 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />
    </motion.div>
  );
}

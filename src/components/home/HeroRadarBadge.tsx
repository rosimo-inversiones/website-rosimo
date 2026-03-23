"use client";
import { motion } from "framer-motion";
import { SEDES } from "@/data/sedes";

export default function HeroRadarBadge() {
  // Extraemos dinámicamente la sede central
  const sedePrincipal = SEDES.find((s) => s.isCentral);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6"
    >
      {/* INDICADOR DE PULSO DE RADAR */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
      </span>

      {/* TEXTO DE ESTADO DEL SISTEMA */}
      <p className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/80">
        <span className="text-red-500">STATUS:</span> Sede Central{" "}
        {sedePrincipal?.nombre} ONLINE //
        <span className="text-slate-400 ml-1">
          Envíos a todo Ucayali y San Martín
        </span>
      </p>
    </motion.div>
  );
}

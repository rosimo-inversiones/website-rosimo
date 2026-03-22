"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useComparator } from "@/hooks/useComparator";
import { VEHICULOS } from "@/data/vehicles";

export default function ComparatorBar() {
  const { compararIds, eliminarDelComparador } = useComparator();
  const [mounted, setMounted] = useState(false);

  // Evita el error de Hydration asegurando que solo renderiza en el cliente
  useEffect(() => setMounted(true), []);

  if (!mounted || compararIds.length === 0) return null;

  const seleccionados = VEHICULOS.filter((v) => compararIds.includes(v.id));

  return (
    // FIX: Cambiamos 'bottom-6' por 'bottom-24' en móvil para esquivar el botón de WhatsApp.
    <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[80] bg-slate-950 text-white p-3 md:p-4 rounded-full md:rounded-[2rem] shadow-2xl flex items-center justify-between gap-3 md:gap-6 border border-white/10 w-[90%] sm:w-auto max-w-md md:max-w-none animate-in fade-in slide-in-from-bottom-4">
      {/* Sección Imágenes */}
      <div className="flex -space-x-3 md:-space-x-4">
        {seleccionados.map((v) => (
          <div key={v.id} className="relative group">
            <img
              src={v.imagen}
              className="w-10 h-10 md:w-16 md:h-16 rounded-full object-cover border-2 md:border-4 border-slate-900"
              alt={v.nombre}
            />
            {/* El botón en móvil siempre se ve (opacity-100), en desktop solo en hover (md:opacity-0 md:group-hover:opacity-100) */}
            <button
              onClick={() => eliminarDelComparador(v.id)}
              className="absolute -top-1 -right-1 md:-top-1 md:-right-1 bg-red-600 rounded-full w-4 h-4 md:w-6 md:h-6 flex items-center justify-center text-[8px] md:text-[10px] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Sección Texto */}
      <div className="pr-0 md:pr-4 flex-1">
        <p className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400">
          Comparador
        </p>
        <p className="text-xs md:text-sm font-bold leading-tight">
          <span className="md:hidden">{compararIds.length}/2</span>
          <span className="hidden md:inline">
            {compararIds.length}/2 Seleccionados
          </span>
        </p>
      </div>

      {/* Botón de Acción */}
      <Link
        href={`/comparar?ids=${compararIds.join(",")}`}
        className="bg-white text-slate-950 px-4 py-2 md:px-6 md:py-3 rounded-full font-black text-[9px] md:text-xs uppercase hover:bg-red-600 hover:text-white transition-all whitespace-nowrap"
      >
        Comparar
      </Link>
    </div>
  );
}

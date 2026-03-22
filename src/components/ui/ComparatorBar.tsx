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
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[80] bg-slate-950 text-white p-4 rounded-[2rem] shadow-2xl flex items-center gap-6 border border-white/10 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex -space-x-4">
        {seleccionados.map((v) => (
          <div key={v.id} className="relative group">
            <img
              src={v.imagen}
              className="w-16 h-16 rounded-full object-cover border-4 border-slate-900"
              alt={v.nombre}
            />
            <button
              onClick={() => eliminarDelComparador(v.id)}
              className="absolute -top-1 -right-1 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="pr-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Comparador
        </p>
        <p className="text-sm font-bold">
          {compararIds.length}/2 Seleccionados
        </p>
      </div>
      <Link
        href={`/comparar?ids=${compararIds.join(",")}`}
        className="bg-white text-slate-950 px-6 py-3 rounded-full font-black text-xs uppercase hover:bg-red-600 hover:text-white transition-all whitespace-nowrap"
      >
        Comparar Ahora
      </Link>
    </div>
  );
}

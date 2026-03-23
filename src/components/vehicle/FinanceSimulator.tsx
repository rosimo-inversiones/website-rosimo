"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Vehiculo } from "@/types";
import Link from "next/link";

export default function FinanceSimulatorRosimoDarkCard({
  vehiculo,
}: {
  vehiculo: Vehiculo;
}) {
  const [mounted, setMounted] = useState(false);
  const [cuotaInicialPct, setCuotaInicialPct] = useState(20);
  const [meses, setMeses] = useState(24);
  const tasaAnual = 12.5;

  useEffect(() => setMounted(true), []);

  const calculos = useMemo(() => {
    const precio = vehiculo.precio;
    const inicial = precio * (cuotaInicialPct / 100);
    const montoPrestar = precio - inicial;
    const tasaMensual = tasaAnual / 100 / 12;
    const cuotaMensual =
      (montoPrestar * (tasaMensual * Math.pow(1 + tasaMensual, meses))) /
      (Math.pow(1 + tasaMensual, meses) - 1);
    return { inicial, cuotaMensual, montoPrestar };
  }, [vehiculo.precio, cuotaInicialPct, meses]);

  const handleSolicitudTactica = () => {
    // Construimos los parámetros para que el Wizard los reciba
    const params = new URLSearchParams({
      moto: vehiculo.slug || "",
      inicial: calculos.inicial.toString(),
      meses: meses.toString(),
      cuota: Math.round(calculos.cuotaMensual).toString(),
    });

    window.location.href = `/financiamiento?${params.toString()}`;
  };

  if (!mounted) return null;

  return (
    // FONDO CLARO: Mantiene la limpieza visual del sitio
    <section className="py-24 bg-white px-6 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* MARGEN DE SEGURIDAD: pr-28 para proteger el área de WhatsApp */}
        <div className="lg:pr-28">
          {/* CARD TEMA DARK: Bloque táctico de Rosimo */}
          <div className="bg-slate-950 rounded-[3rem] overflow-hidden border border-white/5 flex flex-col lg:flex-row shadow-2xl">
            {/* PANEL DE CONTROL (Dark) */}
            <div className="flex-1 p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0a0a0a]">
              <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">
                Investment Planner // Rosimo_OS
              </span>
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-12">
                Financia tu <span className="text-white/20">Máquina</span>
              </h2>

              <div className="space-y-12">
                <div>
                  <div className="flex justify-between items-end mb-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Cuota Inicial ({cuotaInicialPct}%)
                    </label>
                    <span className="text-3xl font-black text-white italic tracking-tighter">
                      ${calculos.inicial.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="70"
                    step="5"
                    value={cuotaInicialPct}
                    onChange={(e) => setCuotaInicialPct(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 block">
                    Plazo Técnico (Meses)
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[12, 24, 36, 48].map((m) => (
                      <button
                        key={m}
                        onClick={() => setMeses(m)}
                        className={`py-4 rounded-xl text-[10px] font-black transition-all border ${
                          meses === m
                            ? "bg-red-600 border-red-600 text-white shadow-xl shadow-red-600/20"
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {m} MESES
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PANEL DE RESULTADOS (Dark Táctico) */}
            <div className="w-full lg:w-[40%] bg-slate-950 p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20 animate-pulse" />

              <div className="mb-10 relative z-10">
                <span className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.2em] block mb-2">
                  Cuota Mensual Estimada
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl lg:text-7xl font-black italic text-white tracking-tighter">
                    ${Math.round(calculos.cuotaMensual).toLocaleString()}
                  </span>
                  <span className="text-red-600 font-black uppercase text-[10px]">
                    USD
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-10 border-t border-white/10 pt-8 relative z-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Tasa Anual (TEA)</span>
                  <span className="text-emerald-500 font-mono">
                    {tasaAnual}%
                  </span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Monto a Financiar</span>
                  <span className="text-white">
                    ${calculos.montoPrestar.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* BOTÓN TÁCTICO DE REDIRECCIÓN */}
              <div className="mt-8 relative z-10">
                <button
                  onClick={handleSolicitudTactica}
                  className="w-full py-6 bg-white text-slate-950 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-500 shadow-xl"
                >
                  Iniciar Solicitud Rosimo_OS ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

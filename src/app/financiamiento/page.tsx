"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { VEHICULOS } from "@/data/vehicles";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CalculadoraPage() {
  const [mounted, setMounted] = useState(false);
  const container = useRef(null);

  // Estados de la calculadora
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(
    VEHICULOS[0],
  );
  const [cuotaInicialPct, setCuotaInicialPct] = useState(20); // Porcentaje
  const [meses, setMeses] = useState(24);
  const tasaAnual = 12.5; // Tasa de interés fija (ejemplo)

  useEffect(() => setMounted(true), []);

  // Cálculos financieros
  const calculos = useMemo(() => {
    const precio = vehiculoSeleccionado.precio;
    const inicial = precio * (cuotaInicialPct / 100);
    const montoPrestar = precio - inicial;
    const tasaMensual = tasaAnual / 100 / 12;

    // Fórmula de amortización: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const cuotaMensual =
      (montoPrestar * (tasaMensual * Math.pow(1 + tasaMensual, meses))) /
      (Math.pow(1 + tasaMensual, meses) - 1);

    return {
      inicial,
      montoPrestar,
      cuotaMensual,
      totalPagar: cuotaMensual * meses + inicial,
    };
  }, [vehiculoSeleccionado, cuotaInicialPct, meses]);

  useGSAP(
    () => {
      if (mounted) {
        gsap.fromTo(
          ".calc-card",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        );
      }
    },
    { scope: container, dependencies: [mounted] },
  );

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola AYR STEEL, me interesa financiar la ${vehiculoSeleccionado.nombre}. ` +
        `Calculé una cuota inicial de $${calculos.inicial.toLocaleString()} a ${meses} meses.`,
    );
    window.open(`https://wa.me/51900000000?text=${msg}`, "_blank");
  };

  if (!mounted) return null;

  return (
    <div ref={container} className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
            Plan de <span className="text-red-600">Vuelo</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
            Calculadora de Financiamiento Pro
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* PANEL DE CONFIGURACIÓN (IZQUIERDA) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="calc-card bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8 border-b border-slate-100 pb-4">
                1. Selecciona tu Máquina
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select
                  onChange={(e) =>
                    setVehiculoSeleccionado(
                      VEHICULOS.find((v) => v.id === Number(e.target.value))!,
                    )
                  }
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-red-600 outline-none appearance-none"
                >
                  {VEHICULOS.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.nombre} (${v.precio.toLocaleString()})
                    </option>
                  ))}
                </select>
                <div className="h-32 rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    src={vehiculoSeleccionado.imagen}
                    className="w-full h-full object-cover opacity-60"
                    alt="Preview"
                  />
                </div>
              </div>
            </div>

            <div className="calc-card bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-8 border-b border-slate-100 pb-4">
                2. Ajusta los Términos
              </h3>

              {/* Slider Cuota Inicial */}
              <div className="mb-10">
                <div className="flex justify-between mb-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Cuota Inicial ({cuotaInicialPct}%)
                  </label>
                  <span className="text-sm font-black text-slate-900">
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
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Slider Meses */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Plazo (Meses)
                  </label>
                  <span className="text-sm font-black text-slate-900">
                    {meses} meses
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMeses(m)}
                      className={`py-3 rounded-xl text-xs font-black transition-all ${meses === m ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DE RESULTADOS (DERECHA) */}
          <div className="lg:col-span-5">
            <div className="calc-card bg-slate-950 rounded-[3rem] p-10 text-white sticky top-32 shadow-2xl shadow-slate-950/40 border border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600 mb-2 block">
                Resumen de Pago
              </span>
              <div className="mb-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                  Cuota Mensual Estimada
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black italic tracking-tighter">
                    ${Math.round(calculos.cuotaMensual).toLocaleString()}
                  </span>
                  <span className="text-slate-500 font-bold uppercase text-[10px]">
                    / mes
                  </span>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-800 pt-8 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                    Precio de Lista
                  </span>
                  <span className="font-black">
                    ${vehiculoSeleccionado.precio.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                    Tasa Especial (TEA)
                  </span>
                  <span className="font-black text-emerald-400">
                    {tasaAnual}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                    Total a Financiar
                  </span>
                  <span className="font-black">
                    ${calculos.montoPrestar.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all duration-300 shadow-xl shadow-red-600/20"
              >
                Solicitar Crédito
              </button>

              <p className="mt-6 text-[9px] text-slate-500 text-center uppercase font-bold tracking-widest leading-relaxed">
                * Sujeto a evaluación crediticia. <br /> Imagen referencial del
                modelo {vehiculoSeleccionado.nombre}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

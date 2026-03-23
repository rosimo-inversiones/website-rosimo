"use client";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { VEHICULOS } from "@/data/vehicles";
import { useSearchParams } from "next/navigation";

type FormData = {
  vehiculo: string;
  cuotaInicial: string;
  meses: string;
  ingresos: string;
  situacion: string;
  historial: string;
  nombre: string;
  dni: string;
  whatsapp: string;
};

export default function FinanceWizard() {
  return (
    <Suspense
      fallback={
        <div className="text-white font-mono text-center py-20 text-[10px] animate-pulse">
          CARGANDO_SISTEMA_FINANCIERO...
        </div>
      }
    >
      <WizardContent />
    </Suspense>
  );
}

function WizardContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    vehiculo: "",
    cuotaInicial: "",
    meses: "24",
    ingresos: "",
    situacion: "",
    historial: "",
    nombre: "",
    dni: "",
    whatsapp: "",
  });

  // SINCRONIZACIÓN TÁCTICA CON EL SIMULADOR
  useEffect(() => {
    const motoSlug = searchParams.get("moto");
    const inicial = searchParams.get("inicial");
    const meses = searchParams.get("meses");

    const motoEncontrada = VEHICULOS.find((v) => v.slug === motoSlug);

    setFormData((prev) => ({
      ...prev,
      vehiculo: motoEncontrada
        ? motoEncontrada.nombre
        : VEHICULOS[0]?.nombre || "",
      cuotaInicial: inicial || "",
      meses: meses || "24",
    }));
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/financiamiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) setIsSuccess(true);
      else alert("Error de transmisión.");
    } catch (error) {
      alert("Error crítico de red.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants: Variants = {
    enter: { x: 20, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-950 p-12 rounded-[2.5rem] border border-emerald-500/30 text-center max-w-2xl mx-auto shadow-2xl">
        <span className="text-5xl mb-6 block">✅</span>
        <h3 className="text-3xl font-black uppercase italic text-white mb-4">
          Perfil Recibido
        </h3>
        <p className="text-slate-400 mb-8">
          Un especialista de la Sede Pucallpa evaluará tu solicitud para la{" "}
          <strong>{formData.vehiculo}</strong>.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-white"
        >
          ← Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 p-6 md:p-12 rounded-[2.5rem] border border-white/10 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="relative z-10 mb-8 border-b border-white/10 pb-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block">
              Rosimo_OS // Assessment
            </span>
            <h2 className="text-3xl font-black uppercase italic text-white">
              Fase 0{step} <span className="text-slate-500">/ 03</span>
            </h2>
          </div>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-red-600"
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.form
          key={step}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          onSubmit={
            step === 3
              ? handleSubmit
              : (e) => {
                  e.preventDefault();
                  setStep((s) => s + 1);
                }
          }
        >
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                  Máquina
                </label>
                <select
                  name="vehiculo"
                  value={formData.vehiculo}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                >
                  {VEHICULOS.map((v) => (
                    <option
                      key={v.slug}
                      value={v.nombre}
                      className="bg-slate-900"
                    >
                      {v.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                    Cuota Inicial (S/)
                  </label>
                  <input
                    type="number"
                    name="cuotaInicial"
                    value={formData.cuotaInicial}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                    Plazo
                  </label>
                  <select
                    name="meses"
                    value={formData.meses}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono"
                  >
                    <option value="12" className="bg-slate-900">
                      12 Meses
                    </option>
                    <option value="24" className="bg-slate-900">
                      24 Meses
                    </option>
                    <option value="36" className="bg-slate-900">
                      36 Meses
                    </option>
                    <option value="48" className="bg-slate-900">
                      48 Meses
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                  Ingresos Mensuales
                </label>
                <select
                  name="ingresos"
                  value={formData.ingresos}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                >
                  <option value="" className="bg-slate-900">
                    Seleccionar...
                  </option>
                  <option value="1500-3000" className="bg-slate-900">
                    S/ 1,500 - S/ 3,000
                  </option>
                  <option value="3000-5000" className="bg-slate-900">
                    S/ 3,000 - S/ 5,000
                  </option>
                  <option value="5000+" className="bg-slate-900">
                    Más de S/ 5,000
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                    Situación
                  </label>
                  <select
                    name="situacion"
                    value={formData.situacion}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="" className="bg-slate-900">
                      Seleccionar...
                    </option>
                    <option value="Dependiente" className="bg-slate-900">
                      Planilla
                    </option>
                    <option value="Independiente" className="bg-slate-900">
                      Independiente
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                    Historial
                  </label>
                  <select
                    name="historial"
                    value={formData.historial}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="" className="bg-slate-900">
                      Seleccionar...
                    </option>
                    <option value="Excelente" className="bg-slate-900">
                      Excelente
                    </option>
                    <option value="Sin Historial" className="bg-slate-900">
                      Sin Historial
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                    DNI
                  </label>
                  <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-8 mt-8 flex justify-between border-t border-white/5">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="text-[10px] font-black uppercase text-slate-500 hover:text-white"
              >
                ← Atrás
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="ml-auto bg-red-600 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all"
            >
              {isSubmitting
                ? "Procesando..."
                : step < 3
                  ? "Siguiente →"
                  : "Enviar Solicitud →"}
            </button>
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}

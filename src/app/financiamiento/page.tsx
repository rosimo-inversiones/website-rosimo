import FinanceWizard from "@/components/finance/FinanceWizard";

export const metadata = {
  title: "Financiamiento Táctico | Rosimo",
  description:
    "Simulador de evaluación crediticia para vehículos de alto rendimiento en Pucallpa.",
};

export default function FinanciamientoPage() {
  return (
    <main className="relative min-h-screen bg-white pt-32 pb-24 overflow-hidden">
      {/* SELLO DE AGUA TÁCTICO ROSIMO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
        <span className="text-[15vw] font-black uppercase text-slate-900/[0.03] rotate-[-10deg] leading-none text-center">
          Rosimo
          <br />
          Certified
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER DE LA PÁGINA */}
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block font-black">
            Rosimo_OS // Credit System
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-950 leading-[0.85] mb-6">
            Aprobación <span className="text-slate-200">Táctica</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Complete el escaneo de perfil socioeconómico. Nuestro sistema
            encriptado procesará su solicitud para asignarle la línea de crédito
            exacta para su nueva máquina.
          </p>
        </div>

        {/* COMPONENTE DE FORMULARIO */}
        <FinanceWizard />
      </div>
    </main>
  );
}

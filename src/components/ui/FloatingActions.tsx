"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FloatingActions() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Detectamos si estamos en una página de detalle de vehículo
  const isVehiclePage = pathname.startsWith("/vehiculo/");

  // Función para compartir usando la API nativa del navegador
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mira esta máquina en AYR STEEL",
          text: "Encontré este vehículo increíble, échale un vistazo.",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error al compartir", err);
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150] flex flex-col-reverse items-center gap-4">
      {/* BOTÓN PRINCIPAL (Gatillo) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen
            ? "bg-slate-900 rotate-45"
            : "bg-red-600 hover:scale-110 shadow-red-600/20"
        }`}
      >
        <span className="text-white text-3xl font-light">
          {isOpen ? "✕" : "＋"}
        </span>
      </button>

      {/* SUB-BOTONES (El abanico de acciones) */}
      <div
        className={`flex flex-col gap-4 transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* ACCIÓN: COMPARTIR (Solo en detalles) */}
        {isVehiclePage && (
          <ActionButton
            label="Compartir"
            icon="📤"
            onClick={handleShare}
            color="bg-blue-600"
          />
        )}

        {/* ACCIÓN: FINANCIAMIENTO */}
        <ActionButton
          label="Financiamiento"
          icon="💰"
          onClick={() => (window.location.href = "/financiamiento")}
          color="bg-slate-900"
        />

        {/* ACCIÓN: WHATSAPP */}
        <ActionButton
          label="Asesoría"
          icon="💬"
          onClick={() => window.open("https://wa.me/51900000000", "_blank")}
          color="bg-emerald-600"
        />
      </div>
    </div>
  );
}

function ActionButton({ label, icon, onClick, color }: any) {
  return (
    <div className="flex items-center gap-3 group">
      <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
      <button
        onClick={onClick}
        className={`w-14 h-14 ${color} rounded-full flex items-center justify-center text-xl shadow-xl hover:scale-110 transition-transform`}
      >
        {icon}
      </button>
    </div>
  );
}

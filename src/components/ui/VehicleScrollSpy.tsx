"use client";
import { useState, useEffect } from "react";

// Definimos los identificadores tácticos exactos de tu page.tsx
const SECTIONS = [
  { id: "hero", label: "01_OVERVIEW" },
  { id: "specs", label: "02_INGENIERÍA" },
  { id: "gallery", label: "03_VISUAL" },
  { id: "finance", label: "04_FINANZAS" },
  { id: "faq", label: "05_SOPORTE" },
];

export default function VehicleScrollSpy() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  // EFECTO 1: Detectar la sección visible al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si la sección entra en el 40% central de la pantalla, la marcamos como activa
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // Margen táctico para mayor precisión
        threshold: 0,
      },
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // FUNCIÓN TÁCTICA: Manejar el clic y dirigir suavemente
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-[80] flex-col items-end gap-6 pointer-events-none">
      {/* Línea conectora de fondo */}
      <div className="h-full w-[1px] bg-slate-200/50 absolute right-2.5 top-0 bottom-0 -z-10" />

      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;

        return (
          // Convertimos cada indicador en un botón táctico
          <button
            key={section.id}
            onClick={() => handleScrollToSection(section.id)}
            className="flex items-center gap-4 group pointer-events-auto"
          >
            {/* Texto de la sección con hover táctico */}
            <span
              className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300
                ${isActive ? "text-slate-950 translate-x-0 opacity-100" : "text-slate-400 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-red-600"}
              `}
            >
              {section.label}
            </span>

            {/* Punto indicador interactivo (ver image_0.png) */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 
              ${isActive ? "bg-red-600/10 border border-red-600/30" : "bg-white border border-slate-200 group-hover:border-red-600 group-hover:scale-110"}`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 
                ${isActive ? "bg-red-600 scale-100" : "bg-slate-300 scale-50 group-hover:bg-red-600 group-hover:scale-100"}`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

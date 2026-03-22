"use client";
import { useState, useEffect, useRef } from "react";
import { Vehiculo } from "@/types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const FONDOS_CONTEXTUALES: Record<string, string> = {
  Naked:
    "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1600",
  Deportiva:
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1600",
  Custom:
    "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1600",
  "Dual-Sport":
    "https://images.unsplash.com/photo-1614165933388-9b55d31bc89d?q=80&w=1600",
  Utilitaria:
    "https://images.unsplash.com/photo-1533059434873-10878e312781?q=80&w=1600",
  default:
    "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=1600",
};

export default function VehicleHeroKinetic({
  vehiculo,
}: {
  vehiculo: Vehiculo;
}) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const vehicleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useGSAP(
    () => {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(vehicleRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(textRef.current, {
          x: -xPos * 0.5,
          y: -yPos * 0.5,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef, dependencies: [mounted] },
  );

  const fondoUrl =
    vehiculo.subtipo && FONDOS_CONTEXTUALES[vehiculo.subtipo]
      ? FONDOS_CONTEXTUALES[vehiculo.subtipo]
      : FONDOS_CONTEXTUALES.default;

  return (
    <section
      ref={containerRef}
      className="relative h-[90vh] lg:h-screen bg-slate-950 overflow-hidden flex items-center justify-center"
    >
      {/* 1. FONDO CONTEXTUAL */}
      <div className="absolute inset-0 z-0">
        <img
          src={fondoUrl}
          className="w-full h-full object-cover opacity-20 grayscale"
          alt="Contexto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

      {/* 2. TEXTO GIGANTE (Optimizado para Mobile: ahora es responsivo) */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-10 select-none pointer-events-none"
      >
        <h2 className="text-[25vw] md:text-[15vw] font-black uppercase italic leading-none text-transparent stroke-text opacity-10 whitespace-nowrap">
          {vehiculo.nombre}
        </h2>
      </div>

      {/* 3. IMAGEN DEL VEHÍCULO */}
      <div
        ref={vehicleRef}
        className="relative z-20 w-full max-w-6xl px-6 flex items-center justify-center"
      >
        <img
          src={vehiculo.imagen}
          alt={vehiculo.nombre}
          className="max-h-[50vh] md:max-h-[75vh] object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* 4. INFORMACIÓN TÁCTICA (CORRECCIÓN DE SOLAPAMIENTO) */}
      <div className="absolute bottom-10 md:bottom-12 left-0 w-full z-30 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
        <div className="text-center md:text-left">
          <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">
            {vehiculo.marca} // {vehiculo.subtipo}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none tracking-tighter">
            {vehiculo.nombre}
          </h1>
        </div>

        {/* pr-20 en desktop añade espacio para el botón de WhatsApp */}
        <div className="flex flex-col items-center md:items-end md:pr-20 lg:pr-24 pb-4 md:pb-0">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
              Inversión:
            </span>
            <span className="text-4xl md:text-5xl font-black text-white italic">
              ${mounted ? vehiculo.precio.toLocaleString() : vehiculo.precio}
            </span>
          </div>
          <Link
            href="/contacto"
            className="bg-white text-slate-950 px-8 md:px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-500 shadow-xl"
          >
            Adquirir Máquina
          </Link>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
        @media (min-width: 768px) {
          .stroke-text {
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
          }
        }
      `}</style>
    </section>
  );
}

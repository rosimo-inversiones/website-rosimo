"use client";
import React, { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Vehiculo } from "@/types";
import { VEHICULOS } from "@/data/vehicles";

interface WhatsAppProps {
  vehiculo?: Vehiculo; // Opcional: se pasa solo en la página de detalle
}

export default function WhatsAppFloating({ vehiculo }: WhatsAppProps) {
  const params = useParams();
  const pathname = usePathname();
  const phoneNumber = "+51941142651";

  // 1. Lógica de Mensaje Dinámico (Contextual Protocol)
  const dynamicMessage = useMemo(() => {
    // Caso A: Página de un vehículo específico

    if (params?.slug) {
      const vehiculo = VEHICULOS.find((v) => v.slug === params.slug);
      if (vehiculo) {
        return `Hola! Estoy interesado en la ${vehiculo.nombre} (${vehiculo.marca}). ¿Podrían darme más detalles?`;
      }
    }

    // Caso B: Página de Financiamiento
    if (pathname.includes("financiamiento")) {
      return "Hola Rosimo, estoy interesado en los planes de financiamiento. Me gustaría solicitar una evaluación crediticia para adquirir una máquina.";
    }

    // Caso C: Lobby de Catálogo
    if (pathname.includes("catalogo")) {
      return "Hola Rosimo, estoy revisando el catálogo y me gustaría saber qué modelos tienen disponibilidad inmediata en tienda.";
    }

    // Caso D: Página de Contacto o Inicio
    return "Hola Rosimo, me gustaría recibir asesoría personalizada sobre sus vehículos y servicios técnicos.";
  }, [pathname, vehiculo]);

  const whatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(dynamicMessage)}`;

  // 2. Variantes de Animación: Tactical Sonar Ping
  const rippleVariants: Variants = {
    hidden: { scale: 1, opacity: 0.5 },
    visible: {
      scale: 2.2,
      opacity: 0,
      transition: {
        duration: 2,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 4, // Pulso cada 4 segundos para no distraer en exceso
      },
    },
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex items-center justify-center pointer-events-none">
      {/* ANILLOS DE SONAR TÁCTICOS */}
      <motion.div
        className="absolute w-16 h-16 bg-red-600/20 rounded-full blur-[2px]"
        variants={rippleVariants}
        initial="hidden"
        animate="visible"
      />

      {/* BOTÓN TÁCTICO: "Rosimo Beacon" */}
      <motion.a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative pointer-events-auto h-16 w-16 bg-slate-950 rounded-[1.5rem] border border-white/10 flex items-center justify-center shadow-2xl transition-all duration-500 hover:border-red-600 hover:shadow-red-600/30"
      >
        {/* Indicador de Estado LIVE */}
        {/* <div className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-slate-950"></span>
        </div> */}

        {/* LOGO WHATSAPP */}
        <svg
          viewBox="0 0 448 512"
          className="h-8 w-8 text-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.4)] transition-transform duration-500 group-hover:scale-110"
          fill="currentColor"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3.9 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.6-2.8-23.5-8.7-44.7-27.6-16.5-14.7-27.6-32.8-30.8-38.4-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.6-6.5 8.3-9.7 2.8-3.2 3.7-5.6 5.6-9.3 1.9-3.7 1-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>

        {/* ETIQUETA FLOTANTE (Solo Desktop al Hover) */}
        <div className="absolute right-20 bg-slate-950 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
          Protocol_Asesor // <span className="text-red-600">Active</span>
        </div>
      </motion.a>
    </div>
  );
}

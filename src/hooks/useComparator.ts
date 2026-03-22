"use client";
import { useState, useEffect } from "react";

export function useComparator() {
  const [compararIds, setCompararIds] = useState<number[]>([]);

  useEffect(() => {
    // 1. Cargar estado inicial al montar
    const saved = localStorage.getItem("comparator");
    if (saved) {
      try {
        setCompararIds(JSON.parse(saved));
      } catch (e) {}
    }

    // 2. Escuchar cambios de otros componentes para mantener sincronía
    const handleSync = () => {
      const current = localStorage.getItem("comparator");
      if (current) {
        setCompararIds(JSON.parse(current));
      } else {
        setCompararIds([]);
      }
    };

    window.addEventListener("comparator-updated", handleSync);
    return () => window.removeEventListener("comparator-updated", handleSync);
  }, []);

  const toggleComparador = (id: number) => {
    // Leemos la fuente de la verdad actual
    const saved = localStorage.getItem("comparator");
    let currentIds: number[] = saved ? JSON.parse(saved) : [];

    let nuevo: number[];
    if (currentIds.includes(id)) {
      nuevo = currentIds.filter((i) => i !== id); // Lo quita
    } else {
      if (currentIds.length >= 2) {
        alert("Máximo 2 vehículos para comparar");
        return;
      }
      nuevo = [...currentIds, id]; // Lo agrega
    }

    // Efectos secundarios FUERA del setState (¡Esto soluciona el error!)
    localStorage.setItem("comparator", JSON.stringify(nuevo));
    setCompararIds(nuevo);
    window.dispatchEvent(new Event("comparator-updated"));
  };

  const agregarAlComparador = (id: number) => {
    const saved = localStorage.getItem("comparator");
    let currentIds: number[] = saved ? JSON.parse(saved) : [];

    if (currentIds.includes(id)) return;
    if (currentIds.length >= 3) {
      alert("Máximo 3 vehículos");
      return;
    }

    const nuevo = [...currentIds, id];
    localStorage.setItem("comparator", JSON.stringify(nuevo));
    setCompararIds(nuevo);
    window.dispatchEvent(new Event("comparator-updated"));
  };

  const eliminarDelComparador = (id: number) => {
    const saved = localStorage.getItem("comparator");
    let currentIds: number[] = saved ? JSON.parse(saved) : [];

    const nuevo = currentIds.filter((i) => i !== id);
    localStorage.setItem("comparator", JSON.stringify(nuevo));
    setCompararIds(nuevo);
    window.dispatchEvent(new Event("comparator-updated"));
  };

  return {
    compararIds,
    agregarAlComparador,
    eliminarDelComparador,
    toggleComparador,
  };
}

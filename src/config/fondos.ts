// 1. DICCIONARIO DE FONDOS CONTEXTUALES SEGÚN EL SUBTIPO
export const FONDOS_CONTEXTUALES: { [key: string]: string } = {
  // Fondos para Motos
  Naked:
    "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1600", // Calle urbana de noche
  Deportiva:
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1600", // Circuito de carreras
  Custom:
    "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1600", // Ruta escénica/desierto
  "Dual-Sport":
    "https://images.unsplash.com/photo-1614165933388-9b55d31bc89d?q=80&w=1600", // Sendero de montaña/tierra

  // Fondos para Trimotos y Cuatrimotos
  Recreativa:
    "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1600", // Paseo costero
  Utilitaria:
    "https://images.unsplash.com/photo-1533059434873-10878e312781?q=80&w=1600", // Campo/Trabajo off-road

  // Fondo por defecto si no se encuentra el subtipo
  default:
    "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=1600",
};

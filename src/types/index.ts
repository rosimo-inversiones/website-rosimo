export interface Vehiculo {
  id: number;
  slug: string; // <-- Importante para URLs SEO
  nombre: string;
  marca: "Honda" | "Yamaha" | "Kawasaki" | "Suzuki" | "Can-Am" | "Polaris";
  tipo: "moto" | "trimoto" | "cuatrimoto";

  // Campos para filtros avanzados y secciones de estilo
  subtipo?:
    | "Deportiva"
    | "Naked"
    | "Custom"
    | "Dual-Sport"
    | "Touring"
    | "Utilitaria"
    | "Recreativa"; // Obligatorio para las tarjetas de estilo
  posicion: "Erguida" | "Deportiva" | "Custom";
  transmision: "Manual" | "Automática";
  frenos: "Disco ABS" | "Tambor" | "Disco Doble";

  precio: number;
  imagen: string;
  fotos: string[];

  // Especificaciones técnicas detalladas
  specs: {
    cc: string; // Cilindrada (ej: "471cc")
    transmision: string; // Detalle (ej: "6 velocidades" o "CVT")
    peso: string; // Peso en orden de marcha (ej: "189kg")
    potencia?: string; // Opcional
  };

  descripcion: string;
  videoEncendido: string;
}

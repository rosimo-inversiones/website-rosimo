import HeroCarousel from "@/components/home/HeroCarousel";
import VehicleTypes from "@/components/home/VehicleTypes";
import MotoStyles from "@/components/home/MotoStyles";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import ImmersiveSection from "@/components/home/ImmersiveSection";
import BrandsBentoGrid from "@/components/home/BrandsBentoGrid";

export default function HomePage() {
  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Impacto visual interactivo inicial (Core Business: Motos focus) */}
      <HeroCarousel />

      {/* 2. Jerarquía de líneas de negocio (Bento Grid) */}
      <VehicleTypes />

      {/* 3. Profundidad en el Core Business (Categorías de Motos) */}
      <MotoStyles />

      {/* 4. Profesionalismo y Alianzas (Marcas) */}
      <BrandsBentoGrid />

      {/* 5. Modelos estrella (Mezcla de Core y Secundarios) */}
      <FeaturedVehicles />

      {/* 6. Cierre emocional/Llamado a la acción inmersivo */}
      <ImmersiveSection />
    </div>
  );
}

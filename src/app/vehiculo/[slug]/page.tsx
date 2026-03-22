import { notFound } from "next/navigation";
import VehicleHero from "@/components/vehicle/VehicleHero";
import VehicleSpecs from "@/components/vehicle/VehicleSpecs";
import VehicleCTA from "@/components/vehicle/VehicleCTA";
import { VEHICULOS } from "@/data/vehicles";
import VehicleFAQ from "@/components/vehicle/VehicleFAQ";
import VehicleFeatures from "@/components/vehicle/VehicleFeatures";
import VehicleGallery from "@/components/vehicle/VehicleGallery";
import FinanceSimulator from "@/components/vehicle/FinanceSimulator";

// 1. Generar los parámetros estáticos (SEO y Velocidad)
export async function generateStaticParams() {
  return VEHICULOS.map((v) => ({
    slug: v.slug,
  }));
}

// 2. Componente de Página (Server Component por defecto)
export default async function VehiculoDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // En Next.js 16+, params es una Promise

  const vehiculo = VEHICULOS.find((v) => v.slug === slug);

  if (!vehiculo) {
    notFound();
  }

  return (
    <article className="bg-white">
      <VehicleHero vehiculo={vehiculo} />
      <VehicleSpecs vehiculo={vehiculo} />
      <VehicleGallery vehiculo={vehiculo} />
      <FinanceSimulator vehiculo={vehiculo} />
      <VehicleFeatures />
      <VehicleFAQ vehiculo={vehiculo} />
      <VehicleCTA vehiculo={vehiculo} />
    </article>
  );
}

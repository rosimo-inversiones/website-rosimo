import { notFound } from "next/navigation";
import VehicleHero from "@/components/vehicle/VehicleHero";
import VehicleSpecs from "@/components/vehicle/VehicleSpecs";
import VehicleCTA from "@/components/vehicle/VehicleCTA";
import { VEHICULOS } from "@/data/vehicles";
import VehicleFAQ from "@/components/vehicle/VehicleFAQ";
import VehicleFeatures from "@/components/vehicle/VehicleFeatures";
import VehicleGallery from "@/components/vehicle/VehicleGallery";
import FinanceSimulator from "@/components/vehicle/FinanceSimulator";
import VehicleScrollSpy from "@/components/ui/VehicleScrollSpy"; // IMPORTAMOS EL RADAR

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
  const { slug } = await params;

  const vehiculo = VEHICULOS.find((v) => v.slug === slug);

  if (!vehiculo) {
    notFound();
  }

  return (
    <article className="bg-white relative">
      {/* INYECTAMOS EL RADAR FLOTANTE */}
      <VehicleScrollSpy />

      {/* ENVOLVEMOS CADA COMPONENTE EN UN SECTION CON SU ID TÁCTICO */}
      <section id="hero">
        <VehicleHero vehiculo={vehiculo} />
      </section>

      <section id="specs">
        <VehicleSpecs vehiculo={vehiculo} />
      </section>

      <section id="gallery">
        <VehicleGallery vehiculo={vehiculo} />
      </section>

      <section id="finance">
        <FinanceSimulator vehiculo={vehiculo} />
      </section>

      <section id="faq">
        <VehicleFeatures />
        <VehicleFAQ vehiculo={vehiculo} />
      </section>

      {/* El CTA lo dejamos fuera del radar, es el cierre natural */}
      <VehicleCTA vehiculo={vehiculo} />
    </article>
  );
}

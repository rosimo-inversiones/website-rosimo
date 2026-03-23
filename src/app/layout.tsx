import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/layout/Footer";
import WhatsAppFloating from "@/components/ui/WhatsAppFloating";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Rosimo | Concesionaria Premium en Pucallpa",
  description:
    "Venta de cuatrimotos, trimotos y motocicletas de alta gama en Ucayali. Sede Central en Pucallpa con envíos certificados.",
  keywords: [
    "Motos Pucallpa",
    "Cuatrimotos Ucayali",
    "Venta de motos Perú",
    "Rosimo Pucallpa",
    "Yamaha Pucallpa",
  ],
  // OpenGraph para que al compartir por WhatsApp se vea profesional
  openGraph: {
    title: "Rosimo - Centro de Ingeniería y Ventas",
    description:
      "Sede Central Pucallpa: Especialistas en vehículos todoterreno.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Rosimo Sede Central",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. 3 de octubre",
    addressLocality: "Pucallpa",
    addressRegion: "Ucayali",
    addressCountry: "PE",
  },
  telephone: "+51 940 989 397",
  url: "https://rosimo.pe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-slate-900 antialiased min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* El botón flotante vive aquí */}
        <WhatsAppFloating />
      </body>
    </html>
  );
}

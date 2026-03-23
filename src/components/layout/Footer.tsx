"use client";
import Link from "next/link";

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* TEXTURA DE CARBONO DE FONDO */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-center md:text-left">
          {/* COLUMNA 1: BRANDING TÁCTICO */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <Link
              href="/"
              className="text-3xl font-black text-white tracking-tighter block uppercase italic"
            >
              ROSIMO<span className="text-red-600">MOTOS</span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed italic max-w-[250px]">
              "Domina el asfalto y la tierra con la ingeniería más avanzada.
              Líderes en vehículos de alto rendimiento desde 2010."
            </p>
          </div>

          {/* COLUMNA 2: INVENTORY MATRIX */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
              Inventory_Matrix
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                { name: "Motos", path: "/catalogo/motos" },
                { name: "Trimotos", path: "/catalogo/trimotos" },
                { name: "Cuatrimotos", path: "/catalogo/cuatrimotos" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="hidden md:block w-0 h-px bg-red-600 group-hover:w-4 transition-all" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* COLUMNA 3: SUPPORT DATABASE */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
              Support_Database
            </h4>
            <nav className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Link
                href="/contacto"
                className="hover:text-red-600 transition-colors"
              >
                Agendar Mantenimiento
              </Link>
              <Link href="#" className="hover:text-red-600 transition-colors">
                Garantía Extendida
              </Link>
              <Link href="#" className="hover:text-red-600 transition-colors">
                FAQs
              </Link>
            </nav>
          </div>

          {/* COLUMNA 4: ACTIVE SIGNAL (Ubicación Estratégica) */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
              Active_Signal
            </h4>
            <div className="space-y-3 text-center md:text-left">
              {/* Etiqueta Táctica de Sede Central */}
              <span className="bg-white/10 text-white px-3 py-1.5 rounded-md text-[8px] font-mono uppercase tracking-[0.2em] inline-block mb-1 border border-white/5">
                RO-HQ-01 // Sede Central
              </span>

              <p className="text-[11px] font-mono text-slate-300">
                📍 Jr. 3 de Octubre, PUCALLPA - UCAYALI
              </p>
              <p className="text-[11px] font-mono text-slate-300">
                📞 +51 900 000 000
              </p>

              <div className="flex justify-center md:justify-start gap-4 pt-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-[10px] font-bold">
                  IG
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer text-[10px] font-bold">
                  FB
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LÍNEA FINAL DE VERIFICACIÓN */}
        <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          <p className="text-[9px] font-mono uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-600">
            © {anioActual} ROSIMO_Concessionaire
          </p>

          {/* Navegación legal y System Check */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
              <Link href="#" className="hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Términos
              </Link>
            </div>

            <div className="hidden md:block w-px h-4 bg-white/10" />

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-white italic">
                Verified by GSM
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

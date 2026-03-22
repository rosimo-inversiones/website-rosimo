"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { VEHICULOS } from "@/data/vehicles";
import { useComparator } from "@/hooks/useComparator";

const SPECS = [
  { id: "cc", label: "Cilindrada", better: "higher", unit: "cc" },
  { id: "peso", label: "Peso Total", better: "lower", unit: "kg" },
  {
    id: "precio",
    label: "Inversión",
    better: "lower",
    unit: "$",
    isCurrency: true,
  },
  { id: "transmision", label: "Transmisión", type: "text" },
  { id: "frenos", label: "Frenado", type: "text" },
];

export default function CompararModeloPro() {
  const { compararIds, eliminarDelComparador } = useComparator();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Estado para el modal de video
  const container = useRef(null);

  useEffect(() => setMounted(true), []);

  const seleccionados = useMemo(() => {
    return compararIds
      .map((id) => VEHICULOS.find((v) => v.id === id))
      .filter((v) => v !== undefined);
  }, [compararIds]);

  const m1 = seleccionados[0];
  const m2 = seleccionados[1];

  useGSAP(
    () => {
      if (mounted) {
        gsap.fromTo(
          ".reveal-header",
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
        );
        gsap.fromTo(
          ".data-row",
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power2.out" },
        );
      }
    },
    { scope: container, dependencies: [mounted] },
  );

  const handleWhatsApp = (moto: any) => {
    const msg = encodeURIComponent(
      `Hola AYR STEEL, quiero cotizar la ${moto.nombre}.`,
    );
    window.open(`https://wa.me/51900000000?text=${msg}`, "_blank");
  };

  if (!mounted) return null;

  return (
    <div ref={container} className="min-h-screen bg-slate-50 pt-28 pb-20 px-6">
      {/* MODAL DE VIDEO INMERSIVO */}
      {videoUrl && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            onClick={() => setVideoUrl(null)}
          />
          <div className="relative w-full max-w-4xl aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setVideoUrl(null)}
              className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-red-600 text-white w-12 h-12 rounded-full backdrop-blur-md transition-colors flex items-center justify-center"
            >
              ✕
            </button>
            <iframe
              src={`${videoUrl}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="reveal-header mb-12 text-center lg:text-left">
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
            Duelo de <span className="text-red-600">Máquinas</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
            Análisis Técnico de Alto Rendimiento
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <CardBatalla
            moto={m1}
            oponente={m2}
            onPlayVideo={(url: string) => setVideoUrl(url)} // Callback para el video
            onRemove={() => eliminarDelComparador(m1?.id)}
            onWhatsApp={() => handleWhatsApp(m1)}
            router={router}
          />
          <CardBatalla
            moto={m2}
            oponente={m1}
            onPlayVideo={(url: string) => setVideoUrl(url)} // Callback para el video
            onRemove={() => eliminarDelComparador(m2?.id)}
            onWhatsApp={() => handleWhatsApp(m2)}
            router={router}
          />
        </div>
      </div>
    </div>
  );
}

function CardBatalla({
  moto,
  oponente,
  onPlayVideo,
  onRemove,
  onWhatsApp,
  router,
}: any) {
  if (!moto) {
    return (
      <div className="h-full min-h-[500px] rounded-[3rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center p-10 group hover:border-red-400 transition-colors">
        <div className="text-6xl mb-6 opacity-20 group-hover:scale-110 transition-transform duration-500">
          🏍️
        </div>
        <button
          onClick={() => router.push("/catalogo")}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest"
        >
          Añadir Máquina
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative">
      <button
        onClick={onRemove}
        className="absolute -top-3 -right-3 z-30 bg-white shadow-xl text-slate-400 hover:text-red-600 w-10 h-10 rounded-full flex items-center justify-center border border-slate-100 transition-colors"
      >
        ✕
      </button>

      {/* IMAGEN, TITULO Y BOTÓN DE ENCENDIDO */}
      <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 relative group">
        <div className="h-64 rounded-[2rem] overflow-hidden bg-slate-950 relative">
          <img
            src={moto.imagen}
            className="w-full h-full object-cover opacity-80"
            alt={moto.nombre}
          />

          {/* BOTÓN "START ENGINE" CON EFECTO PING */}
          {moto.videoEncendido && (
            <button
              onClick={() => onPlayVideo(moto.videoEncendido)}
              className="absolute inset-0 m-auto w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-all duration-500 z-20 overflow-visible"
              title="Escuchar Motor"
            >
              <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-white fill-current translate-x-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}

          <div className="absolute bottom-6 left-6">
            <span className="bg-red-600 text-white px-3 py-1 rounded-md text-[9px] font-black uppercase italic mb-2 block w-fit">
              #{moto.id}
            </span>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
              {moto.nombre}
            </h2>
          </div>
        </div>
      </div>

      {/* FILAS DE TELEMETRÍA (Se mantiene igual) */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col gap-6">
        {SPECS.map((spec) => {
          const val = moto.specs?.[spec.id] || moto[spec.id];
          const valOp = oponente?.specs?.[spec.id] || oponente?.[spec.id];

          let isWinner = false;
          if (oponente && spec.better && typeof val === "number") {
            const n1 = val;
            const n2 =
              typeof valOp === "number"
                ? valOp
                : parseFloat(String(valOp).replace(/[^\d.-]/g, ""));
            isWinner = spec.better === "higher" ? n1 > n2 : n1 < n2;
          }

          return (
            <div key={spec.id} className="data-row">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  {spec.label}
                </span>
                <span
                  className={`text-lg font-black italic uppercase ${isWinner ? "text-red-600" : "text-slate-900"}`}
                >
                  {spec.isCurrency ? `$${val.toLocaleString()}` : val}{" "}
                  {spec.unit && !spec.isCurrency ? spec.unit : ""}
                </span>
              </div>
              {typeof val === "number" && (
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ease-out ${isWinner ? "bg-red-600" : "bg-slate-300"}`}
                    style={{ width: isWinner ? "100%" : "70%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ACCIONES */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href={`/vehiculo/${moto.slug}`}
          className="py-4.5 bg-slate-100 text-slate-900 text-center rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors"
        >
          Ficha Completa
        </Link>
        <button
          onClick={onWhatsApp}
          className="py-4.5 bg-red-600 text-white text-center rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-200"
        >
          Cotizar ahora
        </button>
      </div>
    </div>
  );
}

"use client";

export default function SkeletonCard() {
  return (
    // Imitamos la forma y bordes redondeados de tus tarjetas oscuras
    <div className="relative bg-slate-950 rounded-[2rem] border border-slate-800 p-6 flex flex-col h-full overflow-hidden animate-pulse">
      {/* Marcador técnico superior ficticio */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 items-start">
        <div className="h-2 w-16 bg-slate-700 rounded" />
        <div className="h-[1px] w-6 bg-slate-700" />
      </div>

      {/* Área de la imagen con overlay fantasma */}
      <div className="relative h-48 overflow-hidden bg-slate-900 rounded-t-xl mb-6 flex flex-col justify-end p-4">
        {/* Degradado para imitar profundidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
        {/* Precio fantasma */}
        <div className="absolute top-4 right-4 h-6 w-16 bg-slate-800 rounded-full shadow-lg mt-1" />
      </div>

      {/* Info del Vehículo Fantasma */}
      <div className="flex flex-col flex-grow relative z-10 space-y-4">
        <div className="space-y-2">
          {/* Marca fantasma */}
          <div className="h-2.5 bg-slate-700 rounded w-1/4 mt-1" />
          {/* Nombre fantasma */}
          <div className="h-6 bg-slate-700 rounded w-3/4 mt-1" />
        </div>

        {/* Bloques de telemetría fantasma */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900 h-16 rounded-xl border border-white/5 flex flex-col p-3 space-y-2">
            <div className="h-2 w-1/2 bg-slate-700 rounded" />
            <div className="h-3 w-3/4 bg-slate-700 rounded" />
          </div>
          <div className="bg-slate-900 h-16 rounded-xl border border-white/5 flex flex-col p-3 space-y-2">
            <div className="h-2 w-1/2 bg-slate-700 rounded" />
            <div className="h-3 w-3/4 bg-slate-700 rounded" />
          </div>
        </div>

        {/* Botones fantasma mt-auto asegura que los botones estén abajo */}
        <div className="flex gap-2 mt-auto">
          <div className="h-12 bg-slate-700 rounded-xl w-full" />
          <div className="h-12 bg-slate-700 rounded-xl w-14" />
        </div>
      </div>

      {/* Efecto scanner táctico sutil para el Skeleton */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 opacity-0 animate-scan-fast pointer-events-none" />

      <style jsx global>{`
        @keyframes scan-fast {
          0% {
            top: 0%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan-fast {
          animation: scan-fast 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

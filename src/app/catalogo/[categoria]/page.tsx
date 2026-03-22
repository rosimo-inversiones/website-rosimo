"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { VEHICULOS } from "@/data/vehicles";
import { useComparator } from "@/hooks/useComparator";
import ComparatorBar from "@/components/ui/ComparatorBar";

export default function CategoriaDinamicaPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col items-center justify-center bg-white">
          <span className="w-4 h-4 bg-red-600 rounded-full animate-ping mb-4" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Cargando_Inventario_OS...
          </span>
        </div>
      }
    >
      <CategoriaContent />
    </Suspense>
  );
}

function CategoriaContent() {
  const { toggleComparador, compararIds } = useComparator();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  // 1. Deducir el tipo exacto de vehículo según la URL
  const categoriaParam = (params.categoria as string)?.toLowerCase() || "motos";
  let tipoVehiculo = "moto";
  if (categoriaParam === "trimotos" || categoriaParam === "trimoto")
    tipoVehiculo = "trimoto";
  if (categoriaParam === "cuatrimotos" || categoriaParam === "cuatrimoto")
    tipoVehiculo = "cuatrimoto";

  const initialSubtipo = searchParams.get("subtipo") || "todos";
  const initialMarca = searchParams.get("marca") || "todos";

  const [mounted, setMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- ESTADOS DE FILTROS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevancia");
  const [precioMax, setPrecioMax] = useState(40000);

  const [subtipo, setSubtipo] = useState(initialSubtipo);
  const [marca, setMarca] = useState(initialMarca);
  const [posicion, setPosicion] = useState("todos");
  const [transmision, setTransmision] = useState("todos");
  const [frenos, setFrenos] = useState("todos");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [
    searchTerm,
    sortBy,
    precioMax,
    subtipo,
    marca,
    posicion,
    transmision,
    frenos,
    mounted,
  ]);

  // --- LÓGICA DE FILTRADO (Preservada) ---
  const filtrados = useMemo(() => {
    let resultados = VEHICULOS.filter((v) => {
      const matchSearch = v.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchPrecio = v.precio <= precioMax;
      const matchTipo = v.tipo === tipoVehiculo;
      const matchSubtipo = subtipo === "todos" || v.subtipo === subtipo;
      const matchMarca = marca === "todos" || v.marca === marca;
      const matchPosicion = posicion === "todos" || v.posicion === posicion;
      const matchTransmision =
        transmision === "todos" || v.transmision === transmision;
      const matchFrenos = frenos === "todos" || v.frenos === frenos;

      return (
        matchSearch &&
        matchPrecio &&
        matchTipo &&
        matchSubtipo &&
        matchMarca &&
        matchPosicion &&
        matchTransmision &&
        matchFrenos
      );
    });

    if (sortBy === "precio-asc") resultados.sort((a, b) => a.precio - b.precio);
    else if (sortBy === "precio-desc")
      resultados.sort((a, b) => b.precio - a.precio);
    else if (sortBy === "nombre-asc")
      resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));

    return resultados;
  }, [
    searchTerm,
    precioMax,
    subtipo,
    marca,
    posicion,
    transmision,
    frenos,
    sortBy,
    tipoVehiculo,
  ]);

  const limpiarFiltros = () => {
    setSearchTerm("");
    setSortBy("relevancia");
    setPrecioMax(40000);
    setSubtipo("todos");
    setMarca("todos");
    setPosicion("todos");
    setTransmision("todos");
    setFrenos("todos");
  };

  // Variantes Framer Motion para la grilla
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* BACKGROUND BLUEPRINT */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      {/* OVERLAY MÓVIL (Sustituye a GSAP) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] lg:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start pt-24 lg:pt-32 relative z-10">
        {/* SIDEBAR TÁCTICO */}
        <AnimatePresence>
          {(isDrawerOpen ||
            (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[70] p-6 shadow-2xl border-r border-slate-200 overflow-y-auto
                         lg:translate-x-0 lg:sticky lg:top-24 lg:z-10 lg:shadow-none lg:w-[320px] lg:h-[calc(100vh-100px)] lg:shrink-0`}
            >
              <div className="flex justify-between items-center mb-8 pt-8 lg:pt-0">
                <div>
                  <span className="text-red-600 font-mono text-[8px] uppercase tracking-[0.3em] block mb-1">
                    System_Filters
                  </span>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-950">
                    Parámetros
                  </h2>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="lg:hidden text-2xl text-slate-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8 pb-10">
                <button
                  onClick={() => router.push("/catalogo")}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg"
                >
                  ← Cambiar Categoría
                </button>

                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                      ID_Búsqueda
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Raptor 700R..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-xs font-bold text-slate-800 outline-none focus:border-red-600 transition-all placeholder:text-slate-300"
                    />
                  </div>
                  <FilterGroup
                    label="Orden_Datos"
                    value={sortBy}
                    setValue={setSortBy}
                    options={[
                      { val: "relevancia", label: "Relevancia" },
                      { val: "precio-asc", label: "Precio: Ascendente" },
                      { val: "precio-desc", label: "Precio: Descendente" },
                      { val: "nombre-asc", label: "Alfabético: A - Z" },
                    ]}
                    isObjectOptions
                  />
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                      Presupuesto_Max
                    </label>
                    <span className="text-sm font-black text-slate-950">
                      ${precioMax.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="40000"
                    step="500"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-4">
                  {tipoVehiculo === "moto" && (
                    <FilterGroup
                      label="Estilo_Moto"
                      value={subtipo}
                      setValue={setSubtipo}
                      options={["Deportiva", "Naked", "Custom", "Dual-Sport"]}
                    />
                  )}
                  <FilterGroup
                    label="Marca_Fabricante"
                    value={marca}
                    setValue={setMarca}
                    options={[
                      "Honda",
                      "Yamaha",
                      "Kawasaki",
                      "Suzuki",
                      "Can-Am",
                      "Polaris",
                    ]}
                  />
                  <FilterGroup
                    label="Postura_Piloto"
                    value={posicion}
                    setValue={setPosicion}
                    options={["Erguida", "Deportiva", "Custom"]}
                  />
                  <FilterGroup
                    label="Tipo_Transmisión"
                    value={transmision}
                    setValue={setTransmision}
                    options={["Manual", "Automática"]}
                  />
                  <FilterGroup
                    label="Sistema_Frenado"
                    value={frenos}
                    setValue={setFrenos}
                    options={["Disco ABS", "Tambor", "Disco Doble"]}
                  />
                </div>

                <button
                  onClick={limpiarFiltros}
                  className="w-full py-4 bg-white text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 hover:text-red-600 transition-all border border-slate-200"
                >
                  Resetear Parámetros
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full relative min-h-screen">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block">
                Results // Rosimo_OS
              </span>
              <h1 className="text-4xl md:text-6xl font-black uppercase italic leading-none mb-4 text-slate-950">
                {categoriaParam} <span className="text-slate-300">Matrix</span>
              </h1>
              <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">
                Unidades Activas:{" "}
                <span className="text-red-600 font-black">
                  {filtrados.length}
                </span>
              </p>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-xl font-bold uppercase text-[9px] tracking-widest shadow-xl"
            >
              Configurar Filtros
            </button>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-32"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : filtrados.map((v) => {
                  const isSelected = compararIds.includes(v.id);

                  return (
                    <motion.div
                      key={v.id}
                      variants={itemVariants}
                      className="group relative bg-slate-950 rounded-[2rem] border border-slate-800 hover:border-red-600/50 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
                    >
                      {/* Imagen con Overlay Táctico */}
                      <div className="relative h-56 overflow-hidden bg-slate-900 z-0">
                        <img
                          src={v.imagen}
                          className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
                          alt={v.nombre}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                        {/* Etiqueta de Precio */}
                        <div className="absolute top-4 right-4 bg-white text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                          ${mounted ? v.precio.toLocaleString() : v.precio}
                        </div>

                        {/* Referencia Táctica */}
                        <div className="absolute top-4 left-4">
                          <span className="text-red-600 font-mono text-[8px] font-bold uppercase tracking-widest bg-slate-950/80 px-2 py-1 rounded">
                            RO-UNIT-{v.id}
                          </span>
                        </div>
                      </div>

                      {/* Info del Vehículo */}
                      <div className="p-6 flex flex-col flex-grow relative z-10">
                        <div className="mb-4">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                            {v.marca}
                          </span>
                          <h3 className="text-xl font-black text-white uppercase italic truncate group-hover:text-red-500 transition-colors">
                            {v.nombre}
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6 text-[9px] uppercase font-bold text-slate-400">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col items-start">
                            <span className="text-slate-500 font-mono mb-1">
                              Cilindrada
                            </span>
                            <span className="text-white">{v.specs.cc}</span>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col items-start">
                            <span className="text-slate-500 font-mono mb-1">
                              Frenado
                            </span>
                            <span className="text-white truncate">
                              {v.frenos}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-auto">
                          <Link
                            href={`/vehiculo/${v.slug}`}
                            className="flex-1 text-center py-4 bg-red-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-colors"
                          >
                            Analizar Datos
                          </Link>
                          <button
                            onClick={() => toggleComparador(v.id)}
                            className={`w-14 flex items-center justify-center rounded-xl border transition-all ${isSelected ? "bg-white border-white text-slate-950" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
                            title="Añadir al comparador"
                          >
                            ⚖️
                          </button>
                        </div>
                      </div>

                      {/* Animación Scanner */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-red-600/30 opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />
                    </motion.div>
                  );
                })}
          </motion.div>

          {!isLoading && filtrados.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-[3rem]"
            >
              <span className="text-red-600 font-mono text-[10px] mb-4 tracking-[0.3em]">
                ERROR_404 // DATA_NOT_FOUND
              </span>
              <h3 className="text-3xl font-black uppercase italic text-slate-950 mb-4">
                Parámetros sin coincidencia
              </h3>
              <button
                onClick={limpiarFiltros}
                className="bg-slate-950 text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
              >
                Reiniciar Filtros
              </button>
            </motion.div>
          )}
        </main>
      </div>
      <ComparatorBar />

      <style jsx>{`
        @keyframes scan {
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
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-slate-50 rounded-[2rem] border border-slate-200 overflow-hidden h-[420px] animate-pulse">
      <div className="h-56 bg-slate-200" />
      <div className="p-6 space-y-4">
        <div className="h-2 bg-slate-200 rounded w-1/4" />
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="flex gap-2 pt-2">
          <div className="h-12 bg-slate-200 rounded-xl w-full" />
          <div className="h-12 bg-slate-200 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  value,
  setValue,
  options,
  isObjectOptions = false,
}: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 block mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-xs font-bold text-slate-700 outline-none focus:border-red-600 cursor-pointer appearance-none transition-all"
        >
          {!isObjectOptions && <option value="todos">Todos</option>}
          {options.map((o: any) =>
            isObjectOptions ? (
              <option key={o.val} value={o.val}>
                {o.label}
              </option>
            ) : (
              <option key={o} value={o}>
                {o}
              </option>
            ),
          )}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
          ▼
        </div>
      </div>
    </div>
  );
}

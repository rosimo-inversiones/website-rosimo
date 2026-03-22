"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { VEHICULOS } from "@/data/vehicles";
import { useComparator } from "@/hooks/useComparator";
import ComparatorBar from "@/components/ui/ComparatorBar";

// Importamos los componentes modulares
import FilterSidebar from "@/components/catalog/FilterSidebar";
import VehicleCard from "@/components/catalog/VehicleCard";
import SkeletonCard from "@/components/skeletons/SkeletonCard";

const ITEMS_PER_PAGE = 9;

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

  const categoriaParam = (params.categoria as string)?.toLowerCase() || "motos";
  let tipoVehiculo = "moto";
  if (categoriaParam === "trimotos" || categoriaParam === "trimoto")
    tipoVehiculo = "trimoto";
  if (categoriaParam === "cuatrimotos" || categoriaParam === "cuatrimoto")
    tipoVehiculo = "cuatrimoto";

  const initialSubtipo = searchParams.get("subtipo")?.toLowerCase() || "todos";
  const initialMarca = searchParams.get("marca")?.toLowerCase() || "todos";

  const [mounted, setMounted] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevancia");
  const [precioMax, setPrecioMax] = useState(40000);
  const [subtipo, setSubtipo] = useState(initialSubtipo);
  const [marca, setMarca] = useState(initialMarca);
  const [posicion, setPosicion] = useState("todos");
  const [transmision, setTransmision] = useState("todos");
  const [frenos, setFrenos] = useState("todos");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const qSubtipo = searchParams.get("subtipo");
    if (qSubtipo) setSubtipo(qSubtipo.toLowerCase());
    const qMarca = searchParams.get("marca");
    if (qMarca) setMarca(qMarca.toLowerCase());
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    sortBy,
    precioMax,
    subtipo,
    marca,
    posicion,
    transmision,
    frenos,
  ]);

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
    currentPage,
    mounted,
  ]);

  const filtrados = useMemo(() => {
    let resultados = VEHICULOS.filter((v) => {
      const matchSearch = v.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchPrecio = v.precio <= precioMax;
      const matchTipo = v.tipo === tipoVehiculo;

      // FIX TypeScript: Encadenamiento opcional para evitar errores de undefined
      const matchSubtipo =
        subtipo === "todos" || v.subtipo?.toLowerCase() === subtipo;
      const matchMarca = marca === "todos" || v.marca?.toLowerCase() === marca;
      const matchPosicion =
        posicion === "todos" || v.posicion?.toLowerCase() === posicion;
      const matchTransmision =
        transmision === "todos" || v.transmision?.toLowerCase() === transmision;
      const matchFrenos =
        frenos === "todos" || v.frenos?.toLowerCase() === frenos;

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

  const totalPages = Math.ceil(filtrados.length / ITEMS_PER_PAGE);
  const paginatedResults = filtrados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const limpiarFiltros = () => {
    setSearchTerm("");
    setSortBy("relevancia");
    setPrecioMax(40000);
    setSubtipo("todos");
    setMarca("todos");
    setPosicion("todos");
    setTransmision("todos");
    setFrenos("todos");
    setCurrentPage(1);
  };

  const activeFiltersCount =
    (searchTerm.trim() !== "" ? 1 : 0) +
    (precioMax < 40000 ? 1 : 0) +
    (subtipo !== "todos" ? 1 : 0) +
    (marca !== "todos" ? 1 : 0) +
    (posicion !== "todos" ? 1 : 0) +
    (transmision !== "todos" ? 1 : 0) +
    (frenos !== "todos" ? 1 : 0);

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
    // FIX SCROLL: overflow-clip protege el sticky sin romper el scroll del navegador
    <div className="min-h-screen bg-white relative overflow-clip">
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      {/* FIX SCROLL: Eliminadas alturas estáticas. El contenedor crece naturalmente */}
      <div className="max-w-400 mx-auto flex flex-col lg:flex-row items-start pt-24 lg:pt-32 relative z-10">
        {/* COMPONENTE SIDEBAR MODULAR */}
        <FilterSidebar
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          activeFiltersCount={activeFiltersCount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          precioMax={precioMax}
          setPrecioMax={setPrecioMax}
          subtipo={subtipo}
          setSubtipo={setSubtipo}
          marca={marca}
          setMarca={setMarca}
          posicion={posicion}
          setPosicion={setPosicion}
          transmision={transmision}
          setTransmision={setTransmision}
          frenos={frenos}
          setFrenos={setFrenos}
          tipoVehiculo={tipoVehiculo}
          limpiarFiltros={limpiarFiltros}
        />

        {/* CONTENIDO PRINCIPAL */}
        {/* FIX SCROLL: Eliminado lg:overflow-y-auto. Ahora usa el scroll del body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full relative min-h-screen flex flex-col">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 block">
                Resultados // Rosimo_OS
              </span>
              <h1 className="text-4xl md:text-6xl font-black uppercase italic leading-none mb-4 text-slate-950">
                {/* {categoriaParam} <span className="text-slate-300">Matrix</span> */}
                {categoriaParam}
              </h1>
              <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">
                Unidades Activas:{" "}
                <span className="text-red-600 font-black">
                  {filtrados.length}
                </span>
                {filtrados.length > 0 && (
                  <span className="ml-2">
                    | Página {currentPage} de {totalPages}
                  </span>
                )}
              </p>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-xl font-bold uppercase text-[9px] tracking-widest shadow-xl relative"
            >
              Configurar Filtros
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-[10px] shadow-lg">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* FIX TARJETAS ESTIRADAS: content-start justify-center empaqueta las tarjetas arriba y centradas */}
          {filtrados.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 grow content-start justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {isLoading
                ? Array(
                    Math.min(
                      filtrados.length || ITEMS_PER_PAGE,
                      ITEMS_PER_PAGE,
                    ),
                  )
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : paginatedResults.map((v) => (
                    <VehicleCard
                      key={v.id}
                      v={v}
                      isSelected={compararIds.includes(v.id)}
                      mounted={mounted}
                      toggleComparador={toggleComparador}
                      itemVariants={itemVariants}
                    />
                  ))}
            </motion.div>
          )}

          {/* CONTROLES DE PAGINACIÓN */}
          {!isLoading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 pb-32">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                ←
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-xs font-black transition-all ${currentPage === i + 1 ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/20" : "bg-white text-slate-500 border-slate-200 hover:border-red-600 hover:text-red-600"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                →
              </button>
            </div>
          )}

          {!isLoading && filtrados.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-[3rem] mt-10"
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

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function FilterSidebar(props: any) {
  const router = useRouter();

  return (
    <>
      {/* OVERLAY MÓVIL */}
      <AnimatePresence>
        {props.isDrawerOpen && (
          <div
            className="fixed inset-0 bg-slate-950/80 z-[110] lg:hidden transition-opacity"
            onClick={() => props.setIsDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={`fixed top-0 left-0 h-full w-75 bg-white z-120 p-6 shadow-2xl border-r border-slate-200 overflow-y-auto transition-transform duration-300 ease-in-out
                   ${props.isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
                   lg:translate-x-0 lg:sticky lg:top-32 lg:z-10 lg:shadow-none lg:w-[320px] lg:h-[calc(100vh-140px)] lg:shrink-0 lg:scrollbar-thin lg:scrollbar-thumb-slate-200 lg:scrollbar-track-white`}
      >
        <div className="flex justify-between items-center mb-8 pt-8 lg:pt-0  bg-white z-10 pb-4">
          <div>
            <span className="text-red-600 font-mono text-[8px] uppercase tracking-[0.3em] block mb-1">
              Filtros
            </span>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-950">
              Parámetros{" "}
              {props.activeFiltersCount > 0 && (
                <span className="text-red-600 text-lg">
                  ({props.activeFiltersCount})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => props.setIsDrawerOpen(false)}
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
              <label
                className={`text-[9px] font-mono font-bold uppercase tracking-widest mb-2 block transition-colors ${props.searchTerm ? "text-red-600" : "text-slate-400"}`}
              >
                ID_Búsqueda {props.searchTerm && "•"}
              </label>
              <input
                type="text"
                placeholder="Ej. Raptor 700R..."
                value={props.searchTerm}
                onChange={(e) => props.setSearchTerm(e.target.value)}
                className={`w-full border rounded-xl px-5 py-4 text-xs font-bold outline-none transition-all placeholder:text-slate-300
                  ${props.searchTerm ? "bg-red-50/50 border-red-600/50 text-red-800 focus:border-red-600" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-red-600"}
                `}
              />
            </div>
            <FilterGroup
              label="Orden_Datos"
              value={props.sortBy}
              setValue={props.setSortBy}
              isObjectOptions
              options={[
                { val: "relevancia", label: "Relevancia" },
                { val: "precio-asc", label: "Precio: Ascendente" },
                { val: "precio-desc", label: "Precio: Descendente" },
                { val: "nombre-asc", label: "Alfabético: A - Z" },
              ]}
            />
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label
                className={`text-[9px] font-mono font-bold uppercase tracking-widest transition-colors ${props.precioMax < 40000 ? "text-red-600" : "text-slate-400"}`}
              >
                Presupuesto_Max {props.precioMax < 40000 && "•"}
              </label>
              <span
                className={`text-sm font-black transition-colors ${props.precioMax < 40000 ? "text-red-600" : "text-slate-950"}`}
              >
                ${props.precioMax.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="3000"
              max="40000"
              step="500"
              value={props.precioMax}
              onChange={(e) => props.setPrecioMax(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-4">
            {props.tipoVehiculo === "moto" && (
              <FilterGroup
                label="Estilo_Moto"
                value={props.subtipo}
                setValue={props.setSubtipo}
                options={["Deportiva", "Naked", "Custom", "Dual-Sport"]}
              />
            )}
            <FilterGroup
              label="Marca_Fabricante"
              value={props.marca}
              setValue={props.setMarca}
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
              value={props.posicion}
              setValue={props.setPosicion}
              options={["Erguida", "Deportiva", "Custom"]}
            />
            <FilterGroup
              label="Tipo_Transmisión"
              value={props.transmision}
              setValue={props.setTransmision}
              options={["Manual", "Automática"]}
            />
            <FilterGroup
              label="Sistema_Frenado"
              value={props.frenos}
              setValue={props.setFrenos}
              options={["Disco ABS", "Tambor", "Disco Doble"]}
            />
          </div>

          <button
            onClick={props.limpiarFiltros}
            disabled={
              props.activeFiltersCount === 0 && props.sortBy === "relevancia"
            }
            className={`w-full py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border
              ${props.activeFiltersCount > 0 || props.sortBy !== "relevancia" ? "bg-white text-red-600 border-red-600/30 hover:bg-red-50" : "bg-white text-slate-300 border-slate-200 cursor-not-allowed"}
            `}
          >
            Resetear Parámetros
          </button>
        </div>
      </motion.aside>
    </>
  );
}

// Subcomponente interno del Sidebar
function FilterGroup({
  label,
  value,
  setValue,
  options,
  isObjectOptions = false,
}: any) {
  const isActive = !isObjectOptions
    ? value !== "todos"
    : value !== "relevancia";

  return (
    <div className="space-y-2">
      <label
        className={`text-[9px] font-mono font-bold uppercase tracking-widest block mb-2 transition-colors ${isActive ? "text-red-600" : "text-slate-400"}`}
      >
        {label} {isActive && "•"}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full border rounded-xl px-4 py-4 text-xs font-bold outline-none cursor-pointer appearance-none transition-all ${isActive ? "bg-red-50/50 border-red-600/50 text-red-800 focus:border-red-600" : "bg-slate-50 border-slate-200 text-slate-700 focus:border-red-600"}`}
        >
          {!isObjectOptions && <option value="todos">Todos</option>}
          {options.map((o: any) =>
            isObjectOptions ? (
              <option key={o.val} value={o.val.toLowerCase()}>
                {o.label}
              </option>
            ) : (
              <option key={o} value={o.toLowerCase()}>
                {o}
              </option>
            ),
          )}
        </select>
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs transition-colors ${isActive ? "text-red-600" : "text-slate-400"}`}
        >
          ▼
        </div>
      </div>
    </div>
  );
}

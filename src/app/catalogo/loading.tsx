"use client";
import SkeletonCard from "@/components/skeletons/SkeletonCard";
import { motion, Variants } from "framer-motion";

export default function LoadingCatalogo() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-32 lg:pt-40 px-6">
      {/* DECORACIÓN BLUEPRINT */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/blueprint-grid.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col relative z-10 text-center items-center">
        {/* ENCABEZADO FANTASMA */}
        <div className="mb-10 space-y-3">
          <span className="text-red-600 font-mono text-[10px] mb-3 block">
            Querying_Inventory // Rosimo_OS
          </span>
          <div className="h-12 w-96 bg-slate-200 rounded-xl mx-auto animate-pulse" />
          <div className="h-4 w-64 bg-slate-100 rounded-lg mx-auto animate-pulse mt-4" />
        </div>

        {/* GRID DE SKELETON CARDS */}
        {/* pr-28 para proteger el área de WhatsApp */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:pr-28 justify-center min-h-[400px] w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </motion.div>
      </div>
    </div>
  );
}

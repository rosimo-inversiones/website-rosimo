"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

const NAV_LINKS = [
  { name: "Inicio", path: "/", ref: "RO-NAV-01" },
  { name: "Motos", path: "/catalogo/motos", isPrimary: true, ref: "RO-NAV-02" },
  { name: "Trimotos", path: "/catalogo/trimotos", ref: "RO-NAV-03" },
  { name: "Cuatrimotos", path: "/catalogo/cuatrimotos", ref: "RO-NAV-04" },
  { name: "Nosotros", path: "/nosotros", ref: "RO-NAV-05" },
  { name: "Contacto", path: "/contacto", ref: "RO-NAV-06" },
  {
    name: "Financiamiento",
    path: "/financiamiento",
    isAction: true,
    ref: "RO-FIN-07",
  },
];

export default function NavbarDark() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const menuVariants: Variants = {
    closed: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-4 md:py-6 px-4 pointer-events-none">
        <header
          className={`w-full max-w-7xl pointer-events-auto transition-all duration-500 rounded-full border px-6 md:px-10 py-3 flex items-center justify-between shadow-2xl
            ${
              scrolled
                ? "bg-slate-950/80 backdrop-blur-xl border-white/10"
                : "bg-slate-950 border-white/5"
            }
          `}
        >
          {/* LOGO ROSIMO DARK */}
          <Link href="/" className="relative z-[110] group">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
              ROSIMO <span className="text-red-600 italic">MOTOS</span>
            </h1>
            {/* <span className="hidden md:block font-mono text-[8px] text-slate-500 absolute -bottom-3 left-0 tracking-[0.3em] opacity-50">
              TACTICAL_INTERFACE_V1.1
            </span> */}
          </Link>

          {/* NAVEGACIÓN DESKTOP DARK */}
          <nav className="hidden lg:flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full overflow-hidden
                    ${isActive ? "text-slate-950" : link.isPrimary ? "text-red-500" : "text-slate-400 hover:text-white"}
                    ${link.isAction ? "ml-4 bg-red-600 text-white hover:bg-white hover:text-slate-950 shadow-lg shadow-red-600/20" : ""}
                  `}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && !link.isAction && (
                    <motion.div
                      layoutId="nav-pill-dark"
                      className="absolute inset-0 bg-white z-0"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* MENÚ HAMBURGUESA DARK */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white/10 rounded-full border border-white/10"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-white"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-white"
            />
          </button>
        </header>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-slate-950 z-[90] flex flex-col pt-40 px-10 lg:hidden"
          >
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
              }}
            />
            <div className="flex flex-col gap-8 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className={`flex items-baseline gap-4 text-4xl font-black uppercase italic tracking-tighter ${pathname === link.path ? "text-red-600" : "text-white"}`}
                  >
                    <span className="font-mono text-[10px] text-slate-600">
                      {link.ref}
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

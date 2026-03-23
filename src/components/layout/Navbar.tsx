"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

const NAV_LINKS = [
  {
    name: "Catálogo",
    ref: "RO-CAT-01",
    subLinks: [
      { name: "Motos", path: "/catalogo/motos", desc: "Rendimiento asfalto" },
      { name: "Trimotos", path: "/catalogo/trimotos", desc: "Carga pesada" },
      {
        name: "Cuatrimotos",
        path: "/catalogo/cuatrimotos",
        desc: "Off-Road táctico",
      },
    ],
  },
  { name: "Soporte", path: "/soporte", ref: "RO-SUP-02" },
  { name: "Nosotros", path: "/nosotros", ref: "RO-ABOUT-03" },
  { name: "Contacto", path: "/contacto", ref: "RO-CONT-04" },
];

export default function NavbarDark() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

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

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      pointerEvents: "none" as const,
      transition: { duration: 0.1 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: "auto" as const,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-4 md:py-6 px-4 pointer-events-none">
        <header
          className={`w-full max-w-7xl pointer-events-auto transition-all duration-500 rounded-full border px-6 md:px-8 py-3 flex items-center justify-between shadow-2xl
            ${scrolled ? "bg-slate-950/90 backdrop-blur-xl border-white/10" : "bg-slate-950 border-white/5"}
          `}
        >
          {/* LOGO ROSIMO DARK */}
          <Link
            href="/"
            className="relative z-[110] group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
              ROSIMO <span className="text-red-600 italic">MOTOS</span>
            </h1>
          </Link>

          {/* NAVEGACIÓN DESKTOP DARK */}
          <nav className="hidden lg:flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10 relative">
            {NAV_LINKS.map((item) => {
              const isDropdownActive = activeDropdown === item.name;
              const isChildActive =
                item.subLinks?.some((sub) => pathname.startsWith(sub.path)) ||
                pathname.startsWith(item.path || "##");

              return (
                <div
                  key={item.name}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.subLinks ? (
                    <button
                      className={`relative flex items-center gap-1.5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full overflow-hidden ${isChildActive || isDropdownActive ? "text-white" : "text-slate-400 hover:text-white"}`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <svg
                        className={`w-3 h-3 relative z-10 transition-transform duration-300 ${isDropdownActive ? "rotate-180 text-red-500" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      {(isChildActive || isDropdownActive) && (
                        <motion.div
                          layoutId="nav-pill-dark"
                          className="absolute inset-0 bg-white/10 z-0"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.path!}
                      className={`relative px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full overflow-hidden block ${isChildActive ? "text-white" : "text-slate-400 hover:text-white"}`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      {isChildActive && (
                        <motion.div
                          layoutId="nav-pill-dark"
                          className="absolute inset-0 bg-white/10 z-0"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Link>
                  )}

                  {/* DESPLEGABLE CON PUENTE INVISIBLE (pt-4) */}
                  {item.subLinks && (
                    <div className="absolute top-full left-0 pt-4 w-64">
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate={isDropdownActive ? "visible" : "hidden"}
                        className="w-full bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden relative"
                      >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/30 animate-scan pointer-events-none" />
                        {item.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.path}
                            className="block px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-red-500 flex items-center justify-between">
                              {sub.name}{" "}
                              <span className="text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                →
                              </span>
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 mt-0.5 block">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* BOTÓN DE ACCIÓN + HAMBURGUESA */}
          <div className="flex items-center gap-3">
            <Link
              href="/financiamiento"
              className="hidden lg:block relative z-[110] bg-red-600 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all shadow-lg shadow-red-600/20"
            >
              Financiamiento
            </Link>

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
          </div>
        </header>
      </div>

      {/* MENÚ MÓVIL FULLSCREEN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-slate-950 z-[90] flex flex-col pt-32 px-10 overflow-y-auto lg:hidden"
          >
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
              }}
            />

            <div className="flex flex-col gap-6 relative z-10 pb-20">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.subLinks ? (
                    <div className="mb-2">
                      <span className="flex items-baseline gap-4 text-3xl font-black uppercase italic tracking-tighter text-slate-500 mb-4">
                        <span className="font-mono text-[10px] text-slate-700">
                          {link.ref}
                        </span>{" "}
                        {link.name}
                      </span>
                      <div className="flex flex-col gap-4 pl-12 border-l border-white/10 ml-4">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-xl font-black uppercase italic tracking-tight ${pathname.startsWith(sub.path) ? "text-red-600" : "text-white"}`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.path!}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-baseline gap-4 text-3xl font-black uppercase italic tracking-tighter ${pathname.startsWith(link.path!) ? "text-red-600" : "text-white"}`}
                    >
                      <span className="font-mono text-[10px] text-slate-600">
                        {link.ref}
                      </span>{" "}
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <Link
                  href="/financiamiento"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-red-600 text-white py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em]"
                >
                  Simular Financiamiento
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}

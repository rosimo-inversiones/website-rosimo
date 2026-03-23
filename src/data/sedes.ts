export const SEDES = [
  {
    slug: "pucallpa",
    idFicha: "RO-HQ-01",
    isCentral: true, // Resaltado como Sede Principal
    estado: "ONLINE",
    nombre: "Pucallpa",
    region: "Ucayali",
    direccion: "Av. 3 de octubre",
    telefono: "+51 940 989 397",
    descripcion:
      "Centro neurálgico de Rosimo. Especialistas en ensamblaje táctico y soporte técnico de alta precisión.",
    imagen:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070",
    horarios: {
      semana: "08:00 - 18:00",
      sabado: "09:00 - 14:00",
      domingo: "Offline",
    },
    servicios: [
      { icono: "🏍️", nombre: "Showroom" },
      { icono: "🔧", nombre: "Taller" },
    ],
  },
  {
    slug: "pucallpa-norte",
    idFicha: "RO-ST-02",
    isCentral: false,
    estado: "ONLINE", // Segunda sede activa
    nombre: "Pucallpa Norte",
    region: "Ucayali",
    direccion: "Carretera Federico Basadre km 4.5",
    telefono: "+51 900 123 456",
    descripcion:
      "Unidad operativa enfocada en servicio pesado, cuatrimotos y despacho de repuestos originales de fábrica.",
    imagen:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=2000",
    horarios: {
      semana: "08:30 - 17:30",
      sabado: "09:00 - 13:00",
      domingo: "Offline",
    },
    servicios: [
      { icono: "🛠️", nombre: "Servicio Técnico" },
      { icono: "📦", nombre: "Repuestos" },
    ],
  },
  {
    slug: "iquitos",
    idFicha: "RO-EXP-03",
    isCentral: false,
    estado: "STANDBY", // Próximamente
    nombre: "Iquitos",
    region: "Loreto",
    direccion: "Av. La Marina (Próximamente)",
    telefono: "Sistemas_Offline",
    descripcion:
      "Nodo logístico en fase de despliegue para la zona norte de la Amazonía peruana. Coordenadas en validación.",
    imagen: "",
    horarios: { semana: "TBD", sabado: "TBD", domingo: "Offline" },
    servicios: [],
  },
  {
    slug: "tarapoto",
    idFicha: "RO-EXP-04",
    isCentral: false,
    estado: "STANDBY", // Próximamente
    nombre: "Tarapoto",
    region: "San Martín",
    direccion: "Jr. Jiménez Pimentel (Próximamente)",
    telefono: "Sistemas_Offline",
    descripcion:
      "Evaluación de terreno completada. Preparando inicialización de sistema para la selva alta.",
    imagen: "",
    horarios: { semana: "TBD", sabado: "TBD", domingo: "Offline" },
    servicios: [],
  },
  {
    slug: "moyobamba",
    idFicha: "RO-EXP-05",
    isCentral: false,
    estado: "STANDBY", // Próximamente
    nombre: "Moyobamba",
    region: "San Martín",
    direccion: "Centro Histórico (Próximamente)",
    telefono: "Sistemas_Offline",
    descripcion:
      "Protocolo de apertura iniciado. Próximamente activaremos este nodo estratégico para la red nacional.",
    imagen: "",
    horarios: { semana: "TBD", sabado: "TBD", domingo: "Offline" },
    servicios: [],
  },
];

export const SOPORTE_DATA = [
  {
    idProtocolo: "RO-MANT-01",
    slug: "limpieza-cadena-lodo-extremo",
    titulo: "Mantenimiento de Transmisión en Lodo Extremo",
    categoria: "Transmisión",
    nivel: "Básico",
    tiempoEjecucion: "20 Minutos",
    fechaLanzamiento: "2026-03-22",
    extracto:
      "Protocolo oficial para la limpieza y lubricación de cadenas tras rutas en trochas húmedas y lodo denso de la selva baja.",
    imgHero:
      "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=2000",
    vehiculoReferencia: "Kodiak 450",
    slugVehiculo: "kodiak-450",
    pasos: [
      {
        titulo: "Inspección y Lavado Inicial",
        detalle:
          "Coloca la máquina en neutro sobre un caballete o superficie plana. Usa agua a baja presión para retirar el exceso de barro arcilloso pesado. Evita el chorro directo a presión sobre los retenes (O-rings) de la cadena para no inyectar agua en los eslabones.",
      },
      {
        titulo: "Aplicación de Solvente Biológico",
        detalle:
          "Rocía un limpiador de cadenas específico (no uses gasolina, ya que reseca los retenes de goma). Deja actuar por 3 a 5 minutos mientras la química disuelve la grasa y la arena de la selva.",
      },
      {
        titulo: "Cepillado Táctico",
        detalle:
          "Con un cepillo de tres caras (forma de 'U'), frota vigorosamente la cadena mientras giras la rueda trasera manualmente. Asegúrate de limpiar las placas laterales y los rodillos internos.",
      },
      {
        titulo: "Secado y Lubricación",
        detalle:
          "Enjuaga con agua limpia y seca completamente con un paño de microfibra. Una vez seca, aplica lubricante específico para Off-Road (que repele el polvo y el agua) solo en la parte interna de la cadena, justo antes de que entre al piñón.",
      },
    ],
  },
  {
    idProtocolo: "RO-MANT-02",
    slug: "calibracion-neumaticos-asfalto-caliente",
    titulo: "Calibración Térmica de Neumáticos (Ucayali)",
    categoria: "Chasis / Ruedas",
    nivel: "Intermedio",
    tiempoEjecucion: "10 Minutos",
    fechaLanzamiento: "2026-03-18",
    extracto:
      "Ajuste de presión PSI para contrarrestar la expansión térmica al rodar sobre el asfalto a más de 35°C en la Ruta Federico Basadre.",
    imgHero:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2000",
    vehiculoReferencia: "Can-Am Ryker",
    slugVehiculo: "can-am-ryker",
    pasos: [
      {
        titulo: "Medición en Frío",
        detalle:
          "Realiza la primera lectura de presión (PSI) siempre antes de rodar, preferiblemente a primera hora de la mañana. Apunta la telemetría en tu bitácora.",
      },
      {
        titulo: "Cálculo de Expansión",
        detalle:
          "Ten en cuenta que el asfalto de Pucallpa puede superar los 50°C al mediodía. La presión de tus neumáticos subirá entre 2 y 4 PSI tras 20 minutos de rodaje.",
      },
      {
        titulo: "Ajuste Compensatorio",
        detalle:
          "Si planeas una ruta larga por asfalto caliente al mediodía, ajusta la presión inicial 1 o 2 PSI por debajo de la recomendación estándar del manual para evitar el desgaste central prematuro de la banda de rodadura.",
      },
    ],
  },
  {
    idProtocolo: "RO-MANT-03",
    slug: "refrigeracion-motor-selva-baja",
    titulo: "Prevención de Sobrecalentamiento en Selva Baja",
    categoria: "Motor",
    nivel: "Avanzado",
    tiempoEjecucion: "45 Minutos",
    fechaLanzamiento: "2026-03-10",
    extracto:
      "Guía de purga y reemplazo de líquido refrigerante para mantener el rendimiento óptimo del motor en climas de alta humedad y temperatura extrema.",
    imgHero:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=2000",
    vehiculoReferencia: "Raptor 700R",
    slugVehiculo: "raptor-700r",
    pasos: [
      {
        titulo: "Enfriamiento del Sistema",
        detalle:
          "Regla de oro: Nunca abras el tapón del radiador con el motor caliente. Deja reposar la máquina a la sombra al menos 2 horas tras rodar. El sistema opera presurizado y el líquido hirviendo puede causar quemaduras graves.",
      },
      {
        titulo: "Drenaje del Fluido Antiguo",
        detalle:
          "Localiza el tornillo de purga en la bomba de agua (revisa la Ficha Técnica de tu modelo). Coloca una bandeja debajo, retira el tornillo y luego abre el tapón del radiador para romper el vacío y permitir el drenaje completo.",
      },
      {
        titulo: "Lavado del Circuito (Flush)",
        detalle:
          "Si el líquido antiguo presenta óxido o sedimentos por la humedad de la zona, llena el radiador con agua destilada y un limpiador de radiadores. Enciende el motor 10 minutos, deja enfriar y vuelve a drenar completamente.",
      },
      {
        titulo: "Llenado y Sangrado (Bleeding)",
        detalle:
          "Utiliza un refrigerante premium (recomendamos formulación 50/50 sin silicatos). Llena el radiador hasta el tope. Enciende el motor sin el tapón puesto y dale pequeños golpes de acelerador para expulsar las burbujas de aire del sistema. Rellena el nivel conforme baje y cierra herméticamente.",
      },
    ],
  },
];

// Catálogo central de actividades — usado por detalle, checkout y reserva
export interface ActivityRecord {
  id: string;
  title: string;
  category: string;
  categoryColor: string; // HEX
  day: 1 | 2 | 3;
  dateLong: string; // "Jueves 14 Jun"
  dateShort: string; // "Jue 14 Jun"
  time: string;
  duration: string;
  room: string;
  speaker?: string;
  speakerRole?: string;
  description: string;
  price: number; // 0 = gratuita
  spotsTaken: number;
  spotsTotal: number;
  owned?: boolean;
  ticketId?: string; // si owned, link a entrada existente
}

export const activitiesCatalog: ActivityRecord[] = [
  {
    id: "act-taller-1",
    title: "Taller: Temperado de Chocolate Artesanal",
    category: "Taller",
    categoryColor: "#aab93e",
    day: 1,
    dateLong: "Jueves 14 Jun",
    dateShort: "Jue 14 Jun",
    time: "11:00 AM",
    duration: "90 min",
    room: "Sala Taller A",
    speaker: "Maestro Carlos Vera",
    speakerRole: "Chocolatero · Quito, Ecuador",
    description:
      "Aprende las técnicas fundamentales del temperado de chocolate, desde la selección del grano hasta el brillo perfecto. Este taller práctico te guiará paso a paso en el proceso artesanal utilizado por los mejores chocolateros del Ecuador.",
    price: 25,
    spotsTaken: 18,
    spotsTotal: 20,
  },
  {
    id: "act-rueda-1",
    title: "Rueda de Negocios Internacional",
    category: "Rueda de Negocios",
    categoryColor: "#f0ecd9",
    day: 1,
    dateLong: "Jueves 14 Jun",
    dateShort: "Jue 14 Jun",
    time: "2:00 PM",
    duration: "120 min",
    room: "Sala Negocios",
    speaker: "ANECACAO",
    speakerRole: "Asociación Nacional de Exportadores de Cacao",
    description:
      "Conecta con compradores internacionales y productores nacionales en una rueda de negocios facilitada por ANECACAO. Espacio ideal para generar acuerdos comerciales, exportación y networking estratégico.",
    price: 0,
    spotsTaken: 45,
    spotsTotal: 80,
  },
  // Ejemplo: actividad "ya tienes entrada"
  {
    id: "act-master-1",
    title: "Masterclass: Fermentación y Secado del Cacao",
    category: "Seminario",
    categoryColor: "#fbba30",
    day: 2,
    dateLong: "Viernes 15 Jun",
    dateShort: "Vie 15 Jun",
    time: "11:00 AM",
    duration: "90 min",
    room: "Sala B",
    speaker: "Dr. Luis Moreno",
    speakerRole: "Investigador de cacao",
    description: "Domina los procesos críticos de fermentación y secado que definen la calidad del cacao fino de aroma.",
    price: 20,
    spotsTaken: 12,
    spotsTotal: 30,
    owned: true,
    ticketId: "tkt-1",
  },
  // Ejemplo: agotada
  {
    id: "act-amazon-1",
    title: "Taller: Chocolate con Ingredientes Amazónicos",
    category: "Taller",
    categoryColor: "#aab93e",
    day: 3,
    dateLong: "Sábado 16 Jun",
    dateShort: "Sáb 16 Jun",
    time: "9:00 AM",
    duration: "90 min",
    room: "Sala Taller A",
    speaker: "Chef Rodrigo Arias",
    speakerRole: "Chef amazónico",
    description: "Explora ingredientes únicos de la Amazonía ecuatoriana combinados con chocolate fino de aroma.",
    price: 25,
    spotsTaken: 20,
    spotsTotal: 20,
  },
];

export const getActivityById = (id?: string): ActivityRecord => {
  if (!id) return activitiesCatalog[0];
  return activitiesCatalog.find((a) => a.id === id) ?? activitiesCatalog[0];
};

export const getActivityState = (a: ActivityRecord) => {
  const remaining = a.spotsTotal - a.spotsTaken;
  const soldOut = remaining <= 0;
  const lastSpots = !soldOut && remaining < 3;
  const isFree = a.price === 0;
  return { remaining, soldOut, lastSpots, isFree };
};

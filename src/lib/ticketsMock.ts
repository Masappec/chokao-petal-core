export type TicketStatus = "valid" | "used" | "expired";

export interface TicketData {
  id: string;
  ticketNumber: string;
  activityName: string;
  category: string;
  categoryColor: string; // hex
  date: string;
  time: string;
  room: string;
  status: TicketStatus;
}

export const mockTickets: TicketData[] = [
  {
    id: "tkt-1",
    ticketNumber: "#TKT-2025-00847",
    activityName: "Taller: Temperado de Chocolate Artesanal",
    category: "Taller",
    categoryColor: "#aab93e",
    date: "Vie 15 Jun",
    time: "11:00 AM",
    room: "Sala Cacao",
    status: "valid",
  },
  {
    id: "tkt-2",
    ticketNumber: "#TKT-2025-00848",
    activityName: "Rueda de Negocios Internacional",
    category: "Negocios",
    categoryColor: "#fbba30",
    date: "Vie 15 Jun",
    time: "2:00 PM",
    room: "Sala Negocios",
    status: "valid",
  },
  {
    id: "tkt-3",
    ticketNumber: "#TKT-2025-00849",
    activityName: "Ceremonia de Premiación al Mejor Cacao",
    category: "Premiación",
    categoryColor: "#e73e40",
    date: "Sáb 16 Jun",
    time: "5:00 PM",
    room: "Escenario Principal",
    status: "valid",
  },
  {
    id: "tkt-4",
    ticketNumber: "#TKT-2025-00712",
    activityName: "Conferencia: Cacao Fino de Aroma",
    category: "Conferencia",
    categoryColor: "#aab93e",
    date: "Jue 14 Jun",
    time: "10:00 AM",
    room: "Auditorio",
    status: "used",
  },
];

export const getTicketById = (id: string) =>
  mockTickets.find((t) => t.id === id) ?? mockTickets[0];

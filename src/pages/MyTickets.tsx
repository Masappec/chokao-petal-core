import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import TicketCard from "@/components/TicketCard";
import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoButton from "@/components/ChokaoButton";
import { mockTickets, type TicketStatus } from "@/lib/ticketsMock";

type TabKey = "upcoming" | "used" | "expired";

const tabs: { key: TabKey; label: string; status: TicketStatus }[] = [
  { key: "upcoming", label: "Próximas", status: "valid" },
  { key: "used", label: "Usadas", status: "used" },
  { key: "expired", label: "Expiradas", status: "expired" },
];

const MyTickets = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("upcoming");

  const currentStatus = tabs.find((t) => t.key === tab)!.status;
  const list = mockTickets.filter((t) => t.status === currentStatus);

  const emptyText: Record<TabKey, string> = {
    upcoming: "Explora la agenda y compra tu entrada para talleres y actividades especiales",
    used: "Las entradas que ya usaste aparecerán aquí",
    expired: "No tienes entradas expiradas",
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-[100px]" style={{ backgroundColor: "#102132" }}>
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Mis Entradas
        </h1>
      </header>

      {/* Tabs */}
      <div className="px-5 mt-4 flex">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex-1 pb-2.5 text-center transition-colors"
              style={{
                color: active ? "#ffffff" : "rgba(240,236,217,0.5)",
                fontWeight: active ? 700 : 500,
                borderBottom: active ? "2px solid #fbba30" : "2px solid transparent",
                fontSize: 14,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {list.length > 0 ? (
        <>
          <p className="px-5 mt-4 text-[13px]" style={{ color: "rgba(240,236,217,0.4)" }}>
            {list.length} {list.length === 1 ? "entrada" : "entradas"} {tab === "upcoming" ? "activas" : ""}
          </p>
          <div className="px-5 mt-3 space-y-4">
            {list.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => navigate(`/entradas/${ticket.id}`)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center px-8 mt-24">
          <div className="opacity-20">
            <ChokaoIcon size={64} />
          </div>
          <h2 className="mt-5 font-display font-semibold text-[18px] text-white text-center">
            Sin entradas aquí
          </h2>
          <p className="mt-2 text-[14px] text-center" style={{ color: "rgba(240,236,217,0.5)" }}>
            {emptyText[tab]}
          </p>
          {tab === "upcoming" && (
            <div className="mt-6">
              <ChokaoButton onClick={() => navigate("/agenda")}>Explorar agenda</ChokaoButton>
            </div>
          )}
        </div>
      )}

      <BottomNav activeTab="entradas" onTabChange={(t) => {
        if (t === "home") navigate("/home");
        if (t === "agenda") navigate("/agenda");
        if (t === "mas") navigate("/perfil");
      }} />
    </div>
  );
};

export default MyTickets;

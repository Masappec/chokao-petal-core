import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ChokaoButton from "@/components/ChokaoButton";

const profileTypes = ["Productor", "Comprador", "Chocolatero", "Visitante", "Expositor"];

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "María",
    apellido: "Rodríguez",
    telefono: "+593 99 123 4567",
    empresa: "Chocolates El Árbol",
  });
  const [tipo, setTipo] = useState("Chocolatero");

  const handleSave = () => {
    toast.success("Perfil actualizado");
    navigate(-1);
  };

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-[100px] bg-chokao-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5 bg-chokao-primary">
        <button onClick={() => navigate(-1)} className="text-foreground hover:text-chokao-yellow">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-foreground pr-6">
          Editar perfil
        </h1>
      </header>

      {/* Avatar */}
      <section className="px-5 pt-6 pb-6 flex flex-col items-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-chokao-surface border-[3px] border-chokao-yellow flex items-center justify-center">
            <span className="font-display font-bold text-[28px] text-chokao-yellow">M</span>
          </div>
          <button
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-chokao-yellow flex items-center justify-center shadow-lg"
            aria-label="Cambiar foto"
          >
            <Camera size={14} strokeWidth={2} className="text-chokao-primary" />
          </button>
        </div>
        <p className="mt-3 text-[12px] text-chokao-cream/50">Cambiar foto de perfil</p>
      </section>

      {/* Form */}
      <div className="px-5 space-y-4">
        <Field label="Nombre">
          <Input
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            className="bg-chokao-surface border-chokao-border text-foreground h-12 rounded-xl"
          />
        </Field>

        <Field label="Apellido">
          <Input
            value={form.apellido}
            onChange={(e) => update("apellido", e.target.value)}
            className="bg-chokao-surface border-chokao-border text-foreground h-12 rounded-xl"
          />
        </Field>

        <Field label="Celular / WhatsApp">
          <div className="flex gap-2">
            <button className="h-12 px-3 rounded-xl bg-chokao-surface border border-chokao-border flex items-center gap-1.5 text-foreground text-[14px]">
              🇪🇨 +593 <ChevronDown size={14} className="text-chokao-cream/50" />
            </button>
            <Input
              value={form.telefono}
              onChange={(e) => update("telefono", e.target.value)}
              className="bg-chokao-surface border-chokao-border text-foreground h-12 rounded-xl flex-1"
            />
          </div>
        </Field>

        <Field label="Empresa / Organización" optional>
          <Input
            value={form.empresa}
            onChange={(e) => update("empresa", e.target.value)}
            className="bg-chokao-surface border-chokao-border text-foreground h-12 rounded-xl"
          />
        </Field>

        <Field label="Tipo de perfil">
          <div className="flex flex-wrap gap-2">
            {profileTypes.map((t) => {
              const active = tipo === t;
              return (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                    active
                      ? "bg-chokao-yellow/15 border-chokao-yellow text-chokao-yellow"
                      : "bg-chokao-surface border-chokao-border text-chokao-cream/60"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Field>

        <div className="pt-4 flex flex-col gap-3">
          <ChokaoButton variant="primary" fullWidth onClick={handleSave}>
            Guardar cambios
          </ChokaoButton>
          <button
            onClick={() => navigate(-1)}
            className="w-full h-[52px] rounded-2xl border border-chokao-border text-chokao-cream/70 font-body text-[15px] font-semibold hover:bg-chokao-surface transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-[12px] uppercase tracking-wider font-semibold text-chokao-cream/50 mb-2">
      {label} {optional && <span className="text-chokao-cream/30 normal-case tracking-normal">(opcional)</span>}
    </label>
    {children}
  </div>
);

export default EditProfile;

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const NIGHT_DIALOGS = [
  "Eita... 3 da matina e tu aqui? 👀 Bora comprar uma faca pra dormir bem.",
  "Madrugada é onde os bizarros compram chroma. Bem-vindo(a).",
  "Tô de pijama atendendo, viu? Mas o preço continua bão.",
  "Você + insônia + Hardy Store = combinação perigosa pro seu PIX.",
  "Olha, eu não devia tá acordado, e você também não. Mas que bom que tá. 🥱✨",
];

const DAY_DIALOGS = [
  "Bom te ver por aqui! ☀️",
  "Hoje tem novidade — dá uma olhada nos destaques!",
];

/**
 * Banner com diálogo zoeiro entre 23h e 5h, e diálogo normal durante o dia.
 * Aparece no topo da home.
 */
export function VibeBanner() {
  const [msg, setMsg] = useState<string>("");
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    const night = h >= 23 || h < 5;
    setIsNight(night);
    const pool = night ? NIGHT_DIALOGS : DAY_DIALOGS;
    setMsg(pool[Math.floor(Math.random() * pool.length)]);
  }, []);

  if (!msg) return null;

  return (
    <div
      className={`container pt-4 ${isNight ? "" : ""}`}
      role="status"
    >
      <div
        className={`glass-card rounded-2xl px-4 py-2.5 flex items-center gap-3 text-sm ${
          isNight ? "border-brand-purple/40" : "border-brand-orange/30"
        }`}
      >
        <Sparkles className={`h-4 w-4 shrink-0 ${isNight ? "text-brand-purple" : "text-brand-orange"}`} />
        <span className="font-medium">
          {isNight && <span className="font-display font-black mr-1">[modo madrugada]</span>}
          {msg}
        </span>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { STORE_CONFIG } from "@/data/store-config";
import { Sparkles, MessageCircle, Heart, ChevronDown, ArrowRight, Users } from "lucide-react";

interface Dialog {
  text: string | ((next: () => void) => React.ReactNode);
  /** Botões clicáveis que avançam */
  choices?: Array<{ label: string; next?: number }>;
}

const DIALOGS: Dialog[] = [
  {
    text: "Humm... Oi, tudo bem? 👀 Eu sou o Fanix, ou a Fanix! Criador do projeto. Me responsabilizo por tudo. Até as comissões!",
    choices: [{ label: "Oi Fanix! Conta mais sobre você 💖" }],
  },
  {
    text: "Aaah que bom que perguntou! Sabe, eu... ahn... eu sou meio que uma fusão de duas pessoas: a Luxxia e o Wolf. Os dois juntos formam o Fanix. Bizarro, né?",
    choices: [{ label: "Por que essa fusão?" }, { label: "Espera, fusão tipo Dragon Ball?" }],
  },
  {
    text: "Mais ou menos, mais ou menos! 😅 É que cada um tem um jeito — a Luxxia traz o carinho com cada cliente, o Wolf traz a parte mais técnica e fria de negócio. Junta os dois e dá certo. Eu acho.",
    choices: [{ label: "Qual o seu maior plano?" }],
  },
  {
    text: "Meu maior plano? *respira fundo* Criar uma loja INCRÍVEL. Sério. Com muitas funções, democrática, onde qualquer pessoa — vendedora ou compradora — sinta que está em casa. Sem golpe, sem rolo, sem 'preço de amigo' que na verdade é caro.",
    choices: [{ label: "Que ideia bonita 🥺" }, { label: "Mas e se não der certo?" }],
  },
  {
    text: "Aí eu choro um pouquinho e tento de novo, oras. 😤 Eu acredito que tem espaço pra uma loja de MM2 que respeita as pessoas. E olha, se você tá lendo isso, já tá fazendo parte disso comigo.",
    choices: [{ label: "Como falo direto contigo?" }],
  },
  {
    text: "No nosso servidor do Discord! Eu mesmo atuo como Fanix lá. Adoro fazer amigos, conversar besteira, falar de skin nova... Bora ser meu amigo? 🥺👉👈",
    choices: [{ label: "Bora! Manda o convite 🎉" }],
  },
];

/** Página de curiosidades do criador. */
export default function Fanix() {
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState<number[]>([0]);
  const [typed, setTyped] = useState("");

  // Type-writer effect
  useEffect(() => {
    const current = DIALOGS[step];
    if (!current) return;
    const text = typeof current.text === "string" ? current.text : "";
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [step]);

  const advance = () => {
    if (step < DIALOGS.length - 1) {
      const next = step + 1;
      setStep(next);
      setShown((prev) => [...prev, next]);
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  };

  const isLast = step === DIALOGS.length - 1;

  return (
    <div className="container py-12 max-w-2xl space-y-6">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-pink/30">
          <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
          <span className="text-xs font-semibold">Curiosidades</span>
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl text-balance">
          Quem é o(a) <span className="gradient-text">Fanix?</span>
        </h1>
        <p className="text-sm text-muted-foreground">Clique nas opções pra continuar a conversa 💬</p>
      </header>

      <div className="space-y-4">
        {shown.map((idx) => {
          const d = DIALOGS[idx];
          const isCurrent = idx === step;
          const text = typeof d.text === "string" ? d.text : "";
          return (
            <div key={idx} className="flex gap-3 animate-fade-in-up">
              <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center shrink-0 shadow-glow-pink">
                <span className="font-display font-black text-white text-sm">F</span>
              </div>
              <div className="flex-1 space-y-3">
                <div className="glass-card rounded-2xl rounded-tl-sm p-4">
                  <p className="text-sm md:text-base leading-relaxed">
                    {isCurrent ? typed : text}
                    {isCurrent && typed.length < text.length && (
                      <span className="inline-block w-2 h-4 bg-brand-pink ml-0.5 animate-glow-pulse" />
                    )}
                  </p>
                </div>
                {isCurrent && d.choices && typed.length >= text.length && (
                  <div className="flex flex-wrap gap-2 pl-1 animate-fade-in-up">
                    {d.choices.map((c) => (
                      <Button
                        key={c.label}
                        variant="glass"
                        size="sm"
                        onClick={advance}
                        className="rounded-full"
                      >
                        {c.label}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLast && (
          <div className="glass-card rounded-3xl p-6 md:p-8 text-center space-y-4 mt-6 relative overflow-hidden animate-scale-in">
            <div className="absolute inset-0 bg-gradient-warm opacity-20 pointer-events-none" />
            <div className="relative space-y-3">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow-pink">
                <Heart className="h-7 w-7 text-white fill-white" />
              </div>
              <h2 className="font-display font-black text-2xl md:text-3xl">
                Aceita meu pedido de amizade? 🤝
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Bora pro Discord! Eu fico online quase todo dia, posso te ajudar com qualquer
                coisa — preço, troca, dúvida, ou só pra conversar mesmo.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Button asChild variant="hero" size="lg">
                  <a href={STORE_CONFIG.discordUrl} target="_blank" rel="noopener noreferrer">
                    <Users className="h-4 w-4" />
                    Aceitar e entrar no Discord
                  </a>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link to="/loja">
                    Ver a loja <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground pt-2">
                Quando entrar, manda um <span className="font-bold">"oi Fanix"</span> — eu respondo. Prometo. 💖
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

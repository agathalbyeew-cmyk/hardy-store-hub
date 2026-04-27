import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PROMO_CODES, ROULETTE_PRIZES, pickPrize } from "@/data/roulette";
import { STORE_CONFIG } from "@/data/store-config";
import { Sparkles, Gift, Ticket, Trophy, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEM_W = 140;

interface Claim {
  id: string;
  promo_code: string;
  prize_name: string;
  prize_image: string | null;
  status: string;
  created_at: string;
}

export default function Roleta() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const [winner, setWinner] = useState<{ name: string; image: string } | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);

  // Loop pool of items for the strip
  const strip = Array.from({ length: 40 }, (_, i) => ROULETTE_PRIZES[i % ROULETTE_PRIZES.length]);

  const loadClaims = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("roulette_claims")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (data) setClaims(data as Claim[]);
  };

  useEffect(() => {
    loadClaims();
  }, [user]);

  const spin = async () => {
    if (!user) {
      toast.error("Entre na sua conta para girar.");
      navigate("/auth", { state: { from: "/roleta" } });
      return;
    }
    const trimmed = code.trim();
    if (!PROMO_CODES.has(trimmed)) {
      toast.error("Código inválido. Tente outro!");
      return;
    }
    if (claims.some((c) => c.promo_code === trimmed)) {
      toast.error("Você já usou esse código.");
      return;
    }

    setSpinning(true);
    setWinner(null);
    const prize = pickPrize();

    // Encontrar índice na faixa que mostra o prêmio (escolhe um por volta da metade)
    const winnerIdx = strip.findIndex((p, i) => p.name === prize.name && i > strip.length / 2 && i < strip.length - 5);
    const finalOffset = winnerIdx * ITEM_W - ITEM_W * 1.5; // centra
    setOffset(finalOffset);

    setTimeout(async () => {
      setWinner({ name: prize.name, image: prize.image });
      try {
        const { error } = await supabase.from("roulette_claims").insert({
          user_id: user.id,
          promo_code: trimmed,
          prize_name: prize.name,
          prize_image: prize.image,
        });
        if (error) throw error;
        toast.success(`🎉 Você ganhou: ${prize.name}!`);
        await loadClaims();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Erro ao registrar prêmio");
      } finally {
        setSpinning(false);
      }
    }, 4200);
  };

  const claimMessage = (c: Claim) => encodeURIComponent(
    `🎰 Resgate de prêmio Hardy Store\nCódigo: ${c.promo_code}\nPrêmio: ${c.prize_name}\nID: ${c.id}`,
  );

  return (
    <div className="container py-12 space-y-10 max-w-4xl">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-orange/30">
          <Gift className="h-3.5 w-3.5 text-brand-orange" />
          <span className="text-xs font-semibold">Roleta da sorte</span>
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl text-balance">
          Faca <span className="gradient-text-warm">grátis</span> com código promocional
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
          Tem um código? Cole abaixo, gire a roleta e ganhe uma faca comum de MM2. Cada código só pode ser usado uma vez por conta.
        </p>
      </header>

      {/* Roleta */}
      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10 pointer-events-none" />

        {/* Strip */}
        <div className="relative">
          <div className="relative h-40 rounded-2xl overflow-hidden border border-border/40 bg-background/40">
            {/* Center marker */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] bg-gradient-brand z-10 shadow-glow-pink" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 z-10 -mt-2">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-brand-pink" />
            </div>

            <div
              className="flex items-center h-full"
              style={{
                transform: `translateX(-${offset}px)`,
                transition: spinning ? "transform 4s cubic-bezier(0.15, 0.85, 0.25, 1)" : "none",
              }}
            >
              {strip.map((p, i) => (
                <div
                  key={i}
                  className="shrink-0 flex flex-col items-center gap-1 px-2"
                  style={{ width: ITEM_W }}
                >
                  <div className="h-20 w-20 rounded-xl glass flex items-center justify-center p-2">
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid sm:grid-cols-[1fr_auto] gap-3 max-w-md mx-auto">
          <div className="space-y-1">
            <Label htmlFor="promo" className="sr-only">Código promocional</Label>
            <div className="relative">
              <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="promo"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Cole seu código aqui"
                disabled={spinning}
                className="pl-10 h-11"
              />
            </div>
          </div>
          <Button onClick={spin} variant="hero" size="lg" disabled={spinning || !code.trim()}>
            <Sparkles className="h-4 w-4" />
            {spinning ? "Girando..." : "Girar"}
          </Button>
        </div>

        {winner && (
          <div className="text-center space-y-2 animate-scale-in">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Você ganhou</p>
            <div className="inline-flex items-center gap-3 glass rounded-2xl p-4 border border-brand-pink/40">
              <img src={winner.image} alt={winner.name} className="h-16 w-16 object-contain" />
              <div className="text-left">
                <div className="font-display font-black text-xl gradient-text">{winner.name}</div>
                <p className="text-xs text-muted-foreground">Salvo em "Meus prêmios" abaixo</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Meus prêmios */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-brand-orange" />
          <h2 className="font-display font-black text-2xl">Meus prêmios</h2>
        </div>

        {!user ? (
          <div className="glass-card rounded-2xl p-6 text-center text-sm text-muted-foreground">
            <Link to="/auth" className="text-brand-pink font-bold hover:underline">Entre</Link> para salvar seus prêmios.
          </div>
        ) : claims.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum prêmio ainda. Use um código e gire!</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {claims.map((c) => (
              <div key={c.id} className="glass-card rounded-2xl p-4 flex items-center gap-3">
                {c.prize_image && (
                  <img src={c.prize_image} alt={c.prize_name} className="h-14 w-14 object-contain shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold truncate">{c.prize_name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    Código: <span className="font-mono">{c.promo_code}</span> · {c.status}
                  </div>
                </div>
                <Button asChild variant="cart" size="sm">
                  <a
                    href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${claimMessage(c)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-3 w-3" />
                    Resgatar
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hint dos códigos */}
      <section className="glass-card rounded-2xl p-5 text-sm text-muted-foreground space-y-2">
        <p className="font-bold text-foreground">Onde acho códigos? 🎟️</p>
        <p>
          Acompanhe nosso{" "}
          <a href={STORE_CONFIG.discordUrl} target="_blank" rel="noopener noreferrer" className="text-brand-pink font-semibold hover:underline">
            Discord
          </a>{" "}
          e nossas redes — soltamos códigos toda semana. Quem segue de perto, gira mais!
        </p>
      </section>
    </div>
  );
}

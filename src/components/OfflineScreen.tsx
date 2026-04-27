import { useEffect, useState } from "react";
import amarelinhaImg from "@/assets/amarelinha.png";
import { Wifi, WifiOff } from "lucide-react";

/**
 * Full-screen overlay shown when the browser loses network connectivity.
 * Uses the navigator.onLine API + online/offline events.
 */
export function OfflineScreen() {
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );

  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/95 backdrop-blur-xl animate-fade-in-up">
      <div className="absolute inset-0 bg-gradient-hero opacity-20" />

      <div className="container relative max-w-4xl mx-auto px-6">
        <div className="glass-card rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          {/* Image */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 -m-4 rounded-full bg-gradient-warm opacity-30 blur-2xl animate-glow-pulse" />
            <img
              src={amarelinhaImg}
              alt="Personagem convidando para brincar de amarelinha"
              className="relative w-48 md:w-64 h-auto object-contain animate-float drop-shadow-[0_10px_30px_hsl(var(--pink)/0.45)]"
              draggable={false}
            />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-pink/30">
              <WifiOff className="h-3.5 w-3.5 text-brand-pink" />
              <span className="text-xs font-semibold">Sem conexão</span>
            </div>
            <h1 className="font-display font-black text-2xl md:text-4xl leading-tight text-balance">
              Uma pena. Enquanto espera o wifi voltar,{" "}
              <span className="gradient-text">brinque de amarelinha comigo!</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              A Hardy Store volta assim que sua conexão for restabelecida. ✨
            </p>
            <div className="flex items-center gap-2 justify-center md:justify-start text-xs text-muted-foreground pt-2">
              <Wifi className="h-3.5 w-3.5 animate-pulse" />
              <span>Aguardando reconexão...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

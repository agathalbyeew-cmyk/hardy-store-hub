import { useEffect, useState } from "react";
import { Wifi, WifiOff, Sparkles } from "lucide-react";
import { SnakeGame } from "@/components/SnakeGame";

/**
 * Tela mostrada quando o usuário fica offline. Inclui um mini-game de cobrinha
 * para entreter enquanto a conexão não volta.
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
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/95 backdrop-blur-xl animate-fade-in-up overflow-y-auto">
      <div className="absolute inset-0 bg-gradient-hero opacity-20 pointer-events-none" />

      <div className="container relative max-w-2xl mx-auto px-4 py-8">
        <div className="glass-card rounded-3xl p-5 md:p-8 space-y-5">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-pink/30">
              <WifiOff className="h-3.5 w-3.5 text-brand-pink" />
              <span className="text-xs font-semibold">Sem conexão</span>
            </div>
            <h1 className="font-display font-black text-2xl md:text-3xl leading-tight text-balance">
              Wifi sumiu? <span className="gradient-text">Joga uma cobrinha aqui!</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              A Hardy Store volta assim que sua conexão voltar. Enquanto isso, bata seu recorde 🐍
            </p>
          </div>

          <SnakeGame />

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
            <Sparkles className="h-3 w-3 text-brand-pink" />
            <Wifi className="h-3 w-3 animate-pulse" />
            <span>Aguardando reconexão...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

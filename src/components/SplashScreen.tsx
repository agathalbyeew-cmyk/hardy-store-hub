import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

interface SplashScreenProps {
  /** Duration in ms before fading out. Default 2000. */
  duration?: number;
  onFinish?: () => void;
}

/**
 * Themed loading splash inspired by Murder Mystery 2 — a knife sweeps across
 * the brand logo while sparkles drift up. Shown on every site open.
 */
export function SplashScreen({ duration = 2000, onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), duration);
    const t2 = setTimeout(() => {
      setPhase("gone");
      onFinish?.();
    }, duration + 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, onFinish]);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background transition-opacity duration-500 ${
        phase === "out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-hero opacity-40 animate-gradient-shift bg-[length:200%_200%]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-brand-pink/60 blur-[1px]"
            style={{
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              left: `${(i * 73) % 100}%`,
              top: `${(i * 41) % 100}%`,
              animation: `float ${3 + (i % 5)}s ease-in-out ${i * 0.15}s infinite`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Center stage */}
      <div className="relative flex flex-col items-center gap-8 animate-scale-in">
        {/* Logo with glow ring */}
        <div className="relative">
          <div className="absolute inset-0 -m-6 rounded-full bg-gradient-brand opacity-40 blur-3xl animate-glow-pulse" />
          <div className="relative animate-float">
            <Logo size="lg" />
          </div>

          {/* Knife sweep — purely decorative */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="h-[2px] w-48 bg-gradient-to-r from-transparent via-brand-pink to-transparent"
              style={{ animation: "splash-sweep 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Loading bar */}
        <div className="flex flex-col items-center gap-3">
          <div className="font-display font-bold text-sm tracking-[0.3em] text-foreground/80">
            HARDY STORE
          </div>
          <div className="relative h-1.5 w-48 overflow-hidden rounded-full bg-muted/40">
            <div
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-brand"
              style={{ animation: "splash-bar 1.4s cubic-bezier(0.4,0,0.2,1) infinite" }}
            />
          </div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Carregando inventário...
          </div>
        </div>
      </div>

      <style>{`
        @keyframes splash-sweep {
          0% { transform: translateX(-120%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
        @keyframes splash-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}

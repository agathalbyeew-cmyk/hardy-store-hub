import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showIcon?: boolean;
}

export function Logo({ className, showIcon = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-brand blur-md opacity-60 animate-glow-pulse rounded-full" />
          <div className="relative h-9 w-9 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow-pink">
            <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
        </div>
      )}
      <div className="flex flex-col leading-none">
        <span className="font-display font-black text-xl tracking-tight gradient-text">
          Hardy
        </span>
        <span className="font-display font-bold text-[10px] tracking-[0.3em] text-brand-orange uppercase -mt-0.5">
          Store
        </span>
      </div>
    </div>
  );
}

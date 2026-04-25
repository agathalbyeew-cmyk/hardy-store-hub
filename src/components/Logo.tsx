import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo-hardy.png";

interface LogoProps {
  className?: string;
  /** When true (header), renders only the image at a compact size with hover glow. */
  showIcon?: boolean;
  /** Override image height (in tailwind classes). */
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-9",
  md: "h-12",
  lg: "h-20",
};

export function Logo({ className, size = "sm" }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-brand blur-xl opacity-40 animate-glow-pulse rounded-full" />
        <img
          src={logoImg}
          alt="Hardy Store"
          className={cn(
            sizeMap[size],
            "relative w-auto object-contain drop-shadow-[0_4px_16px_hsl(var(--pink)/0.5)]",
          )}
          draggable={false}
        />
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo-hardy.png";

interface LogoProps {
  className?: string;
  /** Image height tier. */
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "h-24",
  md: "h-32",
  lg: "h-40",
  xl: "h-52",
};

/**
 * Hardy Store logo — renders the PNG sticker as-is (no circular crop,
 * no background container). The PNG already includes the brand artwork
 * with its own outline and sparkles.
 */
export function Logo({ className, size = "sm" }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt="Hardy Store"
      draggable={false}
      className={cn(
        sizeMap[size],
        "w-auto object-contain select-none",
        "drop-shadow-[0_6px_20px_hsl(var(--pink)/0.45)]",
        className,
      )}
    />
  );
}

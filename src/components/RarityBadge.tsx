import type { Rarity, ProductTag } from "@/types/store";
import { cn } from "@/lib/utils";
import { RARITY_LABELS } from "@/types/store";
import { Flame, Star, AlertTriangle, Sparkles, Zap } from "lucide-react";

const rarityClasses: Record<Rarity, string> = {
  common: "text-rarity-common",
  uncommon: "text-rarity-uncommon",
  rare: "text-rarity-rare",
  legendary: "text-rarity-legendary",
  godly: "text-rarity-godly",
  ancient: "text-rarity-ancient",
  set: "text-rarity-set",
};

const rarityBgClasses: Record<Rarity, string> = {
  common: "bg-rarity-common/15 text-rarity-common border-rarity-common/30",
  uncommon: "bg-rarity-uncommon/15 text-rarity-uncommon border-rarity-uncommon/30",
  rare: "bg-rarity-rare/15 text-rarity-rare border-rarity-rare/30",
  legendary: "bg-rarity-legendary/15 text-rarity-legendary border-rarity-legendary/30",
  godly: "bg-rarity-godly/15 text-rarity-godly border-rarity-godly/30",
  ancient: "bg-rarity-ancient/15 text-rarity-ancient border-rarity-ancient/30",
  set: "bg-rarity-set/15 text-rarity-set border-rarity-set/30",
};

export function RarityLabel({ rarity, className }: { rarity: Rarity; className?: string }) {
  return (
    <span className={cn("font-bold text-sm", rarityClasses[rarity], className)}>
      {RARITY_LABELS[rarity]}
    </span>
  );
}

export function RarityBadge({ rarity, className }: { rarity: Rarity; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md",
        rarityBgClasses[rarity],
        className,
      )}
    >
      {RARITY_LABELS[rarity]}
    </span>
  );
}

const tagConfig: Record<ProductTag, { label: string; icon: typeof Flame; gradient: string }> = {
  promo: { label: "PROMO", icon: Flame, gradient: "bg-gradient-warm" },
  popular: { label: "POPULAR", icon: Star, gradient: "bg-gradient-brand" },
  "last-units": { label: "ÚLTIMAS", icon: AlertTriangle, gradient: "bg-gradient-warm" },
  new: { label: "NEW", icon: Sparkles, gradient: "bg-gradient-brand" },
  hot: { label: "HOT", icon: Zap, gradient: "bg-gradient-warm" },
};

export function ProductTagBadge({ tag, className }: { tag: ProductTag; className?: string }) {
  const cfg = tagConfig[tag];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider text-white shadow-lg",
        cfg.gradient,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

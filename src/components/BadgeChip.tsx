import type { Badge } from "@/data/badges";
import { badgeTierClass } from "@/data/badges";
import { cn } from "@/lib/utils";

export function BadgeChip({ badge, className }: { badge: Badge; className?: string }) {
  return (
    <div
      title={badge.description}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold",
        "bg-gradient-to-r border backdrop-blur-md",
        badgeTierClass(badge.tier),
        className,
      )}
    >
      <span className="text-base leading-none">{badge.emoji}</span>
      <span>{badge.label}</span>
    </div>
  );
}

export function BadgeGrid({ badges }: { badges: Badge[] }) {
  if (badges.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        Nenhuma medalha ainda. Comece comprando ou girando a roleta! 🎰
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <BadgeChip key={b.id} badge={b} />
      ))}
    </div>
  );
}

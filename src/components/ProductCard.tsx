import { Link } from "react-router-dom";
import type { Product } from "@/types/store";
import { formatBRL } from "@/data/store-config";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ProductTagBadge, RarityLabel } from "@/components/RarityBadge";
import { ShoppingCart, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, getStockRemaining } = useCart();
  const remaining = getStockRemaining(product.id);
  const isOut = remaining <= 0;
  const isLow = remaining > 0 && remaining <= 5;

  return (
    <article
      className={cn(
        "group relative glass-card rounded-3xl p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated overflow-hidden",
        className,
      )}
    >
      {/* gradient glow on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: "linear-gradient(135deg, hsl(var(--pink) / 0.15), hsl(var(--indigo) / 0.15), hsl(var(--blue) / 0.15))" }} />

      {product.tag && (
        <div className="absolute top-3 left-3 z-10">
          <ProductTagBadge tag={product.tag} />
        </div>
      )}

      <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-muted/40 to-background/40 overflow-hidden mb-3 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_8px_24px_hsl(var(--pink)/0.3)]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <Package className="absolute inset-0 m-auto h-16 w-16 text-muted-foreground/30 -z-0" />
      </div>

      <div className="flex-1 flex flex-col gap-1 relative z-[1]">
        <h3 className="font-display font-bold text-base leading-tight text-balance">{product.name}</h3>
        <RarityLabel rarity={product.category} className="text-xs" />
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground line-through decoration-destructive/70 decoration-2">
            {formatBRL(product.price * 1.3)}
          </span>
          <span className="font-display font-black text-xl gradient-text">{formatBRL(product.price)}</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-destructive/15 text-destructive uppercase tracking-wide">
            -30%
          </span>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          {isOut ? (
            <span className="text-destructive font-semibold">Esgotado</span>
          ) : isLow ? (
            <span className="text-brand-orange font-semibold">Restam apenas {remaining}!</span>
          ) : (
            <span>Estoque: {remaining}</span>
          )}
        </div>
      </div>

      <Button
        variant="cart"
        size="sm"
        className="mt-3 w-full relative z-[1]"
        disabled={isOut}
        onClick={() => addItem(product.id)}
      >
        <ShoppingCart className="h-4 w-4" />
        {isOut ? "Esgotado" : "Adicionar"}
      </Button>
    </article>
  );
}

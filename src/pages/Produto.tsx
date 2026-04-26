import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatBRL } from "@/data/store-config";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ProductTagBadge, RarityLabel, RarityBadge } from "@/components/RarityBadge";
import { ProductReviews } from "@/components/ProductReviews";

export default function Produto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addItem, getStockRemaining } = useCart();

  if (!product) {
    return (
      <div className="container py-16 text-center space-y-4">
        <h1 className="font-display font-black text-3xl">Produto não encontrado</h1>
        <Button asChild variant="hero">
          <Link to="/loja">Voltar à loja</Link>
        </Button>
      </div>
    );
  }

  const remaining = getStockRemaining(product.id);
  const isOut = remaining <= 0;

  return (
    <div className="container py-8 md:py-12 space-y-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagem */}
        <div className="relative aspect-square rounded-3xl glass-card overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-8 drop-shadow-[0_12px_32px_hsl(var(--pink)/0.35)]"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
          />
          <Package className="absolute inset-0 m-auto h-24 w-24 text-muted-foreground/20 -z-0" />
          {product.tag && (
            <div className="absolute top-4 left-4">
              <ProductTagBadge tag={product.tag} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5 flex flex-col">
          <RarityBadge rarity={product.category} />
          <h1 className="font-display font-black text-3xl md:text-5xl leading-tight text-balance">
            {product.name}
          </h1>
          <RarityLabel rarity={product.category} />

          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-lg text-muted-foreground line-through decoration-destructive/70 decoration-2">
              {formatBRL(product.price * 1.3)}
            </span>
            <span className="font-display font-black text-4xl gradient-text">
              {formatBRL(product.price)}
            </span>
            <span className="text-xs font-bold px-2 py-1 rounded-md bg-destructive/15 text-destructive uppercase tracking-wide">
              -30%
            </span>
          </div>

          <div className="text-sm">
            {isOut ? (
              <span className="text-destructive font-semibold">Esgotado</span>
            ) : remaining <= 5 ? (
              <span className="text-brand-orange font-semibold">Restam apenas {remaining}!</span>
            ) : (
              <span className="text-muted-foreground">Em estoque: {remaining}</span>
            )}
          </div>

          <Button
            variant="hero"
            size="xl"
            disabled={isOut}
            onClick={() => addItem(product.id)}
            className="w-full md:w-auto"
          >
            <ShoppingCart className="h-5 w-5" />
            {isOut ? "Esgotado" : "Adicionar ao carrinho"}
          </Button>
        </div>
      </div>

      {/* Reviews */}
      <section className="space-y-4">
        <h2 className="font-display font-black text-2xl md:text-3xl">Avaliações</h2>
        <ProductReviews productId={product.id} />
      </section>
    </div>
  );
}

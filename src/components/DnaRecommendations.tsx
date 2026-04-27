import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles } from "lucide-react";
import type { Product, Rarity } from "@/types/store";

const RARITY_AFFINITY = ["godly", "ancient", "chroma", "legendary", "rare"] as const;

/**
 * "DNA do usuário": olha o histórico do user logado e recomenda itens
 * de raridade parecida. Mensagem maliciosa estilo "a gente sabe que cê gosta".
 */
export function DnaRecommendations() {
  const { user } = useAuth();
  const [picks, setPicks] = useState<Product[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("items")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      const counts: Record<string, number> = {};
      (data ?? []).forEach((o: any) => {
        (o.items ?? []).forEach((i: any) => {
          if (i.rarity) counts[i.rarity] = (counts[i.rarity] ?? 0) + (i.quantity ?? 1);
        });
      });

      // Determine raridade preferida
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([r]) => r as Rarity);
      const focus = sorted[0] ?? RARITY_AFFINITY.find((r) => PRODUCTS.some((p) => p.category === r)) ?? "rare";
      const pool = PRODUCTS.filter((p) => p.category === focus && p.stock > 0);
      const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 4);
      setPicks(shuffled);
    })();
  }, [user]);

  if (!user || picks.length === 0) return null;

  return (
    <section className="container py-12">
      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-5 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-pink/20 blur-3xl pointer-events-none" />
        <div className="relative space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-pink">
            <Sparkles className="h-3.5 w-3.5" /> Pra você
          </div>
          <h2 className="font-display font-black text-2xl md:text-3xl">
            A gente sabe que cê gosta. <span className="gradient-text">👀</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Selecionados de acordo com seu histórico. Dá uma olhada — talvez tenha desconto.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-right relative">
          <Link to="/loja" className="text-xs text-brand-pink font-semibold hover:underline">
            Ver tudo →
          </Link>
        </div>
      </div>
    </section>
  );
}

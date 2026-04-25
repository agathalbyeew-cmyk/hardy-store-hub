import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RARITY_LABELS, RARITY_ORDER, type Rarity } from "@/types/store";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type SortKey = "rarity-desc" | "price-asc" | "price-desc" | "name-asc";

const ALL_CATEGORIES: Array<Rarity | "all"> = ["all", "chroma", "godly", "ancient", "legendary", "rare", "uncommon", "common", "set", "low-set"];

const sortLabels: Record<SortKey, string> = {
  "rarity-desc": "Raridade (maior)",
  "price-asc": "Preço (menor)",
  "price-desc": "Preço (maior)",
  "name-asc": "Nome (A-Z)",
};

export default function Loja() {
  const [params, setParams] = useSearchParams();
  const initialCat = (params.get("cat") as Rarity | null) ?? "all";
  const [category, setCategory] = useState<Rarity | "all">(initialCat);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("rarity-desc");

  useEffect(() => {
    if (category === "all") {
      params.delete("cat");
    } else {
      params.set("cat", category);
    }
    setParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "name-asc": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "rarity-desc":
      default:
        list.sort((a, b) => RARITY_ORDER[b.category] - RARITY_ORDER[a.category] || b.price - a.price);
    }
    return list;
  }, [category, query, sort]);

  return (
    <div className="container py-10 md:py-14">
      <div className="mb-8 space-y-3">
        <h1 className="font-display font-black text-4xl md:text-5xl">
          Loja <span className="gradient-text">Hardy</span>
        </h1>
        <p className="text-muted-foreground max-w-xl">
          Encontre os melhores itens de Murder Mystery 2. Use os filtros para refinar sua busca.
        </p>
      </div>

      {/* Search + sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar item pelo nome..."
            className="pl-11 h-12 rounded-full glass border-border/60"
          />
        </div>
        <div className="flex items-center gap-2 glass rounded-full px-2 h-12">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground ml-2" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-transparent text-sm font-semibold focus:outline-none pr-2 h-full"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((k) => (
              <option key={k} value={k} className="bg-background">{sortLabels[k]}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none -mx-4 px-4">
        {ALL_CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "shrink-0 px-5 h-10 rounded-full text-sm font-bold transition-all border",
                active
                  ? "bg-gradient-brand text-white border-transparent shadow-glow-pink"
                  : "glass border-border/40 text-muted-foreground hover:text-foreground",
              )}
            >
              {cat === "all" ? "Todos" : RARITY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center">
          <p className="text-muted-foreground">Nenhum item encontrado. Tente outra busca.</p>
          <Button variant="ghost" className="mt-4" onClick={() => { setQuery(""); setCategory("all"); }}>
            Limpar filtros
          </Button>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">{filtered.length} {filtered.length === 1 ? "item" : "itens"}</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

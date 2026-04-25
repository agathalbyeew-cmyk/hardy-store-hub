import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { STORE_CONFIG } from "@/data/store-config";
import { Zap, Shield, MessageCircle, Sparkles, Star, ArrowRight, Package, Headphones, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import type { Rarity } from "@/types/store";
import { RARITY_LABELS } from "@/types/store";

const featured = PRODUCTS.filter((p) => p.tag === "hot" || p.tag === "new" || p.tag === "promo").slice(0, 8);

const categories: Array<{ key: Rarity; gradient: string; icon: string }> = [
  { key: "common", gradient: "from-slate-400 to-slate-600", icon: "🗡️" },
  { key: "uncommon", gradient: "from-emerald-400 to-emerald-600", icon: "🔪" },
  { key: "rare", gradient: "from-sky-400 to-blue-600", icon: "⚔️" },
  { key: "legendary", gradient: "from-amber-400 to-orange-500", icon: "🗡️" },
  { key: "godly", gradient: "from-pink-500 to-fuchsia-600", icon: "💎" },
  { key: "ancient", gradient: "from-purple-500 to-violet-700", icon: "🔮" },
  { key: "set", gradient: "from-cyan-400 to-teal-600", icon: "🎁" },
];

const reviews = [
  { name: "LucasPlayz", text: "Entrega super rápida e o suporte é incrível! Recomendo demais.", days: "2 dias atrás" },
  { name: "MiaGamer", text: "Comprei meu primeiro godly aqui, amei o atendimento!", days: "3 dias atrás" },
  { name: "ShadowMM2", text: "Melhor loja de MM2 que já comprei, preços justos.", days: "1 semana atrás" },
  { name: "NovaCraft", text: "Confiável de verdade. Já fiz 4 compras e nunca tive problema.", days: "2 semanas atrás" },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt=""
            className="h-full w-full object-cover opacity-40"
            width={1536}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-pink/30">
              <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
              <span className="text-xs font-semibold tracking-wide">A loja nº 1 de itens MM2 no Brasil</span>
            </div>

            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-balance">
              Os melhores itens de{" "}
              <span className="gradient-text">Murder Mystery 2</span>
              <br />
              com os <span className="gradient-text-warm">melhores preços</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Itens raros, godlys, ancients e sets exclusivos. Entrega em até 24h, suporte
              dedicado e a maior segurança em cada negociação.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild variant="hero" size="xl">
                <Link to="/loja">
                  Ver produtos <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href={STORE_CONFIG.discordUrl} target="_blank" rel="noopener noreferrer">
                  Entrar no Discord
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm">
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-brand-orange" /><span>Entrega rápida</span></div>
              <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-brand-pink" /><span>Atendimento confiável</span></div>
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-blue" /><span>Preços competitivos</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Shield, title: "Compra segura", color: "text-brand-pink" },
            { icon: Package, title: "Estoque atualizado", color: "text-brand-orange" },
            { icon: Headphones, title: "Suporte dedicado", color: "text-brand-blue" },
            { icon: Users, title: "Comunidade ativa", color: "text-brand-purple" },
          ].map(({ icon: Icon, title, color }) => (
            <div key={title} className="glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-semibold text-sm md:text-base">{title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="container py-16 md:py-20">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-brand-orange" />
              <span className="text-xs font-bold tracking-wider uppercase text-brand-orange">Destaques</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl">Itens em alta agora</h2>
          </div>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/loja">Ver todos <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="container py-12 md:py-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-brand-pink" />
            <span className="text-xs font-bold tracking-wider uppercase text-brand-pink">Categorias populares</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl">Explore por raridade</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/loja?cat=${cat.key}`}
              className="group relative aspect-square rounded-2xl overflow-hidden glass-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-30 group-hover:opacity-50 transition-opacity`} />
              <div className="relative h-full flex flex-col items-center justify-center gap-2 p-3 text-center">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">{RARITY_LABELS[cat.key]}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARKETING BANNER */}
      <section className="container py-12">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 glass-card">
          <div className="absolute inset-0 bg-gradient-hero opacity-30" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-pink/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl" />
          <div className="relative grid md:grid-cols-3 gap-6 text-center">
            {[
              "Na Hardy Store, sua compra é segura do início ao fim.",
              "Itens raros com preços que você não encontra em outro lugar.",
              "Entrega rápida e suporte dedicado para você.",
            ].map((phrase) => (
              <p key={phrase} className="font-display font-bold text-lg md:text-xl text-balance">
                {phrase}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* AVALIAÇÕES */}
      <section className="container py-16">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-brand-orange fill-brand-orange" />
            <span className="text-xs font-bold tracking-wider uppercase text-brand-orange">Avaliações</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl">O que nossos clientes dizem</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r) => (
            <div key={r.name} className="glass-card rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center font-black text-white">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{r.name}</div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
              <div className="text-xs text-muted-foreground/70">{r.days}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container py-16">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center glass-card">
          <div className="absolute inset-0 bg-gradient-brand opacity-20 animate-gradient-shift bg-[length:200%_200%]" />
          <div className="relative space-y-5">
            <h2 className="font-display font-black text-3xl md:text-5xl text-balance">
              Pronto para conquistar seus itens favoritos?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Junte-se a centenas de jogadores que já confiam na Hardy Store.
            </p>
            <Button asChild variant="hero" size="xl">
              <Link to="/loja">Começar a comprar <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

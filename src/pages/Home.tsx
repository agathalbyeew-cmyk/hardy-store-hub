import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { VibeBanner } from "@/components/VibeBanner";
import { DnaRecommendations } from "@/components/DnaRecommendations";
import { PRODUCTS } from "@/data/products";
import { STORE_CONFIG } from "@/data/store-config";
import { Zap, Shield, MessageCircle, Sparkles, Star, ArrowRight, Package, Headphones, Users, Gift, Clock, Flame } from "lucide-react";
import heroBg from "@/assets/hero-mascot.png";
import iconChroma from "@/assets/rarity/chroma.png";
import iconUncommon from "@/assets/rarity/uncommon.png";
import iconRare from "@/assets/rarity/rare.png";
import iconLegendary from "@/assets/rarity/legendary.png";
import iconGodly from "@/assets/rarity/godly.png";
import iconSet from "@/assets/rarity/set.png";
import iconLowSet from "@/assets/rarity/low-set.png";
import type { Rarity } from "@/types/store";
import { RARITY_LABELS } from "@/types/store";

const featured = PRODUCTS.filter((p) => p.tag === "hot" || p.tag === "new" || p.tag === "promo").slice(0, 8);

const categories: Array<{ key: Rarity; gradient: string; icon: string }> = [
  { key: "chroma", gradient: "from-pink-400 to-rose-600", icon: iconChroma },
  { key: "uncommon", gradient: "from-emerald-400 to-emerald-600", icon: iconUncommon },
  { key: "rare", gradient: "from-sky-400 to-blue-600", icon: iconRare },
  { key: "legendary", gradient: "from-amber-400 to-orange-500", icon: iconLegendary },
  { key: "godly", gradient: "from-pink-500 to-fuchsia-600", icon: iconGodly },
  { key: "set", gradient: "from-cyan-400 to-teal-600", icon: iconSet },
  { key: "low-set", gradient: "from-sky-300 to-cyan-500", icon: iconLowSet },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <VibeBanner />
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-15 mix-blend-luminosity"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>

        <div className="container py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-pink/30">
              <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
              <span className="text-xs font-semibold tracking-wide">Bem-vindo à nossa lojinha 💖</span>
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

      {/* GATILHO DE URGÊNCIA */}
      <section className="container pt-6">
        <div className="glass-card rounded-2xl p-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm border border-brand-orange/30">
          <span className="inline-flex items-center gap-2"><Flame className="h-4 w-4 text-brand-orange" /><span className="font-bold">Estoque limitado</span> — itens raros saem em horas</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-brand-pink" /><span>Entrega geralmente em <span className="font-bold">até 24h</span></span></span>
          <span className="inline-flex items-center gap-2"><Gift className="h-4 w-4 text-brand-blue" /><Link to="/roleta" className="font-bold text-brand-blue hover:underline">Faca grátis na roleta!</Link></span>
        </div>
      </section>

      <DnaRecommendations />

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
                <img
                  src={cat.icon}
                  alt={RARITY_LABELS[cat.key]}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-14 w-14 md:h-16 md:w-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110"
                />
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

      {/* SEJA FORNECEDOR */}
      <section className="container py-16">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 glass-card">
          <div className="absolute inset-0 bg-gradient-warm opacity-20" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-orange/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-pink/20 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-orange/30">
                <Sparkles className="h-3 w-3 text-brand-orange" />
                <span className="text-xs font-bold tracking-wider uppercase text-brand-orange">Para vendedores</span>
              </div>
              <h2 className="font-display font-black text-2xl md:text-4xl text-balance">
                Cansado do seu inventário? <span className="gradient-text-warm">Venda pra gente.</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Compramos seus itens de MM2 com avaliação ética e negociação profissional. Pagamento rápido, sem enrolação.
              </p>
            </div>
            <Button asChild variant="hero" size="xl">
              <Link to="/seja-fornecedor">
                Saiba mais <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AVALIAÇÕES — CTA real */}
      <section className="container py-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <Star className="h-4 w-4 text-brand-orange fill-brand-orange" />
            <span className="text-xs font-bold tracking-wider uppercase text-brand-orange">Avaliações reais</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl">Sua opinião importa de verdade</h2>
          <p className="text-muted-foreground">
            Comprou algum item? Entre em qualquer produto e deixe sua avaliação — ela aparece para todo mundo, sem filtro.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/loja">Ver produtos para avaliar <ArrowRight className="h-4 w-4" /></Link>
          </Button>
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

import { Button } from "@/components/ui/button";
import { STORE_CONFIG } from "@/data/store-config";
import { Handshake, ShieldCheck, Coins, MessageCircle, ArrowRight, Sparkles, Package, CheckCircle2 } from "lucide-react";

const whatsappMsg = encodeURIComponent(
  "Olá! Quero ser fornecedor da Hardy Store e tenho itens MM2 para vender. Podemos conversar?",
);
const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${whatsappMsg}`;

const steps = [
  { icon: MessageCircle, title: "Entre em contato", desc: "Mande mensagem no WhatsApp ou Discord com sua lista de itens." },
  { icon: ShieldCheck, title: "Avaliação ética", desc: "Analisamos seu inventário com transparência e respeito." },
  { icon: Handshake, title: "Negociação justa", desc: "Combinamos preços abaixo da revenda — sem enrolação." },
  { icon: Coins, title: "Pagamento rápido", desc: "Após acordo, você recebe assim que possível." },
];

export default function SejaFornecedor() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-brand-orange/30">
            <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
            <span className="text-xs font-semibold tracking-wide">Programa de Fornecedores</span>
          </div>

          <h1 className="font-display font-black text-4xl md:text-6xl leading-[0.95] tracking-tight text-balance">
            Seja <span className="gradient-text-warm">fornecedor</span> da Hardy Store
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Está cansado do seu inventário? Envie-nos e compraremos assim que possível, após
            avaliação e negociação de forma ética e profissional. Compramos a preço de
            revenda — logo, precisa ser abaixo do que estamos disponibilizando.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild variant="hero" size="xl">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Conversar no WhatsApp
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={STORE_CONFIG.discordUrl} target="_blank" rel="noopener noreferrer">
                Falar no Discord
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="container py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-brand-pink" />
            <span className="text-xs font-bold tracking-wider uppercase text-brand-pink">Como funciona</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl">Simples, rápido e transparente</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-gradient-brand opacity-10 blur-2xl" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-display font-black text-2xl text-muted-foreground/40">0{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONDIÇÕES */}
      <section className="container py-12">
        <div className="glass-card rounded-3xl p-8 md:p-12 space-y-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-pink/20 blur-3xl" />

          <div className="relative space-y-6">
            <div>
              <h2 className="font-display font-black text-2xl md:text-3xl">O que você precisa saber</h2>
              <p className="text-muted-foreground mt-1">
                Para garantir uma negociação saudável para os dois lados:
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "Compramos a preço de revenda — seu preço precisa ser abaixo do que praticamos na loja.",
                "Avaliamos cada item com cuidado: raridade, demanda atual e estoque já existente.",
                "Pagamento via método combinado (Pix preferencial), sempre após acordo mútuo.",
                "Sem pressão: se o preço não fechar, nos despedimos com respeito e ficamos abertos a futuras propostas.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">{line}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Button asChild variant="hero" size="lg">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Quero vender meu inventário <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

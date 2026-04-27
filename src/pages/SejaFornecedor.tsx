import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { STORE_CONFIG } from "@/data/store-config";
import {
  Handshake, ShieldCheck, Coins, MessageCircle, ArrowRight, Sparkles,
  Package, CheckCircle2, Send,
} from "lucide-react";

const usernameSchema = z
  .string()
  .trim()
  .min(3, "Mínimo 3 caracteres")
  .max(20, "Máximo 20 caracteres")
  .regex(/^[a-zA-Z0-9_]+$/, "Apenas letras, números e _");
const notesSchema = z.string().trim().max(500, "Máximo 500 caracteres");

const steps = [
  { icon: MessageCircle, title: "Envie seu nome de usuário", desc: "Só preenche o nome — o resto a gente combina." },
  { icon: ShieldCheck, title: "Avaliação ética", desc: "Analisamos seu inventário com transparência e respeito." },
  { icon: Handshake, title: "Negociação justa", desc: "Combinamos preços abaixo da revenda — sem enrolação." },
  { icon: Coins, title: "Pagamento rápido", desc: "Após acordo, você recebe assim que possível." },
];

export default function SejaFornecedor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Entre na sua conta para enviar.");
      navigate("/auth", { state: { from: "/seja-fornecedor" } });
      return;
    }
    setSubmitting(true);
    try {
      const u = usernameSchema.parse(username);
      const n = notesSchema.parse(notes);
      const { error } = await supabase.from("supplier_requests").insert({
        user_id: user.id,
        username: u,
        notes: n || null,
      });
      if (error) throw error;
      toast.success("Recebemos seu pedido! Em breve entraremos em contato.");
      setDone(true);
      setUsername("");
      setNotes("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar");
    } finally {
      setSubmitting(false);
    }
  };

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
        </div>
      </section>

      {/* FORM */}
      <section className="container py-4 max-w-xl">
        <div className="glass-card rounded-3xl p-6 md:p-8 space-y-5 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />

          {done ? (
            <div className="text-center space-y-4 py-6">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-warm flex items-center justify-center shadow-glow-orange">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <h2 className="font-display font-black text-2xl">Recebemos! 🎉</h2>
              <p className="text-sm text-muted-foreground">
                Vamos analisar seu nome e te chamar pelo Discord ou WhatsApp em breve.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild variant="hero">
                  <a href={STORE_CONFIG.discordUrl} target="_blank" rel="noopener noreferrer">
                    Entrar no Discord
                  </a>
                </Button>
                <Button variant="glass" onClick={() => setDone(false)}>
                  Enviar outro
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4 relative">
              <div>
                <h2 className="font-display font-black text-2xl">Quero vender meu inventário</h2>
                <p className="text-sm text-muted-foreground">
                  Manda só seu nome de usuário do jogo — a gente fala com você direto.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user">Nome de usuário (Roblox / MM2)</Label>
                <Input
                  id="user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="seu_nick"
                  required
                  maxLength={20}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Algo a adicionar? (opcional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: tenho 2 sets eternal e 1 chroma luger"
                  maxLength={500}
                  rows={3}
                />
              </div>

              {!user && (
                <p className="text-xs text-muted-foreground">
                  Precisa estar logado.{" "}
                  <Link to="/auth" state={{ from: "/seja-fornecedor" }} className="text-brand-pink font-semibold hover:underline">
                    Entrar
                  </Link>
                </p>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                <Send className="h-4 w-4" />
                {submitting ? "Enviando..." : "Enviar pedido"}
              </Button>
            </form>
          )}
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
          </div>
        </div>
      </section>
    </div>
  );
}

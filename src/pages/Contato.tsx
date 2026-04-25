import { STORE_CONFIG } from "@/data/store-config";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";

export default function Contato() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
        Fale com a <span className="gradient-text">Hardy Store</span>
      </h1>
      <p className="text-muted-foreground mb-10">
        Atendimento humano, rápido e direto. Escolha seu canal preferido.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card rounded-3xl p-7 group hover:-translate-y-1 transition-all"
        >
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 shadow-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <h2 className="font-display font-bold text-xl mb-1">WhatsApp</h2>
          <p className="text-sm text-muted-foreground mb-3">Resposta em minutos no horário comercial.</p>
          <p className="font-mono font-bold text-brand-pink">{STORE_CONFIG.whatsappDisplay}</p>
        </a>

        <a
          href={STORE_CONFIG.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card rounded-3xl p-7 group hover:-translate-y-1 transition-all"
        >
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
            <Send className="h-6 w-6 text-white" />
          </div>
          <h2 className="font-display font-bold text-xl mb-1">Discord</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Entre no nosso servidor e confira os melhores preços e novidades!
          </p>
          <p className="font-mono font-bold text-brand-blue">{STORE_CONFIG.discordHandle}</p>
        </a>
      </div>

      <div className="mt-8 text-center">
        <Button asChild variant="hero" size="lg">
          <a href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" /> Falar agora no WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}

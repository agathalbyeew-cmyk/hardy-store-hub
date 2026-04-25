import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { STORE_CONFIG } from "@/data/store-config";
import { MessageCircle, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/40 bg-background/50 backdrop-blur">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-xs">
            A loja oficial dos melhores itens de Murder Mystery 2. Compra segura, entrega
            rápida e os preços mais justos do mercado.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold mb-3 text-sm uppercase tracking-wider text-brand-pink">Loja</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/loja" className="hover:text-foreground transition-colors">Todos os itens</Link></li>
            <li><Link to="/loja?cat=godly" className="hover:text-foreground transition-colors">Godlys</Link></li>
            <li><Link to="/loja?cat=ancient" className="hover:text-foreground transition-colors">Ancients</Link></li>
            <li><Link to="/loja?cat=set" className="hover:text-foreground transition-colors">Sets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold mb-3 text-sm uppercase tracking-wider text-brand-blue">Institucional</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/sobre" className="hover:text-foreground transition-colors">Sobre nós</Link></li>
            <li><Link to="/termos" className="hover:text-foreground transition-colors">Termos de compra</Link></li>
            <li><Link to="/reembolso" className="hover:text-foreground transition-colors">Política de reembolso</Link></li>
            <li><Link to="/contato" className="hover:text-foreground transition-colors">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold mb-3 text-sm uppercase tracking-wider text-brand-orange">Comunidade</h4>
          <div className="space-y-2">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {STORE_CONFIG.whatsappDisplay}
            </a>
            <a
              href={STORE_CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Send className="h-4 w-4" />
              Discord oficial
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Hardy Store. Todos os direitos reservados.
          Hardy Store não é afiliada à Roblox Corporation ou aos criadores de Murder Mystery 2.
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatBRL, generateOrderId, STORE_CONFIG } from "@/data/store-config";
import { RARITY_LABELS } from "@/types/store";
import type { Order } from "@/types/store";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Check, MessageCircle, Receipt, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function Carrinho() {
  const { detailedItems, totalValue, totalItems, updateQuantity, removeItem, clearCart } = useCart();
  const { user, profile } = useAuth();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (profile?.display_name || profile?.username) {
      setName(profile.display_name || profile.username);
    }
  }, [profile]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      toast.error("Preencha nome e WhatsApp para continuar.");
      return;
    }
    if (detailedItems.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return;
    }
    setSubmitting(true);

    const newOrder: Order = {
      id: generateOrderId(),
      customerName: name.trim(),
      whatsapp: whatsapp.trim(),
      items: detailedItems,
      total: totalValue,
      date: new Date().toLocaleString("pt-BR"),
    };

    // Persiste no banco se logado (histórico)
    if (user) {
      try {
        await supabase.from("orders").insert({
          user_id: user.id,
          order_code: newOrder.id,
          total: newOrder.total,
          item_count: totalItems,
          customer_name: newOrder.customerName,
          whatsapp: newOrder.whatsapp,
          items: newOrder.items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
            rarity: i.product.category,
          })),
        });
      } catch {
        // Silencioso — pedido segue para WhatsApp mesmo se banco falhar
      }
    }

    // Build WhatsApp message
    const lines = [
      `🛒 *Novo Pedido — Hardy Store*`,
      `*ID:* ${newOrder.id}`,
      `*Cliente:* ${newOrder.customerName}`,
      `*WhatsApp:* ${newOrder.whatsapp}`,
      ``,
      `*Itens:*`,
      ...newOrder.items.map(
        (i) => `• ${i.product.name} (${RARITY_LABELS[i.product.category]}) x${i.quantity} — ${formatBRL(i.subtotal)}`,
      ),
      ``,
      `*Total:* ${formatBRL(newOrder.total)}`,
      ``,
      `_Pedido feito em ${newOrder.date}_`,
    ];
    const message = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;

    setOrder(newOrder);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitting(false);
  };

  const finalizeAfterReceipt = () => {
    clearCart();
    setWhatsapp("");
    setOrder(null);
    toast.success("Pedido enviado! Em breve entraremos em contato.");
  };

  if (detailedItems.length === 0 && !order) {
    return (
      <div className="container py-20">
        <div className="max-w-md mx-auto text-center glass-card rounded-3xl p-10 space-y-4">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-brand/20 flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-brand-pink" />
          </div>
          <h1 className="font-display font-black text-2xl">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground text-sm">Que tal adicionar alguns itens lendários?</p>
          <Button asChild variant="hero" size="lg">
            <Link to="/loja">Ver produtos <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-14">
      <h1 className="font-display font-black text-4xl md:text-5xl mb-8">
        Seu <span className="gradient-text">carrinho</span>
      </h1>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Items list */}
        <div className="space-y-3">
          {detailedItems.map(({ product, quantity, subtotal }) => (
            <div key={product.id} className="glass-card rounded-2xl p-4 flex gap-4 items-center">
              <div className="h-20 w-20 rounded-xl bg-muted/40 flex items-center justify-center shrink-0 overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-2" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{RARITY_LABELS[product.category]}</p>
                <p className="font-display font-black gradient-text mt-1">{formatBRL(product.price)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remover item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1 glass rounded-full p-1">
                  <button
                    className="h-7 w-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    aria-label="Diminuir"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                  <button
                    className="h-7 w-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    aria-label="Aumentar"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <p className="text-xs font-semibold text-muted-foreground">{formatBRL(subtotal)}</p>
              </div>
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">
            Esvaziar carrinho
          </Button>
        </div>

        {/* Checkout form */}
        <aside className="lg:sticky lg:top-20 self-start">
          <form onSubmit={handleCheckout} className="glass-card rounded-3xl p-6 space-y-5">
            <h2 className="font-display font-black text-2xl">Finalizar pedido</h2>

            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                required
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(11) 99999-9999"
                required
                className="h-11 rounded-xl"
              />
            </div>

            <div className="border-t border-border/40 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Itens</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold">Total</span>
                <span className="font-display font-black text-2xl gradient-text">{formatBRL(totalValue)}</span>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
              <MessageCircle className="h-5 w-5" />
              Finalizar via WhatsApp
            </Button>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-pink shrink-0" />
              <span>
                Compra segura. {user ? "Pedido salvo no seu histórico." : (
                  <><Link to="/auth" className="text-brand-pink font-semibold">Entre</Link> para salvar no histórico.</>
                )}
              </span>
            </div>
          </form>
        </aside>
      </div>

      {/* Receipt modal */}
      <Dialog open={!!order} onOpenChange={(o) => !o && finalizeAfterReceipt()}>
        <DialogContent className="glass-card border-border/40 max-w-md">
          <DialogHeader>
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-brand flex items-center justify-center mb-2 shadow-glow-pink">
              <Check className="h-6 w-6 text-white" strokeWidth={3} />
            </div>
            <DialogTitle className="text-center font-display font-black text-2xl">Pedido enviado!</DialogTitle>
            <DialogDescription className="text-center">
              Seu comprovante foi gerado. O atendimento continuará no WhatsApp.
            </DialogDescription>
          </DialogHeader>

          {order && (
            <div className="space-y-4">
              <div className="glass rounded-2xl p-4 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-brand-pink font-bold">
                  <Receipt className="h-4 w-4" /> Comprovante
                </div>
                <div className="flex justify-between"><span className="text-muted-foreground">ID:</span><span className="font-mono font-bold">{order.id}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Cliente:</span><span className="font-semibold">{order.customerName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Data:</span><span>{order.date}</span></div>
                <div className="border-t border-border/40 pt-2 space-y-1">
                  {order.items.map((i) => (
                    <div key={i.product.id} className="flex justify-between text-xs">
                      <span className="truncate pr-2">{i.product.name} x{i.quantity}</span>
                      <span className="font-semibold shrink-0">{formatBRL(i.subtotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/40 pt-2 flex justify-between items-baseline">
                  <span className="font-bold">Total</span>
                  <span className="font-display font-black text-lg gradient-text">{formatBRL(order.total)}</span>
                </div>
              </div>

              {user && (
                <Button asChild variant="glass" size="sm" className="w-full">
                  <Link to="/pedidos">Ver no histórico</Link>
                </Button>
              )}
              <Button variant="hero" size="lg" className="w-full" onClick={finalizeAfterReceipt}>
                Concluir
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

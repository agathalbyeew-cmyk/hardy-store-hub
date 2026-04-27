import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/data/store-config";
import { Receipt, ShoppingBag, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface OrderRow {
  id: string;
  order_code: string;
  total: number;
  item_count: number;
  status: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  created_at: string;
}

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pendente", cls: "bg-brand-orange/15 text-brand-orange border-brand-orange/30" },
  paid: { label: "Pago", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  delivered: { label: "Entregue", cls: "bg-brand-blue/15 text-brand-blue border-brand-blue/30" },
  cancelled: { label: "Cancelado", cls: "bg-destructive/15 text-destructive border-destructive/30" },
};

export default function Pedidos() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { state: { from: "/pedidos" }, replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, order_code, total, item_count, status, items, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (data) setOrders(data as unknown as OrderRow[]);
      setLoadingOrders(false);
    })();
  }, [user]);

  if (loading || loadingOrders) {
    return <div className="container py-16 text-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="container py-12 max-w-3xl space-y-6">
      <header className="space-y-1">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-pink">
          <Receipt className="h-4 w-4" />
          Histórico
        </div>
        <h1 className="font-display font-black text-3xl md:text-4xl">Meus pedidos</h1>
        <p className="text-sm text-muted-foreground">
          Cada pedido feito pela loja é registrado aqui. O atendimento sempre segue pelo WhatsApp/Discord.
        </p>
      </header>

      {orders.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center space-y-4">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-brand/20 flex items-center justify-center">
            <ShoppingBag className="h-7 w-7 text-brand-pink" />
          </div>
          <p className="text-sm text-muted-foreground">Nenhum pedido por aqui ainda.</p>
          <Button asChild variant="hero">
            <Link to="/loja">Ver produtos <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const status = STATUS_LABEL[o.status] ?? STATUS_LABEL.pending;
            return (
              <div key={o.id} className="glass-card rounded-2xl p-5 space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="font-mono font-bold text-sm">{o.order_code}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(o.created_at), "dd 'de' MMM 'às' HH:mm", { locale: ptBR })}
                    </div>
                  </div>
                  <div className={`text-xs font-bold px-2.5 py-1 rounded-full border ${status.cls}`}>
                    {status.label}
                  </div>
                </div>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  {(o.items ?? []).slice(0, 4).map((i, idx) => (
                    <li key={idx}>• {i.name} x{i.quantity}</li>
                  ))}
                  {(o.items ?? []).length > 4 && <li>...mais {o.items.length - 4} item(ns)</li>}
                </ul>
                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <span className="text-xs text-muted-foreground">{o.item_count} item(ns)</span>
                  <span className="font-display font-black gradient-text text-lg">{formatBRL(o.total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

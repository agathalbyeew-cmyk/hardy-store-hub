import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BadgeGrid } from "@/components/BadgeChip";
import { computeBadges, type UserStats } from "@/data/badges";
import { User as UserIcon, ArrowLeft, Calendar } from "lucide-react";
import { formatBRL } from "@/data/store-config";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PublicProfile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export default function PerfilPublico() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, created_at")
        .ilike("username", username)
        .maybeSingle();
      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setProfile(data as PublicProfile);
      const { data: s } = await supabase.rpc("get_user_stats", { _user_id: data.id });
      if (s) setStats(s as unknown as UserStats);
      setLoading(false);
    })();
  }, [username]);

  if (loading) {
    return <div className="container py-16 text-center text-muted-foreground">Carregando...</div>;
  }

  if (notFound || !profile) {
    return (
      <div className="container py-16 text-center space-y-4">
        <h1 className="font-display font-black text-3xl">Usuário não encontrado</h1>
        <Button asChild variant="hero">
          <Link to="/">Voltar</Link>
        </Button>
      </div>
    );
  }

  const badges = stats ? computeBadges(stats) : [];

  return (
    <div className="container py-12 max-w-2xl space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Início
      </Link>

      <div className="glass-card rounded-3xl p-8 space-y-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-pink/15 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 relative">
          <div className="h-24 w-24 rounded-full bg-gradient-brand flex items-center justify-center overflow-hidden shadow-glow-pink shrink-0">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-12 w-12 text-white" />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="font-display font-black text-3xl truncate">
              {profile.display_name || profile.username}
            </h1>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3" />
              Membro desde {format(new Date(profile.created_at), "MMM yyyy", { locale: ptBR })}
            </p>
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-3 relative">
            <div className="glass rounded-xl p-3 text-center">
              <div className="font-display font-black text-2xl gradient-text">{stats.total_orders}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Pedidos</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="font-display font-black text-2xl gradient-text-warm">{formatBRL(stats.total_spent)}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Movimentou</div>
            </div>
            <div className="glass rounded-xl p-3 text-center">
              <div className="font-display font-black text-2xl text-brand-orange">{stats.roulette_wins}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Prêmios</div>
            </div>
          </div>
        )}

        <div className="space-y-2 relative">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Medalhas</h2>
          <BadgeGrid badges={badges} />
        </div>
      </div>
    </div>
  );
}

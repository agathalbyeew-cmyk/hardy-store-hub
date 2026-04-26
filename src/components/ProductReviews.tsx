import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User as UserIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const commentSchema = z.string().trim().max(1000, "Máximo 1000 caracteres");

export interface ReviewItem {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface Props {
  productId: string;
}

export function ProductReviews({ productId }: Props) {
  const { user, profile } = useAuth();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const myReview = user ? reviews.find((r) => r.user_id === user.id) : null;

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("product_reviews")
      .select("id, product_id, user_id, rating, comment, created_at, profiles(username, display_name, avatar_url)")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    if (!error && data) setReviews(data as unknown as ReviewItem[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [productId]);

  useEffect(() => {
    if (myReview) {
      setRating(myReview.rating);
      setComment(myReview.comment ?? "");
    } else {
      setRating(0);
      setComment("");
    }
  }, [myReview?.id]);

  const submit = async () => {
    if (!user) return;
    if (rating < 1) return toast.error("Escolha uma nota de 1 a 5 estrelas");
    setSubmitting(true);
    try {
      const c = commentSchema.parse(comment);
      const { error } = await supabase.from("product_reviews").upsert(
        {
          product_id: productId,
          user_id: user.id,
          rating,
          comment: c || null,
        },
        { onConflict: "product_id,user_id" },
      );
      if (error) throw error;
      toast.success(myReview ? "Avaliação atualizada!" : "Obrigado pela avaliação!");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async () => {
    if (!user || !myReview) return;
    const { error } = await supabase.from("product_reviews").delete().eq("id", myReview.id);
    if (error) return toast.error(error.message);
    toast.success("Avaliação removida");
    await load();
  };

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="font-display font-black text-4xl gradient-text">{avg.toFixed(1)}</div>
          <div className="flex gap-0.5 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={cn("h-4 w-4", n <= Math.round(avg) ? "fill-brand-orange text-brand-orange" : "text-muted-foreground/30")}
              />
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}</div>
        </div>
      </div>

      {/* Form */}
      <div className="glass-card rounded-2xl p-5 space-y-3">
        {user ? (
          <>
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm">
                {myReview ? "Sua avaliação" : "Deixe sua avaliação"}
              </div>
              {myReview && (
                <button onClick={remove} className="text-xs text-destructive hover:underline flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Remover
                </button>
              )}
            </div>
            <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  className="transition-transform hover:scale-110"
                  aria-label={`${n} estrelas`}
                >
                  <Star
                    className={cn(
                      "h-7 w-7 transition-colors",
                      n <= (hover || rating) ? "fill-brand-orange text-brand-orange" : "text-muted-foreground/40",
                    )}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Conte como foi sua experiência (opcional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={3}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{comment.length}/1000</span>
              <Button onClick={submit} variant="hero" size="sm" disabled={submitting}>
                {submitting ? "Enviando..." : myReview ? "Atualizar" : "Enviar avaliação"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-3 py-2">
            <p className="text-sm text-muted-foreground">Entre para avaliar este produto</p>
            <Button asChild variant="hero" size="sm">
              <Link to="/auth">Entrar / Criar conta</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-sm text-muted-foreground py-4">Carregando avaliações...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4">
            Nenhuma avaliação ainda. Seja o primeiro!
          </div>
        ) : (
          reviews.map((r) => {
            const name = r.profiles?.display_name || r.profiles?.username || "Usuário";
            const initial = name[0]?.toUpperCase() ?? "?";
            return (
              <div key={r.id} className="glass-card rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-brand flex items-center justify-center overflow-hidden shrink-0">
                    {r.profiles?.avatar_url ? (
                      <img src={r.profiles.avatar_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-black text-white text-sm">{initial}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{name}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={cn("h-3 w-3", n <= r.rating ? "fill-brand-orange text-brand-orange" : "text-muted-foreground/30")}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: ptBR })}
                      </span>
                    </div>
                  </div>
                </div>
                {r.comment && <p className="text-sm text-muted-foreground/90 leading-relaxed">{r.comment}</p>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

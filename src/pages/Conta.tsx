import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, User as UserIcon, Upload, Receipt, ExternalLink } from "lucide-react";
import { BadgeGrid } from "@/components/BadgeChip";
import { computeBadges, type UserStats } from "@/data/badges";

const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/, "Apenas letras, números e _");
const displayNameSchema = z.string().trim().max(50);
const avatarSchema = z.string().trim().url().max(500).or(z.literal(""));

export default function Conta() {
  const { user, profile, loading, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setDisplayName(profile.display_name ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
    }
  }, [profile]);

  // Carrega stats para badges
  useEffect(() => {
    if (!user) return;
    supabase.rpc("get_user_stats", { _user_id: user.id }).then(({ data }) => {
      if (data) setStats(data as unknown as UserStats);
    });
  }, [user]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Imagem máxima 4MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      setAvatarUrl(data.publicUrl);
      toast.success("Foto carregada! Salve para confirmar.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar imagem");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const u = usernameSchema.parse(username);
      const d = displayNameSchema.parse(displayName);
      const a = avatarSchema.parse(avatarUrl);

      // Username único (case-insensitive) — ignora o próprio
      if (u.toLowerCase() !== profile?.username.toLowerCase()) {
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .ilike("username", u)
          .maybeSingle();
        if (existing && existing.id !== user.id) {
          toast.error("Esse nome de usuário já está em uso.");
          setSaving(false);
          return;
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({ username: u, display_name: d || null, avatar_url: a || null })
        .eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success("Perfil atualizado!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return <div className="container py-16 text-center text-muted-foreground">Carregando...</div>;
  }

  const badges = stats ? computeBadges(stats) : [];

  return (
    <div className="container py-12 max-w-2xl space-y-6">
      <div className="glass-card rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-brand flex items-center justify-center overflow-hidden shrink-0 shadow-glow-pink">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-10 w-10 text-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display font-black text-2xl truncate">
              {profile.display_name || profile.username}
            </h1>
            <Link
              to={`/u/${profile.username}`}
              className="text-sm text-brand-pink hover:underline inline-flex items-center gap-1"
            >
              @{profile.username} <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {badges.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Suas medalhas
            </p>
            <BadgeGrid badges={badges} />
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label>Foto de perfil</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="glass"
                size="sm"
                onClick={() => fileInput.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4" />
                {uploading ? "Enviando..." : "Enviar arquivo"}
              </Button>
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
              <span className="text-xs text-muted-foreground">PNG, JPG até 4MB</span>
            </div>
            <Input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="ou cole uma URL: https://..."
              maxLength={500}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário (único)</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required maxLength={20} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display">Nome de exibição</Label>
            <Input id="display" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={50} placeholder="Como você quer ser chamado" />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" variant="hero" disabled={saving}>
              {saving ? "Salvando..." : "Salvar alterações"}
            </Button>
            <Button asChild type="button" variant="glass">
              <Link to="/pedidos">
                <Receipt className="h-4 w-4" />
                Meus pedidos
              </Link>
            </Button>
            <Button type="button" variant="glass" onClick={async () => { await signOut(); navigate("/"); }}>
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

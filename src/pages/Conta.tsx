import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, User as UserIcon } from "lucide-react";

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const u = usernameSchema.parse(username);
      const d = displayNameSchema.parse(displayName);
      const a = avatarSchema.parse(avatarUrl);
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

  return (
    <div className="container py-12 max-w-2xl">
      <div className="glass-card rounded-3xl p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-brand flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <h1 className="font-display font-black text-2xl">{profile.display_name || profile.username}</h1>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required maxLength={20} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="display">Nome de exibição</Label>
            <Input id="display" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={50} placeholder="Como você quer ser chamado" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatar">URL do avatar (opcional)</Label>
            <Input id="avatar" type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." maxLength={500} />
            <p className="text-xs text-muted-foreground">Cole o link de uma imagem (ex: imgur, discord)</p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="hero" disabled={saving}>
              {saving ? "Salvando..." : "Salvar alterações"}
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

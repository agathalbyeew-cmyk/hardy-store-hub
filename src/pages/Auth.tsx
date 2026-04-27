import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, Mail, Lock, User as UserIcon } from "lucide-react";

const DISCORD_REDIRECT_URI = `${typeof window !== "undefined" ? window.location.origin : ""}/auth`;

const emailSchema = z.string().trim().email({ message: "Email inválido" }).max(255);
const passwordSchema = z.string().min(6, { message: "Mínimo 6 caracteres" }).max(72);
const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: "Mínimo 3 caracteres" })
  .max(20, { message: "Máximo 20 caracteres" })
  .regex(/^[a-zA-Z0-9_]+$/, { message: "Apenas letras, números e _" });

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string })?.from ?? "/";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  // Handle Discord OAuth callback (?code=... in URL)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const errorParam = params.get("error");
    if (errorParam) {
      toast.error(`Discord: ${errorParam}`);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }
    if (!code) return;

    (async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke("discord-auth", {
          body: { action: "callback", code, redirect_uri: DISCORD_REDIRECT_URI },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        if (!data?.access_token || !data?.refresh_token) {
          throw new Error("Resposta inválida do servidor Discord");
        }
        const { error: setErr } = await supabase.auth.setSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });
        if (setErr) throw setErr;
        toast.success("Conectado com Discord!");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Falha no login Discord");
      } finally {
        window.history.replaceState({}, "", window.location.pathname);
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailVal = emailSchema.parse(email);
      const passVal = passwordSchema.parse(password);

      if (mode === "signup") {
        const userVal = usernameSchema.parse(username);
        const { error } = await supabase.auth.signUp({
          email: emailVal,
          password: passVal,
          options: {
            emailRedirectTo: window.location.origin,
            data: { username: userVal, display_name: userVal },
          },
        });
        if (error) throw error;
        toast.success("Conta criada! Você já está conectado.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailVal,
          password: passVal,
        });
        if (error) throw error;
        toast.success("Bem-vindo de volta!");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro inesperado";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleDiscord = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("discord-auth", {
        body: { action: "start", redirect_uri: DISCORD_REDIRECT_URI },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (!data?.url) throw new Error("URL de autorização Discord inválida");
      window.location.href = data.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao iniciar Discord");
      setLoading(false);
    }
  };

  return (
    <div className="container py-16 max-w-md mx-auto">
      <div className="glass-card rounded-3xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-brand-pink/30">
            <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
            <span className="text-xs font-semibold">Hardy Store</span>
          </div>
          <h1 className="font-display font-black text-3xl">
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "signin"
              ? "Bem-vindo de volta! Entre para avaliar produtos."
              : "Cadastre-se para deixar avaliações."}
          </p>
        </div>

        <Button
          type="button"
          variant="glass"
          size="lg"
          className="w-full"
          onClick={handleGoogle}
          disabled={loading}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar com Google
        </Button>

        <Button
          type="button"
          variant="glass"
          size="lg"
          className="w-full hover:border-[#5865F2]/50"
          onClick={handleDiscord}
          disabled={loading}
        >
          <svg className="h-4 w-4" viewBox="0 -28.5 256 256" preserveAspectRatio="xMidYMid">
            <path
              fill="#5865F2"
              d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891459 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891459 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
            />
          </svg>
          Continuar com Discord
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="lucas_mm2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  maxLength={20}
                  className="pl-10"
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Aguarde..." : mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <div className="text-center text-sm">
          {mode === "signin" ? (
            <>
              Não tem conta?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-brand-pink font-bold hover:underline"
              >
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem conta?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-brand-pink font-bold hover:underline"
              >
                Entrar
              </button>
            </>
          )}
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Voltar para a loja
          </Link>
        </div>
      </div>
    </div>
  );
}

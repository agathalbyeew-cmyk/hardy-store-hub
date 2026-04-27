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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailVal = emailSchema.parse(email);
      const passVal = passwordSchema.parse(password);

      if (mode === "signup") {
        const userVal = usernameSchema.parse(username);

        // Verifica unicidade case-insensitive antes de criar conta
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .ilike("username", userVal)
          .maybeSingle();
        if (existing) {
          toast.error("Esse nome de usuário já está em uso. Escolha outro.");
          setLoading(false);
          return;
        }

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
              ? "Bem-vindo de volta! Entre para avaliar produtos e ganhar badges."
              : "Cadastre-se para avaliar, acompanhar pedidos e girar a roleta."}
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

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border/50" />
          <span className="text-xs text-muted-foreground">ou</span>
          <div className="flex-1 h-px bg-border/50" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário (único)</Label>
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

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Criar conta — VetClass Pro" }] }),
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: search.redirect as string | undefined,
    };
  },
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (search.redirect) {
        navigate({ to: search.redirect });
      } else {
        navigate({ to: "/app" });
      }
    }
  }, [user, navigate, search.redirect]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const redirectTo = search.redirect ? window.location.origin + search.redirect : window.location.origin + "/app";
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: { full_name: name },
      },
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Conta criada! Verifique seu e-mail para confirmar.");
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/app" });
    if (result.error) toast.error("Não foi possível continuar com Google");
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:block bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-coral text-coral-foreground">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold">VetClass<span className="text-coral">Pro</span></span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-bold leading-tight">Comece sua jornada na medicina veterinária moderna.</h2>
            <p className="mt-4 text-white/70 max-w-md">Acesse aulas, casos clínicos e o Tutor Vet IA em uma só plataforma.</p>
          </div>
          <p className="text-sm text-white/50">© VetClass Pro</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold">VetClass<span className="text-coral">Pro</span></span>
          </Link>
          <h1 className="font-display text-3xl font-bold">Criar conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">Crie sua conta em menos de 1 minuto.</p>

          <div className="mt-8"></div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-coral text-coral-foreground hover:bg-coral/90">
              {loading ? "Criando..." : "Criar minha conta"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem conta? <Link to="/login" className="font-medium text-coral hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

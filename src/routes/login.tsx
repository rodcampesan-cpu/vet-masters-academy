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

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — VetClass Pro" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loginAs } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const email = user.email?.toLowerCase()?.trim() || "";
      const isAdmin = user.user_metadata?.role === "admin" || email === "mimoshow10@gmail.com";
      const isTeacher = user.user_metadata?.role === "teacher" || email === "rodrigo.vetlat@hotmail.com" || email === "namdias02@gmail.com" || email === "carolina_vet@yahoo.com.br" || email === "nathyarmarinhos1@gmail.com";
      
      if (isAdmin) {
        navigate({ to: "/app/admin" });
      } else if (isTeacher) {
        navigate({ to: "/app/teacher" });
      } else {
        navigate({ to: "/app" });
      }
    }
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email.trim().toLowerCase() === "aluno@vetclass.com" && password === "123456") {
      loginAs("student");
      toast.success("Bem-vindo de volta, Aluno VIP!");
      navigate({ to: "/app" });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message === "Invalid login credentials" ? "E-mail ou senha incorretos." : error.message);
      setLoading(false);
      return;
    }

    toast.success("Bem-vindo de volta!");
    // O useEffect já vai cuidar do redirecionamento
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/app" });
    if (result.error) toast.error("Não foi possível entrar com Google");
  };

  const handleBypassLogin = () => {
    loginAs("student");
    toast.success("Login de teste realizado com sucesso!");
    navigate({ to: "/app" });
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
            <h2 className="font-display text-4xl font-bold leading-tight">Bem-vindo de volta à sua jornada veterinária.</h2>
            <p className="mt-4 text-white/70 max-w-md">Continue de onde parou e mantenha seu streak de estudos.</p>
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
          <h1 className="font-display text-3xl font-bold">Entrar</h1>
          <p className="mt-2 text-sm text-muted-foreground">Acesse sua área exclusiva.</p>

          <div className="mt-8"></div>

          <Button 
            variant="default" 
            className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-md mb-6" 
            onClick={handleBypassLogin}
            type="button"
          >
            Acesso Rápido de Teste (Aluno)
          </Button>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Dica: use admin@... ou prof@..."
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1.5" 
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Qualquer senha"
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="mt-1.5" 
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-12 bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
              {loading ? "Verificando..." : "Entrar"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta? <Link to="/signup" className="font-medium text-coral hover:underline">Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Award, Bell, BookOpen, Home, Library, MessagesSquare, Search, Sparkles, Stethoscope, Trophy, LogOut, Activity, Briefcase, ShieldCheck, PlayCircle, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const allNavLinks = [
  { to: "/app", label: "Início", icon: Home, exact: true },
  { to: "/app/courses", label: "Cursos", icon: BookOpen },
  { to: "/app/library", label: "Biblioteca", icon: Library },
  { to: "/app/community", label: "Comunidade", icon: MessagesSquare },
  { to: "/app/clinical-cases", label: "Casos Clínicos", icon: Activity },
  { to: "/app/ai-tutor", label: "Tutor IA", icon: Sparkles },
  { to: "/app/achievements", label: "Conquistas", icon: Trophy },
  { to: "/app/teacher", label: "Painel Prof", icon: Briefcase, exact: true },
  { to: "/app/admin", label: "Admin", icon: ShieldCheck, exact: true },
];

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, signOut } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Show onboarding only for the first time the user logs in
    const hasSeen = localStorage.getItem("vetclass_has_seen_onboarding");
    if (!hasSeen) {
      setShowOnboarding(true);
    }
    
    // Check dark mode
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
      toast("Modo Claro ativado", { icon: "☀️" });
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
      toast("Modo Escuro ativado", { icon: "🌙" });
    }
  };

  const closeOnboarding = () => {
    localStorage.setItem("vetclass_has_seen_onboarding", "true");
    setShowOnboarding(false);
  };
  
  let role = user?.user_metadata?.role || "student";
  const email = user?.email?.toLowerCase()?.trim() || "";
  
  if (email === "mimoshow10@gmail.com") {
    role = "admin";
  } else if (email === "rodrigo.vetlat@hotmail.com" || email === "namdias02@gmail.com" || email === "carolina_vet@yahoo.com.br") {
    role = "teacher";
  }
  
  const initials = (user?.user_metadata?.full_name || email || "V").slice(0, 1).toUpperCase();

  const getNavLinks = () => {
    if (role === "admin") return allNavLinks;
    if (role === "teacher") {
      return allNavLinks.filter(n => n.to !== "/app/admin");
    }
    // student
    return allNavLinks.filter(n => !["/app/teacher", "/app/admin"].includes(n.to));
  };

  const nav = getNavLinks();

  const isActive = (to: string, exact?: boolean) => exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <Link to="/app" className="flex items-center gap-2 px-6 py-6">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-coral text-coral-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold text-sidebar-foreground">
            VetClass<span className="text-coral">Pro</span>
          </span>
        </Link>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((n) => {
            const active = isActive(n.to, n.exact);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-coral text-coral-foreground shadow-coral"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <n.icon className="h-4.5 w-4.5" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <Link to="/app/ai-tutor" className="block rounded-xl bg-sidebar-accent p-3 transition hover:ring-1 hover:ring-coral/50">
            <div className="flex items-center gap-2 text-coral">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Tutor Vet IA</span>
            </div>
            <p className="mt-1.5 text-xs text-sidebar-foreground/70">Tire dúvidas e gere planos de estudo.</p>
          </Link>
          <button
            onClick={() => signOut()}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Top bar (all sizes) */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur lg:ml-64">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-8">
          <Link to="/app" className="flex items-center gap-2 lg:hidden">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Stethoscope className="h-4 w-4" />
            </div>
            <span className="font-display text-base font-semibold">VetClass<span className="text-coral">Pro</span></span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Buscar cursos, aulas, casos..."
                className="h-10 w-64 rounded-xl border border-border bg-secondary/60 pl-10 pr-3 text-sm outline-none focus:border-coral focus:bg-card"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral" />
            </Button>
            <div className="hidden lg:flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1 mr-2 text-xs font-mono text-muted-foreground">
              {user?.email || "Sem email"}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-sm font-semibold outline-none ring-2 ring-transparent transition hover:ring-coral/50">
                  {initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name || "Usuário VetClass"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(user?.email?.toLowerCase().includes("mimoshow10") || user?.user_metadata?.role === "admin") && (
                  <DropdownMenuItem asChild>
                    <Link to="/app/admin" className="w-full cursor-pointer flex items-center">
                      <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                      <span className="font-bold text-primary">Painel de Administração</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {(user?.email?.toLowerCase().includes("rodrigo.vetlat") || 
                  user?.email?.toLowerCase().includes("namdias02") || 
                  user?.email?.toLowerCase().includes("carolina_vet") || 
                  user?.email?.toLowerCase().replace(/\./g, '').includes("nathyarmarinhos") ||
                  user?.user_metadata?.role === "teacher") && (
                  <DropdownMenuItem asChild>
                    <Link to="/app/teacher" className="w-full cursor-pointer flex items-center">
                      <BookOpen className="mr-2 h-4 w-4 text-coral" />
                      <span className="font-bold text-coral">Área do Professor</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/app/profile" className="w-full cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Meu Perfil & Assinatura</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/profile" className="w-full cursor-pointer flex items-center">
                    <Award className="mr-2 h-4 w-4 text-coral" />
                    <span>Meus Certificados</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair da Conta</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="lg:ml-64 pb-24 lg:pb-12">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="flex overflow-x-auto hide-scrollbar">
          {nav.map((n) => {
            const active = isActive(n.to, n.exact);
            return (
              <Link key={n.to} to={n.to} className="flex flex-col items-center gap-1 py-3 px-4 min-w-[72px] text-[11px]">
                <n.icon className={`h-5 w-5 ${active ? "text-coral" : "text-muted-foreground"}`} />
                <span className={active ? "font-semibold text-coral" : "text-muted-foreground"}>{n.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ONBOARDING MODAL */}
      <Dialog open={showOnboarding && role === "student"} onOpenChange={closeOnboarding}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-slate-950 border-slate-800">
          <div className="flex flex-col lg:flex-row">
            {/* Esquerda: Vídeo */}
            <div className="w-full lg:w-2/3 bg-black relative aspect-video lg:aspect-auto lg:h-[500px]">
              {/* Simulando o Player de Vídeo */}
              <img 
                src="https://images.unsplash.com/photo-1628102491629-77858ab5721d?q=80&w=2000&auto=format&fit=crop" 
                alt="Boas Vindas" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button className="h-20 w-20 bg-coral text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:scale-110 transition-transform mb-6">
                  <PlayCircle className="h-10 w-10 ml-1" />
                </button>
                <h3 className="text-white font-display font-bold text-2xl drop-shadow-lg">Comece por aqui!</h3>
                <p className="text-slate-300 text-sm mt-2 max-w-sm drop-shadow-md">
                  Aperte o play para aprender a usar a IA, Casos Clínicos e o Bulário Inteligente.
                </p>
              </div>
            </div>
            
            {/* Direita: Texto e Ações */}
            <div className="w-full lg:w-1/3 p-8 bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <DialogHeader className="text-left mb-6">
                  <DialogTitle className="font-display text-2xl text-white">
                    Bem-vindo(a) à VetClass<span className="text-coral">Pro</span>
                  </DialogTitle>
                  <p className="text-sm text-[#8E9DB0] leading-relaxed mb-6">
                    Você acaba de dar o passo mais importante da sua carreira. Antes de devorar as aulas, assista a este vídeo rápido.
                  </p>
                  <DialogDescription className="sr-only">
                    Vídeo de boas-vindas para novos usuários.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-coral/20 p-2 rounded-lg text-coral shrink-0 mt-0.5"><Sparkles className="h-4 w-4" /></div>
                    <div>
                      <h4 className="font-semibold text-sm">Tutor Vet IA</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Seu assistente 24h para diagnósticos e dosagens.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 shrink-0 mt-0.5"><Activity className="h-4 w-4" /></div>
                    <div>
                      <h4 className="font-semibold text-sm">Casos Clínicos Interativos</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Pratique o plantão no ambiente seguro da plataforma.</p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-8 flex-col sm:flex-col gap-3">
                <Button 
                  onClick={closeOnboarding}
                  className="w-full bg-coral hover:bg-coral/90 text-white h-auto py-3.5 px-4 text-sm sm:text-base font-bold shadow-coral whitespace-normal text-center leading-tight rounded-xl"
                >
                  Estou Pronto(a)! Começar Jornada
                </Button>
                <button onClick={closeOnboarding} className="text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest font-bold mt-1">
                  Pular introdução
                </button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { Award };

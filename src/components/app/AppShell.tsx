import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Award, Bell, BookOpen, Home, Library, MessagesSquare, Search, Sparkles, Stethoscope, Trophy, LogOut, Activity, Briefcase, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

const allNavLinks = [
  { to: "/app", label: "Início", icon: Home, exact: true },
  { to: "/app/courses", label: "Cursos", icon: BookOpen },
  { to: "/app/library", label: "Biblioteca", icon: Library },
  { to: "/app/community", label: "Comunidade", icon: MessagesSquare },
  { to: "/app/clinical-cases", label: "Casos", icon: Activity },
  { to: "/app/achievements", label: "Conquistas", icon: Trophy },
  { to: "/app/teacher", label: "Painel Prof", icon: Briefcase, exact: true },
  { to: "/app/admin", label: "Admin", icon: ShieldCheck, exact: true },
];

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, signOut } = useAuth();
  const role = user?.user_metadata?.role || "student";
  const initials = (user?.user_metadata?.full_name || user?.email || "V").slice(0, 1).toUpperCase();

  const getNavLinks = () => {
    if (role === "admin") return allNavLinks;
    if (role === "teacher") {
      return allNavLinks.filter(n => ["/app/teacher", "/app/courses", "/app/clinical-cases"].includes(n.to));
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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-display text-sm font-semibold">
              {initials}
            </div>
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
    </div>
  );
}

export { Award };

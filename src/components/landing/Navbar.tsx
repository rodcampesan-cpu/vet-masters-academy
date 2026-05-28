import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            VetClass<span className="text-coral">Pro</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#cursos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Cursos</a>
          <a href="#especialidades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Especialidades</a>
          <a href="#professores" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Professores</a>
          <a href="#beneficios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Benefícios</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm" className="bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
            <Link to="/signup">Começar grátis</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

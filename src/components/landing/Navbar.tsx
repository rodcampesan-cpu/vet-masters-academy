import { Link } from "@tanstack/react-router";
import { Stethoscope, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

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
          <Link to="/cursos" className="text-sm font-medium text-coral hover:text-coral/80 transition">Ver Cursos</Link>
          <a href="#metodo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Metodologia</a>
          <a href="#oferta" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">Benefícios</a>
        </nav>
        <div className="flex items-center gap-2">
          {deferredPrompt && (
            <Button onClick={handleInstallClick} variant="outline" size="sm" className="hidden sm:inline-flex border-coral/30 text-coral hover:bg-coral/10 gap-1.5">
              <Download className="h-4 w-4" /> Instalar App
            </Button>
          )}
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm" className="bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
            <Link to="/signup">Criar Conta</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

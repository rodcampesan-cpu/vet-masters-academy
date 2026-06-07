import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Stethoscope, ArrowRight } from "lucide-react";
import { courses, specialties } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cursos/")({
  head: () => ({ meta: [{ title: "Catálogo de Cursos — VetClass Pro" }] }),
  component: PublicCoursesPage,
});

function PublicCoursesPage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState<string | null>(null);

  const filtered = courses.filter((c) =>
    (!spec || c.specialty === spec) &&
    (!q || c.title.toLowerCase().includes(q.toLowerCase()) || c.teacher.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header Público */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">VetClass<span className="text-coral">Pro</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">Entrar</Link>
            <Button asChild className="h-9 px-4 text-xs bg-coral text-white hover:bg-coral/90">
              <Link to="/signup">Criar Conta</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl mb-4">Catálogo de Cursos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o seu próximo nível na medicina veterinária. Aprenda com os maiores especialistas do mercado e aplique na sua clínica amanhã.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar curso ou professor..."
              className="h-14 w-full rounded-2xl border border-border bg-white pl-12 pr-4 text-base outline-none focus:border-coral shadow-sm transition-all"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Chip active={spec === null} onClick={() => setSpec(null)}>Todos</Chip>
            {specialties.map((s) => (
              <Chip key={s} active={spec === s} onClick={() => setSpec(s)}>{s}</Chip>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <Link
              key={c.id}
              to="/cursos/$courseId"
              params={{ courseId: c.id }}
              className="group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary z-10 shadow-sm">{c.specialty}</span>
                
                {/* Overlay on hover for Mentoria Flix */}
                {c.id === 'mentoria-flix' && (
                  <div className="absolute inset-0 bg-coral/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-md">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-coral mb-3 shadow-xl">
                      <span className="font-bold text-lg">🎁</span>
                    </span>
                    <p className="text-white font-black text-lg uppercase tracking-wider mb-2 leading-tight">Bônus Exclusivo</p>
                    <p className="text-white/95 text-xs sm:text-sm font-medium leading-relaxed">
                      Este incrível curso de gestão com o renomado Dr. Rodrigo Nicola é <span className="bg-white text-coral px-1 rounded font-bold mx-0.5">GRATUITO</span> na compra dos nossos cursos principais.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-display text-lg font-bold leading-tight mb-3 line-clamp-2">{c.title}</h3>
                
                <div className="flex items-center gap-3 mb-6">
                  <img src={c.teacher.avatar} alt="" className="h-8 w-8 rounded-full object-cover border border-slate-100" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Professor</span>
                    <span className="text-sm font-semibold text-slate-700">{c.teacher.name}</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-coral group-hover:text-coral/80 transition-colors">Ver Detalhes do Curso</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-coral/10 text-coral group-hover:bg-coral group-hover:text-white transition-colors pointer-events-none">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Nenhum curso encontrado</h3>
              <p className="text-slate-500">Tente buscar por outros termos ou especialidades.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-md scale-105"
          : "bg-white text-slate-600 hover:bg-slate-50 hover:text-primary border border-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

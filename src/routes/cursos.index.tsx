import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Stethoscope, ArrowRight, Gift } from "lucide-react";
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Escolha o seu próximo nível na medicina veterinária. Aprenda com os maiores especialistas do mercado e aplique na sua clínica amanhã.
          </p>

          <div className="mx-auto max-w-3xl bg-gradient-to-r from-coral/10 via-coral/5 to-transparent border border-coral/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden text-left sm:text-center shadow-sm">
            <div className="absolute -right-10 -top-10 text-coral/10 rotate-12 pointer-events-none">
              <Gift className="w-48 h-48" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 justify-center text-left">
              <div className="bg-coral text-white p-4 rounded-full shrink-0 shadow-lg shadow-coral/20">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  🎁 Bônus Especial de Lançamento
                </h3>
                <p className="text-slate-700 font-medium leading-relaxed">
                  Compre qualquer curso no <strong className="text-coral">2º Semestre de 2026</strong> e ganhe acesso total ao curso <strong>Mentoria Flix / Gestão</strong> (Valor de R$ 1.200,00) <strong className="text-green-700 bg-green-100 px-2 py-0.5 rounded ml-1 uppercase text-sm">Totalmente Grátis!</strong>
                </p>
              </div>
            </div>
          </div>
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
                
                <div className="flex items-center gap-3 mb-4">
                  <img src={c.teacher.avatar} alt="" style={{ objectPosition: c.teacher.avatarPosition || "center" }} className="h-8 w-8 rounded-full object-cover border border-slate-100" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Professor</span>
                    <span className="text-sm font-semibold text-slate-700">{c.teacher.name}</span>
                  </div>
                </div>

                {c.id !== 'mentoria-flix' && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-slate-400 line-through">R$ 1.299</span>
                    <span className="text-xl font-black text-green-600">R$ 799</span>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Promoção</span>
                  </div>
                )}

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
        <div className="mt-24 space-y-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">Muito Além de Cursos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sua assinatura desbloqueia um ecossistema completo de aprendizado prático e networking profissional.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">Comunidade VetClass</h3>
              <p className="text-muted-foreground mb-6">
                Não fique mais sozinho no diagnóstico. Discuta casos complexos, troque experiências e faça networking de alto nível com veterinários de todo o Brasil e nossos professores especialistas.
              </p>
              <Button asChild variant="outline" className="mt-auto rounded-xl">
                <Link to="/signup">Faça parte do grupo</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🧩</span>
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">Casos Clínicos Interativos</h3>
              <p className="text-muted-foreground mb-6">
                Treine seu raciocínio clínico em um simulador de diagnósticos com casos reais gerados por IA. Receba feedback imediato das suas condutas antes de aplicá-las nos seus pacientes de verdade.
              </p>
              <Button asChild variant="outline" className="mt-auto rounded-xl">
                <Link to="/signup">Teste seus conhecimentos</Link>
              </Button>
            </div>
          </div>
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

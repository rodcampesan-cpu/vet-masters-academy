import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Calendar, Flame, Play, Sparkles, Trophy } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { courses } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({ meta: [{ title: "Dashboard — VetClass Pro" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const rawName = (user?.user_metadata?.full_name as string | undefined)?.trim();
  const isAdmin = user?.email?.toLowerCase().trim() === "mimoshow10@gmail.com";
  
  let name = rawName?.split(" ")[0];
  if (!name || name.toLowerCase() === "aluno") {
    name = isAdmin ? "Administrador(a)" : "veterinário(a)";
  }
  
  const myCourses = courses.filter(c => c.purchased);
  const storeCourses = courses.filter(c => !c.purchased);
  
  const continueCourse = myCourses[0] || courses[0];
  const upcoming = courses.slice(1, 3);

  return (
    <div className="space-y-10 px-4 py-8 sm:px-8">
      {/* FLASHY DASHBOARD HERO */}
      <section className="relative rounded-[2rem] bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 opacity-[0.1] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-coral opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500 opacity-10 blur-3xl" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur border border-white/10 mb-6">
              <Sparkles className="h-3 w-3 text-coral" /> Bem-vindo à VetClass Pro
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Olá, <span className="text-coral">{name}</span> 👋
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-md leading-relaxed font-light">
              Pronto para dominar os plantões hoje? Continue sua evolução clínica e surpreenda seus tutores com condutas de alto valor.
            </p>
            
            <div className="mt-8 flex items-center gap-4 bg-white/5 w-fit px-4 py-3 rounded-2xl border border-white/5">
              <div className="flex -space-x-3">
                <img className="h-10 w-10 rounded-full border-2 border-[#1A1A1A] object-cover" src={continueCourse.teacher.avatar} alt=""/>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1A1A1A] bg-coral text-xs font-bold text-white">
                  <Flame className="h-4 w-4" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Último Acesso</p>
                <p className="text-xs text-white/60 line-clamp-1">{continueCourse.title}</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Link
              to="/app/courses/$courseId"
              params={{ courseId: continueCourse.id }}
              className="group block relative overflow-hidden rounded-3xl bg-black border border-white/10 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-coral/20 hover:border-coral/30"
            >
              <img src={continueCourse.cover} alt="" className="aspect-video w-full object-cover opacity-50 transition duration-700 group-hover:opacity-30 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 bg-coral backdrop-blur text-white rounded-full flex items-center justify-center shadow-xl shadow-coral/30 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6 ml-1" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/20 border border-coral/30 px-2 py-0.5 text-[10px] font-bold text-coral uppercase tracking-wider mb-3">
                  Continuar Aula
                </span>
                <h3 className="font-display text-xl font-bold text-white line-clamp-1">{continueCourse.title}</h3>
                
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-coral rounded-full relative" style={{ width: `${continueCourse.progress}%` }}>
                      <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white">{continueCourse.progress}%</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Flame} label="Streak" value="7 dias" hint="Continue assim!" />
        <StatCard icon={Trophy} label="Ranking" value="#142" hint="+24 esta semana" />
        <StatCard icon={Calendar} label="Lives" value="3" hint="Próx. hoje 20h" />
        <StatCard icon={Sparkles} label="Pontos" value="1.240" hint="Nível Avançado" />
      </section>

      {/* My courses */}
      <section>
        <SectionHeader title="Meus cursos" to="/app/courses" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {myCourses.map((c) => {
            const isExternal = !!c.externalLink;
            const cardContent = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/20">
                    <div className="h-full bg-coral" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium text-coral">{c.specialty}</p>
                  <h3 className="mt-1 font-display text-sm font-semibold leading-snug line-clamp-2">{c.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{c.teacher.name}</p>
                </div>
              </>
            );

            if (isExternal) {
              return (
                <a
                  key={c.id}
                  href={c.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <Link
                key={c.id}
                to="/app/courses/$courseId"
                params={{ courseId: c.id }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Store courses */}
      {storeCourses.length > 0 && (
        <section>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-xl font-bold sm:text-2xl">Cursos Disponíveis</h2>
              <p className="text-sm text-coral font-bold mt-1">Benefício de Aluno: 25% OFF em qualquer curso abaixo</p>
            </div>
            <Link to="/app/courses" className="text-sm font-medium text-coral hover:underline">Explorar loja →</Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {storeCourses.map((c) => (
              <Link
                key={c.id}
                to="/app/courses/$courseId"
                params={{ courseId: c.id }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="relative aspect-[4/3] overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
                  <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-coral text-white text-[10px] font-black uppercase px-2 py-1 rounded-md shadow-lg">
                    25% OFF Aluno
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium text-coral">{c.specialty}</p>
                  <h3 className="mt-1 font-display text-sm font-semibold leading-snug line-clamp-2">{c.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{c.teacher.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Live + AI */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-2 text-coral">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-coral" /></span>
            <span className="text-xs font-semibold uppercase tracking-wide">Próximas aulas ao vivo</span>
          </div>
          <div className="mt-4 space-y-3">
            {upcoming.map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3">
                <img src={c.teacher.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Live: {c.specialty} avançado</p>
                  <p className="text-xs text-muted-foreground">{c.teacher.name} · hoje 20h</p>
                </div>
                <Button size="sm" variant="outline">Lembrar</Button>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-card">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-coral/30 blur-3xl" />
          <div className="relative">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-coral text-coral-foreground">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">Tutor Vet IA</h3>
            <p className="mt-1 text-sm text-white/70 max-w-sm">
              Resumos, plano de estudos, flashcards e respostas clínicas — tudo personalizado para você.
            </p>
            <Button className="mt-5 bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
              Conversar com a IA <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, hint }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <Icon className="h-5 w-5 text-coral" />
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-bold">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function SectionHeader({ title, to }: { title: string; to: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
      <Link to={to} className="text-sm font-medium text-coral hover:underline">Ver todos →</Link>
    </div>
  );
}

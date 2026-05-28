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
  const name = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] || "veterinário(a)";
  const continueCourse = courses[0];
  const upcoming = courses.slice(1, 3);

  return (
    <div className="space-y-10 px-4 py-8 sm:px-8">
      {/* Greeting */}
      <section>
        <p className="text-sm font-medium text-coral">Bom dia,</p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Olá, {name} 👋</h1>
        <p className="mt-2 text-muted-foreground">Pronto para continuar sua evolução clínica?</p>
      </section>

      {/* Continue + stats */}
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Link
          to="/app/courses/$courseId"
          params={{ courseId: continueCourse.id }}
          className="group relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground shadow-elevated"
        >
          <img src={continueCourse.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 transition group-hover:scale-105 group-hover:opacity-40" />
          <div className="relative grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                <Play className="h-3 w-3" /> Continuar estudando
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{continueCourse.title}</h2>
              <p className="mt-1 text-sm text-white/70">{continueCourse.teacher.name} · {continueCourse.specialty}</p>
              <div className="mt-4 max-w-md">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Progresso</span><span>{continueCourse.progress}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full bg-coral" style={{ width: `${continueCourse.progress}%` }} />
                </div>
              </div>
            </div>
            <Button className="bg-coral text-coral-foreground hover:bg-coral/90">
              Retomar <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={Flame} label="Streak" value="7 dias" hint="Continue assim!" />
          <StatCard icon={Trophy} label="Ranking" value="#142" hint="+24 esta semana" />
          <StatCard icon={Calendar} label="Lives" value="3" hint="Próx. hoje 20h" />
          <StatCard icon={Sparkles} label="Pontos" value="1.240" hint="Nível Avançado" />
        </div>
      </section>

      {/* My courses */}
      <section>
        <SectionHeader title="Meus cursos" to="/app/courses" />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <Link
              key={c.id}
              to="/app/courses/$courseId"
              params={{ courseId: c.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
            >
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
            </Link>
          ))}
        </div>
      </section>

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

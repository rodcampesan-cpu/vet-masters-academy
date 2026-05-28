import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, FileText, MessagesSquare, Play, Trophy, Users } from "lucide-react";
import { courses } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/app/courses/$courseId")({
  head: ({ params }) => {
    const c = courses.find((x) => x.id === params.courseId);
    return { meta: [{ title: c ? `${c.title} — VetClass Pro` : "Curso" }] };
  },
  loader: ({ params }) => {
    const c = courses.find((x) => x.id === params.courseId);
    if (!c) throw notFound();
    return c;
  },
  component: CourseDetail,
});

function CourseDetail() {
  const c = Route.useLoaderData();

  const modules = Array.from({ length: c.modules }, (_, i) => ({
    id: i + 1,
    title: `Módulo ${i + 1} — ${["Fundamentos", "Diagnóstico", "Técnicas", "Casos clínicos", "Protocolos", "Cirurgia", "Pós-operatório", "Reabilitação", "Atualizações", "Revisão", "Estudos de caso", "Avaliação final"][i] ?? "Conteúdo"}`,
    lessons: Math.ceil(c.lessons / c.modules),
    done: i < Math.floor(c.modules * c.progress / 100),
  }));

  return (
    <div>
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={c.cover} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 flex items-end p-4 sm:p-8">
          <div className="max-w-3xl text-primary-foreground">
            <Link to="/app/courses" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> Voltar aos cursos
            </Link>
            <span className="mt-3 inline-block rounded-full bg-coral px-3 py-1 text-xs font-semibold">{c.specialty}</span>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{c.title}</h1>
            <p className="mt-2 text-sm text-white/80">{c.teacher.name} · {c.teacher.title}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <p className="text-base leading-relaxed text-foreground/80">{c.description}</p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={Clock} label="Carga horária" value={`${c.hours}h`} />
            <Stat icon={BookOpen} label="Módulos" value={String(c.modules)} />
            <Stat icon={Play} label="Aulas" value={String(c.lessons)} />
            <Stat icon={Users} label="Alunos" value={`${(c.students/1000).toFixed(1)}k`} />
          </div>

          {/* Tabs (visual only for MVP) */}
          <div className="border-b border-border">
            <div className="flex gap-1 overflow-x-auto">
              {["Conteúdo", "Material", "Casos clínicos", "Quizzes", "Comunidade", "Certificado"].map((t, i) => (
                <button
                  key={t}
                  className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                    i === 0 ? "border-coral text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Modules list */}
          <div className="space-y-3">
            {modules.map((m) => (
              <div key={m.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${m.done ? "bg-coral text-coral-foreground" : "bg-secondary text-muted-foreground"}`}>
                    {m.done ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-display font-bold">{m.id}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-semibold sm:text-base truncate">{m.title}</h3>
                    <p className="text-xs text-muted-foreground">{m.lessons} aulas</p>
                  </div>
                  <Button size="sm" variant={m.done ? "outline" : "default"} className={m.done ? "" : "bg-coral text-coral-foreground hover:bg-coral/90"}>
                    {m.done ? "Revisar" : "Iniciar"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="text-xs font-medium text-muted-foreground">Seu progresso</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold">{c.progress}%</span>
              <span className="text-xs text-muted-foreground">completo</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-coral" style={{ width: `${c.progress}%` }} />
            </div>
            <Button className="mt-5 w-full bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
              <Play className="mr-2 h-4 w-4" /> {c.progress > 0 ? "Continuar" : "Começar agora"}
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <img src={c.teacher.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="font-display text-sm font-semibold">{c.teacher.name}</p>
                <p className="text-xs text-muted-foreground">{c.teacher.title}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Referência em {c.teacher.specialty}, com publicações e mais de 15 anos de prática clínica.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <QuickLink icon={FileText} label="Material" />
            <QuickLink icon={MessagesSquare} label="Comunidade" />
            <QuickLink icon={Trophy} label="Conquistas" />
            <QuickLink icon={CheckCircle2} label="Certificado" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 text-center shadow-soft">
      <Icon className="mx-auto h-4 w-4 text-coral" />
      <p className="mt-1.5 font-display text-base font-bold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function QuickLink({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 font-medium text-foreground/80 transition hover:border-coral hover:text-foreground">
      <Icon className="h-4 w-4 text-coral" />
      {label}
    </button>
  );
}

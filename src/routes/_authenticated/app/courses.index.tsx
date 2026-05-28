import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { courses, specialties } from "@/lib/courses-data";

export const Route = createFileRoute("/_authenticated/app/courses/")({
  head: () => ({ meta: [{ title: "Cursos — VetClass Pro" }] }),
  component: CoursesPage,
});

function CoursesPage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState<string | null>(null);

  const filtered = courses.filter((c) =>
    (!spec || c.specialty === spec) &&
    (!q || c.title.toLowerCase().includes(q.toLowerCase()) || c.teacher.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-8 px-4 py-8 sm:px-8">
      <div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Cursos</h1>
        <p className="mt-2 text-muted-foreground">Explore conteúdo premium em todas as especialidades.</p>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar curso ou professor..."
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-3 text-sm outline-none focus:border-coral"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={spec === null} onClick={() => setSpec(null)}>Todas</Chip>
          {specialties.map((s) => (
            <Chip key={s} active={spec === s} onClick={() => setSpec(s)}>{s}</Chip>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((c) => (
          <Link
            key={c.id}
            to="/app/courses/$courseId"
            params={{ courseId: c.id }}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary">{c.specialty}</span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-base font-semibold leading-snug line-clamp-2">{c.title}</h3>
              <div className="mt-3 flex items-center gap-2">
                <img src={c.teacher.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
                <span className="text-xs text-muted-foreground">{c.teacher.name}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.hours}h · {c.modules} mód.</span>
                <span className="font-medium text-coral">{c.level}</span>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-12">Nenhum curso encontrado.</p>
        )}
      </div>
    </div>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-coral text-coral-foreground shadow-coral"
          : "border border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

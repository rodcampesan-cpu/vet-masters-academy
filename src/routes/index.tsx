import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Brain, GraduationCap, Library, MessagesSquare, Play, Sparkles, Stethoscope, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import heroImg from "@/assets/hero-vet.jpg";
import { courses, specialties, teachers } from "@/lib/courses-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VetClass Pro — Educação veterinária premium" },
      { name: "description", content: "Cursos com especialistas, aulas ao vivo, casos clínicos, biblioteca e Tutor Vet IA. Sua formação veterinária em um só lugar." },
      { property: "og:title", content: "VetClass Pro — Educação veterinária premium" },
      { property: "og:description", content: "Aprenda com os melhores especialistas. Cursos, comunidade e IA em uma experiência premium." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="absolute inset-0 -z-10 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-28">
          <div className="flex flex-col justify-center text-primary-foreground animate-fade-up">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-coral" />
              Nova era da educação veterinária
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Domine a clínica.<br />
              <span className="text-coral">Eleve sua carreira.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/75">
              A plataforma premium de ensino veterinário com cursos de especialistas,
              casos clínicos interativos, biblioteca completa e o seu próprio Tutor Vet IA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
                <Link to="/signup">
                  Começar agora <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <a href="#cursos"><Play className="mr-1.5 h-4 w-4" /> Conhecer cursos</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-white/70">
              <div><div className="font-display text-2xl font-bold text-white">12k+</div>Alunos ativos</div>
              <div><div className="font-display text-2xl font-bold text-white">48</div>Especialistas</div>
              <div><div className="font-display text-2xl font-bold text-white">120+</div>Cursos</div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-elevated">
              <img
                src={heroImg}
                alt="Veterinária examinando golden retriever em clínica moderna"
                width={1536}
                height={1024}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 backdrop-blur shadow-card">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-coral text-coral-foreground">
                    <Play className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-sm font-semibold text-foreground">Live agora · Cardiologia</div>
                    <div className="text-xs text-muted-foreground">Dra. Camila Souza · 234 assistindo</div>
                  </div>
                  <span className="rounded-full bg-coral/10 px-2.5 py-1 text-xs font-semibold text-coral">AO VIVO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section id="cursos" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-coral">Em destaque</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Cursos que transformam carreiras</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/login">Ver todos <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => (
            <article key={c.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.cover} alt={c.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary">{c.specialty}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold leading-snug line-clamp-2">{c.title}</h3>
                <div className="mt-3 flex items-center gap-2">
                  <img src={c.teacher.avatar} alt={c.teacher.name} className="h-6 w-6 rounded-full object-cover" />
                  <span className="text-xs text-muted-foreground">{c.teacher.name}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{c.hours}h · {c.modules} módulos</span>
                  <span className="font-medium text-coral">{c.level}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SPECIALTIES */}
      <section id="especialidades" className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-coral">Especialidades</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Toda a clínica, em um só lugar</h2>
            <p className="mt-3 text-muted-foreground">Conteúdo profundo em todas as áreas críticas da medicina veterinária moderna.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {specialties.map((s) => (
              <div key={s} className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-coral hover:shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/5 text-primary group-hover:bg-coral group-hover:text-coral-foreground transition">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <span className="font-medium text-sm">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="professores" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-coral">Corpo docente</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Aprenda com os melhores</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((t) => (
            <div key={t.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="aspect-[5/4] overflow-hidden bg-secondary">
                <img src={t.avatar} alt={t.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.title}</p>
                <p className="mt-2 text-sm font-medium text-coral">{t.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section id="beneficios" className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-coral">Por que VetClass Pro</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Uma experiência completa</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: GraduationCap, t: "Cursos de especialistas", d: "Conteúdo aprofundado de PhDs e referências em cada área." },
              { icon: Play, t: "Aulas ao vivo + gravadas", d: "Acompanhe lives e revise no seu tempo, com player premium." },
              { icon: Library, t: "Biblioteca virtual", d: "PDFs, protocolos e playbooks sempre à mão." },
              { icon: Brain, t: "Tutor Vet IA", d: "Tire dúvidas, gere resumos e plano de estudos com IA." },
              { icon: MessagesSquare, t: "Comunidade ativa", d: "Discuta casos com colegas e mentores." },
              { icon: Trophy, t: "Gamificação", d: "Pontos, ranking, conquistas e streaks diários." },
              { icon: Users, t: "Casos clínicos", d: "Decisões interativas: diagnóstico, conduta e tratamento." },
              { icon: Award, t: "Certificados", d: "Carga horária, QR code e validação digital." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-coral text-coral-foreground">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{b.t}</h3>
                <p className="mt-1.5 text-sm text-white/70">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-5xl">Pronto para evoluir sua prática?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Junte-se a milhares de veterinários que estudam todos os dias na VetClass Pro.
        </p>
        <Button asChild size="lg" className="mt-8 bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
          <Link to="/signup">Criar minha conta <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} VetClass Pro. Educação veterinária premium.
        </div>
      </footer>
    </div>
  );
}

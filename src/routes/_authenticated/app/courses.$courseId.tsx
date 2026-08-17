import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, FileText, MessagesSquare, Play, Trophy, Users, ShieldCheck, Activity, GraduationCap, Stethoscope, Award, Building2, Briefcase, Star } from "lucide-react";
import { courses, ortopediaModules } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/app/courses/$courseId")({
  head: ({ params }) => {
    const c = courses.find((x) => x.id === params.courseId);
    return { meta: [{ title: c ? `${c.title} — VetClass Pro` : "Curso" }] };
  },
  loader: ({ params }) => {
    const found = courses.find((x) => x.id === params.courseId);
    if (!found) throw notFound();
    return { course: found };
  },
  component: CourseDetail,
});

function CourseDetail() {
  const { course: c } = Route.useLoaderData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Conteúdo");
  const [notes, setNotes] = useState("");

  let modules: any[] = [];

  if (c.id === "ortopedia-avancada") {
    modules = ortopediaModules;
  } else {
    modules = Array.from({ length: c.modules }, (_, i) => ({
      id: i + 1,
      title: `Módulo ${i + 1} — ${["Fundamentos", "Diagnóstico", "Técnicas", "Casos clínicos", "Protocolos", "Cirurgia", "Pós-operatório", "Reabilitação", "Atualizações", "Revisão", "Estudos de caso", "Avaliação final"][i] ?? "Conteúdo"}`,
      done: i < Math.floor(c.modules * c.progress / 100),
      topics: Array.from({ length: Math.ceil(c.lessons / c.modules) }, (_, j) => `Aula ${j + 1} do módulo`)
    }));
  }

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

          {/* Main Content Area */}
          {c.id === "mentoria-flix" ? (
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden mt-2 border border-coral/20">
              <div className="absolute -top-10 -right-10 opacity-10">
                <Trophy className="h-64 w-64 text-white" />
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-coral leading-tight max-w-xl">
                  Bônus Exclusivo: O Netflix da Gestão Veterinária
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                  Transforme sua clínica em um negócio altamente lucrativo. Se você já adquiriu qualquer um dos nossos cursos principais, seu acesso gratuito já está garantido. Basta clicar abaixo para ser redirecionado à plataforma exclusiva da Mentoria Flix.
                </p>
                
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-10 max-w-2xl">
                  <h3 className="font-semibold text-white mb-4">O que você vai encontrar lá dentro:</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" /> Gestão financeira e precificação de procedimentos.
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" /> Como treinar um time comercial que converte de verdade.
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" /> Estratégias de marketing para atrair os tutores certos.
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" /> Escalabilidade e estruturação da sua clínica.
                    </div>
                  </div>
                </div>
                
                {c.purchased ? (
                  <a href={(c as any).externalLink || "https://mentoriaflix.com.br"} target="_blank" rel="noreferrer" className="inline-block w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-coral text-white hover:bg-coral/90 text-lg py-7 px-8 sm:px-12 rounded-xl shadow-[0_0_40px_-10px_#FF6F61] transition-transform hover:scale-105 font-bold">
                      Acessar Plataforma Mentoria Flix
                    </Button>
                  </a>
                ) : (
                  <Link to="/app/courses" className="inline-block w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-coral text-white hover:bg-coral/90 text-lg py-7 px-8 sm:px-12 rounded-xl shadow-[0_0_40px_-10px_#FF6F61] transition-transform hover:scale-105 font-bold">
                      Ver Cursos Elegíveis para Ganhar o Bônus
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : c.purchased !== false ? (
            <>
              {/* Tabs */}
              <div className="border-b border-border">
                <div className="flex gap-1 overflow-x-auto">
                  {["Conteúdo", "Material", "Anotações", "Casos clínicos", "Bulário"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                        activeTab === t ? "border-coral text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-3 mt-6">
                {activeTab === "Conteúdo" && modules.map((m) => (
                  <div key={m.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`grid h-10 w-10 place-items-center rounded-xl ${m.done ? "bg-coral text-coral-foreground" : "bg-secondary text-muted-foreground"}`}>
                        {m.done ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-display font-bold">{m.id}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm font-semibold sm:text-base truncate">{m.title}</h3>
                        <p className="text-xs text-muted-foreground">{m.topics?.length || 0} aulas</p>
                      </div>
                      <Button size="sm" variant={m.done ? "outline" : "default"} className={m.done ? "" : "bg-coral text-coral-foreground hover:bg-coral/90"}>
                        {m.done ? "Revisar" : "Iniciar"}
                      </Button>
                    </div>
                    
                    {m.topics && m.topics.length > 0 && (
                      <div className="pl-14 pr-4 space-y-2 mt-2 border-t border-border pt-4">
                        {m.topics.map((topic: string, idx: number) => {
                          const lessonSlug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                          return (
                            <Link 
                              key={idx} 
                              to="/app/lessons/$lessonId" 
                              params={{ lessonId: lessonSlug }}
                              className="flex items-center justify-between group cursor-pointer rounded-lg p-2 hover:bg-secondary/30 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="h-3 w-3 text-coral/70 group-hover:text-coral transition-colors" />
                                <span className="text-sm text-foreground/90 font-medium group-hover:text-coral transition-colors">{topic}</span>
                              </div>
                              <span className="text-xs text-muted-foreground group-hover:text-coral transition-colors">Assistir Agora</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}

                {activeTab === "Material" && (
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-6">
                    <div>
                      <h3 className="font-display font-semibold mb-4">Materiais Complementares</h3>
                      <div className="space-y-3">
                        {[
                          { title: "Protocolo Clínico Atualizado", size: "1.1 MB" },
                          { title: "Artigo de Referência (Nature)", size: "4.5 MB" }
                        ].map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-coral" />
                              <div>
                                <p className="text-sm font-medium">{doc.title}.pdf</p>
                                <p className="text-xs text-muted-foreground">{doc.size}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Baixar</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Anotações" && (
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <h3 className="font-display font-semibold mb-4">Suas Anotações Pessoais</h3>
                    <Textarea 
                      placeholder="Faça anotações sobre este curso aqui. Elas são salvas automaticamente..."
                      className="min-h-[200px] resize-y bg-secondary/30"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <div className="flex justify-end mt-4">
                      <Button className="bg-coral text-coral-foreground hover:bg-coral/90">Salvar Anotações</Button>
                    </div>
                  </div>
                )}

                {activeTab === "Casos clínicos" && (
                  <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center shadow-soft flex flex-col items-center">
                    <Activity className="h-10 w-10 text-coral opacity-50 mb-4" />
                    <h3 className="font-display font-semibold mb-2">Casos Clínicos deste Módulo</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mb-6">Acesse a aba lateral "Casos Clínicos" no menu principal para interagir com todos os casos do sistema.</p>
                    <Link to="/app/clinical-cases">
                      <Button variant="outline">Acessar Banco de Casos</Button>
                    </Link>
                  </div>
                )}

                {activeTab === "Bulário" && (
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-coral/10 text-coral">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold">Bulário Semiológico</h3>
                        <p className="text-sm text-muted-foreground">Termos técnicos e semiologia de {c.specialty}</p>
                      </div>
                    </div>
                    
                    {c.glossary && c.glossary.length > 0 ? (
                      <div className="space-y-4">
                        {[...c.glossary].sort((a, b) => a.term.localeCompare(b.term)).map((g, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-border bg-secondary/20 hover:border-coral/30 transition-colors">
                            <h4 className="font-semibold text-coral mb-1">{g.term}</h4>
                            <p className="text-sm text-foreground/80 leading-relaxed">{g.definition}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-muted-foreground border border-dashed rounded-xl border-border">
                        <BookOpen className="h-8 w-8 mx-auto mb-3 opacity-20" />
                        <p>Nenhum termo cadastrado para este curso ainda.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden mt-2">
              <div className="absolute -top-10 -right-10 opacity-10">
                <ShieldCheck className="h-64 w-64 text-white" />
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-coral leading-tight max-w-xl">
                  Domine a {c.specialty} e eleve seu padrão de atendimento clínico.
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                  Não seja apenas mais um veterinário. Prepare-se para diagnosticar com segurança absoluta e prescrever tratamentos que mudam vidas. O seu próximo nível profissional começa agora.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-5 mb-10">
                  <div className="flex gap-3 items-start">
                    <div className="bg-green-500/20 p-1 rounded-full shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-sm text-slate-300 leading-snug font-medium mt-1">Diagnósticos precisos e sem medo de errar na sua conduta médica diária.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="bg-green-500/20 p-1 rounded-full shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-sm text-slate-300 leading-snug font-medium mt-1">Acesso à nossa comunidade secreta e banco de casos clínicos interativos.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="bg-green-500/20 p-1 rounded-full shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-sm text-slate-300 leading-snug font-medium mt-1">Certificado oficial de conclusão para comprovar e valorizar seu currículo.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="bg-green-500/20 p-1 rounded-full shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="text-sm text-slate-300 leading-snug font-medium mt-1">Acesso imediato de 1 ano, para você assistir no seu tempo e no seu ritmo.</p>
                  </div>
                </div>

                <Link to="/checkout/$courseId" params={{ courseId: c.id }} className="inline-block w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-coral text-white hover:bg-coral/90 text-lg py-7 px-8 sm:px-12 rounded-xl shadow-[0_0_40px_-10px_#FF6F61] transition-transform hover:scale-105 font-bold">
                    Quero Desbloquear Esse Conhecimento Agora
                  </Button>
                </Link>
                <p className="text-xs text-slate-400 mt-5 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-4 w-4 text-green-500" /> Compra 100% segura. Você tem 7 dias de garantia ou seu dinheiro de volta.
                </p>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            {c.purchased !== false ? (
              <>
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
              </>
            ) : c.id === 'mentoria-flix' ? (
              <>
                <div className="text-xs font-bold text-coral uppercase tracking-wider mb-2 animate-pulse flex items-center gap-1">
                  <Trophy className="h-3 w-3" /> Bônus Exclusivo
                </div>
                <div className="text-xs text-muted-foreground line-through">De R$ 799,00</div>
                <div className="font-display text-3xl font-black text-green-500 mb-2">GRÁTIS</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Este curso não é vendido separadamente. Ele é <strong>desbloqueado automaticamente por 6 meses</strong> na compra de qualquer um dos cursos: Ortopedia, Neurologia, Hematologia ou Emergência Médica.
                </p>
                <Link to="/app/courses">
                  <Button className="mt-5 w-full bg-coral text-white hover:bg-coral/90 shadow-xl shadow-coral/20 font-bold">
                    Ver Cursos Elegíveis
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-xs font-bold text-coral uppercase tracking-wider mb-2 animate-pulse flex items-center gap-1">
                  <Trophy className="h-3 w-3" /> Benefício Aluno: 25% OFF
                </div>
                <div className="text-xs text-muted-foreground line-through">De R$ 997,00</div>
                <div className="font-display text-3xl font-black text-foreground mb-1">R$ 747<span className="text-lg text-muted-foreground">,75</span></div>
                <p className="text-xs text-muted-foreground">Pagamento único. 1 Ano de Acesso.</p>
                <Link to="/checkout/$courseId" params={{ courseId: c.id }}>
                  <Button className="mt-5 w-full bg-green-500 text-white hover:bg-green-600 shadow-xl shadow-green-500/20 font-bold">
                    Desbloquear Curso Agora
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <img src={c.teacher.avatar} alt="" style={{ objectPosition: c.teacher.avatarPosition || "center" }} className="h-14 w-14 rounded-full object-cover ring-2 ring-coral/20" />
              <div>
                <p className="font-display text-sm font-bold">{c.teacher.name}</p>
                <p className="text-xs text-coral font-medium">{c.teacher.specialty}</p>
                <p className="text-xs text-muted-foreground">{c.teacher.title}</p>
              </div>
            </div>
            {c.teacher.bioTopics && c.teacher.bioTopics.length > 0 ? (
              <ul className="space-y-2">
                {c.teacher.bioTopics.map((topic, i) => {
                  const icons: Record<string, any> = {
                    "Formação": GraduationCap,
                    "Pós-Graduação": GraduationCap,
                    "Especialização": Award,
                    "Associação": ShieldCheck,
                    "Atuação": Stethoscope,
                    "Experiência": Briefcase,
                    "Especialidade": Star,
                  };
                  const Icon = icons[topic.label] || BookOpen;
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <Icon className="h-3.5 w-3.5 text-coral mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{topic.label}</span>
                        <p className="text-xs text-foreground leading-snug">{topic.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {c.teacher.bio || `Referência em ${c.teacher.specialty}, com publicações e mais de 15 anos de prática clínica.`}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <QuickLink icon={FileText} label="Material" onClick={() => setActiveTab("Material")} />
            <QuickLink icon={MessagesSquare} label="Comunidade" onClick={() => navigate({ to: "/app/community" })} />
            <QuickLink icon={Trophy} label="Conquistas" onClick={() => navigate({ to: "/app/achievements" })} />
            <QuickLink icon={CheckCircle2} label="Certificado" onClick={() => navigate({ to: "/app/profile" })} />
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

function QuickLink({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 font-medium text-foreground/80 transition hover:border-coral hover:text-foreground"
    >
      <Icon className="h-4 w-4 text-coral" />
      {label}
    </button>
  );
}

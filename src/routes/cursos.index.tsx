import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Stethoscope, ArrowRight, Gift } from "lucide-react";
import { courses, specialties } from "@/lib/courses-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cursos/")({
  head: () => ({ meta: [{ title: "Cat�¡logo de Cursos �€” Vetmasterclass" }] }),
  component: PublicCoursesPage,
});

function PublicCoursesPage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState<string | null>(null);

  const filtered = courses.filter((c) =>
    (!spec || c.specialty === spec) &&
    (!q || c.title.toLowerCase().includes(q.toLowerCase()) || c.teacher.name.toLowerCase().includes(q.toLowerCase()))
  );

  const currentModules = filtered.length === 1 && filtered[0].id === 'ortopedia-avancada' ? [
    { title: "M�³dulo 1 �€” Introdu�§�£o �  Ortopedia Cl�­nica", topics: ["Biomec�¢nica do c�£o e gato na cl�­nica m��dica", "Descomplicando a neuroanatomia", "Como realizar uma avalia�§�£o cl�­nica de excel�ªncia", "Biologia x score da les�£o ortop��dica", "Montando uma anamnese ortop��dica", "Altera�§�µes ortop��dicas cl�¡ssicas e como trat�¡-las"] },
    { title: "M�³dulo 2 �€” Diferenciando les�£o motora muscular x neurol�³gica", topics: ["Como realizar uma palpa�§�£o eficiente e objetiva", "Testes espec�­ficos", "Bloqueios articulares", "Como fazer radiografia simples e contrastada", "Mielotomografia", "Mielorresson�¢ncia"] },
    { title: "M�³dulo 3 �€” Identificando doen�§as �³sseas sem trauma", topics: ["Panoste�­te", "Osteodistrofia hipertr�³fica", "Osteopatia craniomandibular", "Reten�§�£o de n�ºcleo cartilaginoso"] },
    { title: "M�³dulo 4 �€” Afec�§�µes da coluna", topics: ["Diferen�§a entre compress�µes de disco Hansen Tipo I e II", "S�­ndrome de Wobbler", "Discoespondilite", "Subluxa�§�£o atlantoaxial"] },
    { title: "M�³dulo 5 �€” Afec�§�µes do membro tor�¡cico", topics: ["Como diagnosticar a displasia do cotovelo", "Osteocondrite dissecante de ombro", "Contratura do infraespinhal"] },
    { title: "M�³dulo 6 �€” Afec�§�µes do membro p��lvico", topics: ["O diagn�³stico de displasia coxofemoral", "Necrose ass��ptica da cabe�§a do f�ªmur", "Luxa�§�£o de patela (medial x lateral)", "Ruptura de ligamento cruzado"] }
  ] : filtered.length === 1 && (filtered[0].specialty === 'Neurologista' || filtered[0].specialty === 'Neurologia') ? [
    { title: "M�³dulo 1: Neuroanatomia Pr�¡tica", topics: ["O sistema nervoso central e perif��rico", "Vias motoras e sensitivas"] },
    { title: "M�³dulo 2: Exame Neurol�³gico", topics: ["Testes de reflexos posturais", "Avalia�§�£o de nervos cranianos"] },
    { title: "M�³dulo 3: Neuropatias Comuns", topics: ["H��rnias de disco", "Epilepsia e s�­ndromes convulsivas"] }
  ] : filtered.length === 1 && (filtered[0].specialty === 'Hematologista' || filtered[0].specialty === 'Hematologia') ? [
    { title: "M�³dulo 1: O Hemograma Completo", topics: ["S��rie vermelha e s��rie branca", "Interpreta�§�£o de plaquetas"] },
    { title: "M�³dulo 2: Doen�§as Infecciosas", topics: ["Hemoparasitoses", "Leishmaniose e Erliquiose"] },
    { title: "M�³dulo 3: Coagulopatias", topics: ["Testes de coagula�§�£o", "Manejo de pacientes com sangramento ativo"] }
  ] : filtered.length === 1 && filtered[0].specialty === 'Cl�­nica M��dica' ? [
    { title: "M�³dulo 1: Semiologia Avan�§ada", topics: ["Abordagem do paciente cr�­tico", "Triagem na rotina cl�­nica"] },
    { title: "M�³dulo 2: Endocrinologia B�¡sica", topics: ["Diabetes Mellitus", "Hiperadrenocorticismo"] },
    { title: "M�³dulo 3: Nefrologia", topics: ["Doen�§a renal cr�´nica", "Manejo de inj�ºria renal aguda"] }
  ] : filtered.length === 1 && filtered[0].specialty === 'Emerg�ªncia' ? [
    { title: "M�³dulo 1: Triagem e Estabiliza�§�£o Inicial", topics: ["Avalia�§�£o ABCDE", "Monitoriza�§�£o hemodin�¢mica"] },
    { title: "M�³dulo 2: Choque e Fluidoterapia", topics: ["Tipos de choque", "Estrat��gias de reposi�§�£o vol�ªmica"] },
    { title: "M�³dulo 3: Procedimentos de Urg�ªncia", topics: ["Intuba�§�£o e ventila�§�£o", "Acessos venosos e toracocentese"] }
  ] : filtered.length === 1 && filtered[0].specialty === 'Gest�£o' ? [
    { title: "M�³dulo 1: Mentalidade e P.E.T.", topics: ["Fundamentos do M��todo P.E.T.", "Posicionamento no mercado pet"] },
    { title: "M�³dulo 2: Gest�£o de Processos", topics: ["Fluxo de atendimento de excel�ªncia", "Como precificar servi�§os"] },
    { title: "M�³dulo 3: Vendas e Relacionamento", topics: ["T��cnicas de persuas�£o com tutores", "Fideliza�§�£o e up-selling"] }
  ] : [
    { title: "M�³dulo 1: Introdu�§�£o", topics: ["Bases da especialidade", "Avalia�§�£o inicial"] },
    { title: "M�³dulo 2: Abordagens Avan�§adas", topics: ["Protocolos de tratamento", "Discuss�£o de casos pr�¡ticos"] }
  ];

  const realLessonsCount = currentModules.reduce((acc, mod) => acc + mod.topics.length, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header P�ºblico */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Vetmaster<span className="text-coral">class</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">Entrar</Link>
            <Button asChild className="h-9 px-4 text-xs bg-coral text-white hover:bg-coral/90">
              <Link to="/signup" search={{ redirect: undefined }}>Criar Conta</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl mb-4">Cat�¡logo de Cursos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Escolha o seu pr�³ximo n�­vel na medicina veterin�¡ria. Aprenda com os maiores especialistas do mercado e aplique na sua cl�­nica amanh�£.
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
                  ðŸŽ B�´nus Especial de Lan�§amento
                </h3>
                <p className="text-slate-700 font-medium leading-relaxed">
                  Compre qualquer curso no <strong className="text-coral">2�º Semestre de 2026</strong> e ganhe acesso total ao curso <strong>Mentoria Flix / Gest�£o</strong> (Valor de R$ 1.200,00) <strong className="text-green-700 bg-green-100 px-2 py-0.5 rounded ml-1 uppercase text-sm">Totalmente Gr�¡tis!</strong>
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
                      <span className="font-bold text-lg">ðŸŽ</span>
                    </span>
                    <p className="text-white font-black text-lg uppercase tracking-wider mb-2 leading-tight">B�´nus Exclusivo</p>
                    <p className="text-white/95 text-xs sm:text-sm font-medium leading-relaxed">
                      Este incr�­vel curso de gest�£o com o renomado Dr. Rodrigo Nicola � <span className="bg-white text-coral px-1 rounded font-bold mx-0.5">GRATUITO</span> na compra dos nossos cursos principais.
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
                    <span className="text-xs text-slate-400 line-through">R$ 2.800</span>
                    <span className="text-xl font-black text-green-600">R$ 2.300</span>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Pr��-venda</span>
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
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">Muito Al��m de Cursos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sua assinatura desbloqueia um ecossistema completo de aprendizado pr�¡tico e networking profissional.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">ðŸ‘¥</span>
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">Comunidade Vetmasterclass</h3>
              <p className="text-muted-foreground mb-6">
                N�£o fique mais sozinho no diagn�³stico. Discuta casos complexos, troque experi�ªncias e fa�§a networking de alto n�­vel com veterin�¡rios de todo o Brasil e nossos professores especialistas.
              </p>
              <Button asChild variant="outline" className="mt-auto rounded-xl">
                <Link to="/signup" search={{ redirect: undefined }}>Fa�§a parte do grupo</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">ðŸ§�</span>
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">Casos Cl�­nicos Interativos</h3>
              <p className="text-muted-foreground mb-6">
                Treine seu racioc�­nio cl�­nico em um simulador de diagn�³sticos com casos reais gerados por IA. Receba feedback imediato das suas condutas antes de aplic�¡-las nos seus pacientes de verdade.
              </p>
              <Button asChild variant="outline" className="mt-auto rounded-xl">
                <Link to="/signup" search={{ redirect: undefined }}>Teste seus conhecimentos</Link>
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






import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses, ortopediaModules } from "@/lib/courses-data";
import { ArrowLeft, CheckCircle2, PlayCircle, BookOpen, Users, Brain, ShieldCheck, Gift, Clock, MessageSquare as MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cursos_/$courseId")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.course.title} — VetClass Pro` },
    ],
  }),
  loader: ({ params }) => {
    const found = courses.find((x) => x.id === params.courseId);
    if (!found) throw notFound();
    return { course: found };
  },
  component: CourseSalesPage,
});

function CourseSalesPage() {
  const { course } = Route.useLoaderData();

  if (course.id === 'mentoria-flix') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-4 text-center">
        <div>
          <Gift className="h-16 w-16 text-coral mx-auto mb-6 animate-bounce" />
          <h1 className="font-display text-3xl font-bold mb-4">A Mentoria Flix é um Bônus Exclusivo!</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Este curso não é vendido separadamente. Você ganha acesso total e gratuito ao comprar qualquer um de nossos cursos principais.
          </p>
          <Button asChild className="bg-coral hover:bg-coral/90">
            <Link to="/cursos">Ver Cursos Principais</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      {/* Header Fixo de Vendas */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link to="/cursos" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-coral transition-colors">
            <ArrowLeft className="h-4 w-4" /> Voltar à Vitrine
          </Link>
          <Button asChild className="bg-green-500 hover:bg-green-600 shadow-md shadow-green-500/20 text-white font-bold h-10 px-6 rounded-full transition-transform hover:scale-105">
            <a href="#oferta">Garantir Minha Vaga</a>
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img src={course.cover} alt="Background" className="w-full h-full object-cover blur-sm" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
        
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-coral/50 bg-coral/20 px-3 py-1 text-xs font-bold text-coral mb-6 uppercase tracking-wider">
                Especialização Completa
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-black leading-[1.1] mb-6">
                {course.title}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center gap-4 mb-10 bg-white/5 border border-white/10 rounded-2xl p-4 w-fit backdrop-blur-sm">
                <img src={course.teacher.avatar} alt={course.teacher.name} className="h-14 w-14 rounded-full border-2 border-coral object-cover" />
                <div>
                  <p className="text-xs text-coral font-bold uppercase tracking-wider">Ministrado por</p>
                  <p className="font-display text-lg font-bold">{course.teacher.name}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all hover:-translate-y-1">
                  <a href="#oferta">Quero me especializar agora</a>
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-coral/20 rounded-3xl blur-2xl"></div>
              <img src={course.cover} alt={course.title} className="relative rounded-3xl shadow-2xl border-4 border-white/10" />
              <div className="absolute -bottom-6 -right-6 bg-white text-slate-900 rounded-2xl p-4 shadow-2xl font-bold flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Certificado</p>
                  <p>Incluso de {course.hours}h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VANTAGENS / ENTREGÁVEIS */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Tudo o que você vai receber</h2>
            <p className="text-lg text-slate-600">Uma experiência educacional premium, desenhada para a prática.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: PlayCircle, title: "Aulas Gravadas em Alta Resolução", desc: "Assista quando e onde quiser, com qualidade de cinema e materiais de apoio detalhados." },
              { icon: Users, title: "Sessões Ao Vivo de Dúvidas", desc: "Encontros online com os professores para discussão de casos práticos e resolução de dúvidas." },
              { icon: BookOpen, title: "Biblioteca VIP de Papers", desc: "Acesso a um acervo de artigos científicos selecionados e traduzidos, sempre atualizados." },
              { icon: MessagesSquare, title: "Fórum de Discussão em Grupo", desc: "Networking valioso com outros colegas da área para troca de experiências diárias." },
              { icon: Brain, title: "Mentor On-line (Tutor IA)", desc: "Seu assistente virtual 24h treinado com a literatura oficial para te ajudar no plantão." },
              { icon: ShieldCheck, title: "Garantia Incondicional de 7 Dias", desc: "Risco zero. Se não gostar da didática, devolvemos 100% do seu investimento." },
            ].map((v, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="bg-coral/10 text-coral p-3 rounded-xl h-fit">
                  <v.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRADE CURRICULAR */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">Grade Curricular</h2>
            <p className="text-slate-600 mt-2">O passo a passo estruturado para a sua maestria.</p>
          </div>
          
          <div className="space-y-4">
            {(course.id === 'ortopedia-avancada' ? ortopediaModules : [
              { title: "Módulo 1: Introdução", topics: ["Conceitos básicos"] },
              { title: "Módulo 2: Aprofundamento", topics: ["Estudos de caso"] }
            ]).map((mod, i) => (
              <div key={i} className="group relative bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md hover:border-coral/50">
                <div className="flex items-center gap-4 p-5 cursor-default relative z-10 bg-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-sm shrink-0 transition-colors group-hover:bg-coral group-hover:text-white">
                    {i + 1}
                  </div>
                  <h4 className="font-semibold text-slate-800 transition-colors group-hover:text-coral">{mod.title}</h4>
                </div>
                {/* O conteúdo expande suavemente no hover */}
                <div className="max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500 ease-in-out bg-slate-50 border-t border-slate-100/0 group-hover:border-slate-100">
                  <ul className="p-5 pl-16 space-y-2 text-sm text-slate-600">
                    {mod.topics.map((topic, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-coral/60 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="text-center mt-6 text-sm text-coral font-bold cursor-pointer hover:underline">
              + e muito mais nas atualizações mensais
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA E PREÇO (ANCORAGEM) */}
      <section id="oferta" className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-[2.5rem] bg-slate-900 p-1 sm:p-2 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-coral rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            
            <div className="bg-slate-900 rounded-[2.25rem] p-8 md:p-12 border border-white/10 relative z-10 grid md:grid-cols-2 gap-12 items-center">
              
              <div className="text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white mb-6 uppercase tracking-widest">
                  <Clock className="h-4 w-4" /> Oferta por Tempo Limitado
                </div>
                <h2 className="font-display text-3xl font-black mb-6">Tudo o que você precisa em uma única decisão.</h2>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                    <span>Acesso por <strong>1 ano inteiro</strong> a todo o conteúdo do curso <strong>{course.title}</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                    <span>Todas as <strong>vantagens premium</strong> listadas acima</span>
                  </li>
                  <li className="flex items-start gap-3 bg-coral/10 border border-coral/20 p-3 rounded-xl mt-4">
                    <Gift className="h-6 w-6 text-coral shrink-0" />
                    <span className="text-sm">
                      <strong className="text-coral">Bônus Especial:</strong> Mentoria Flix de Gestão com Dr. Rodrigo Nicola (Valor R$ 799,00) <strong className="text-green-400">GRÁTIS HOJE</strong>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center text-slate-900 shadow-xl">
                <p className="text-slate-500 font-medium mb-2 line-through">Valor normal: R$ 1.290,00</p>
                <div className="flex justify-center items-start">
                  <span className="text-2xl font-bold mt-2">12x</span>
                  <span className="text-6xl font-black text-green-600 mx-2">89</span>
                  <span className="text-xl font-bold mt-8">,00</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">ou R$ 890,00 à vista</p>
                
                <div className="w-full h-px bg-slate-100 my-6"></div>
                
                <Button asChild className="w-full h-16 text-xl font-black bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 transition-all hover:scale-105 rounded-2xl">
                  <Link to="/signup" search={{ redirect: `/checkout/${course.id}` }}>
                    COMPRAR AGORA
                  </Link>
                </Button>
                <div className="flex flex-col items-center gap-1 mt-4">
                  <p className="text-[12px] font-semibold text-slate-600 flex items-center gap-1">
                    <Clock className="h-4 w-4 text-coral" /> Acesso total por 12 meses
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" /> Pagamento 100% Seguro
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

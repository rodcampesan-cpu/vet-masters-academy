import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses, ortopediaModules } from "@/lib/courses-data";
import { ArrowLeft, CheckCircle2, ChevronRight, Stethoscope, Dna, FileText, Send, Image as ImageIcon, Gift, Star, Award, BookOpen, Clock, Users, Play, Smartphone, BookMarked, MessageSquare, Brain, PlayCircle, ShieldCheck, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import mentoriaFlixImg from "@/assets/mentoria-flix.png";

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
      <div className="min-h-screen bg-[#0A0A0A] text-white font-sans pb-32">
        
        {/* HERO SECTION */}
        <div className="relative w-full h-[70vh] min-h-[500px]">
          <div className="absolute inset-0">
            <img src={course.cover} alt="Mentoria Flix" className="w-full h-full object-cover object-top opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
          </div>
          
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-end pb-12">
            <div className="max-w-2xl">
              <h3 className="text-[#E50914] font-bold text-sm sm:text-base tracking-widest uppercase mb-2">Método P.E.T.</h3>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
                Transforme seu negócio pet
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-xl">
                Pensar, Estruturar, Transformar – O método completo para empresários do setor pet, donos de clínicas, pet shops e banho e tosa.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#E50914] hover:bg-[#E50914]/90 text-white font-bold px-8 h-12 rounded flex items-center gap-2">
                  <Play className="fill-white w-5 h-5" /> Começar
                </Button>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-0 text-white font-bold px-8 h-12 rounded">
                  Mais informações
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* MENU DE ÍCONES COLORIDOS */}
        <div className="container mx-auto px-6 -mt-6 relative z-10">
          <div className="flex flex-wrap gap-4 justify-start items-center">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#007AFF] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <BookOpen className="text-white w-8 h-8" />
              </div>
              <span className="text-xs text-gray-400 font-medium">eBook</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#34C759] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Play className="text-white w-8 h-8" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Curso</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#FF3B30] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <PlayCircle className="text-white w-8 h-8" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Play Aulas</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#FF2D55] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <BookMarked className="text-white w-8 h-8" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Playbooks</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#AF52DE] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Users className="text-white w-8 h-8" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Comunidade</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#FF9500] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <MessageSquare className="text-white w-8 h-8" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Mentor IA</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#8E8E93] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Smartphone className="text-white w-8 h-8" />
              </div>
              <span className="text-xs text-gray-400 font-medium">APP Gestão</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-[#FF9500] flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <BookOpen className="text-white w-8 h-8" />
              </div>
              <span className="text-xs text-gray-400 font-medium">Livros</span>
            </div>
          </div>
        </div>

        {/* MÉTODO P.E.T. CARDS */}
        <div className="container mx-auto px-6 mt-16">
          <h2 className="text-2xl font-bold mb-1">Método P.E.T.</h2>
          <p className="text-gray-400 mb-6">Sua jornada de transformação</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6 hover:bg-[#1A1A1A] transition-colors">
              <span className="inline-block bg-[#007AFF] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">P — Pensar</span>
              <h3 className="text-xl font-bold mb-2">Pensar</h3>
              <p className="text-gray-400 text-sm">Análise e diagnóstico do seu negócio pet.</p>
            </div>
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6 hover:bg-[#1A1A1A] transition-colors">
              <span className="inline-block bg-[#34C759] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">E — Estruturar</span>
              <h3 className="text-xl font-bold mb-2">Estruturar</h3>
              <p className="text-gray-400 text-sm">Organização de processos e equipe.</p>
            </div>
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6 hover:bg-[#1A1A1A] transition-colors">
              <span className="inline-block bg-[#FF9500] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">T — Transformar</span>
              <h3 className="text-xl font-bold mb-2">Transformar</h3>
              <p className="text-gray-400 text-sm">Crescimento e escala do seu negócio.</p>
            </div>
          </div>
        </div>

        {/* MENSAGEM DE BÔNUS (FIXA EMBAIXO) */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#E50914] text-white p-4 z-50 shadow-2xl flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 gap-4">
          <div className="flex items-center gap-4">
            <Gift className="w-10 h-10 hidden sm:block" />
            <div>
              <h3 className="font-black text-lg sm:text-xl">Como ter acesso à Mentoria Flix?</h3>
              <p className="text-white/90 text-sm">Esta plataforma incrível é um <strong className="underline">Bônus 100% Gratuito</strong> para todos que garantirem uma vaga em qualquer curso principal neste semestre.</p>
            </div>
          </div>
          <Button asChild className="bg-white text-[#E50914] hover:bg-gray-100 font-bold whitespace-nowrap px-8 rounded-full">
            <Link to="/cursos">Ver Cursos Elegíveis</Link>
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
                <img src={course.teacher.avatar} alt={course.teacher.name} style={{ objectPosition: course.teacher.avatarPosition || "center" }} className="h-14 w-14 rounded-full border-2 border-coral object-cover" />
                <div>
                  <p className="text-xs text-coral font-bold uppercase tracking-wider">Ministrado por</p>
                  <p className="font-display text-lg font-bold">{course.teacher.name}</p>
                </div>
              </div>
              
              <div className="mb-8 rounded-xl border border-coral/30 bg-coral/10 p-4">
                <div className="flex items-start gap-3">
                  <Gift className="h-6 w-6 text-coral shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white mb-1">🎁 Bônus de Lançamento (2º Semestre/2026)</h4>
                    <p className="text-sm text-slate-300">
                      Garante acesso 100% gratuito ao curso <strong className="text-white">Mentoria Flix de Gestão</strong> (Valor de tabela: R$ 1.200,00).
                    </p>
                  </div>
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
              { icon: Users, title: "Encontros Ao Vivo com o Professor", desc: "Mentoria e sessões tira-dúvidas exclusivas diretamente com o especialista do curso." },
              { icon: Microscope, title: "Estudo de Casos Clínicos", desc: "Discussão aprofundada de casos reais para treinar seu raciocínio diagnóstico de forma prática." },
              { icon: BookOpen, title: "Biblioteca VIP de Papers", desc: "Acesso a um acervo de artigos científicos selecionados e traduzidos, sempre atualizados." },
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

      {/* MEGA BANNER DA MENTORIA FLIX (BÔNUS) */}
      {course.id !== 'mentoria-flix' && (
        <section className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-slate-900">
          <div className="absolute inset-0">
            <img src={mentoriaFlixImg} alt="Mentoria Flix" className="w-full h-full object-cover object-top opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#E50914] text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-6">
                <Gift className="w-4 h-4" /> Bônus Exclusivo de Lançamento
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl font-black mb-4 leading-tight">
                Mentoria Flix: <span className="text-[#E50914]">O Método P.E.T.</span>
              </h2>
              
              <p className="text-gray-300 text-lg mb-8 max-w-2xl leading-relaxed">
                Transforme sua clínica ou pet shop num negócio altamente lucrativo. Leve o acesso total à nossa plataforma focada em gestão veterinária (eBooks, Play Aulas, Comunidade, IA Mentor, APP Gestão) que custa <strong className="text-white line-through">R$ 1.200,00</strong> — <strong className="text-green-400">totalmente de graça</strong> ao garantir sua vaga hoje.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#007AFF]/20 border border-[#007AFF]/30 flex items-center justify-center shadow-lg">
                    <BookOpen className="text-[#007AFF] w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300">eBooks Interativos</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#34C759]/20 border border-[#34C759]/30 flex items-center justify-center shadow-lg">
                    <Smartphone className="text-[#34C759] w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300">APP de Gestão</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#FF9500]/20 border border-[#FF9500]/30 flex items-center justify-center shadow-lg">
                    <MessageSquare className="text-[#FF9500] w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300">Mentor IA 24h</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#AF52DE]/20 border border-[#AF52DE]/30 flex items-center justify-center shadow-lg">
                    <Users className="text-[#AF52DE] w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-gray-300">Comunidade VIP</span>
                </div>
              </div>
              
              <Button asChild className="bg-white text-black hover:bg-gray-200 font-bold px-8 h-12 rounded flex items-center gap-2">
                <a href="#oferta">Quero Ganhar a Mentoria Flix</a>
              </Button>
            </div>
          </div>
        </section>
      )}

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
                
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                    <span>Acesso por <strong>1 ano inteiro</strong> a todo o conteúdo do curso <strong>{course.title}</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                    <span>Todas as <strong>vantagens premium</strong> listadas acima</span>
                  </li>
                </ul>
                
                <div className="mb-8 rounded-xl border-2 border-coral/50 bg-coral/10 p-5 shadow-lg shadow-coral/5">
                  <div className="flex items-start gap-4">
                    <div className="bg-coral text-white p-2 rounded-full shrink-0 mt-1">
                      <Gift className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-lg mb-1 uppercase tracking-wide">🎁 Bônus de Lançamento</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Ao comprar hoje, você ganha acesso <strong className="text-white">100% gratuito</strong> ao curso completo <strong>Mentoria Flix de Gestão</strong> (Valor de tabela: R$ 1.200,00).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center text-slate-900 shadow-xl">
                <p className="text-slate-500 font-medium mb-2 line-through">De: R$ 1.299,00</p>
                <div className="flex justify-center items-start">
                  <span className="text-xl font-bold mt-2 text-slate-500 mr-1">R$</span>
                  <span className="text-7xl font-black text-green-600">799</span>
                  <span className="text-xl font-bold mt-8">,00</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mt-2">
                  🔥 Economia de R$ 500,00
                </div>
                <p className="text-sm text-slate-500 mt-3">ou 12x de R$ 79,90 sem juros</p>
                
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

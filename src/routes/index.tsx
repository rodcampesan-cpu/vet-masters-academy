import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Brain, GraduationCap, Library, MessagesSquare, Play, Sparkles, Stethoscope, Trophy, Users, CheckCircle, Gift, AlertTriangle, Clock, Store, Frown, Zap, MessageCircle, BarChart3, ChevronRight, PlayCircle, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import heroImg from "@/assets/hero-vet.jpg";
import mentoriaFlixImg from "@/assets/mentoria-flix.png";
import popupPresaleImg from "@/assets/popup-presale.jpg";
import { courses, specialties, teachers } from "@/lib/courses-data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vetmasterclass — A Revolução na Medicina Veterinária Prática" },
      { name: "description", content: "Aprenda a aplicar a medicina do mundo real, ganhar a confiança absoluta do tutor e faturar mais com procedimentos assertivos." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* POPUP INICIAL: NOVA TURMA EM 03/2027 */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-center">
          <div className="mx-auto inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-700 mb-4">
            <Clock className="h-7 w-7" />
          </div>

          <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Inscrições Encerradas • Vendas Pausadas
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2">
            Nova Turma em 03/2027
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            As vagas para a turma atual foram preenchidas e as vendas estão temporariamente pausadas para dedicação total aos alunos. A abertura da próxima turma será em <strong>Março de 2027 (03/2027)</strong>.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4 text-emerald-600" /> Lista de Espera VIP
            </div>
            <p className="text-xs text-emerald-700 leading-snug">
              Cadastre-se para receber prioridade máxima e condições exclusivas de lançamento quando as novas vagas abrirem.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20na%20lista%20de%20espera%20VIP%20para%20a%20nova%20turma%20em%2003%2F2027."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-sm h-12 px-6 rounded-xl shadow-lg shadow-green-500/20 transition-all hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" /> Entrar na Lista VIP (WhatsApp)
            </a>
            <Button 
              variant="outline" 
              onClick={() => setShowPopup(false)} 
              className="h-12 px-5 text-sm font-semibold rounded-xl border-slate-300"
            >
              Conhecer o Site
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* NEW HERO SECTION (OBJECTIVE & BRIGHT) */}
      <section className="bg-secondary/30 pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden relative">
        <div className="absolute inset-0 -z-10 opacity-[0.4] [background-image:radial-gradient(circle_at_1px_1px,var(--tw-colors-coral-500)_1px,transparent_0)] [background-size:40px_40px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start lg:pt-4">
            <div className="animate-fade-up">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-amber-800 backdrop-blur mb-6">
                <Clock className="h-4 w-4 text-amber-600" />
                Inscrições Encerradas • Próximas Turmas em Março de 2027
              </div>
              <h1 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                A faculdade te ensinou a anatomia. <br/>
                <span className="text-coral">Mas quem te ensina a lidar com o tutor desesperado?</span>
              </h1>
              
              <div className="mt-8 space-y-4">
                {[
                  "Você tem medo de fechar um diagnóstico complexo na frente do cliente?",
                  "Você prescreve o tratamento, mas o tutor não adere porque não entendeu o valor?",
                  "Você sabe a teoria, mas trava na hora de aplicar o protocolo de emergência?"
                ].map((text, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                        <AlertTriangle className="h-3 w-3" />
                      </div>
                    </div>
                    <p className="text-base text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 bg-amber-600 hover:bg-amber-700 text-white shadow-lg px-8 text-lg font-semibold rounded-xl transition-all hover:scale-105">
                  <a href="#oferta">
                    Lista de Espera (Março/2027) <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 border-border bg-card text-foreground hover:bg-secondary px-8 text-lg rounded-xl transition-all">
                  <Link to="/cursos">
                    Ver Catálogo de Cursos
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 p-3.5 max-w-lg">
                <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm font-medium text-amber-900">
                  <strong>Vendas Pausadas:</strong> Acompanhamento exclusivo da turma atual. Próximas turmas em <strong>Março de 2027</strong>.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground font-medium">
                <div className="flex -space-x-2">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://i.pravatar.cc/100?img=68" alt=""/>
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://i.pravatar.cc/100?img=47" alt=""/>
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://i.pravatar.cc/100?img=3" alt=""/>
                </div>
                <p>Junte-se aos nossos <strong className="text-foreground">alunos incríveis</strong> de todo o Brasil!</p>
              </div>
            </div>
            
            <div className="relative animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute -inset-4 bg-gradient-to-r from-coral/20 to-primary/20 rounded-3xl blur-2xl opacity-50"></div>
              
              {/* VIDEO SALES LETTER MOCK */}
              <div className="relative rounded-2xl shadow-2xl border border-border overflow-hidden bg-black aspect-video group cursor-pointer flex items-center justify-center">
                <img src={heroImg} alt="Veterinário atendendo" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-20 w-20 bg-coral/90 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,107,107,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 ml-1" />
                  </div>
                  <p className="mt-4 font-bold text-white tracking-wide uppercase text-sm">Clique para assistir</p>
                </div>

                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">
                  GRAVAÇÃO LIBERADA
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs z-10 hidden sm:flex">
                <div className="bg-green-500/10 p-3 rounded-full text-green-500">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Comunicação Assertiva</p>
                  <p className="text-xs text-muted-foreground">Tutores engajados e tratamentos aprovados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY SECTION */}
      <section id="metodo" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-coral/5 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-4xl font-extrabold sm:text-5xl text-primary tracking-tight">
              Método Decisão Clínica
            </h2>
            <p className="mt-6 text-xl font-medium text-slate-800">
              Aprender é importante. Saber o que fazer diante do paciente é o que muda a prática.
            </p>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              A VetMasterClass foi criada para aproximar conhecimento e rotina clínica. O método ajuda o médico-veterinário a transformar conteúdo em raciocínio, interpretação e tomada de decisão.
            </p>
          </div>

          {/* 3 STEPS FLOW */}
          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent -z-10"></div>
            
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative">
              {[
                { step: "1", title: "ENTENDA O CASO", desc: "Organize sinais, histórico, exame físico e contexto clínico.", icon: ClipboardList },
                { step: "2", title: "RACIOCINE", desc: "Construa hipóteses, interprete exames e defina prioridades.", icon: Brain },
                { step: "3", title: "DECIDA", desc: "Transforme conhecimento em conduta com mais clareza e segurança.", icon: CheckCircle }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500 z-10">
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-coral text-white text-sm font-bold flex items-center justify-center shadow-lg">
                      {item.step}
                    </div>
                    <item.icon className="h-10 w-10 text-primary stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-black text-primary mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RESOURCES BAND */}
          <div className="mt-28 pt-16 border-t border-slate-200">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-slate-800">
                A aula termina. <span className="text-coral">O aprendizado continua.</span>
              </h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                { name: "Tutor Vet IA", icon: Sparkles },
                { name: "Casos Clínicos", icon: Stethoscope },
                { name: "Comunidade", icon: Users },
                { name: "Bate-Papo ao Vivo", icon: MessagesSquare },
                { name: "Biblioteca", icon: Library }
              ].map((resource, i) => (
                <div key={i} className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                  <resource.icon className="h-5 w-5 text-coral" />
                  <span className="font-semibold text-slate-700">{resource.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center gap-3 md:gap-6 text-sm md:text-base font-black text-slate-300 tracking-[0.2em] uppercase">
              <span className="text-primary">Conhecer</span>
              <ArrowRight className="h-4 w-4" />
              <span className="text-primary">Raciocinar</span>
              <ArrowRight className="h-4 w-4" />
              <span className="text-primary">Decidir</span>
            </div>
          </div>

        </div>
      </section>

      {/* MENTORIA FLIX SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/20 skew-y-3 origin-top-left -z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-coral/20 rounded-3xl blur-2xl transform rotate-3" />
              <img src={mentoriaFlixImg} alt="Mentoria Flix Método P.E.T." className="relative rounded-3xl shadow-xl w-full max-w-2xl mx-auto object-cover border border-border" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-800 mb-6 uppercase tracking-wider">
                <Store className="h-4 w-4" /> Bônus Especial
              </div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl text-gray-900 leading-tight">
                Como montar seu Negócio de Sucesso com a <span className="text-coral">Mentoria Flix</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Aprenda diretamente com o Dr. Rodrigo Nicola como transformar sua clínica ou consultório em uma empresa extremamente lucrativa. Você vai descobrir os segredos de gestão, contratação e estruturação de quem já construiu empresas sólidas na medicina veterinária.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Curso completo com 8 aulas exclusivas",
                  "E-book interativo e Playbook de execução",
                  "Acesso ao Mentor IA para tirar dúvidas do negócio",
                  "Aulas gravadas para assistir quando e onde quiser"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle className="h-5 w-5 text-coral shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Totalmente Gratuito (Valor R$ 1.200)</p>
                  <p className="text-sm text-gray-500">Exclusivo para os primeiros 15 inscritos no Vetmasterclass.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHERS SECTION */}
      <section className="py-24 bg-card border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Aprenda com quem vive a prática diária
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            Nossos professores não são apenas acadêmicos. São profissionais renomados que lideram os maiores centros de referência do país.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((teacher, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-background rounded-3xl border border-border shadow-soft hover:-translate-y-2 transition-transform duration-300">
                <img src={teacher.avatar} alt={teacher.name} style={{ objectPosition: teacher.avatarPosition || "center" }} className="h-32 w-32 rounded-full object-cover border-4 border-coral/20 mb-6" />
                <h3 className="font-display text-xl font-bold mb-1">{teacher.name}</h3>
                <p className="text-sm font-semibold text-coral mb-2">{teacher.specialty}</p>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  {teacher.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl mb-16">
            O que dizem os alunos que estão <span className="text-coral">transformando</span> a medicina veterinária
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                text: "A plataforma mudou meu plantão. Antes eu travava na hora de dar o diagnóstico pro tutor, com medo de errar. Hoje o Tutor IA me dá o suporte na hora, é impressionante.",
                name: "Dra. Marina Silva",
                role: "Plantonista Intensivista"
              },
              {
                text: "Os casos interativos são um absurdo de bons! Eu me sinto dentro da clínica tomando as decisões. Aprendi mais em 2 meses de Vetmasterclass do que em 2 anos de especialização teórica.",
                name: "Dr. Carlos Eduardo",
                role: "Clínico Geral"
              },
              {
                text: "Eu nunca consegui cobrar o valor justo na minha consulta porque não sabia agregar valor. Depois do curso de Ortopedia, fecho cirurgias com o dobro do valor que cobrava antes.",
                name: "Dra. Fernanda Costa",
                role: "Cirurgiã Ortopedista"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-card p-8 rounded-3xl border border-border shadow-sm relative">
                <div className="text-coral text-4xl font-serif absolute top-4 left-6 opacity-20">"</div>
                <p className="text-foreground/80 relative z-10 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 border-t border-border/50 pt-4">
                  <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                    {testimonial.name.charAt(4)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS VIP OFFER */}
      <section id="oferta" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A]" /> {/* Very dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-coral/10 via-transparent to-primary/10" />
        
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-coral/30 bg-black/50 p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-40 w-40 rounded-full bg-coral opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-40 w-40 rounded-full bg-primary opacity-20 blur-3xl"></div>

            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              
              <div className="flex-1 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-coral/20 px-4 py-1 text-sm font-semibold text-coral mb-6 border border-coral/30">
                  <Clock className="h-4 w-4" /> Apenas para os 15 PRIMEIROS inscritos
                </div>
                <h2 className="font-display text-4xl font-black leading-tight">
                  Condição Vip de Lançamento
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Ao garantir sua vaga, você terá <strong>1 Ano de Acesso Total</strong> ao curso, tempo de sobra para rever as aulas e dominar a prática. Além disso, os <strong>15 primeiros</strong> inscritos hoje vão levar um bônus inacreditável:
                </p>
                
                <div className="mt-8 rounded-2xl bg-gradient-to-r from-coral/10 to-transparent border-l-4 border-coral p-6">
                  <div className="flex items-start gap-4">
                    <Store className="h-8 w-8 text-coral shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Como montar seu Negócio de Sucesso</h3>
                      <p className="text-coral text-sm font-bold mt-1 tracking-wider uppercase">Bônus Exclusivo: Mentoria Flix</p>
                      <div className="mt-2 inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-md border border-white/10">
                        <span className="text-sm text-white/50 line-through">De R$ 1.200,00</span>
                        <span className="text-sm font-bold text-green-400">GRÁTIS HOJE</span>
                      </div>
                      <p className="mt-3 text-white/70">
                        Um treinamento completo com o mapa exato do zero ao lucro. Aprenda gestão, estruturação, contratação e vendas com quem já construiu empresas sólidas na medicina veterinária.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[380px] shrink-0 bg-white rounded-3xl p-8 text-center shadow-2xl relative">
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-amber-600 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                    Inscrições Encerradas
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs mb-2">VENDAS PAUSADAS</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2">Próximas Turmas em Março de 2027</h3>
                </div>
                <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    As vagas para o período atual foram preenchidas. Entre na Lista de Espera VIP para ser avisado com prioridade e condições exclusivas na abertura das novas turmas.
                  </p>
                </div>

                <ul className="space-y-4 text-left mb-8">
                  {[
                    "1 Ano de Acesso Completo ao Curso",
                    "Biblioteca e Casos Interativos do Curso",
                    "Desconto VIP de 25% em novos cursos",
                    "Acesso antecipado garantido na abertura"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20entrar%20na%20lista%20de%20espera%20VIP%20para%20as%20turmas%20de%20Mar%C3%A7o%20de%202027."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-14 text-base font-bold bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-xl shadow-green-500/20 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" /> Entrar na Lista VIP (WhatsApp)
                </a>
                <p className="text-xs text-gray-500 mt-4 font-medium flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3 text-amber-600" /> Abertura oficial em Março de 2027
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Perguntas Frequentes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">Tudo o que você precisa saber antes de entrar.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg">O acesso é vitalício?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Neste formato VIP de lançamento, o acesso é de 1 Ano Completo. Esse é o tempo ideal e comprovado para você assistir, revisar as práticas clínicas e tirar suas dúvidas na Comunidade.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg">Tem garantia?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Sim! Você tem 7 dias de Garantia Incondicional. Se você acessar as aulas e achar que a metodologia Vetmasterclass não vai transformar a sua rotina, basta um e-mail para reembolsarmos 100% do seu investimento.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg">Ainda sou estudante, posso fazer?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Com certeza. É a melhor fase para começar. Diferente da faculdade que ensina a teoria, aqui você vai aprender a "Medicina da Vida Real". Quando se formar, já estará muito à frente dos recém-formados inseguros.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg">Os certificados são válidos?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Sim! Todos os nossos cursos geram certificados válidos em todo o território nacional como capacitação profissional, ideais para currículo e horas complementares na faculdade.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vetmasterclass. Revolucionando a Educação Veterinária.
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Brain, GraduationCap, Library, MessagesSquare, Play, Sparkles, Stethoscope, Trophy, Users, CheckCircle, Gift, AlertTriangle, Clock, Store, CalendarClock, Frown, Zap, MessageCircle, BarChart3, ChevronRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import heroImg from "@/assets/hero-vet.jpg";
import mentoriaFlixImg from "@/assets/mentoria-flix.png";
import { courses, specialties, teachers } from "@/lib/courses-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vetmasterclass — A Revolu��o na Medicina Veterin�ria Pr�tica" },
      { name: "description", content: "Aprenda a aplicar a medicina do mundo real, ganhar a confian�a absoluta do tutor e faturar mais com procedimentos assertivos." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [showPreSalePopup, setShowPreSalePopup] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPreSalePopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Dialog open={showPreSalePopup} onOpenChange={setShowPreSalePopup}>
        <DialogContent className="sm:max-w-lg text-center p-10 border-coral border-2 shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-coral/10 mb-4 animate-bounce">
            <CalendarClock className="h-10 w-10 text-coral" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-3xl font-black font-display text-center mb-4 uppercase tracking-wide text-coral">Pr�-Venda Liberada!</DialogTitle>
            <DialogDescription className="text-center text-lg text-foreground/90 font-medium">
              Garanta sua vaga com desconto na primeira turma do curso de <strong className="text-coral text-xl block mt-2">Ortopedia Avan�ada</strong>
              <br/><br/>
              Aproveite a condi��o especial de lan�amento: <br/>De <span className="line-through text-red-400">R$ 2.800</span> por apenas <strong className="text-green-600 text-2xl">R$ 2.300</strong> at o dia <strong>23/11/2026</strong>.
              <br/><br/>
              <span className="inline-block bg-primary text-white p-3 px-6 rounded-xl font-bold mt-2 shadow-lg text-lg animate-pulse">
                In�cio das aulas: 18/11/2026
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center mt-6">
            <Button asChild size="lg" className="w-full h-12 bg-coral hover:bg-coral/90 text-white font-bold" onClick={() => setShowPreSalePopup(false)}>
              <a href="#oferta">Aproveitar o Desconto</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Navbar />

      {/* NEW HERO SECTION (OBJECTIVE & BRIGHT) */}
      <section className="bg-secondary/30 pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden relative">
        <div className="absolute inset-0 -z-10 opacity-[0.4] [background-image:radial-gradient(circle_at_1px_1px,var(--tw-colors-coral-500)_1px,transparent_0)] [background-size:40px_40px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-1.5 text-sm font-medium text-coral backdrop-blur mb-6">
                <AlertTriangle className="h-4 w-4" />
                O fim da inseguran�a nos plant�es
              </div>
              <h1 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                A faculdade te ensinou a anatomia. <br/>
                <span className="text-coral">Mas quem te ensina a lidar com o tutor desesperado?</span>
              </h1>
              
              <div className="mt-8 space-y-4">
                {[
                  { text: "Voc tem medo de fechar um diagn�stico complexo na frente do cliente?", icon: Frown },
                  { text: "Voc prescreve o tratamento, mas o tutor n�o adere porque n�o entendeu o valor?", icon: Users },
                  { text: "Voc sabe a teoria, mas trava na hora de aplicar o protocolo de emerg�ncia?", icon: Zap }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-coral">
                        <item.icon className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="text-base text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral px-8 text-lg font-semibold rounded-xl transition-all hover:scale-105">
                  <a href="#oferta">
                    <PlayCircle className="mr-2 h-5 w-5" /> Assistir apresenta��o
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 border-border bg-card text-foreground hover:bg-secondary px-8 text-lg font-semibold rounded-xl transition-all hover:scale-105">
                  <Link to="/cursos">
                    Conhecer a plataforma <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-coral/10 border border-coral/20 p-3 max-w-lg">
                <Gift className="h-5 w-5 text-coral flex-shrink-0 animate-pulse" />
                <p className="text-sm font-medium text-foreground">
                  <span className="text-coral font-bold">15 PRIMEIROS:</span> Ganhe o curso "Como montar seu Neg�cio de Sucesso com Mentoria Flix" <span className="font-bold text-green-600 bg-green-100 px-1 rounded">(Valor R$ 799)</span>.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground font-medium">
                <div className="flex -space-x-2">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://i.pravatar.cc/100?img=1" alt=""/>
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://i.pravatar.cc/100?img=2" alt=""/>
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://i.pravatar.cc/100?img=3" alt=""/>
                </div>
                <p>Junte-se aos nossos <strong className="text-foreground">alunos incr�veis</strong> de todo o Brasil!</p>
              </div>
            </div>
            
            <div className="relative animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute -inset-4 bg-gradient-to-r from-coral/20 to-primary/20 rounded-3xl blur-2xl opacity-50"></div>
              
              {/* VIDEO SALES LETTER MOCK */}
              <div className="relative rounded-2xl shadow-2xl border border-border overflow-hidden bg-black aspect-video group cursor-pointer flex items-center justify-center">
                <img src={heroImg} alt="Veterin�rio atendendo" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-20 w-20 bg-coral/90 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,107,107,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 ml-1" />
                  </div>
                  <p className="mt-4 font-bold text-white tracking-wide uppercase text-sm">Clique para assistir</p>
                </div>

                <div className="absolute top-6 left-6 bg-coral text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  GRAVA��O LIBERADA
                </div>
              </div>
              
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4 w-[110%] max-w-[120%] z-10 hidden lg:flex justify-between">
                {[
                  { icon: MessageCircle, title: "Comunica��o Assertiva", desc: "Conquiste a confian�a do tutor." },
                  { icon: Brain, title: "Racioc�nio Cl�nico", desc: "Do sintoma à conduta com seguran�a." },
                  { icon: BarChart3, title: "Tomada de decis�o", desc: "Esteja preparado para os momentos que realmente importam." }
                ].map((card, i) => (
                  <div key={i} className="flex-1 bg-white border border-slate-100 p-5 rounded-2xl shadow-xl flex gap-4 items-center transition-transform hover:-translate-y-1">
                    <div className="bg-coral/10 p-3 rounded-full text-coral shrink-0">
                      <card.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight mb-1">{card.title}</p>
                      <p className="text-[11px] text-slate-500 leading-snug">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION / DIFFERENTIATORS */}
      <section id="metodo" className="py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            A tr�ade do M�dico Veterin�rio de Alto Valor
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            N�o basta ser bom tecnicamente. Voc precisa dominar o cen�rio completo do atendimento.
          </p>

          <div className="mt-16 grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Stethoscope,
                title: "Conduta Cl�nica Impec�vel",
                desc: "Aprenda protocolos mastigados e diretos ao ponto, guiados pelas maiores autoridades do pa�s."
              },
              {
                icon: Users,
                title: "Engajamento do Tutor",
                desc: "T�cnicas de comunica��o e vendas para fazer o tutor entender o valor do seu diagn�stico e aprovar or�amentos maiores."
              },
              {
                icon: Brain,
                title: "Tutor Vet IA (Intelig�ncia Artificial)",
                desc: "Seu assistente de bolso treinado 100% na literatura oficial. Tire d�vidas de dosagem e protocolos no meio do plant�o."
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-background shadow-soft hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
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
              <img src={mentoriaFlixImg} alt="Mentoria Flix M�todo P.E.T." className="relative rounded-3xl shadow-xl w-full max-w-2xl mx-auto object-cover border border-border" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-800 mb-6 uppercase tracking-wider">
                <Store className="h-4 w-4" /> Bônus Especial
              </div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl text-gray-900 leading-tight">
                Como montar seu Neg�cio de Sucesso com a <span className="text-coral">Mentoria Flix</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Aprenda diretamente com o Dr. Rodrigo Nicola como transformar sua cl�nica ou consult�rio em uma empresa extremamente lucrativa. Voc vai descobrir os segredos de gest�o, contrata��o e estrutura��o de quem j construiu empresas s�lidas na medicina veterin�ria.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Curso completo com 8 aulas exclusivas",
                  "E-book interativo e Playbook de execu��o",
                  "Acesso ao Mentor IA para tirar d�vidas do neg�cio",
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
                  <p className="text-sm font-bold text-gray-900">Totalmente Gratuito (Valor R$ 799)</p>
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
            Aprenda com quem vive a pr�tica di�ria
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            Nossos professores n�o s�o apenas acad�micos. S�o profissionais renomados que lideram os maiores centros de refer�ncia do pa�s.
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
            O que dizem os alunos que est�o <span className="text-coral">transformando</span> a medicina veterin�ria
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                text: "A plataforma mudou meu plant�o. Antes eu travava na hora de dar o diagn�stico pro tutor, com medo de errar. Hoje o Tutor IA me d o suporte na hora,  impressionante.",
                name: "Dra. Marina Silva",
                role: "Plantonista Intensivista"
              },
              {
                text: "Os casos interativos s�o um absurdo de bons! Eu me sinto dentro da cl�nica tomando as decis�es. Aprendi mais em 2 meses de Vetmasterclass do que em 2 anos de especializa��o te�rica.",
                name: "Dr. Carlos Eduardo",
                role: "Cl�nico Geral"
              },
              {
                text: "Eu nunca consegui cobrar o valor justo na minha consulta porque n�o sabia agregar valor. Depois do curso de Ortopedia, fecho cirurgias com o dobro do valor que cobrava antes.",
                name: "Dra. Fernanda Costa",
                role: "Cirurgi Ortopedista"
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
                  Condi��o Vip de Lan�amento
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Ao garantir sua vaga, voc ter <strong>1 Ano de Acesso Total</strong> ao curso, tempo de sobra para rever as aulas e dominar a pr�tica. Al�m disso, os <strong>15 primeiros</strong> inscritos hoje v�o levar um bônus inacredit�vel:
                </p>
                
                <div className="mt-8 rounded-2xl bg-gradient-to-r from-coral/10 to-transparent border-l-4 border-coral p-6">
                  <div className="flex items-start gap-4">
                    <Store className="h-8 w-8 text-coral shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Como montar seu Neg�cio de Sucesso</h3>
                      <p className="text-coral text-sm font-bold mt-1 tracking-wider uppercase">Bônus Exclusivo: Mentoria Flix</p>
                      <div className="mt-2 inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-md border border-white/10">
                        <span className="text-sm text-white/50 line-through">De R$ 799,00</span>
                        <span className="text-sm font-bold text-green-400">GRÁTIS HOJE</span>
                      </div>
                      <p className="mt-3 text-white/70">
                        Um treinamento completo com o mapa exato do zero ao lucro. Aprenda gest�o, estrutura��o, contrata��o e vendas com quem j construiu empresas s�lidas na medicina veterin�ria.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[380px] shrink-0 bg-white rounded-3xl p-8 text-center shadow-2xl relative">
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                    Vagas Esgotando
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-2">Plano Vetmasterclass</h3>
                <div className="my-6">
                  <span className="text-sm text-gray-500 line-through">De R$ 2.800</span>
                  <div className="flex justify-center items-end mt-2 mb-2 text-coral">
                    <span className="text-3xl font-bold text-gray-900 mr-2 mb-1">R$</span>
                    <span className="text-6xl font-black">2.300</span>
                    <span className="text-xl font-bold text-gray-900 ml-1 mb-1">,00</span>
                  </div>
                  <span className="text-sm text-gray-500 font-bold text-green-600 block mb-1">Pr�-venda v�lida at 23/11/2026</span>
                  <span className="text-sm text-gray-500">ou em at 12x no cart�o de cr�dito</span>
                </div>

                <ul className="space-y-4 text-left mb-8">
                  {[
                    "1 Ano de Acesso Completo ao Curso",
                    "Biblioteca e Casos Interativos do Curso",
                    "Desconto VIP de 25% em novos cursos",
                    "Mentoria Flix: Neg�cio de Sucesso (Para os 15 primeiros)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button disabled className="w-full h-14 text-lg font-bold bg-slate-300 text-slate-500 shadow-none rounded-xl cursor-not-allowed">
                  Vendas abrem amanh�
                </Button>
                <p className="text-xs text-gray-500 mt-4 font-medium flex items-center justify-center gap-1">
                  <Gift className="h-3 w-3" /> 7 dias de garantia incondicional
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
            <p className="mt-4 text-lg text-muted-foreground">Tudo o que voc precisa saber antes de entrar.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-lg">O acesso  vital�cio?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Neste formato VIP de lan�amento, o acesso  de 1 Ano Completo. Esse  o tempo ideal e comprovado para voc assistir, revisar as pr�ticas cl�nicas e tirar suas d�vidas na Comunidade.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-lg">Tem garantia?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Sim! Voc tem 7 dias de Garantia Incondicional. Se voc acessar as aulas e achar que a metodologia Vetmasterclass n�o vai transformar a sua rotina, basta um e-mail para reembolsarmos 100% do seu investimento.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-lg">Ainda sou estudante, posso fazer?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Com certeza.  a melhor fase para come�ar. Diferente da faculdade que ensina a teoria, aqui voc vai aprender a "Medicina da Vida Real". Quando se formar, j estar muito à frente dos rec�m-formados inseguros.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-bold text-lg">Os certificados s�o v�lidos?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Sim! Todos os nossos cursos geram certificados v�lidos em todo o territ�rio nacional como capacita��o profissional, ideais para curr�culo e horas complementares na faculdade.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 text-center text-sm text-muted-foreground">
           {new Date().getFullYear()} Vetmasterclass. Revolucionando a Educa��o Veterin�ria.
        </div>
      </footer>
    </div>
  );
}

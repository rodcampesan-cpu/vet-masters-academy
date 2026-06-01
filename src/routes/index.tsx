import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Brain, GraduationCap, Library, MessagesSquare, Play, Sparkles, Stethoscope, Trophy, Users, CheckCircle, Gift, AlertTriangle, Clock, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import heroImg from "@/assets/hero-vet.jpg";
import drRodrigoImg from "@/assets/dr-rodrigo.png";
import { courses, specialties, teachers } from "@/lib/courses-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VetClass Pro — A Revolução na Medicina Veterinária Prática" },
      { name: "description", content: "Aprenda a aplicar a medicina do mundo real, ganhar a confiança absoluta do tutor e faturar mais com procedimentos assertivos." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* HERO SECTION - PERSUASIVE & PREMIUM */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-[#0A0A0A]" /> {/* Dark background for contrast */}
        <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-50" />
        <div className="absolute inset-0 -z-10 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
          <div className="flex flex-col justify-center text-left animate-fade-up">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-1.5 text-sm font-medium text-coral backdrop-blur">
              <AlertTriangle className="h-4 w-4" />
              O fim da insegurança nos plantões
            </div>
            
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              A teoria não salva pacientes.<br/>
              <span className="text-coral">A prática clínica, sim.</span>
            </h1>
            
            <p className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">
              Aprenda a medicina do mundo real. Saiba exatamente o que fazer quando o tutor te olha esperando um milagre e descubra como comunicar seu diagnóstico para ter <strong>100% de adesão ao tratamento</strong>.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-14 bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral px-8 text-lg font-semibold rounded-xl transition-all hover:scale-105">
                <a href="#oferta">
                  Garantir minha vaga agora <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 text-lg rounded-xl backdrop-blur transition-all">
                <a href="#metodo">
                  Entender o método
                </a>
              </Button>
            </div>
            
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-coral/10 border border-coral/30 p-3 backdrop-blur-sm max-w-lg">
              <Gift className="h-5 w-5 text-coral flex-shrink-0 animate-pulse" />
              <p className="text-sm font-medium text-white/90">
                <span className="text-coral font-bold">15 PRIMEIROS:</span> Ganhe o curso "Como montar seu Negócio de Sucesso com Mentoria Flix" <span className="font-bold text-green-400 bg-green-400/10 px-1 rounded">(Valor R$ 799)</span>.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-4 text-sm text-white/60 font-medium">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0A0A0A] object-cover" src="https://i.pravatar.cc/100?img=1" alt=""/>
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0A0A0A] object-cover" src="https://i.pravatar.cc/100?img=2" alt=""/>
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0A0A0A] object-cover" src="https://i.pravatar.cc/100?img=3" alt=""/>
              </div>
              <p>Junte-se a <strong className="text-white">12.450+</strong> veterinários</p>
            </div>
          </div>
          
          <div className="relative animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <img
                src={heroImg}
                alt="Veterinária examinando paciente"
                className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/20 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-coral text-white shadow-lg">
                    <Play className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-base font-bold text-white">Live agora · Ortopedia Clínica</div>
                    <div className="text-sm text-white/80">Dr. Rodrigo Nicola · 234 assistindo</div>
                  </div>
                  <span className="rounded-full bg-coral/20 border border-coral/30 px-3 py-1.5 text-xs font-bold text-coral uppercase tracking-wider animate-pulse">
                    AO VIVO
                  </span>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-coral/30 blur-2xl rounded-full z-0"></div>
            <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-primary/30 blur-2xl rounded-full z-0"></div>
          </div>
        </div>
      </section>

      {/* AGITATION & PROBLEM SECTION */}
      <section id="metodo" className="bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
                A faculdade te ensinou a anatomia. Mas quem te ensina a lidar com o tutor desesperado?
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  "Você tem medo de fechar um diagnóstico complexo na frente do cliente?",
                  "Você prescreve o tratamento, mas o tutor não adere porque não entendeu o valor?",
                  "Você sabe a teoria, mas trava na hora de aplicar o protocolo de emergência?"
                ].map((text, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-coral/20 to-primary/20 rounded-3xl blur-2xl opacity-50"></div>
              <img src={heroImg} alt="Veterinário atendendo" className="relative rounded-2xl shadow-2xl border border-white/10" />
              
              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs">
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

      {/* SOLUTION / DIFFERENTIATORS */}
      <section className="py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            A tríade do Médico Veterinário de Alto Valor
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Não basta ser bom tecnicamente. Você precisa dominar o cenário completo do atendimento.
          </p>

          <div className="mt-16 grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Stethoscope,
                title: "Conduta Clínica Impecável",
                desc: "Aprenda protocolos mastigados e diretos ao ponto, guiados pelas maiores autoridades do país."
              },
              {
                icon: Users,
                title: "Engajamento do Tutor",
                desc: "Técnicas de comunicação e vendas para fazer o tutor entender o valor do seu diagnóstico e aprovar orçamentos maiores."
              },
              {
                icon: Brain,
                title: "Tutor Vet IA (Inteligência Artificial)",
                desc: "Seu assistente de bolso treinado 100% na literatura oficial. Tire dúvidas de dosagem e protocolos no meio do plantão."
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
              <img src={drRodrigoImg} alt="Dr. Rodrigo Nicola" className="relative rounded-3xl shadow-xl w-full max-w-md mx-auto" />
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
                  <p className="text-sm font-bold text-gray-900">Totalmente Gratuito (Valor R$ 799)</p>
                  <p className="text-sm text-gray-500">Exclusivo para os primeiros 15 inscritos no VetClass Pro.</p>
                </div>
              </div>
            </div>
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
                  Além de acesso ilimitado a todos os cursos de especialidades, comunidade e à Inteligência Artificial, os **15 primeiros** a garantirem a vaga hoje vão levar um bônus inacreditável:
                </p>
                
                <div className="mt-8 rounded-2xl bg-gradient-to-r from-coral/10 to-transparent border-l-4 border-coral p-6">
                  <div className="flex items-start gap-4">
                    <Store className="h-8 w-8 text-coral shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Como montar seu Negócio de Sucesso</h3>
                      <p className="text-coral text-sm font-bold mt-1 tracking-wider uppercase">Bônus Exclusivo: Mentoria Flix</p>
                      <div className="mt-2 inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-md border border-white/10">
                        <span className="text-sm text-white/50 line-through">De R$ 799,00</span>
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
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                    Vagas Esgotando
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-2">Plano VetClass Pro</h3>
                <div className="my-6">
                  <span className="text-sm text-gray-500 line-through">De R$ 2.997</span>
                  <div className="flex justify-center items-start mt-2">
                    <span className="text-2xl font-bold text-gray-900 mt-2">12x</span>
                    <span className="text-6xl font-black text-coral mx-2">97</span>
                    <span className="text-xl font-bold text-gray-900 mt-8">,50</span>
                  </div>
                  <span className="text-sm text-gray-500">ou R$ 997 à vista</span>
                </div>

                <ul className="space-y-4 text-left mb-8">
                  {[
                    "Acesso completo à plataforma",
                    "Biblioteca e Casos Interativos",
                    "Acesso ilimitado ao Tutor Vet IA",
                    "Mentoria Flix: Negócio de Sucesso (Para os 15 primeiros)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full h-14 text-lg font-bold bg-coral hover:bg-coral/90 shadow-xl shadow-coral/30 rounded-xl transition-all hover:scale-105">
                  <Link to="/checkout/ortopedia-avancada">
                    Garantir Vaga com Bônus
                  </Link>
                </Button>
                <p className="text-xs text-gray-500 mt-4 font-medium flex items-center justify-center gap-1">
                  <Gift className="h-3 w-3" /> 7 dias de garantia incondicional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} VetClass Pro. Revolucionando a Educação Veterinária.
        </div>
      </footer>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, MessageSquare, Play, Send, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_authenticated/app/lessons/$lessonId")({
  head: () => ({ meta: [{ title: "Sala de Aula — VetClass Pro" }] }),
  component: LessonClassroom,
});

function LessonClassroom() {
  const { lessonId } = Route.useParams();
  const decodedTitle = lessonId.replace(/-/g, " ");
  const capitalizedTitle = decodedTitle.charAt(0).toUpperCase() + decodedTitle.slice(1);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12 animate-fade-in">
      {/* Header Escuro (estilo cinemático) */}
      <header className="bg-slate-900 text-white px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-4">
          <Link to="/app/courses/ortopedia-avancada" className="p-2 hover:bg-white/10 rounded-full transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Módulo 1 • Aula 1</p>
            <h1 className="font-display font-semibold text-lg">{capitalizedTitle}</h1>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
            <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
          </Button>
          <Button size="sm" className="bg-coral text-white hover:bg-coral/90">
            Próxima <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* COLUNA ESQUERDA: Vídeo e Comentários */}
          <div className="lg:col-span-8 space-y-8">
            {/* Player de Vídeo */}
            <div className="overflow-hidden rounded-2xl bg-black shadow-elevated aspect-video relative group">
              <img 
                src="https://images.unsplash.com/photo-1628102491629-77858ab5721d?q=80&w=2000&auto=format&fit=crop" 
                alt="Thumbnail da Aula" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="h-16 w-16 bg-coral text-white rounded-full flex items-center justify-center shadow-coral hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
              {/* Barra de Progresso Falsa */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                <div className="h-full bg-coral w-[45%]" />
              </div>
            </div>

            {/* Comentários / Dúvidas */}
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-coral" />
                Dúvidas e Comentários (12)
              </h2>
              
              <div className="flex gap-4 mb-8">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=a1" />
                  <AvatarFallback>VO</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input placeholder="Escreva sua dúvida sobre a aula..." className="bg-secondary/50 focus-visible:ring-coral" />
                  <Button className="bg-coral text-white hover:bg-coral/90 px-8">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?u=44" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-secondary/40 p-4 rounded-2xl rounded-tl-none">
                      <p className="font-semibold text-sm">Mariana Costa <span className="text-muted-foreground text-xs font-normal ml-2">Há 2 horas</span></p>
                      <p className="text-sm mt-1 text-foreground/80">Professor, no minuto 12:40, qual a angulação ideal que você recomendou para a radiografia no caso de suspeita de displasia grau leve?</p>
                    </div>
                    {/* Resposta do Professor */}
                    <div className="flex gap-3 mt-3 ml-4">
                      <Avatar className="h-8 w-8 border-2 border-coral">
                        <AvatarImage src="/src/assets/dr-rodrigo.png" />
                        <AvatarFallback>RN</AvatarFallback>
                      </Avatar>
                      <div className="bg-coral/10 border border-coral/20 p-3 rounded-2xl rounded-tl-none flex-1">
                        <p className="font-semibold text-sm text-coral flex items-center gap-1">
                          Dr. Rodrigo Nicola <span className="bg-coral text-white text-[10px] px-1.5 rounded-sm ml-1">Mestre</span>
                        </p>
                        <p className="text-sm mt-1 text-foreground/90">Ótima pergunta, Mariana! O ideal é manter a angulação de 15 a 20 graus para abrir bem o espaço articular sem sobrepor as estruturas da pelve.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Post-it e Download */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* O POST-IT DO PROFESSOR */}
            <div className="relative group">
              {/* O efeito de Post-it */}
              <div className="bg-[#fef9c3] rounded-sm p-6 shadow-xl border border-yellow-200/50 transform rotate-2 hover:rotate-1 transition-transform duration-300 relative overflow-hidden">
                {/* Durex / Fita adesiva no topo (Detalhe estético) */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm border border-white/20 transform -rotate-3 rounded-sm shadow-sm z-10" />
                
                {/* Linhas de caderno no fundo do post-it */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(transparent_95%,#000_100%)] bg-[length:100%_24px]" />
                
                <h3 className="font-display font-bold text-yellow-800 text-xl mb-4 relative z-10">
                  📌 Anotações do Mestre
                </h3>
                
                <div className="space-y-3 text-yellow-900/80 font-medium text-sm leading-relaxed relative z-10">
                  <p>• A biomecânica não perdoa erros de eixo. <strong>Sempre avalie o paciente caminhando</strong> antes de focar apenas no RX.</p>
                  <p>• Lesões de ligamento cruzado em cães pequenos costumam ter um componente degenerativo oculto.</p>
                  <p>• <strong>Dica de Ouro:</strong> Na anamnese, pergunte se o cão "reluta em subir no sofá". Esse é o sinal inicial clássico!</p>
                </div>

                <div className="mt-8 pt-4 border-t border-yellow-300/30 flex items-center gap-3 relative z-10">
                  <Avatar className="h-8 w-8 ring-2 ring-yellow-400/50">
                    <AvatarImage src="/src/assets/dr-rodrigo.png" />
                    <AvatarFallback>RN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-bold text-yellow-800">Dr. Rodrigo Nicola</p>
                    <p className="text-[10px] text-yellow-700/80 uppercase tracking-widest">Ortopedia Vet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÃO DE MATERIAL */}
            <div className="bg-card rounded-2xl p-5 shadow-card border border-border mt-8 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-secondary p-3 rounded-xl">
                  <FileText className="h-6 w-6 text-coral" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Material de Apoio</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Slides da aula em alta resolução (PDF)</p>
                </div>
              </div>
              <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg">
                <Download className="h-4 w-4 mr-2" /> Baixar Slides (3.4 MB)
              </Button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

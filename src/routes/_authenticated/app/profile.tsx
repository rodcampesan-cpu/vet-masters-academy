import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, CreditCard, Download, ShieldCheck, User, CheckCircle2, AlertCircle, Stethoscope, Lock } from "lucide-react";
import { courses } from "@/lib/courses-data";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/app/profile")({
  head: () => ({ meta: [{ title: "Meu Perfil — VetClass Pro" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const email = user?.email || "";
  const name = user?.user_metadata?.full_name || "Usuário VetClass";

  // Simulate progress data
  const myCourses = [
    { ...courses[0], progress: 100 }, // Ortopedia (Complete)
    { ...courses[1], progress: 45 },  // Neurologia (In progress)
  ];

  const handleEmitCertificate = (course: any) => {
    setSelectedCourse(course);
    setCertModalOpen(true);
  };

  return (
    <div className="container max-w-5xl px-4 py-8 mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Área do Aluno</h1>
        <p className="text-muted-foreground mt-1">Gerencie seus dados, assinaturas e certificados.</p>
      </div>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="mb-8 w-full justify-start h-auto bg-transparent border-b border-border rounded-none p-0 space-x-6 overflow-x-auto hide-scrollbar">
          <TabsTrigger value="perfil" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-coral rounded-none pb-3 px-1">
            <User className="h-4 w-4 mr-2" />
            Dados Pessoais
          </TabsTrigger>
          <TabsTrigger value="assinatura" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-coral rounded-none pb-3 px-1">
            <CreditCard className="h-4 w-4 mr-2" />
            Assinatura
          </TabsTrigger>
          <TabsTrigger value="certificados" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-coral rounded-none pb-3 px-1">
            <Award className="h-4 w-4 mr-2" />
            Certificados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-coral" />
              Informações Pessoais
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-inner">
                  {name.charAt(0).toUpperCase()}
                </div>
                <Button variant="outline" size="sm">Alterar Foto</Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue={name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crmv">CRMV / UF</Label>
                  <Input id="crmv" placeholder="Ex: 12345/SP" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail (Login)</Label>
                <Input id="email" defaultValue={email} disabled className="bg-muted text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Para alterar o e-mail cadastrado, contate o nosso suporte.</p>
              </div>

              <Button className="bg-primary text-white">Salvar Alterações</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assinatura">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                Plano Atual
              </h2>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-200/50 px-2 py-0.5 rounded-full">Ativo</span>
                    <h3 className="text-lg font-bold text-green-900 mt-2">VetClass Pro Anual</h3>
                  </div>
                  <span className="text-2xl font-black text-green-700">R$ 997</span>
                </div>
                <p className="text-sm text-green-800 font-medium">Próxima renovação em 12/08/2027</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm py-2 border-b border-border">
                  <span className="text-muted-foreground">Forma de pagamento</span>
                  <span className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-slate-400" />
                    **** 4321
                  </span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-border">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Em dia
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 border-slate-300"
                  onClick={() => toast.success("Redirecionando para o portal seguro da Stripe...")}
                >
                  Alterar Cartão
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 font-semibold"
                  onClick={() => toast("Solicitação de cancelamento enviada. Nossa equipe entrará em contato.", { icon: "😢" })}
                >
                  Cancelar Plano
                </Button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Histórico de Faturas</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl bg-background/50">
                    <div>
                      <p className="font-medium">12/08/202{7-i}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Anuidade VetClass Pro</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-sm">R$ 997,00</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-primary hover:bg-primary/10"
                        onClick={() => toast.success("Download da fatura em PDF iniciado!")}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="certificados">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm max-w-4xl">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Award className="h-6 w-6 text-coral" />
              Seus Certificados Oficiais
            </h2>
            <p className="text-sm text-muted-foreground mb-8">Complete 100% de um curso para desbloquear a emissão do certificado válido.</p>

            <div className="grid gap-6">
              {myCourses.map(course => (
                <div key={course.id} className="flex flex-col sm:flex-row items-center gap-6 p-5 border border-border rounded-2xl bg-background/50 hover:bg-background transition-colors">
                  <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                    <img src={course.cover} alt={course.title} className="w-full h-full object-cover" />
                    {course.progress === 100 && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <div className="bg-white rounded-full p-2 shadow-lg">
                          <Award className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 w-full">
                    <h3 className="font-display font-bold text-lg leading-tight mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-5">Mestre: {course.teacher.name}</p>
                    
                    {course.progress === 100 ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1.5 rounded-lg w-fit">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-sm font-bold">100% Concluído</span>
                        </div>
                        <Button onClick={() => handleEmitCertificate(course)} className="bg-green-600 hover:bg-green-700 text-white shadow-sm font-bold transition-all hover:scale-105">
                          Emitir Certificado PDF
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm opacity-80">
                        <div className="flex justify-between items-center text-xs font-bold mb-2">
                          <span className="flex items-center gap-1 text-slate-500 uppercase tracking-wider bg-slate-200 px-2 py-1 rounded-md">
                            <Lock className="h-3 w-3" /> Certificado Bloqueado
                          </span>
                          <span className="text-slate-700">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mb-3">
                          <div className="bg-coral h-full rounded-full transition-all duration-1000 relative" style={{ width: `${course.progress}%` }}>
                            <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 text-coral" /> É necessário completar 100% das aulas e materiais para desbloquear.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* MODAL DE CERTIFICADO (LANDSCAPE) INSPIRADO NA REFERÊNCIA */}
      <Dialog open={certModalOpen} onOpenChange={setCertModalOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-[#E8E8E8] border-none rounded-sm shadow-2xl">
          <DialogTitle className="sr-only">Certificado Oficial</DialogTitle>
          <DialogDescription className="sr-only">Certificado de conclusão de curso VetClass Pro</DialogDescription>
          
          {/* Fundo do Certificado (branco off-white) num container menor para simular o papel */}
          <div className="m-4 md:m-8 relative w-auto aspect-[1.414/1] md:aspect-[1.414/0.95] bg-white flex flex-col items-center justify-center p-8 md:p-16 text-center overflow-hidden shadow-2xl">
            
            {/* Wavy background lines (usando repeating radial gradient para simular ondas) */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-radial-gradient(circle at 0 0, transparent 0, #000 1px, transparent 15px)" }}></div>
            
            {/* Marca D'água Simétrica Gigante VetClass */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <Stethoscope className="w-[450px] h-[450px] text-[#C8A951] opacity-[0.05]" />
            </div>

            {/* Bordas Douradas */}
            <div className="absolute top-0 left-0 right-0 bottom-0 border-[16px] border-[#C8A951] z-0 pointer-events-none"></div>
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-[#C8A951] z-0 pointer-events-none opacity-50"></div>
            
            {/* Base Geométrica Azul Marinho (Inspiração da imagem) */}
            <div className="absolute bottom-0 left-0 w-full h-48 z-0 overflow-hidden pointer-events-none">
              <div className="absolute bottom-[-120px] left-[-5%] w-[60%] h-[250px] bg-[#0A2540] rotate-[15deg] shadow-[0_0_30px_rgba(0,0,0,0.5)] border-t-[6px] border-[#C8A951]"></div>
              <div className="absolute bottom-[-120px] right-[-5%] w-[60%] h-[250px] bg-[#0A2540] rotate-[-15deg] shadow-[0_0_30px_rgba(0,0,0,0.5)] border-t-[6px] border-[#C8A951]"></div>
            </div>

            {/* Cabeçalho */}
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-slate-800 mb-1 relative z-10 tracking-[0.05em] uppercase">CERTIFICADO</h2>
            <h3 className="font-sans text-xs md:text-sm text-slate-500 uppercase tracking-[0.3em] mb-1 relative z-10">De Conclusão</h3>
            
            <div className="w-64 h-[1px] bg-slate-300 mb-8 relative z-10 mx-auto"></div>
            
            <p className="text-slate-500 mb-4 font-sans text-xs uppercase tracking-widest relative z-10 font-medium">ESTE CERTIFICADO É CONCEDIDO A</p>
            
            {/* Nome do Aluno em Fonte Cursiva Elegante */}
            <p style={{ fontFamily: '"Great Vibes", "Brush Script MT", cursive' }} className="text-5xl md:text-7xl text-slate-800 mb-6 relative z-10 font-medium">
              {name}
            </p>
            
            <p className="text-slate-500 mb-8 max-w-2xl font-serif text-xs md:text-sm leading-relaxed relative z-10 px-8">
              Pela conclusão com excelência do curso livre de especialização profissional em <strong className="text-slate-800">{selectedCourse?.title}</strong>, garantindo alto nível de proficiência e domínio das técnicas ensinadas. Carga horária total certificada de <strong className="text-slate-800">{selectedCourse?.hours} horas</strong> de estudos avançados.
            </p>
            
            {/* Rodapé com Assinaturas e Selo Central */}
            <div className="flex justify-between items-center w-full max-w-3xl mt-auto relative z-10 px-4 md:px-12">
              
              {/* Assinatura Esquerda */}
              <div className="text-center w-40">
                <div className="h-[1px] w-full bg-slate-400 mb-2"></div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-sans">Data ({new Date().toLocaleDateString('pt-BR')})</p>
              </div>
              
              {/* Selo Central (Arabesco/Louro) */}
              <div className="relative flex items-center justify-center -mt-6">
                {/* Wreath SVG */}
                <svg className="absolute w-36 h-36 text-[#C8A951] opacity-90 drop-shadow-md" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M12.9 173.8c-7.9 33.6 2.1 69 25 93.4-14.8-25.1-15-56.9-1.9-82.6 12-23.7 34.9-39.7 61-45.3-25.8 4.7-48.4 20.7-59.5 44-12.8 26.8-9 58.7 8.3 82.2-22.3-25-30.8-60.7-21.7-94.6 7-26.1 23.5-48.8 46.1-64.2-21.3 16.5-35.8 40.2-40.4 67.2-5.3 31.4 3.7 63 23.3 86.8-22.6-22-33-55-27-86.4 4.8-24.8 19-46.6 39.4-61.2-19.4 15.6-32.1 38.6-35.1 64.5-3.5 29.8 7.3 59 28.5 79.9-22.1-19.5-33.1-49.3-28.7-78.7 3.5-23.5 15.5-44.5 33.3-58.7-17 15-28.4 36.4-31 60-2 27.5 9.9 54.1 30.7 72.8-20.7-17.1-31.5-43.6-28.1-69.8 2.6-21.3 12.8-40.4 28.5-53.5-14.5 14-24.6 33.6-26.6 55.4-.8 24.3 11.2 47.7 30.7 63.6-18.4-14.7-28.3-37.4-25.6-60.1 2.1-18.1 10.7-34.4 24.1-45.8-11.8 12.4-20.3 29.3-22 47.8-.1 20.1 10.8 39.1 28.2 51.9-15.3-12-23.8-30.4-21.8-49 1.6-14.6 8.5-27.8 19.4-37.2-9 10.5-15.6 24.4-17.1 39.3-.1 15.3 8.8 29.6 23.1 38.8-12.1-9.3-18.7-23.4-17.3-37.8 1.1-11 6.3-20.9 14.3-28.1-6.2 8.3-10.9 19-11.8 30.2 0 11.2 5.9 21.6 15.6 28.3C60 274.5 54 262.3 55 250.2c.7-7.8 3.9-15 8.9-20.4-3.5 6.2-6.1 13.9-6.5 21.9-.3 8.3 3.6 16.1 10 21.1-6.6-4.6-10.4-12.3-9.9-20.5.4-5.3 2.5-10.2 5.9-14C60 243.6 57.5 249.6 57 256c-.5 6.4 2.1 12.5 6.6 16.6-4.8-3.4-7.6-9.1-7.1-15.2.3-4.2 1.9-8.1 4.5-11.1-2.4 4.5-4.1 9.9-3.7 15.4.3 4.9 2.1 9.5 5.5 12.9v-.1h.1z"/>
                  <path d="M499.1 173.8c7.9 33.6-2.1 69-25 93.4 14.8-25.1 15-56.9 1.9-82.6-12-23.7-34.9-39.7-61-45.3 25.8 4.7 48.4 20.7 59.5 44 12.8 26.8 9 58.7-8.3 82.2 22.3-25 30.8-60.7 21.7-94.6-7-26.1-23.5-48.8-46.1-64.2 21.3 16.5 35.8 40.2 40.4 67.2 5.3 31.4-3.7 63-23.3 86.8 22.6-22 33-55 27-86.4-4.8-24.8-19-46.6-39.4-61.2 19.4 15.6 32.1 38.6 35.1 64.5 3.5 29.8-7.3 59-28.5 79.9 22.1-19.5 33.1-49.3 28.7-78.7-3.5-23.5-15.5-44.5-33.3-58.7 17 15 28.4 36.4 31 60 2 27.5-9.9 54.1-30.7 72.8 20.7-17.1 31.5-43.6 28.1-69.8-2.6-21.3-12.8-40.4-28.5-53.5 14.5 14 24.6 33.6 26.6 55.4.8 24.3-11.2 47.7-30.7 63.6 18.4-14.7 28.3-37.4 25.6-60.1-2.1-18.1-10.7-34.4-24.1-45.8 11.8 12.4 20.3 29.3 22 47.8.1 20.1-10.8 39.1-28.2 51.9 15.3-12 23.8-30.4 21.8-49-1.6-14.6-8.5-27.8-19.4-37.2 9 10.5 15.6 24.4 17.1 39.3.1 15.3-8.8 29.6-23.1 38.8 12.1-9.3 18.7-23.4 17.3-37.8-1.1-11-6.3-20.9-14.3-28.1 6.2 8.3 10.9 19 11.8 30.2 0 11.2-5.9 21.6-15.6 28.3C452 274.5 458 262.3 457 250.2c-.7-7.8-3.9-15-8.9-20.4 3.5 6.2 6.1 13.9 6.5 21.9.3 8.3-3.6 16.1-10 21.1 6.6-4.6 10.4-12.3 9.9-20.5-.4-5.3-2.5-10.2-5.9-14 3.4 5.3 5.9 11.3 6.4 17.7.5 6.4-2.1 12.5-6.6 16.6 4.8-3.4 7.6-9.1 7.1-15.2-.3-4.2-1.9-8.1-4.5-11.1 2.4 4.5 4.1 9.9 3.7 15.4-.3 4.9-2.1 9.5-5.5 12.9v-.1h-.1z"/>
                </svg>
                
                {/* Botão de Medalha Realista */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F5D76E] via-[#C8A951] to-[#997A24] flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-[#FFF8DC] z-10">
                  <div className="w-12 h-12 rounded-full bg-[#0A2540] flex flex-col items-center justify-center border border-[#EAC765] shadow-inner">
                    <span className="text-[6px] text-[#EAC765] uppercase tracking-widest font-sans">Selo</span>
                    <span className="text-[9px] font-serif font-bold text-white tracking-widest">OFICIAL</span>
                  </div>
                </div>
              </div>

              {/* Assinatura Direita */}
              <div className="text-center w-40 relative">
                <p style={{ fontFamily: '"Great Vibes", "Brush Script MT", cursive' }} className="text-3xl text-slate-800 mb-1 absolute bottom-4 left-1/2 -translate-x-1/2 opacity-90 whitespace-nowrap">
                  {selectedCourse?.teacher.name}
                </p>
                <div className="h-[1px] w-full bg-slate-400 mb-2"></div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-sans">Assinatura</p>
              </div>
            </div>
          </div>
          
          {/* Botões do Modal */}
          <div className="bg-slate-50 p-5 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-4 relative z-20">
            <Button variant="outline" onClick={() => setCertModalOpen(false)} className="font-bold">Fechar</Button>
            <Button className="bg-primary text-white font-bold hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" /> Baixar PDF HD
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

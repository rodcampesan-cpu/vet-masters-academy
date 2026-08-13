import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { Activity, Search, AlertCircle, CheckCircle2, ChevronRight, Stethoscope, Dna, FileText, Send, Image as ImageIcon, BookOpen, Instagram, Share2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FULL_CASES, MOCK_CASES } from "@/lib/cases-data";
import { courses } from "@/lib/courses-data";
import { useAuth } from "@/lib/auth-context";

class LocalErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-900 border border-red-200 rounded-xl my-8">
          <h2 className="font-bold text-xl mb-4">Erro Crítico no Componente!</h2>
          <pre className="text-sm overflow-auto whitespace-pre-wrap">{this.state.error?.toString()}</pre>
          <pre className="text-xs mt-4 text-red-700/50">{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export const Route = createFileRoute("/_authenticated/app/clinical-cases")({
  head: () => ({ meta: [{ title: "Casos Clínicos — VetClass Pro" }] }),
  component: () => <LocalErrorBoundary><ClinicalCasesPage /></LocalErrorBoundary>,
});

function ClinicalCasesPage() {
  const { user } = useAuth();
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [availableCases, setAvailableCases] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchCases = async () => {
      let supabaseCases: any[] = [];
      try {
        const { data, error } = await supabase
          .from('clinical_cases')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!error && data) {
          supabaseCases = data.map((dbCase: any) => ({
            id: dbCase.id,
            title: dbCase.title,
            specialty: dbCase.specialty,
            difficulty: dbCase.difficulty,
            patient: dbCase.patient,
            description: dbCase.description,
            anamnesisText: dbCase.anamnesis_text,
            chatHistory: dbCase.chat_history,
            aiHint: dbCase.ai_hint,
            examList: dbCase.exam_list,
            images: dbCase.images,
            examConclusion: dbCase.exam_conclusion,
            options: dbCase.options,
            correctAnswer: dbCase.correct_answer,
            feedbackCorrect: dbCase.feedback_correct,
            feedbackIncorrect: dbCase.feedback_incorrect,
            playbookProtocol: dbCase.playbook_protocol,
            authorEmail: dbCase.author_email,
            createdAt: dbCase.created_at
          }));
        }
      } catch (e) {
        console.error("Error fetching from supabase:", e);
      }
      
      const localIds = new Set(supabaseCases.map((c: any) => c.id));
      const currentEmail = user?.email || "";
      
      // Carregar os casos locais (antes da integração com Supabase)
      const savedCasesRaw = JSON.parse(localStorage.getItem("custom_clinical_cases") || "[]");
      const savedCases = savedCasesRaw.filter((c: any) => !localIds.has(c.id));
      savedCases.forEach((c: any) => localIds.add(c.id));
      
      // Mostrar todos os casos do supabase + local + mocks (se admin)
      const mergedMocks = MOCK_CASES.filter((mc: any) => !localIds.has(mc.id));
      setAvailableCases([...supabaseCases, ...savedCases, ...mergedMocks]);
    };
    
    fetchCases();
  }, [user?.email]);

  const isAdmin = user?.user_metadata?.role === "admin" || user?.email?.toLowerCase().trim() === "mimoshow10@gmail.com";
  const currentEmail = user?.email?.toLowerCase() || "";
  const isTeacher = user?.user_metadata?.role === "teacher" || currentEmail.includes("rodrigovetlat") || currentEmail.includes("namdias02") || currentEmail.includes("carolina_vet") || currentEmail.replace(/\./g, '').includes("nathyarmarinhos");

  const visibleCases = isAdmin 
    ? availableCases 
    : availableCases.filter(c => {
        // Se for professor, mostra SÓ os casos que ele criou ou os Mocks se for Rodrigo
        if (isTeacher) {
          const isRodrigo = currentEmail.includes("rodrigo") || currentEmail.includes("mimoshow");
          const isMyCustomCase = c.authorEmail === currentEmail || (!c.authorEmail && isRodrigo);
          const isMyMock = isRodrigo && MOCK_CASES.some(mc => mc.id === c.id);
          return isMyCustomCase || isMyMock;
        }

        // Para alunos normais (Temporário: liberando acesso a todos os casos antes das vendas iniciarem)
        return true;
      });

  if (selectedCase !== null) {
    const activeData = visibleCases.find((c: any) => c.id === selectedCase);
    return <ActiveCaseView caseData={activeData || visibleCases[0]} onBack={() => setSelectedCase(null)} isTeacher={isTeacher} />;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-coral text-coral-foreground">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Casos Clínicos Interativos</h1>
            <p className="text-sm text-muted-foreground">Teste seu conhecimento com casos reais gamificados.</p>
          </div>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar por especialidade..." 
            className="h-10 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm focus:border-coral focus:outline-none"
          />
        </div>
      </div>

      {visibleCases.length === 0 && (
        <div className="text-center py-20 px-4 bg-card rounded-2xl border border-border mt-8">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Nenhum caso disponível</h2>
          <p className="text-muted-foreground">Você precisa adquirir cursos para acessar os casos clínicos ou criar os seus próprios.</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCases.map(c => (
          <Card key={c.id} className="flex flex-col hover:border-coral/50 transition-colors cursor-pointer relative" onClick={() => setSelectedCase(c.id)}>
            {c.id > 1000 && <Badge className="absolute -top-3 -right-3 bg-primary text-primary-foreground">Novo</Badge>}
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-coral/10 text-coral border-coral/20">{c.specialty}</Badge>
                <Badge variant="secondary" className="text-xs">{c.difficulty}</Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{c.title}</CardTitle>
              <CardDescription className="text-xs font-semibold text-primary/80 pt-1">{c.patient}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3">{c.description}</p>
            </CardContent>
            <CardFooter className="pt-3 border-t border-border mt-auto">
              <Button variant="ghost" className="w-full text-coral hover:text-coral hover:bg-coral/10 justify-between">
                Investigar Caso <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Sub-componente para a visualização do caso interativo
function ActiveCaseView({ caseData, onBack, isTeacher = false }: { caseData: any, onBack: () => void, isTeacher?: boolean }) {
  const [activeTab, setActiveTab] = useState("anamnese");
  const [diagnostic, setDiagnostic] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showPlaybookModal, setShowPlaybookModal] = useState(false);

  const isCorrect = diagnostic === caseData.correctAnswer;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
        <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Voltar aos casos
      </Button>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="bg-secondary/50 p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge className="bg-coral text-white mb-2 hover:bg-coral">{caseData.specialty}</Badge>
            <h2 className="font-display text-2xl font-bold">{caseData.title}</h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">Paciente: {caseData.patient}</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold bg-background px-4 py-2 rounded-full border border-border">
            <Activity className="h-4 w-4 text-coral" /> Caso {caseData.difficulty}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4 border-b border-border bg-card">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary">
              <TabsTrigger value="anamnese" className="data-[state=active]:bg-background data-[state=active]:text-foreground"><FileText className="h-4 w-4 mr-2 hidden sm:block"/>Histórico</TabsTrigger>
              <TabsTrigger value="exames" className="data-[state=active]:bg-background data-[state=active]:text-foreground"><Stethoscope className="h-4 w-4 mr-2 hidden sm:block"/>Exames</TabsTrigger>
              <TabsTrigger value="diagnostico" className="data-[state=active]:bg-background data-[state=active]:text-coral"><Dna className="h-4 w-4 mr-2 hidden sm:block"/>Diagnóstico</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="anamnese" className="space-y-6 mt-0">
              {/* Folha de Caderno Simulado */}
              <div className="relative bg-[#fdfdfd] p-6 sm:p-8 pl-12 sm:pl-16 rounded-lg shadow-sm border border-border overflow-hidden mt-2">
                <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-[2px] bg-red-400/30"></div>
                <div 
                  className="relative z-10 leading-[2rem] text-slate-700 font-medium sm:text-lg whitespace-pre-wrap" 
                  style={{ backgroundImage: 'linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)', backgroundSize: '100% 32px' }}
                >
                  <span className="font-bold text-slate-900 block mb-1 font-display text-xl bg-[#fdfdfd] inline-block pr-4">Anamnese e Queixa Principal</span><br />
                  {caseData.anamnesisText}
                </div>
              </div>

              {/* Chat Interativo de Anamnese */}
              <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div className="bg-secondary/50 px-4 py-3 border-b border-border">
                  <h4 className="font-semibold text-sm flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-coral" />
                    Explorar o Caso (Conversa com o Tutor)
                  </h4>
                </div>
                
                <div className="p-4 flex-1 space-y-4 max-h-64 overflow-y-auto bg-muted/10 flex flex-col">
                  {(caseData.chatHistory || []).map((msg: any, i: number) => (
                    <div key={i} className={`flex gap-3 max-w-[85%] ${!msg.isVet ? 'self-end ml-auto flex-row-reverse' : ''}`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isVet ? 'bg-primary/10' : 'bg-coral/10'}`}>
                        {msg.isVet ? <Stethoscope className="h-4 w-4 text-primary" /> : <span className="text-xs font-bold text-coral">T</span>}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.isVet ? 'bg-background border border-border rounded-tl-sm' : 'bg-coral text-white rounded-tr-sm'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-background border-t border-border flex items-center gap-2">
                  <input type="text" placeholder="Faça uma pergunta para investigar..." className="flex-1 h-10 bg-secondary/50 border border-transparent rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral/50 transition-all" />
                  <Button size="icon" className="h-10 w-10 rounded-full bg-coral hover:bg-coral/90 text-white flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-xl p-4 border border-border mt-2">
                <h4 className="font-medium text-sm text-foreground flex items-center mb-2"><AlertCircle className="h-4 w-4 text-coral mr-2" /> Dica do Tutor Vet IA</h4>
                <p className="text-sm text-muted-foreground">{caseData.aiHint}</p>
              </div>
              <Button onClick={() => setActiveTab("exames")} className="w-full sm:w-auto mt-4 bg-coral text-coral-foreground hover:bg-coral/90">
                Avançar para Exame Físico <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="exames" className="space-y-6 mt-0">
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">Exame Físico Geral e Específico</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  {(caseData.examList || []).map((item: string, i: number) => {
                    const [bold, rest] = item.split(': ');
                    return <li key={i}><strong>{bold}:</strong> {rest}</li>;
                  })}
                </ul>
              </div>
              
              <div>
                <h3 className="font-display text-lg font-semibold mb-3">Exames Complementares</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(caseData.images || []).map((img: string, i: number) => (
                    <div key={i} className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-dashed border-border text-muted-foreground">
                      <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                      <span className="text-xs block text-center">{img}<br/>(Simulação)</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 italic font-medium">{caseData.examConclusion}</p>
              </div>
              
              <Button onClick={() => setActiveTab("diagnostico")} className="bg-coral text-coral-foreground hover:bg-coral/90">Ir para Diagnóstico <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </TabsContent>

            <TabsContent value="diagnostico" className="space-y-6 mt-0">
              <h3 className="font-display text-lg font-semibold">Qual o seu diagnóstico?</h3>
              <p className="text-muted-foreground text-sm mb-4">Com base no histórico e nos exames realizados, escolha a hipótese mais provável.</p>
              
              {!showResult ? (
                <div className="space-y-3">
                  {(caseData.options || []).map((op: string) => (
                    <div 
                      key={op} 
                      onClick={() => setDiagnostic(op)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${diagnostic === op ? 'border-coral bg-coral/5 text-coral font-medium' : 'border-border bg-card hover:border-coral/40'}`}
                    >
                      {op}
                    </div>
                  ))}
                  <Button 
                    type="button"
                    disabled={!diagnostic} 
                    onClick={() => setShowResult(true)}
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Confirmar Diagnóstico
                  </Button>
                </div>
              ) : (
                <div className={`p-6 rounded-2xl border ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="flex items-start gap-4">
                    {isCorrect ? <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0" /> : <AlertCircle className="h-8 w-8 text-red-500 flex-shrink-0" />}
                    <div>
                      <h4 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        {isCorrect ? 'Diagnóstico Correto!' : 'Diagnóstico Incorreto.'}
                      </h4>
                      <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-line">
                        {isCorrect 
                          ? (typeof caseData.feedbackCorrect === 'string' ? caseData.feedbackCorrect : JSON.stringify(caseData.feedbackCorrect))
                          : (typeof caseData.feedbackIncorrect === 'string' ? caseData.feedbackIncorrect : JSON.stringify(caseData.feedbackIncorrect))
                        }
                      </p>
                      
                      {isCorrect && (
                        <div className="mt-6 pt-6 border-t border-green-500/20">
                          {!isTeacher && (
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                              <h5 className="font-bold text-green-500 text-sm flex items-center gap-2">
                                <Trophy className="h-4 w-4" /> +50 Pontos ganhos!
                              </h5>
                              
                              {/* BOTAO INSTAGRAM GAMIFICACAO */}
                              <Button 
                                variant="outline"
                                className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white border-0 hover:opacity-90 shadow-lg shadow-pink-500/20"
                                onClick={() => {
                                  alert("Na prática, isso geraria uma imagem lindíssima com a pontuação do aluno para ele postar nos Stories marcando a VetClass Pro!");
                                }}
                              >
                                <Instagram className="mr-2 h-4 w-4" />
                                Compartilhar Vitória
                              </Button>
                            </div>
                          )}
                          
                          {!showPlaybookModal ? (
                            <Button 
                              onClick={() => setShowPlaybookModal(true)}
                              className="bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto"
                            >
                              Ver Protocolo de Tratamento (Playbook)
                            </Button>
                          ) : (
                            <div className="mt-4 p-5 bg-background rounded-xl border border-border shadow-sm animate-in fade-in slide-in-from-top-2">
                              <h5 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-coral" />
                                Protocolo de Tratamento
                              </h5>
                              <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line space-y-2">
                                {typeof caseData.playbookProtocol === 'string' 
                                  ? caseData.playbookProtocol 
                                  : (caseData.playbookProtocol ? JSON.stringify(caseData.playbookProtocol) : "Protocolo oficial em elaboração pela equipe VetClass Pro. Para este caso, o tratamento foca na estabilização inicial e acompanhamento.")}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {!isCorrect && (
                        <Button variant="outline" className="mt-4 border-red-500/50 text-red-500 hover:bg-red-500/10" onClick={() => setShowResult(false)}>
                          Tentar Novamente
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

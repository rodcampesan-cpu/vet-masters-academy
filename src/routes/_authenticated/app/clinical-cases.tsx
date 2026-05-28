import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, Search, AlertCircle, CheckCircle2, ChevronRight, Stethoscope, Dna, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MOCK_CASES = [
  {
    id: 1,
    title: "Cão com claudicação severa em membro pélvico esquerdo",
    specialty: "Ortopedia",
    difficulty: "Avançado",
    patient: "Bidu, Golden Retriever, 4 anos",
    description: "Tutor relata que o animal começou a mancar subitamente após correr no parque. Apresenta dor à manipulação do joelho.",
  },
  {
    id: 2,
    title: "Felino com alopecia bilateral simétrica",
    specialty: "Dermatologia",
    difficulty: "Intermediário",
    patient: "Mingau, SRD, 8 anos",
    description: "Gato apresentando perda de pelo progressiva no tronco, sem prurido aparente. Comportamento e apetite normais.",
  },
  {
    id: 3,
    title: "Síncope recorrente em paciente cardiopata",
    specialty: "Cardiologia",
    difficulty: "Avançado",
    patient: "Thor, Boxer, 9 anos",
    description: "Paciente com histórico de sopro sistólico grau IV/VI apresenta desmaios rápidos durante passeios curtos.",
  }
];

export const Route = createFileRoute("/_authenticated/app/clinical-cases")({
  head: () => ({ meta: [{ title: "Casos Clínicos — VetClass Pro" }] }),
  component: ClinicalCasesPage,
});

function ClinicalCasesPage() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [step, setStep] = useState(0); // 0: Lista, 1: Anamnese, 2: Exames, 3: Diagnóstico

  if (selectedCase !== null) {
    return <ActiveCaseView caseId={selectedCase} onBack={() => setSelectedCase(null)} />;
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_CASES.map(c => (
          <Card key={c.id} className="flex flex-col hover:border-coral/50 transition-colors cursor-pointer" onClick={() => setSelectedCase(c.id)}>
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
function ActiveCaseView({ caseId, onBack }: { caseId: number, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("anamnese");
  const [diagnostic, setDiagnostic] = useState("");
  const [showResult, setShowResult] = useState(false);

  const isCorrect = diagnostic === "Ruptura de Ligamento Cruzado Cranial";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
        <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Voltar aos casos
      </Button>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
        <div className="bg-secondary/50 p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Badge className="bg-coral text-white mb-2 hover:bg-coral">Ortopedia</Badge>
            <h2 className="font-display text-2xl font-bold">Cão com claudicação severa no joelho</h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">Paciente: Bidu, Golden Retriever, 4 anos, Macho inteiro</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold bg-background px-4 py-2 rounded-full border border-border">
            <Activity className="h-4 w-4 text-coral" /> Caso Avançado
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
            <TabsContent value="anamnese" className="space-y-4 mt-0">
              <h3 className="font-display text-lg font-semibold">Anamnese e Queixa Principal</h3>
              <p className="text-muted-foreground leading-relaxed">
                O tutor relata que Bidu estava correndo atrás de uma bola no parque quando subitamente soltou um ganido, recolheu a perna traseira esquerda e não apoiou mais o peso no chão. 
                Nas últimas 48h houve uma leve melhora, ele passou a "tocar" a ponta dos dedos no chão ao caminhar, mas ao parar, mantém o membro levantado. 
                Sem histórico prévio de problemas articulares. Vacinas e vermífugos em dia.
              </p>
              <div className="bg-secondary/30 rounded-xl p-4 border border-border mt-6">
                <h4 className="font-medium text-sm text-foreground flex items-center mb-2"><AlertCircle className="h-4 w-4 text-coral mr-2" /> Dica do Tutor Vet IA</h4>
                <p className="text-sm text-muted-foreground">Animais jovens de raça grande com claudicação aguda sem trauma externo evidente frequentemente apresentam problemas de ordem ligamentar. Considere testes específicos de estabilidade no exame físico.</p>
              </div>
              <Button onClick={() => setActiveTab("exames")} className="mt-4 bg-coral text-coral-foreground hover:bg-coral/90">Avançar para Exame Físico <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </TabsContent>

            <TabsContent value="exames" className="space-y-6 mt-0">
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">Exame Físico Geral e Específico</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                  <li><strong>Escore Corporal:</strong> 6/9 (Leve sobrepeso).</li>
                  <li><strong>Sinais Vitais:</strong> FC 110bpm, FR 30mpm, TR 38.5°C, Mucosas normocoradas.</li>
                  <li><strong>Avaliação Ortopédica:</strong> Claudicação grau 3/4 em membro pélvico esquerdo.</li>
                  <li><strong>Palpação:</strong> Efusão articular evidente no joelho esquerdo e espessamento medial da cápsula.</li>
                  <li><strong>Testes Específicos:</strong> Teste de compressão tibial (Gaveta) POSITIVO. Teste de Ortolani negativo bilateralmente.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-display text-lg font-semibold mb-3">Imagens Radiográficas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-dashed border-border text-muted-foreground">
                    <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                    <span className="text-xs block text-center">Raio-X (Mediolateral)<br/>(Simulação)</span>
                  </div>
                  <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center border border-dashed border-border text-muted-foreground">
                    <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                    <span className="text-xs block text-center">Raio-X (Craniocaudal)<br/>(Simulação)</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">Laudo: Deslocamento cranial da crista da tíbia em relação aos côndilos femorais. Aumento de radiopacidade em região infrapatelar (sinal da almofada de gordura).</p>
              </div>
              
              <Button onClick={() => setActiveTab("diagnostico")} className="bg-coral text-coral-foreground hover:bg-coral/90">Ir para Diagnóstico <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </TabsContent>

            <TabsContent value="diagnostico" className="space-y-6 mt-0">
              <h3 className="font-display text-lg font-semibold">Qual o seu diagnóstico?</h3>
              <p className="text-muted-foreground text-sm mb-4">Com base no histórico e nos exames realizados, escolha a hipótese mais provável.</p>
              
              {!showResult ? (
                <div className="space-y-3">
                  {["Luxação Patelar Medial", "Ruptura de Ligamento Cruzado Cranial", "Displasia Coxofemoral", "Fratura de Platô Tibial"].map((op) => (
                    <div 
                      key={op} 
                      onClick={() => setDiagnostic(op)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${diagnostic === op ? 'border-coral bg-coral/5 text-coral font-medium' : 'border-border bg-card hover:border-coral/40'}`}
                    >
                      {op}
                    </div>
                  ))}
                  <Button 
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
                      <p className="text-foreground/90 text-sm leading-relaxed">
                        {isCorrect 
                          ? "O teste de gaveta positivo combinado com o sinal radiográfico da almofada de gordura e o histórico agudo são clássicos para Ruptura do Ligamento Cruzado Cranial (RLCC)."
                          : "A presença de teste de compressão tibial (gaveta) positivo e o histórico do animal apontam para outra patologia muito comum no joelho. Revise os testes específicos."}
                      </p>
                      
                      {isCorrect && (
                        <div className="mt-6 pt-6 border-t border-green-500/20">
                          <h5 className="font-bold text-green-500 text-sm mb-2">+50 Pontos ganhos!</h5>
                          <Button className="bg-green-500 text-white hover:bg-green-600">Ver Protocolo de Tratamento (Playbook)</Button>
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

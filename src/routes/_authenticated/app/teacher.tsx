import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Users, PlaySquare, TrendingUp, DollarSign, Plus, Video, BrainCircuit, Upload, FileText, Edit2, MessageCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseBuilderDialog } from "@/components/app/CourseBuilderDialog";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { courses, ortopediaModules } from "@/lib/courses-data";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authenticated/app/teacher")({
  head: () => ({ meta: [{ title: "Painel do Professor — VetClass Pro" }] }),
  component: TeacherPanel,
});


function TeacherPanel() {
  const { user } = useAuth();
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courseModules, setCourseModules] = useState<any[]>([
    { id: 1, title: "Módulo 1: Introdução", description: "", topics: ["Aula 1: Conceitos Básicos"] }
  ]);
  const [trainingAI, setTrainingAI] = useState(false);
  const [buildingCase, setBuildingCase] = useState(false);
  const [caseDescription, setCaseDescription] = useState("");
  const [isGeneratingCase, setIsGeneratingCase] = useState(false);
  const [aiContextText, setAiContextText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [allowOrderBump, setAllowOrderBump] = useState(true);
  const [orderBumpDiscount, setOrderBumpDiscount] = useState("40");
  const [showOrderBumpInfo, setShowOrderBumpInfo] = useState(false);
  const [clinicalCases, setClinicalCases] = useState<any[]>([]);
  const [editingCase, setEditingCase] = useState<any>(null);
  const [supabaseCourses, setSupabaseCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const mapCaseFromDB = (dbCase: any) => ({
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
  });

  const mapCaseToDB = (localCase: any) => ({
    title: localCase.title,
    specialty: localCase.specialty,
    difficulty: localCase.difficulty,
    patient: localCase.patient,
    description: localCase.description,
    anamnesis_text: localCase.anamnesisText,
    chat_history: localCase.chatHistory,
    ai_hint: localCase.aiHint,
    exam_list: localCase.examList,
    images: localCase.images,
    exam_conclusion: localCase.examConclusion,
    options: localCase.options,
    correct_answer: localCase.correctAnswer,
    feedback_correct: localCase.feedbackCorrect,
    feedback_incorrect: localCase.feedbackIncorrect,
    playbook_protocol: localCase.playbookProtocol,
    author_email: localCase.authorEmail || user?.email || "desconhecido"
  });

  const handleGenerateCase = async () => {
    if (!caseDescription.trim()) return;
    setIsGeneratingCase(true);
    try {
      const response = await fetch("/api/generate-case", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: caseDescription }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      const newCase = { ...data, authorEmail: user?.email || "" };
      const dbPayload = mapCaseToDB(newCase);
      
      const { data: insertedData, error } = await supabase
        .from('clinical_cases')
        .insert(dbPayload)
        .select()
        .single();
        
      if (error) throw error;
      
      setClinicalCases([mapCaseFromDB(insertedData), ...clinicalCases]);
      
      alert("Caso criado com sucesso! Ele já aparece na sua lista.");
      setBuildingCase(false);
      setCaseDescription("");
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar o caso. Tente novamente.");
    } finally {
      setIsGeneratingCase(false);
    }
  };

  const handleSaveEditedCase = async () => {
    if (!editingCase) return;
    try {
      const dbPayload = mapCaseToDB(editingCase);
      const { data: updatedData, error } = await supabase
        .from('clinical_cases')
        .update(dbPayload)
        .eq('id', editingCase.id)
        .select()
        .single();
        
      if (error) {
        // Fallback para mock case caso não exista no supabase
        alert("Alterações salvas (apenas em memória para casos mockados).");
        setClinicalCases(clinicalCases.map((c: any) => c.id === editingCase.id ? editingCase : c));
        setEditingCase(null);
        return;
      }
      
      setClinicalCases(clinicalCases.map((c: any) => c.id === editingCase.id ? mapCaseFromDB(updatedData) : c));
      setEditingCase(null);
      alert("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Error updating case:", error);
      alert("Erro ao atualizar o caso.");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      if (file.type === "application/pdf") {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
        let fullText = "";
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(" ");
          fullText += pageText + "\\n";
        }
        
        setAiContextText((prev) => prev + "\\n\\n--- [Conteúdo do arquivo: " + file.name + "] ---\\n" + fullText);
      } else {
        const text = await file.text();
        setAiContextText((prev) => prev + "\\n\\n--- [Conteúdo do arquivo: " + file.name + "] ---\\n" + text);
      }
    } catch (error) {
      console.error("Erro ao ler arquivo", error);
      alert("Não foi possível extrair o texto deste arquivo.");
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  // Carregar cursos do Supabase
  useEffect(() => {
    const loadSupabaseCourses = async () => {
      setLoadingCourses(true);
      try {
        const { data: dbCourses, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && dbCourses) {
          setSupabaseCourses(dbCourses.map((c: any) => ({
            id: c.id,
            title: c.title,
            specialty: c.specialty,
            description: c.description,
            cover: c.cover_url,
            teacher: { name: c.teacher_name },
            teacher_id: c.teacher_id,
            students: 0,
            level: c.level,
            featured: c.featured,
            isFromDB: true,
            dbId: c.id,
          })));
        }
      } catch (e) {
        console.error("Error fetching courses from Supabase", e);
      } finally {
        setLoadingCourses(false);
      }
    };
    loadSupabaseCourses();
  }, [user?.email]);

  useEffect(() => {
    const saved = localStorage.getItem("aiTeacherContext");
    if (saved) setAiContextText(saved);

    const loadCases = async () => {
      const currentEmail = user?.email || "";
      let supabaseCases: any[] = [];
      
      try {
        const { data: casesData, error } = await supabase
          .from('clinical_cases')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!error && casesData) {
          supabaseCases = casesData.map(mapCaseFromDB);
        }
      } catch (e) {
        console.error("Error fetching cases", e);
      }
      
      const filteredCases = supabaseCases.filter((c: any) => 
        c.authorEmail === currentEmail || 
        (currentEmail.toLowerCase().includes("rodrigo") || currentEmail.toLowerCase().includes("mimoshow"))
      );
      
      // Carregar também os casos do localStorage antigos que ainda não estão no Supabase
      const isRodrigo = currentEmail.toLowerCase().includes("rodrigo") || currentEmail.toLowerCase().includes("mimoshow");
      const savedCasesRaw = JSON.parse(localStorage.getItem("custom_clinical_cases") || "[]");
      const localIds = new Set(supabaseCases.map(c => c.id));
      const localSavedCases = savedCasesRaw.filter((c: any) => 
        !localIds.has(c.id) &&
        (c.authorEmail === currentEmail || (!c.authorEmail && isRodrigo))
      );
      
      const combinedCases = [...filteredCases, ...localSavedCases];
      const combinedIds = new Set(combinedCases.map(c => c.id));
      
      // Mesclar os casos base do sistema (MOCK_CASES) apenas se for o Rodrigo
      import("@/lib/cases-data").then(({ MOCK_CASES }) => {
        const mergedMocks = isRodrigo ? MOCK_CASES.filter((mc: any) => !combinedIds.has(mc.id)) : [];
        setClinicalCases([...combinedCases, ...mergedMocks]);
      });
    };
    
    loadCases();
  }, [user?.email]);

  const handleSaveAIContext = () => {
    localStorage.setItem("aiTeacherContext", aiContextText);
    setTrainingAI(false);
  };

  const emailLogado = user?.email?.toLowerCase().trim().replace(/\./g, '') || "";
  const isMockTeacher = emailLogado.includes("prof@testecom");
  const isRodrigoEmail = emailLogado.includes("rodrigo") || emailLogado.includes("mimoshow") || emailLogado.includes("campesan");
  
  // Cursos estáticos filtrados por professor
  const myStaticCourses = courses.filter((c) => {
    if (!c || !c.teacher || !c.teacher.name) return false;
    if (isMockTeacher) return c.teacher.name.includes("Rodrigo");
    if (isRodrigoEmail) return c.teacher.name.includes("Rodrigo");
    if (emailLogado.includes("namdias") || emailLogado.includes("renan")) return c.teacher.name.includes("Renan");
    if (emailLogado.includes("carolina")) return c.teacher.name.includes("Carolina");
    if (emailLogado.includes("nathyarmarinhos") || emailLogado.includes("nathalia")) return c.teacher.name.includes("Nathalia");
    return false;
  });

  // Cursos do Supabase: mostrar TODOS para o professor logado
  // (cada professor só vê o painel se tiver acesso)
  const myDbCourses = supabaseCourses;

  // Mesclar: Supabase tem prioridade quando o título bate (dados reais do banco)
  const dbTitles = new Set(myDbCourses.map(c => c.title.toLowerCase()));
  const staticOnlyCourses = myStaticCourses.filter(c => !dbTitles.has(c.title.toLowerCase()));
  const myCourses = [...myDbCourses, ...staticOnlyCourses];

  const totalAlunos = myCourses.reduce((acc, curr) => acc + (curr.students || 0), 0);
  const totalCursos = myCourses.length;
  // Simula métricas proporcionais apenas se tiver alunos
  const aulasConcluidas = totalAlunos > 0 ? (totalAlunos * 6.8).toFixed(1) + "k" : "0";
  const receita = totalAlunos > 0 ? "R$ " + (totalAlunos * 11.6).toLocaleString("pt-BR") : "R$ 0,00";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Painel do Professor</h1>
          <p className="text-sm text-muted-foreground">Gerencie seus cursos, aulas e alunos.</p>
        </div>
        <Button 
          className="bg-coral text-coral-foreground hover:bg-coral/90"
          onClick={() => setEditingCourse(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Criar Novo Curso
        </Button>
      </div>

      {/* Métricas do Professor */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total de Alunos" value={totalAlunos.toLocaleString("pt-BR")} icon={Users} trend={totalAlunos > 0 ? "+12% este mês" : ""} />
        <MetricCard title="Cursos Ativos" value={totalCursos.toString()} icon={PlaySquare} />
        <MetricCard title="Aulas Concluídas" value={aulasConcluidas} icon={TrendingUp} trend={totalAlunos > 0 ? "Alta retenção" : ""} />
        <MetricCard title="Receita Estimada" value={receita} icon={DollarSign} trend={totalAlunos > 0 ? "+5% este mês" : ""} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Lista de Cursos */}
        <div className="space-y-6">
          <h2 className="font-display text-lg font-semibold">Meus Cursos</h2>
          <div className="space-y-4">
            {myCourses.map((c) => (
                <CourseEditorCard key={c.id} title={c.title} students={c.students} progress={100} onEdit={() => setEditingCourse(c)} />
              ))}
              
            {myCourses.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-border rounded-xl bg-card">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Você ainda não possui cursos cadastrados.</p>
                <Button variant="outline" className="mt-4" onClick={() => setEditingCourse(true)}>
                  Criar meu primeiro curso
                </Button>
              </div>
            ) : null}
          </div>

          <div className="pt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Casos Clínicos Criados</h2>
              <Button variant="outline" size="sm" onClick={() => setBuildingCase(true)} className="text-coral border-coral/30 hover:bg-coral hover:text-white">
                <Plus className="mr-2 h-4 w-4" /> Novo Caso
              </Button>
            </div>
            
            {clinicalCases.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-border rounded-xl bg-card">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Você ainda não possui casos clínicos criados.</p>
                <Button variant="link" onClick={() => setBuildingCase(true)} className="text-coral mt-1">
                  Usar a I.A. para criar o primeiro
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {clinicalCases.map((c: any) => (
                  <div key={c.id} className="p-4 rounded-xl border border-border bg-card shadow-soft relative group hover:border-coral/50 transition">
                    <h3 className="font-semibold text-sm">{c.title || "Caso Clínico Sem Título"}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {c.patient_history || c.description || "Descrição não disponível"}
                    </p>
                    <div className="mt-4 flex gap-2 items-center justify-between">
                       <div className="flex gap-2">
                         <span className="text-[10px] uppercase font-bold bg-secondary px-2 py-1 rounded text-muted-foreground">
                           {c.difficulty || "Média"}
                         </span>
                         <span className="text-[10px] uppercase font-bold bg-primary/10 text-primary px-2 py-1 rounded">
                           Gerado por I.A.
                         </span>
                       </div>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="h-6 w-6 text-muted-foreground hover:text-coral"
                         onClick={() => setEditingCase(c)}
                       >
                         <Edit2 className="h-3 w-3" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-8">
            <h2 className="font-display text-lg font-semibold mb-4">Meus Alunos</h2>
            <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Aluno</th>
                      <th className="px-4 py-3 font-medium">Ações</th>
                      <th className="px-4 py-3 font-medium">Curso Comprado</th>
                      <th className="px-4 py-3 font-medium text-center">Datas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {totalAlunos > 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                          Os dados detalhados dos alunos serão sincronizados com a plataforma de pagamentos.
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                          Você ainda não possui alunos matriculados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Ferramentas */}
        <aside className="space-y-6">
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-primary">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-xs"><Video className="mr-2 h-4 w-4" /> Agendar Aula ao Vivo</Button>
              <Button 
                onClick={() => setBuildingCase(true)}
                variant="outline" className="w-full justify-start text-xs"
              >
                <Plus className="mr-2 h-4 w-4" /> Criar Caso Clínico (I.A.)
              </Button>
              <Button 
                onClick={() => setTrainingAI(true)}
                className="w-full justify-start text-xs bg-coral text-white hover:bg-coral/90"
              >
                <BrainCircuit className="mr-2 h-4 w-4" /> Alimentando minha I.A
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border shadow-soft mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-primary flex justify-between items-center">
                Vendas Cruzadas (Order Bump)
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowOrderBumpInfo(true)}>
                  <Info className="h-4 w-4 text-muted-foreground hover:text-coral transition-colors" />
                </Button>
              </CardTitle>
             </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                 <div className="flex flex-col">
                   <span className="text-xs font-semibold text-foreground">Permitir Order Bump</span>
                   <span className="text-[10px] text-muted-foreground mt-0.5 max-w-[180px]">Deixe que outros cursos vendam o seu junto.</span>
                 </div>
                 <Switch checked={allowOrderBump} onCheckedChange={setAllowOrderBump} />
               </div>

               {allowOrderBump && (
                 <div className="pt-3 border-t border-border animate-fade-in">
                   <div className="flex flex-col gap-1.5">
                     <label className="text-xs font-semibold text-slate-700 flex justify-between">
                       Porcentagem de Desconto
                       <span className="text-coral">{orderBumpDiscount}% OFF</span>
                     </label>
                     <div className="relative">
                       <Input 
                         type="number" 
                         min="10" max="90" 
                         value={orderBumpDiscount}
                         onChange={(e) => setOrderBumpDiscount(e.target.value)}
                         className="h-8 text-xs pr-8 bg-slate-50 border-slate-200"
                       />
                       <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                     </div>
                     <span className="text-[10px] text-muted-foreground leading-tight">
                       Defina o desconto exclusivo que o aluno receberá ao adicionar seu curso como complemento no checkout (recomendado: 30% a 50%).
                     </span>
                   </div>
                 </div>
               )}
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* MODAL DO CONSTRUTOR DE CASOS CLÍNICOS */}
      <Dialog open={buildingCase} onOpenChange={setBuildingCase}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="font-display text-xl">Construtor Mágico de Casos</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Descreva o paciente e o problema. A Inteligência Artificial criará um desafio completo (com exames e diagnóstico) para seus alunos!
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">O que você quer testar?</label>
              <Textarea 
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                placeholder="Ex: Crie um caso de um Poodle idoso com tosse seca e sopro cardíaco. O diagnóstico correto deve ser Doença Valvar Mitral."
                className="h-32 resize-none"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="ghost" onClick={() => setBuildingCase(false)}>Cancelar</Button>
            <Button 
              disabled={isGeneratingCase || !caseDescription}
              className="bg-primary text-primary-foreground hover:bg-primary/90" 
              onClick={handleGenerateCase}
            >
              {isGeneratingCase ? "Aguarde, a mágica está acontecendo..." : "Gerar Caso com I.A."}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL ORDER BUMP INFO */}
      <Dialog open={showOrderBumpInfo} onOpenChange={setShowOrderBumpInfo}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-coral flex items-center gap-2">
              <DollarSign className="h-5 w-5" /> Entenda o Order Bump
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <p className="text-sm text-foreground/90 leading-relaxed">
              O <strong>Order Bump</strong> é a principal estratégia de Venda Cruzada do mercado.
            </p>
            <div className="bg-secondary/30 p-4 rounded-xl border border-border">
              <h4 className="font-semibold text-sm mb-2">Como funciona o Ganha-Ganha?</h4>
              <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                <li>Seu curso será oferecido com um desconto exclusivo no momento do pagamento de um aluno que está comprando <strong>o curso de outro professor</strong>.</li>
                <li>Você ganha alunos novos com <strong>Custo de Aquisição Zero</strong> (quem pagou pelo marketing daquele aluno foi o outro professor).</li>
                <li>O <strong>Split de Pagamento</strong> é 100% automático. O dinheiro da sua parte já cai direto na sua conta.</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground italic text-center">
              *Mantenha essa opção ativada para que o seu curso venda no piloto automático como complemento de outras disciplinas!
            </p>
          </div>
          <DialogFooter className="mt-4">
            <Button className="w-full bg-coral text-white hover:bg-coral/90" onClick={() => setShowOrderBumpInfo(false)}>
              Entendi! Deixar Ativado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL DE EDIÇÃO DE CASO CLÍNICO */}
      <Dialog open={!!editingCase} onOpenChange={(o) => !o && setEditingCase(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-coral/10 rounded-lg">
                <Edit2 className="h-6 w-6 text-coral" />
              </div>
              <div>
                <DialogTitle className="font-display text-xl">Editar Caso Clínico</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Revise ou altere as informações e o protocolo de tratamento (Playbook) gerado pela I.A.
                </p>
              </div>
            </div>
          </DialogHeader>

          {editingCase && (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1 block">Título do Caso</label>
                  <Input 
                    value={editingCase.title || ""}
                    onChange={(e) => setEditingCase({...editingCase, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1 block">Especialidade</label>
                  <Input 
                    value={editingCase.specialty || ""}
                    onChange={(e) => setEditingCase({...editingCase, specialty: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-semibold mb-1 block">Protocolo de Tratamento (Playbook)</label>
                <Textarea 
                  value={editingCase.playbookProtocol || ""}
                  onChange={(e) => setEditingCase({...editingCase, playbookProtocol: e.target.value})}
                  className="h-32 resize-y"
                  placeholder="Descreva aqui o protocolo exato que será liberado para o aluno após ele acertar o diagnóstico..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold mb-1 block">Feedback para Diagnóstico Correto</label>
                <Textarea 
                  value={editingCase.feedbackCorrect || ""}
                  onChange={(e) => setEditingCase({...editingCase, feedbackCorrect: e.target.value})}
                  className="h-20 resize-none"
                />
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button variant="ghost" onClick={() => setEditingCase(null)}>Cancelar</Button>
            <Button className="bg-coral text-white hover:bg-coral/90" onClick={handleSaveEditedCase}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL DO CONSTRUTOR DE CURSOS REAIS */}
      <CourseBuilderDialog 
        open={!!editingCourse} 
        onOpenChange={(open) => !open && setEditingCourse(null)}
        initialCourse={typeof editingCourse === 'object' ? editingCourse : null}
        onSuccess={() => {
          // Aqui no futuro podemos refazer o fetch da lista de cursos do banco
          console.log("Curso salvo!");
        }}
      />

      {/* MODAL DE TREINAMENTO DA IA */}
      <Dialog open={trainingAI} onOpenChange={setTrainingAI}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-coral/10 rounded-lg">
                <BrainCircuit className="h-6 w-6 text-coral" />
              </div>
              <div>
                <DialogTitle className="font-display text-xl">Alimentando minha I.A</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Cole os materiais, livros e defina como a I.A. deve se comportar com seus alunos.
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-secondary/20 transition-colors">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-semibold">Anexar Material de Estudo</p>
              <p className="text-xs text-muted-foreground mb-4">Suporta PDFs, TXT, CSV (O texto será extraído automaticamente)</p>
              
              <div className="relative inline-block">
                <Button variant="outline" size="sm" disabled={isUploading}>
                  {isUploading ? "Extraindo texto..." : "Selecionar Arquivo"}
                </Button>
                <input 
                  type="file" 
                  accept=".pdf,.txt,.csv,.md"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Instruções do Agente & Texto Extraído</label>
              <Textarea 
                value={aiContextText}
                onChange={(e) => setAiContextText(e.target.value)}
                placeholder="Ex: Você é o Professor Carlos, especialista em Cardiologia. Sempre responda de forma técnica, mas acessível. Use os conceitos do livro X..."
                className="h-64 resize-none"
              />
            </div>
            
            <p className="text-xs text-muted-foreground">
              Esta é uma versão inicial. No futuro, você poderá simplesmente arrastar PDFs e documentos inteiros aqui!
            </p>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="ghost" onClick={() => setTrainingAI(false)}>Fechar</Button>
            <Button className="bg-coral text-coral-foreground hover:bg-coral/90" onClick={handleSaveAIContext}>
              Salvar Configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, trend }: any) {
  return (
    <Card className="border-border shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-coral" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-display">{value}</div>
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </CardContent>
    </Card>
  );
}

function CourseEditorCard({ title, students, progress, isDraft, onEdit }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card shadow-soft hover:border-coral/50 transition">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sm">{title}</h3>
          {isDraft && <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-bold text-muted-foreground uppercase">Rascunho</span>}
        </div>
        <p className="text-xs text-muted-foreground">{students} alunos matriculados • {progress}% concluído (Conteúdo)</p>
      </div>
      <Button variant="outline" className="text-coral border-coral/30 hover:bg-coral hover:text-white" onClick={onEdit}>
        <Edit2 className="h-4 w-4 mr-2" /> Editar Currículo
      </Button>
    </div>
  );
}

function TeacherStudentRow({ name, email, phone, course, purchaseDate, expiryDate, img }: any) {
  const formatPhone = (p: string) => `(${p.slice(0,2)}) ${p.slice(2,7)}-${p.slice(7)}`;
  return (
    <tr className="hover:bg-secondary/20 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={img} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">Matriculado na plataforma</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-coral hover:text-coral/80 hover:bg-coral/10" title="Enviar Mensagem na Plataforma">
            <MessageCircle className="h-4 w-4 mr-2" />
            Mensagem
          </Button>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-foreground font-medium">{course}</td>
      <td className="px-4 py-3 text-center">
        <div className="text-xs">
          <p className="text-muted-foreground">Compra: <span className="text-foreground">{purchaseDate}</span></p>
          <p className="text-muted-foreground mt-0.5">Vence: <span className="text-foreground">{expiryDate}</span></p>
        </div>
      </td>
    </tr>
  );
}

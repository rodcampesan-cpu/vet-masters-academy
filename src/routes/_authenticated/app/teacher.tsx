import { createFileRoute } from "@tanstack/react-router";
import { Users, PlaySquare, TrendingUp, DollarSign, Plus, Video, BrainCircuit, Upload, FileText, Edit2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { ortopediaModules } from "@/lib/courses-data";

export const Route = createFileRoute("/_authenticated/app/teacher")({
  head: () => ({ meta: [{ title: "Painel do Professor — VetClass Pro" }] }),
  component: TeacherPanel,
});


function TeacherPanel() {
  const [editingCourse, setEditingCourse] = useState(false);
  const [trainingAI, setTrainingAI] = useState(false);
  const [buildingCase, setBuildingCase] = useState(false);
  const [caseDescription, setCaseDescription] = useState("");
  const [isGeneratingCase, setIsGeneratingCase] = useState(false);
  const [aiContextText, setAiContextText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [clinicalCases, setClinicalCases] = useState<any[]>([]);
  const [editingCase, setEditingCase] = useState<any>(null);

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
      
      // Save to localStorage
      const existingCases = JSON.parse(localStorage.getItem("custom_clinical_cases") || "[]");
      const newCase = { ...data, id: Date.now(), createdAt: new Date().toLocaleDateString() };
      const updatedCases = [newCase, ...existingCases];
      localStorage.setItem("custom_clinical_cases", JSON.stringify(updatedCases));
      setClinicalCases(updatedCases);
      
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

  const handleSaveEditedCase = () => {
    if (!editingCase) return;
    const existingCases = JSON.parse(localStorage.getItem("custom_clinical_cases") || "[]");
    const updatedCases = existingCases.map((c: any) => c.id === editingCase.id ? editingCase : c);
    localStorage.setItem("custom_clinical_cases", JSON.stringify(updatedCases));
    setClinicalCases(updatedCases);
    setEditingCase(null);
    alert("Alterações salvas com sucesso!");
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
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
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

  useEffect(() => {
    const saved = localStorage.getItem("aiTeacherContext");
    if (saved) setAiContextText(saved);

    const savedCases = JSON.parse(localStorage.getItem("custom_clinical_cases") || "[]");
    
    // Mesclar os casos base do sistema (MOCK_CASES) que ainda não foram editados/salvos
    import("@/lib/cases-data").then(({ MOCK_CASES }) => {
      const savedIds = new Set(savedCases.map((c: any) => c.id));
      const mergedMocks = MOCK_CASES.filter((mc: any) => !savedIds.has(mc.id));
      setClinicalCases([...savedCases, ...mergedMocks]);
    });
  }, []);

  const handleSaveAIContext = () => {
    localStorage.setItem("aiTeacherContext", aiContextText);
    setTrainingAI(false);
  };

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
        <MetricCard title="Total de Alunos" value="1.248" icon={Users} trend="+12% este mês" />
        <MetricCard title="Cursos Ativos" value="3" icon={PlaySquare} />
        <MetricCard title="Aulas Concluídas" value="8.5k" icon={TrendingUp} trend="Alta retenção" />
        <MetricCard title="Receita Estimada" value="R$ 14.500" icon={DollarSign} trend="+5% este mês" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Lista de Cursos */}
        <div className="space-y-6">
          <h2 className="font-display text-lg font-semibold">Meus Cursos</h2>
          <div className="space-y-4">
            <CourseEditorCard title="Ortopedia Clínica de Excelência" students={850} progress={95} onEdit={() => setEditingCourse(true)} />
            <CourseEditorCard title="Fundamentos de Cirurgia Articular" students={398} progress={100} onEdit={() => setEditingCourse(true)} />
            <CourseEditorCard title="Técnicas de Fisioterapia (Novo)" students={0} progress={20} isDraft onEdit={() => setEditingCourse(true)} />
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
                      <th className="px-4 py-3 font-medium">Contato (WhatsApp)</th>
                      <th className="px-4 py-3 font-medium">Curso Comprado</th>
                      <th className="px-4 py-3 font-medium text-center">Datas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <TeacherStudentRow name="Marina Silva" email="marina.vet@email.com" phone="11999990001" course="Ortopedia Clínica" purchaseDate="01/05/2026" expiryDate="01/05/2027" img="https://i.pravatar.cc/150?u=1" />
                    <TeacherStudentRow name="Carlos Eduardo" email="carlos.edu@email.com" phone="21988880002" course="Ortopedia Clínica" purchaseDate="05/06/2026" expiryDate="05/06/2027" img="https://i.pravatar.cc/150?u=2" />
                    <TeacherStudentRow name="João Pedro" email="jp.vet@email.com" phone="41966660004" course="Fundamentos de Cirurgia" purchaseDate="15/05/2026" expiryDate="15/05/2027" img="https://i.pravatar.cc/150?u=4" />
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

      {/* MODAL DO CONSTRUTOR DE CURSOS */}
      <Dialog open={editingCourse} onOpenChange={setEditingCourse}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Editor de Currículo</DialogTitle>
            <p className="text-sm text-muted-foreground">Adicione módulos, aulas, vídeos, PDFs e o texto do seu Post-it.</p>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            
            {ortopediaModules.map((module) => (
              <div key={module.id} className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="bg-secondary/50 p-4 border-b border-border flex justify-between items-center">
                  <h3 className="font-bold text-foreground">{module.title}</h3>
                  <Button variant="ghost" size="sm" className="text-coral">Adicionar Aula</Button>
                </div>
                
                <div className="p-4 border-b border-border bg-card/50">
                  <label className="text-xs font-semibold text-muted-foreground mb-2 block">Introdução / Descrição do Módulo</label>
                  <Textarea 
                    placeholder="Escreva um breve resumo do que os alunos vão aprender neste módulo..."
                    className="h-20 resize-none text-sm"
                    defaultValue={module.description || ""}
                  />
                </div>
                
                <div className="p-4 space-y-6">
                  {module.topics.map((topic, idx) => (
                    <div key={idx} className="bg-background border border-border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm">Aula {idx + 1}: {topic}</h4>
                      </div>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground">Link do Vídeo (YouTube/Vimeo)</label>
                          <Input placeholder="https://vimeo.com/..." defaultValue="" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground">Material de Apoio (PDF)</label>
                          <div className="flex gap-2">
                            <Input type="file" className="text-xs pt-1.5" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-semibold text-yellow-600 flex items-center gap-1">📌 Texto do Post-it do Mestre</label>
                        <Textarea 
                          placeholder="Escreva aqui as dicas de ouro que vão aparecer no post-it amarelo ao lado do vídeo..."
                          className="bg-yellow-50/50 border-yellow-200 text-yellow-900 placeholder:text-yellow-700/50 resize-none h-20"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full border-dashed py-8 text-muted-foreground">
              <Plus className="mr-2 h-5 w-5" /> Criar Novo Módulo
            </Button>
          </div>

          <DialogFooter className="mt-8 border-t border-border pt-4">
            <Button variant="ghost" onClick={() => setEditingCourse(false)}>Cancelar</Button>
            <Button className="bg-coral text-coral-foreground hover:bg-coral/90 px-8" onClick={() => setEditingCourse(false)}>
              Salvar e Publicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatPhone(phone)}</span>
          <a href={`https://wa.me/55${phone}`} target="_blank" rel="noreferrer" className="text-green-500 hover:bg-green-50 p-1.5 rounded-full transition-colors" title="Chamar no WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </a>
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

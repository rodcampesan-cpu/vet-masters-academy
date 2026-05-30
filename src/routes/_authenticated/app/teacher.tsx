import { createFileRoute } from "@tanstack/react-router";
import { Users, PlaySquare, TrendingUp, DollarSign, Plus, Edit2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ortopediaModules } from "@/lib/courses-data";

export const Route = createFileRoute("/_authenticated/app/teacher")({
  head: () => ({ meta: [{ title: "Painel do Professor — VetClass Pro" }] }),
  component: TeacherPanel,
});

function TeacherPanel() {
  const [editingCourse, setEditingCourse] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Painel do Professor</h1>
          <p className="text-sm text-muted-foreground">Gerencie seus cursos, aulas e alunos.</p>
        </div>
        <Button className="bg-coral text-coral-foreground hover:bg-coral/90">
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
        </div>

        {/* Sidebar Ferramentas */}
        <aside className="space-y-6">
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-primary">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-xs"><Video className="mr-2 h-4 w-4" /> Agendar Aula ao Vivo</Button>
              <Button variant="outline" className="w-full justify-start text-xs"><Plus className="mr-2 h-4 w-4" /> Adicionar Playbook</Button>
            </CardContent>
          </Card>
        </aside>
      </div>

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

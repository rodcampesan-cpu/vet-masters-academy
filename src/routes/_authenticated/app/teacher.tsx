import { createFileRoute } from "@tanstack/react-router";
import { Users, PlaySquare, TrendingUp, DollarSign, Plus, Edit2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/app/teacher")({
  head: () => ({ meta: [{ title: "Painel do Professor — VetClass Pro" }] }),
  component: TeacherPanel,
});

function TeacherPanel() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 space-y-8">
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
            <CourseEditorCard title="Ortopedia Canina Avançada" students={850} progress={95} />
            <CourseEditorCard title="Fundamentos de Cirurgia Articular" students={398} progress={100} />
            <CourseEditorCard title="Técnicas de Fisioterapia (Novo)" students={0} progress={20} isDraft />
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

function CourseEditorCard({ title, students, progress, isDraft }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card shadow-soft hover:border-coral/50 transition">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sm">{title}</h3>
          {isDraft && <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-bold text-muted-foreground uppercase">Rascunho</span>}
        </div>
        <p className="text-xs text-muted-foreground">{students} alunos matriculados • {progress}% concluído (Conteúdo)</p>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-coral">
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

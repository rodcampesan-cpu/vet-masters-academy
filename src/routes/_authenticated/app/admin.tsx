import { createFileRoute } from "@tanstack/react-router";
import { Users, Activity, ShieldAlert, DollarSign, Search, GraduationCap, BookOpen, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import drRodrigoImg from "@/assets/dr-rodrigo.png";

export const Route = createFileRoute("/_authenticated/app/admin")({
  head: () => ({ meta: [{ title: "Administração — VetClass Pro" }] }),
  component: AdminPanel,
});

function AdminPanel() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Painel Administrativo Master</h1>
          <p className="text-sm text-muted-foreground">Gestão completa de alunos, professores, cursos e financeiro.</p>
        </div>
        <Button className="bg-coral text-coral-foreground hover:bg-coral/90">
          Gerar Relatório Completo
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-secondary/50 p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="students" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Alunos
          </TabsTrigger>
          <TabsTrigger value="teachers" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Professores
          </TabsTrigger>
          <TabsTrigger value="courses" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Cursos
          </TabsTrigger>
        </TabsList>

        {/* ================= ABA: VISÃO GERAL / FINANCEIRO ================= */}
        <TabsContent value="overview" className="mt-6 space-y-8 outline-none">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total de Alunos" value="3.542" icon={Users} trend="+150 este mês" />
            <MetricCard title="Professores Ativos" value="24" icon={GraduationCap} trend="+2 este mês" />
            <MetricCard title="Cursos Publicados" value="86" icon={BookOpen} trend="+5 este mês" />
            <MetricCard title="Faturamento (MRR)" value="R$ 85.400" icon={DollarSign} trend="+8% este mês" />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-border shadow-soft">
              <CardHeader>
                <CardTitle>Crescimento de Matrículas (Últimos 6 meses)</CardTitle>
              </CardHeader>
              <CardContent className="pl-2 flex justify-center items-center h-[300px] text-muted-foreground bg-secondary/10 rounded-lg mx-6 mb-6 border border-dashed border-border">
                [Gráfico de Barras Financeiro será renderizado aqui]
              </CardContent>
            </Card>
            
            <Card className="col-span-3 border-border shadow-soft">
              <CardHeader>
                <CardTitle>Últimas Assinaturas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                        <AvatarFallback>AL</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Novo Aluno {i}</p>
                        <p className="text-sm text-muted-foreground">Plano Pro Anual</p>
                      </div>
                      <div className="ml-auto font-medium text-sm text-green-500">
                        + R$ 997,00
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ================= ABA: ALUNOS ================= */}
        <TabsContent value="students" className="mt-6 outline-none">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-display text-lg font-semibold">Base de Alunos</h2>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9 h-9 text-sm" placeholder="Buscar aluno por nome ou email..." />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Aluno</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Plano</th>
                      <th className="px-4 py-3 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <UserRow name="Marina Silva" email="marina.vet@email.com" status="Ativo" plan="Pro Anual" img="https://i.pravatar.cc/150?u=1" />
                    <UserRow name="Carlos Eduardo" email="carlos.edu@email.com" status="Pendente" plan="Mensal" img="https://i.pravatar.cc/150?u=2" />
                    <UserRow name="Luciana Santos" email="luciana.s@email.com" status="Bloqueado" plan="Expirado" img="https://i.pravatar.cc/150?u=3" />
                    <UserRow name="João Pedro" email="jp.vet@email.com" status="Ativo" plan="Mensal" img="https://i.pravatar.cc/150?u=4" />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ================= ABA: PROFESSORES ================= */}
        <TabsContent value="teachers" className="mt-6 outline-none">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-display text-lg font-semibold">Professores Parceiros</h2>
              <Button size="sm" className="bg-primary text-primary-foreground">
                + Convidar Professor
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Professor</th>
                      <th className="px-4 py-3 font-medium text-center">Cursos</th>
                      <th className="px-4 py-3 font-medium text-center">Avaliação</th>
                      <th className="px-4 py-3 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <TeacherRow name="Dr. Rodrigo Nicola" specialty="Ortopedia e Neurocirurgia" courses={3} rating="5.0" img={drRodrigoImg} />
                    <TeacherRow name="Dr. Renan Dias" specialty="Neurologista e Neurocirurgião" courses={1} rating="5.0" img="https://i.pravatar.cc/150?u=11" />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ================= ABA: CURSOS ================= */}
        <TabsContent value="courses" className="mt-6 outline-none">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-display text-lg font-semibold">Auditoria de Cursos</h2>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9 h-9 text-sm" placeholder="Buscar curso..." />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Curso / Módulo</th>
                      <th className="px-4 py-3 font-medium">Professor</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <CourseRow title="Ortopedia Clínica de Excelência" teacher="Dr. Rodrigo Nicola" status="Publicado" onOpen={() => setSelectedCourse({ title: "Ortopedia Clínica de Excelência", teacher: "Dr. Rodrigo Nicola", students: 850 })} />
                    <CourseRow title="Fundamentos de Cirurgia Articular" teacher="Dr. Rodrigo Nicola" status="Publicado" onOpen={() => setSelectedCourse({ title: "Fundamentos de Cirurgia Articular", teacher: "Dr. Rodrigo Nicola", students: 398 })} />
                    <CourseRow title="Neurologia Clínica 101" teacher="Dr. Renan Dias" status="Revisão" onOpen={() => setSelectedCourse({ title: "Neurologia Clínica 101", teacher: "Dr. Renan Dias", students: 0 })} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

      </Tabs>

      {/* MODAL DE DETALHES DO CURSO */}
      <Dialog open={!!selectedCourse} onOpenChange={(open) => !open && setSelectedCourse(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{selectedCourse?.title}</DialogTitle>
            <p className="text-sm text-muted-foreground">Visão detalhada de matrículas e progresso.</p>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            {/* Bloco do Professor */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-secondary/10">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{selectedCourse?.teacher.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedCourse?.teacher}</p>
                <p className="text-xs text-muted-foreground">Professor Responsável • {selectedCourse?.students} alunos matriculados</p>
              </div>
            </div>

            {/* Tabela de Alunos do Curso */}
            <div>
              <h3 className="font-display font-semibold mb-3">Alunos Matriculados neste curso</h3>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase">
                      <tr>
                        <th className="px-4 py-3 font-medium">Aluno</th>
                        <th className="px-4 py-3 font-medium text-center">Situação Financeira</th>
                        <th className="px-4 py-3 font-medium">Progresso</th>
                        <th className="px-4 py-3 font-medium text-right">Acesso Restante</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <CourseStudentRow name="Marina Silva" status="Pago" progress={100} daysLeft={214} />
                      <CourseStudentRow name="Carlos Eduardo" status="Atrasado" progress={45} daysLeft={180} />
                      <CourseStudentRow name="Luciana Santos" status="Pago" progress={12} daysLeft={350} />
                      <CourseStudentRow name="João Pedro" status="Cancelado" progress={80} daysLeft={0} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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

function UserRow({ name, email, status, plan, img }: any) {
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
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
          status === 'Ativo' ? 'bg-green-500/10 text-green-500' : 
          status === 'Pendente' ? 'bg-yellow-500/10 text-yellow-500' : 
          'bg-red-500/10 text-red-500'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{plan}</td>
      <td className="px-4 py-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem>Editar Plano</DropdownMenuItem>
            <DropdownMenuItem>Resetar Senha</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Bloquear Acesso</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

function TeacherRow({ name, specialty, courses, rating, img }: any) {
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
            <p className="text-xs text-muted-foreground">{specialty}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-center text-muted-foreground font-medium">{courses}</td>
      <td className="px-4 py-3 text-center text-yellow-500 font-medium">⭐ {rating}</td>
      <td className="px-4 py-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver Métricas</DropdownMenuItem>
            <DropdownMenuItem>Repassar Comissões</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Desvincular</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

function CourseRow({ title, teacher, status, onOpen }: any) {
  return (
    <tr className="hover:bg-secondary/20 transition-colors">
      <td className="px-4 py-3">
        <p className="font-medium text-foreground">{title}</p>
      </td>
      <td className="px-4 py-3 text-muted-foreground text-sm">{teacher}</td>
      <td className="px-4 py-3">
        <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] w-fit font-bold uppercase ${
          status === 'Publicado' ? 'bg-green-500/10 text-green-500' : 
          status === 'Revisão' ? 'bg-yellow-500/10 text-yellow-500' : 
          'bg-secondary text-muted-foreground'
        }`}>
          {status === 'Publicado' && <CheckCircle2 className="h-3 w-3" />}
          {status === 'Revisão' && <Activity className="h-3 w-3" />}
          {status === 'Rascunho' && <BookOpen className="h-3 w-3" />}
          {status}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <Button onClick={onOpen} variant="outline" size="sm" className="text-xs mr-2">Ver Detalhes</Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-500/10 hover:text-red-500"><XCircle className="h-4 w-4" /></Button>
      </td>
    </tr>
  );
}

function CourseStudentRow({ name, status, progress, daysLeft }: any) {
  return (
    <tr className="hover:bg-secondary/20 transition-colors">
      <td className="px-4 py-3 font-medium">{name}</td>
      <td className="px-4 py-3 text-center">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
          status === 'Pago' ? 'bg-green-500/10 text-green-500' : 
          status === 'Cancelado' ? 'bg-red-500/10 text-red-500' : 
          'bg-yellow-500/10 text-yellow-500'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 w-24" />
          <span className="text-xs font-medium">{progress}%</span>
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        {daysLeft > 0 ? (
          <span className="text-xs font-medium text-muted-foreground">{daysLeft} dias restantes</span>
        ) : (
          <span className="text-xs font-medium text-red-500">Acesso Expirado</span>
        )}
      </td>
    </tr>
  );
}

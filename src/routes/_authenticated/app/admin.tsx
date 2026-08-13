import { createFileRoute } from "@tanstack/react-router";
import { Users, Activity, ShieldAlert, DollarSign, Search, GraduationCap, BookOpen, MoreVertical, CheckCircle2, XCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import drRodrigoImg from "@/assets/dr-rodrigo.png";
import { courses } from "@/lib/courses-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', total: 42000 },
  { name: 'Fev', total: 51000 },
  { name: 'Mar', total: 48000 },
  { name: 'Abr', total: 61000 },
  { name: 'Mai', total: 72000 },
  { name: 'Jun', total: 85400 },
];

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
              <CardContent className="pl-0 pt-4 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `R$${value/1000}k`} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }} 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Faturamento']}
                    />
                    <Bar dataKey="total" fill="#FF6B6B" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
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
                      <th className="px-4 py-3 font-medium">Contato (WhatsApp)</th>
                      <th className="px-4 py-3 font-medium">Curso Comprado</th>
                      <th className="px-4 py-3 font-medium text-center">Datas</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <UserRow name="Marina Silva" email="marina.vet@email.com" phone="11999990001" status="Ativo" course="Ortopedia Clínica" purchaseDate="01/05/2026" expiryDate="01/05/2027" img="https://i.pravatar.cc/150?u=1" />
                    <UserRow name="Carlos Eduardo" email="carlos.edu@email.com" phone="21988880002" status="Pendente" course="Ortopedia Clínica" purchaseDate="05/06/2026" expiryDate="05/06/2027" img="https://i.pravatar.cc/150?u=2" />
                    <UserRow name="Luciana Santos" email="luciana.s@email.com" phone="31977770003" status="Bloqueado" course="Neurologia Essencial" purchaseDate="10/01/2025" expiryDate="10/01/2026" img="https://i.pravatar.cc/150?u=3" />
                    <UserRow name="João Pedro" email="jp.vet@email.com" phone="41966660004" status="Ativo" course="Hematologia Descomplicada" purchaseDate="15/05/2026" expiryDate="15/05/2027" img="https://i.pravatar.cc/150?u=4" />
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
                    <TeacherRow name="Dra. Carolina" specialty="Hematologista" courses={1} rating="4.9" img="https://i.pravatar.cc/150?img=5" />
                    <TeacherRow name="Dra. Nathalia Cristina" specialty="Intensivista" courses={1} rating="5.0" img="https://i.pravatar.cc/150?img=9" />
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
                    {courses.map((c) => (
                      <CourseRow 
                        key={c.id}
                        title={c.title} 
                        teacher={c.teacher.name} 
                        status={c.purchased ? "Publicado" : "Revisão"} 
                        onOpen={() => setSelectedCourse({ title: c.title, teacher: c.teacher.name, students: c.students })} 
                      />
                    ))}
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

function UserRow({ name, email, phone, status, course, purchaseDate, expiryDate, img }: any) {
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
          <p className="text-muted-foreground mt-0.5">Vence: <span className={status === 'Bloqueado' ? 'text-red-500' : 'text-foreground'}>{expiryDate}</span></p>
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
      <td className="px-4 py-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => toast.info(`Abrindo edição de plano para ${name}...`)}>Editar Plano</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success(`E-mail de redefinição de senha enviado para ${email}.`)}>Resetar Senha</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => toast.error(`Acesso do aluno ${name} foi bloqueado.`)}>Bloquear Acesso</DropdownMenuItem>
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

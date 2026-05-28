import { createFileRoute } from "@tanstack/react-router";
import { Users, Activity, ShieldAlert, DollarSign, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_authenticated/app/admin")({
  head: () => ({ meta: [{ title: "Administração — VetClass Pro" }] }),
  component: AdminPanel,
});

function AdminPanel() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Painel Administrativo</h1>
          <p className="text-sm text-muted-foreground">Visão geral e gestão da plataforma.</p>
        </div>
      </div>

      {/* Métricas do Admin */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total de Usuários" value="3.542" icon={Users} trend="+150 este mês" />
        <MetricCard title="Alunos Ativos (Mensal)" value="2.890" icon={Activity} />
        <MetricCard title="Assinaturas Pendentes" value="12" icon={ShieldAlert} trend="Requer aprovação" />
        <MetricCard title="Faturamento (MRR)" value="R$ 85.400" icon={DollarSign} trend="+8% este mês" />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="font-display text-lg font-semibold">Gestão de Alunos</h2>
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
        <Button variant="ghost" size="sm" className="text-xs">Gerenciar</Button>
      </td>
    </tr>
  );
}

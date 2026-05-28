import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Star, Medal, Zap, Crown, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_authenticated/app/achievements")({
  head: () => ({ meta: [{ title: "Conquistas — VetClass Pro" }] }),
  component: AchievementsPage,
});

function AchievementsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-soft">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">Suas Conquistas</h1>
            <p className="text-sm text-muted-foreground">Acompanhe seu progresso e desbloqueie recompensas.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-coral/10 text-coral rounded-full border border-coral/20 font-bold">
          <Flame className="h-5 w-5 fill-current" /> Streak: 12 dias
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {/* Nível Atual */}
          <Card className="border-border shadow-soft bg-gradient-to-r from-card to-secondary/30 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <Trophy className="w-64 h-64" />
            </div>
            <CardHeader className="pb-2 relative z-10">
              <CardTitle className="text-lg text-muted-foreground">Seu Nível Atual</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-4xl font-bold">Nível 14</span>
                <span className="text-sm font-semibold text-coral">Veterinário Sênior</span>
              </div>
              <Progress value={75} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2 text-right">3.500 / 4.000 XP para o Nível 15</p>
            </CardContent>
          </Card>

          {/* Medalhas */}
          <h2 className="font-display text-xl font-bold mt-8">Medalhas Desbloqueadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <BadgeCard icon={Star} color="text-yellow-500" bg="bg-yellow-500/10" title="Primeiro Passo" desc="Completou a primeira aula" />
            <BadgeCard icon={Medal} color="text-blue-500" bg="bg-blue-500/10" title="Ortopedista" desc="Terminou 1 curso de Ortopedia" />
            <BadgeCard icon={Zap} color="text-purple-500" bg="bg-purple-500/10" title="Estudioso" desc="7 dias seguidos de acesso" />
            <BadgeCard icon={Crown} color="text-gray-400" bg="bg-gray-400/10" title="Mestre (Bloqueado)" desc="Complete 5 cursos" locked />
          </div>
        </div>

        {/* Ranking */}
        <Card className="border-border shadow-soft h-fit">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" /> Ranking Global
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RankingRow pos={1} name="Dra. Juliana M." xp="12.450" isTop />
            <RankingRow pos={2} name="Dr. Roberto S." xp="11.200" isTop />
            <RankingRow pos={3} name="Amanda K." xp="10.800" isTop />
            <div className="border-t border-border my-2"></div>
            <RankingRow pos={42} name="Você" xp="3.500" isMe />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BadgeCard({ icon: Icon, color, bg, title, desc, locked }: any) {
  return (
    <div className={`flex flex-col items-center p-4 rounded-2xl border ${locked ? 'border-border/50 bg-card/50 opacity-60' : 'border-border bg-card shadow-soft'} text-center`}>
      <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-3 ${locked ? 'bg-secondary text-muted-foreground' : bg}`}>
        <Icon className={`h-6 w-6 ${locked ? '' : color}`} />
      </div>
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

function RankingRow({ pos, name, xp, isTop, isMe }: any) {
  return (
    <div className={`flex items-center justify-between p-2 rounded-lg ${isMe ? 'bg-coral/10 border border-coral/20' : ''}`}>
      <div className="flex items-center gap-3">
        <span className={`w-6 text-center font-bold text-sm ${isTop ? 'text-yellow-500' : 'text-muted-foreground'}`}>{pos}º</span>
        <span className={`text-sm ${isMe ? 'font-bold text-coral' : 'font-medium'}`}>{name}</span>
      </div>
      <span className="text-xs font-semibold text-muted-foreground">{xp} XP</span>
    </div>
  );
}

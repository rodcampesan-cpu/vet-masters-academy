import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle, Calendar, Users, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/app/live-chat")({
  head: () => ({ meta: [{ title: "Bate Papo Ao Vivo — Vetmasterclass" }] }),
  component: LiveChatPage,
});

const upcomingSessions = [
  {
    id: 1,
    title: "Discussão de Casos: Ortopedia Complexa",
    date: "15 de Setembro, 2026",
    time: "19:00 - 20:30 (BRT)",
    theme: "Manejo conservativo x cirúrgico na Displasia Coxofemoral",
    speaker: "Dr. Roberto Silva (Especialista em Ortopedia)",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Mesa Redonda: Medicina Felina",
    date: "22 de Setembro, 2026",
    time: "20:00 - 21:00 (BRT)",
    theme: "Atualizações em PIF e novos protocolos de tratamento",
    speaker: "Dra. Juliana Mendes",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Bate-Papo Mentoria: Carreira Veterinária",
    date: "05 de Outubro, 2026",
    time: "19:00 - 21:00 (BRT)",
    theme: "Como estruturar uma clínica de sucesso do zero",
    speaker: "Prof. Marcos Andrade",
    status: "upcoming"
  }
];

const pastSessions = [
  {
    id: 4,
    title: "Sessão de Dúvidas: Neurologia Básica",
    date: "10 de Agosto, 2026",
    time: "18:00 - 19:30 (BRT)",
    theme: "Mielopatias e Diagnóstico Diferencial",
    speaker: "Dr. Fernando Souza",
    status: "recorded",
    videoUrl: "#"
  }
];

function LiveChatPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold sm:text-4xl flex items-center gap-3">
          <PlayCircle className="h-8 w-8 text-primary" />
          Bate Papo Ao Vivo
        </h1>
        <p className="text-muted-foreground text-lg">
          Participe de sessões interativas exclusivas com professores e especialistas para discutir temas em alta, tirar dúvidas e interagir.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Próximos Encontros</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingSessions.map(session => (
            <Card key={session.id} className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-primary font-medium">
                      <Calendar className="h-4 w-4" />
                      {session.date} às {session.time}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground font-semibold">TEMA DA SESSÃO</span>
                  <p className="text-base mt-1">{session.theme}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Convidado/Host: {session.speaker}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <Video className="h-4 w-4" />
                  Acessar Sala (Em breve)
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <h2 className="text-2xl font-semibold border-b pb-2">Gravações Anteriores</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {pastSessions.map(session => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle>{session.title}</CardTitle>
                <CardDescription>{session.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm"><span className="font-semibold">Tema:</span> {session.theme}</p>
                <p className="text-sm mt-1"><span className="font-semibold">Host:</span> {session.speaker}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Assistir Gravação
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

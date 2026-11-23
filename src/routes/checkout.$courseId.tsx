import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses } from "@/lib/courses-data";
import { Calendar, ShieldAlert, ArrowLeft, MessageCircle, Clock, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout/$courseId")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `Inscrições Encerradas — ${loaderData?.course?.title || "Vetmasterclass"}` },
      { name: "description", content: "Vendas pausadas. Próximas turmas em Março de 2027." }
    ]
  }),
  loader: ({ params }) => {
    const found = courses.find((x) => x.id === params.courseId);
    if (!found) throw notFound();
    return { course: found };
  },
  component: SalesPausedPage,
});

function SalesPausedPage() {
  const { course } = Route.useLoaderData();
  const WHATSAPP_NUMBER = "5511999999999";
  const message = encodeURIComponent(`Olá! Gostaria de colocar meu nome na lista de espera VIP para a turma de Março de 2027 do curso "${course.title}".`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 animate-fade-in flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-2xl shadow-xs border border-slate-200">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
              Vetmaster<span className="text-coral">class</span>
            </span>
          </Link>
          <Link 
            to="/cursos" 
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar aos cursos
          </Link>
        </div>

        {/* Card Principal de Vendas Pausadas */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 text-center">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-6">
            <Calendar className="h-8 w-8" />
          </div>

          <div className="inline-block bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            Inscrições Encerradas • Vendas Pausadas
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Próximas Turmas em Março de 2027
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            As vagas para a turma atual foram preenchidas e as vendas estão temporariamente pausadas para garantirmos dedicação e acompanhamento total aos alunos matriculados. A abertura da nova turma para o curso <strong>{course.title}</strong> acontecerá em <strong>Março de 2027</strong>.
          </p>

          {/* Resumo do Curso */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-2xl mx-auto text-left mb-8">
            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <img 
                src={course.cover} 
                alt={course.title} 
                className="w-full sm:w-44 aspect-video rounded-xl object-cover shadow-sm"
              />
              <div className="flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-coral bg-coral/10 px-2 py-0.5 rounded">
                  {course.specialty}
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mt-1 mb-2 leading-tight">
                  {course.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-slate-400" /> {course.hours}h de carga</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-slate-400" /> {course.modules} módulos</span>
                </div>
                <div className="flex items-center gap-2">
                  <img 
                    src={course.teacher.avatar} 
                    alt={course.teacher.name} 
                    className="h-6 w-6 rounded-full object-cover border border-slate-200" 
                  />
                  <span className="text-xs font-medium text-slate-700">Prof. {course.teacher.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chamada para Lista de Espera */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-6">
            <div className="flex items-center justify-center gap-2 mb-2 text-emerald-800 font-bold text-base">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              Entre na Lista de Espera VIP
            </div>
            <p className="text-xs sm:text-sm text-emerald-700 max-w-lg mx-auto mb-6 leading-relaxed">
              Os inscritos na lista de espera recebem o link de matrícula com <strong>24 horas de antecedência</strong> e condições especiais exclusivas no lançamento da turma de <strong>Março de 2027</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold text-base h-14 px-8 rounded-xl shadow-lg shadow-green-500/20 transition-all hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" /> Entrar na Lista VIP no WhatsApp
              </a>
              <Button asChild variant="outline" className="h-14 px-6 text-sm font-semibold rounded-xl border-slate-300">
                <Link to="/cursos">Ver outros cursos</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldAlert className="h-4 w-4" />
            Nenhum valor será cobrado no momento da inscrição na lista de espera.
          </div>

        </div>

      </div>

      <footer className="mt-12 text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} Vetmasterclass — Todos os direitos reservados.
      </footer>
    </div>
  );
}

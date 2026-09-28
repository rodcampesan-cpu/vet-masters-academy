import fs from 'fs';

// 1. courses-data.ts
let data = fs.readFileSync('src/lib/courses-data.ts', 'utf8');

// Move Mentoria Flix to top
const flixRegex = /\{\s*id:\s*"mentoria-flix".*?\},/s;
const flixMatch = data.match(flixRegex);
if (flixMatch) {
  data = data.replace(flixMatch[0], '');
  data = data.replace('export const courses: Course[] = [', 'export const courses: Course[] = [\n  ' + flixMatch[0]);
}

if (!data.includes('import draNathaliaImg')) {
  data = data.replace('import mentoriaFlixImg from "@/assets/mentoria-flix.png";', 'import mentoriaFlixImg from "@/assets/mentoria-flix.png";\nimport draNathaliaImg from "@/assets/dra-nathalia.jpg";');
}
data = data.replace('avatar: "https://i.pravatar.cc/150?img=5"', 'avatar: draNathaliaImg');
fs.writeFileSync('src/lib/courses-data.ts', data, 'utf8');

// 2. index.tsx
let idx = fs.readFileSync('src/routes/index.tsx', 'utf8');
idx = idx.replace('import { ArrowRight, Award, Brain, GraduationCap, Library, MessagesSquare, Play, Sparkles, Stethoscope, Trophy, Users, CheckCircle, Gift, AlertTriangle, Clock, Store } from "lucide-react";', 'import { ArrowRight, Award, Brain, GraduationCap, Library, MessagesSquare, Play, Sparkles, Stethoscope, Trophy, Users, CheckCircle, Gift, AlertTriangle, Clock, Store, Frown, Zap, MessageCircle, BarChart3, ChevronRight, PlayCircle } from "lucide-react";');
idx = idx.replace('Junte-se a <strong className="text-foreground">12.450+</strong> veterinários', 'Junte-se aos nossos <strong className="text-foreground">alunos incríveis</strong> de todo o Brasil!');

const oldHeroBullets = '              <div className="mt-8 space-y-4">\n                {[\n                  "Você tem medo de fechar um diagnóstico complexo na frente do cliente?",\n                  "Você prescreve o tratamento, mas o tutor não adere porque não entendeu o valor?",\n                  "Você sabe a teoria, mas trava na hora de aplicar o protocolo de emergência?"\n                ].map((text, i) => (\n                  <div key={i} className="flex gap-4">\n                    <div className="flex-shrink-0 mt-1">\n                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500">\n                        <AlertTriangle className="h-3 w-3" />\n                      </div>\n                    </div>\n                    <p className="text-base text-muted-foreground">{text}</p>\n                  </div>\n                ))}\n              </div>';

const newHeroBullets = \              <div className="mt-8 space-y-4">
                {[
                  { text: "Você tem medo de fechar um diagnóstico complexo na frente do cliente?", icon: Frown },
                  { text: "Você prescreve o tratamento, mas o tutor não adere porque não entendeu o valor?", icon: Users },
                  { text: "Você sabe a teoria, mas trava na hora de aplicar o protocolo de emergência?", icon: Zap }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-coral">
                        <item.icon className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="text-base text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>\;
idx = idx.replace(oldHeroBullets, newHeroBullets);

const oldHeroBtns = '              <div className="mt-10 flex flex-wrap gap-4">\n                <Button asChild size="lg" className="h-14 bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral px-8 text-lg font-semibold rounded-xl transition-all hover:scale-105">\n                  <a href="#oferta">\n                    Garantir minha vaga agora <ArrowRight className="ml-2 h-5 w-5" />\n                  </a>\n                </Button>\n                <Button asChild size="lg" variant="outline" className="h-14 border-border bg-card text-foreground hover:bg-secondary px-8 text-lg rounded-xl transition-all">\n                  <Link to="/cursos">\n                    Ver Catálogo de Cursos\n                  </Link>\n                </Button>\n              </div>';
const newHeroBtns = \              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral px-8 text-lg font-semibold rounded-xl transition-all hover:scale-105">
                  <a href="#oferta">
                    <PlayCircle className="mr-2 h-5 w-5" /> Assistir apresentação
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 border-border bg-card text-foreground hover:bg-secondary px-8 text-lg font-semibold rounded-xl transition-all hover:scale-105">
                  <Link to="/cursos">
                    Conhecer a plataforma <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>\;
idx = idx.replace(oldHeroBtns, newHeroBtns);

const oldCards = '              <div className="absolute -bottom-6 -left-6 bg-card border border-border p-5 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs z-10 hidden sm:flex">\n                <div className="bg-green-500/10 p-3 rounded-full text-green-500">\n                  <CheckCircle className="h-6 w-6" />\n                </div>\n                <div>\n                  <p className="text-sm font-bold text-foreground">Comunicação Assertiva</p>\n                  <p className="text-xs text-muted-foreground">Tutores engajados e tratamentos aprovados.</p>\n                </div>\n              </div>';
const newCards = \              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4 w-[110%] max-w-[120%] z-10 hidden lg:flex justify-between">
                {[
                  { icon: MessageCircle, title: "Comunicação Assertiva", desc: "Conquiste a confiança do tutor." },
                  { icon: Brain, title: "Raciocínio Clínico", desc: "Do sintoma à conduta com segurança." },
                  { icon: BarChart3, title: "Tomada de decisão", desc: "Esteja preparado para os momentos que realmente importam." }
                ].map((card, i) => (
                  <div key={i} className="flex-1 bg-white border border-slate-100 p-5 rounded-2xl shadow-xl flex gap-4 items-center transition-transform hover:-translate-y-1">
                    <div className="bg-coral/10 p-3 rounded-full text-coral shrink-0">
                      <card.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight mb-1">{card.title}</p>
                      <p className="text-[11px] text-slate-500 leading-snug">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>\;
idx = idx.replace(oldCards, newCards);
idx = idx.replace('Vendas abrem amanhã', 'VENDAS ABREM DIA 29/09 ÀS 08:00');
idx = idx.replace(/799/g, '1.200');

fs.writeFileSync('src/routes/index.tsx', idx, 'utf8');

// 3. checkout..tsx
let checkout = fs.readFileSync('src/routes/checkout..tsx', 'utf8');
checkout = checkout.replace("const orderBumpCourse = courses.find(c => c.id !== course.id && c.id !== 'mentoria-flix');", "const orderBumpCourses = courses.filter(c => c.id !== course.id && c.id !== 'mentoria-flix').slice(0, 3);\n  const [selectedBumps, setSelectedBumps] = useState<Record<string, boolean>>({});");

const oldBump = \{orderBumpCourse && (
                <div className={\\\mt-6 mb-8 p-4 rounded-xl border-2 transition-all \\\\\\}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <input type="checkbox" id="orderBump" checked={orderBump} onChange={(e) => setOrderBump(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-coral focus:ring-coral" />
                    </div>
                    <div className="flex-1 cursor-pointer" onClick={() => setOrderBump(!orderBump)}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-coral" />
                            Adicione o curso {orderBumpCourse.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">Aproveite esta oferta única e leve o curso completo com {orderBumpCourse.teacher.name} por um valor exclusivo.</p>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-100 flex justify-between items-center mt-3">
                        <span className="text-sm font-semibold text-slate-500 line-through">De R$ 2.800,00</span>
                        <div className="text-right">
                          <span className="text-xs text-coral font-bold uppercase tracking-wider block">Por apenas</span>
                          <span className="text-lg font-black text-slate-900">+ R$ 1.680,00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}\;
const newBump = \{orderBumpCourses.length > 0 && (
                <div className="mt-6 mb-8 space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-coral" />
                    Complete sua formação com um desconto especial
                  </h4>
                  {orderBumpCourses.map((bumpCourse) => (
                    <div key={bumpCourse.id} className={\\\p-4 rounded-xl border-2 transition-all \\\\\\}>
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <input type="checkbox" checked={!!selectedBumps[bumpCourse.id]} onChange={(e) => setSelectedBumps({...selectedBumps, [bumpCourse.id]: e.target.checked})} className="w-5 h-5 rounded border-slate-300 text-coral focus:ring-coral" />
                        </div>
                        <div className="flex-1 cursor-pointer" onClick={() => setSelectedBumps({...selectedBumps, [bumpCourse.id]: !selectedBumps[bumpCourse.id]})}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-slate-900">{bumpCourse.title}</h4>
                              <p className="text-sm text-slate-600 mt-1">com {bumpCourse.teacher.name}</p>
                            </div>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-slate-100 flex justify-between items-center mt-3">
                            <span className="text-sm font-semibold text-slate-500 line-through">De R$ 2.800,00</span>
                            <div className="text-right">
                              <span className="text-xs text-coral font-bold uppercase tracking-wider block">Por apenas</span>
                              <span className="text-lg font-black text-slate-900">+ R$ 1.680,00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}\;

checkout = checkout.replace(oldBump, newBump);
checkout = checkout.replace(/799/g, '1.200');
fs.writeFileSync('src/routes/checkout..tsx', checkout, 'utf8');

// CURSOS_..tsx
let coursePage = fs.readFileSync('src/routes/cursos_..tsx', 'utf8');
coursePage = coursePage.replace(
  '<Button className="w-full h-16 text-lg font-bold bg-slate-100 text-slate-400 hover:bg-slate-100 cursor-not-allowed rounded-2xl">',
  '<Button className="w-full h-16 text-lg font-bold bg-green-500 text-white hover:bg-green-600 rounded-2xl" asChild>\\n                  <Link to="/checkout/" params={{ courseId: course.id }}>'
);
coursePage = coursePage.replace('Vendas abrem dia 29/09 às 08:00', 'GARANTIR MINHA VAGA');
coursePage = coursePage.replace('</Button>', '</Link>\\n                </Button>');
fs.writeFileSync('src/routes/cursos_..tsx', coursePage, 'utf8');

console.log("Success");

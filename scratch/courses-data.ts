import ortho from "@/assets/course-ortho.jpg";
import cardio from "@/assets/course-cardio.jpg";
import derma from "@/assets/course-derma.jpg";
import neuro from "@/assets/course-neuro.jpg";
import t1 from "@/assets/dr-rodrigo.png";
import t2 from "@/assets/teacher-2.jpg";
import t3 from "@/assets/teacher-3.jpg";
import mentoriaFlixImg from "@/assets/mentoria-flix.png";

export interface Teacher {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  avatarPosition?: string;
  bio?: string;
  bioTopics?: { label: string; value: string }[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface Course {
  id: string;
  title: string;
  specialty: string;
  description: string;
  cover: string;
  hours: number;
  modules: number;
  lessons: number;
  students: number;
  progress: number;
  teacher: Teacher;
  level: "Iniciante" | "Intermedi�¡rio" | "Avan�§ado";
  featured?: boolean;
  purchased?: boolean;
  externalLink?: string;
  glossary?: GlossaryTerm[];
}

export const teachers: Teacher[] = [
  {
    id: "t1", name: "Dr. Rodrigo Nicola", title: "M��dico Veterin�¡rio",
    specialty: "Ortopedia e Neurocirurgia", avatar: t1, avatarPosition: "center 30%",
    bioTopics: [
      { label: "Forma�§�£o", value: "Universidade Anhanguera de S�£o Paulo" },
      { label: "Resid�ªncia", value: "Ortopedia �€” Associa�§�£o Anclivepa SP" },
      { label: "P�³s-Gradua�§�£o", value: "Ortopedia e Neurocirurgia �€” Anclivepa SP" },
      { label: "Especializa�§�£o", value: "Master Avan�§ado em Ortopedia �€” Anclivepa SP" },
      { label: "Associa�§�£o", value: "Membro da O.A. Internacional" },
      { label: "Atua�§�£o", value: "Chefe de Ortopedia e Neurologia �€” Dr. Pets Santo Andr��" },
      { label: "Experi�ªncia", value: "Empres�¡rio h�¡ mais de 25 anos no mercado Pet" },
    ],
  },
  {
    id: "t2", name: "Dr. Renan Dias", title: "Especialista em Neurologia",
    specialty: "Neurologista", avatar: t2, avatarPosition: "center 15%",
    bioTopics: [
      { label: "Especialidade", value: "Neurologia Veterin�¡ria" },
      { label: "Atua�§�£o", value: "Atendimento cl�­nico especializado em neurologia" },
    ],
  },
  {
    id: "t3", name: "Dra. Carolina", title: "Especialista em Hematologia",
    specialty: "Hematologista", avatar: "https://i.pravatar.cc/150?img=5",
    bioTopics: [
      { label: "Especialidade", value: "Hematologia Veterin�¡ria" },
      { label: "Atua�§�£o", value: "Diagn�³stico e tratamento de doen�§as sangu�­neas" },
    ],
  },
  {
    id: "t4", name: "Dra. Nathalia Cristina", title: "Especialista em Cl�­nica M��dica",
    specialty: "Cl�­nica M��dica", avatar: "https://i.pravatar.cc/150?img=9",
    bioTopics: [
      { label: "Especialidade", value: "Cl�­nica M��dica" },
      { label: "Atua�§�£o", value: "Atendimento de rotina e acompanhamento cl�­nico" },
    ],
  },
];

export const courses: Course[] = [
  {
    id: "mentoria-flix",
    title: "Mentoria Flix: M��todo P.E.T.",
    specialty: "Gest�£o",
    description: "Transforme seu neg�³cio pet. Aprenda gest�£o, estrutura�§�£o, contrata�§�£o e vendas com quem j�¡ construiu empresas s�³lidas na medicina veterin�¡ria.",
    cover: mentoriaFlixImg,
    hours: 20,
    modules: 8,
    lessons: 30,
    students: 0,
    progress: 0,
    teacher: teachers[0],
    level: "Avan�§ado",
    purchased: false,
    externalLink: "https://mentoriaflix.com.br",
  },
  {
    id: "ortopedia-avancada",
    title: "Ortopedia Cl�­nica de Excel�ªncia",
    specialty: "Ortopedia",
    description:
      "Domine a ortopedia cl�­nica sem precisar operar. Aprenda a diagnosticar com seguran�§a, solicitar exames precisos e conduzir atendimentos que encantam o tutor, gerando confian�§a absoluta na sua conduta m��dica.",
    cover: ortho,
    hours: 48,
    modules: 12,
    lessons: 86,
    students: 0,
    progress: 0,
    teacher: teachers[0],
    level: "Avan�§ado",
    featured: true,
    purchased: false,
    glossary: [
      { term: "Claudica�§�£o", definition: "Falta de firmeza ou assimetria no andar, popularmente conhecido como 'mancar'. Pode ser de apoio (dor ao pisar) ou de eleva�§�£o (dor ao mover o membro)." },
      { term: "Crepita�§�£o", definition: "Ru�­do ou sensa�§�£o de atrito (ro�§ar) de ossos ou cartilagens desgastadas durante o movimento articular ou �  palpa�§�£o de fraturas." },
      { term: "Sinal de Ortolani", definition: "Teste ortop��dico espec�­fico utilizado para detectar a frouxid�£o da articula�§�£o coxofemoral em c�£es jovens (indicativo de Displasia Coxofemoral)." },
      { term: "Teste de Gaveta Cranial", definition: "Manobra semiol�³gica que avalia a instabilidade do joelho. Positivo quando a t�­bia se desloca cranialmente em rela�§�£o ao f�ªmur, indicando ruptura do Ligamento Cruzado Cranial." },
      { term: "Teste de Compress�£o Tibial", definition: "Teste indireto para avaliar a integridade do Ligamento Cruzado Cranial simulando a carga de peso no membro p��lvico." },
      { term: "TPLO (Osteotomia de Nivelamento do Plat�´ Tibial)", definition: "T��cnica cir�ºrgica que altera a biomec�¢nica do joelho nivelando o plat�´ tibial, anulando a necessidade do ligamento cruzado cranial." },
      { term: "TTA (Avan�§amento da Tuberosidade Tibial)", definition: "T��cnica cir�ºrgica que neutraliza as for�§as de cisalhamento do joelho avan�§ando a inser�§�£o do ligamento patelar." },
      { term: "Displasia Coxofemoral", definition: "Doen�§a de desenvolvimento e heredit�¡ria caracterizada pela m�¡ forma�§�£o e incongru�ªncia da articula�§�£o do quadril, levando �  osteoartrose secund�¡ria." },
      { term: "Luxa�§�£o Patelar", definition: "Deslocamento da patela de seu local anat�´mico normal (sulco troclear), podendo ser medial (mais comum em ra�§as pequenas) ou lateral." },
      { term: "Artrodese", definition: "Procedimento cir�ºrgico que promove a fus�£o �³ssea permanente de uma articula�§�£o, eliminando o movimento e a dor." },
      { term: "Osteoss�­ntese", definition: "Cirurgia de redu�§�£o e fixa�§�£o de fraturas �³sseas utilizando implantes como placas, parafusos, pinos e hastes." },
      { term: "Osteocondrite Dissecante (OCD)", definition: "Falha na ossifica�§�£o endocondral que resulta no espessamento e posterior desprendimento de um retalho de cartilagem articular (flap), comum no ombro de c�£es jovens." },
      { term: "N�£o-uni�£o", definition: "Complica�§�£o onde ocorre a falha definitiva na consolida�§�£o (cicatriza�§�£o) de uma fratura �³ssea." },
      { term: "Calo �“sseo", definition: "Forma�§�£o de tecido �³sseo e cartilaginoso imaturo que estabiliza e cicatriza uma fratura ao longo das semanas." },
      { term: "Sinal da Almofada de Gordura", definition: "Achado radiogr�¡fico onde h�¡ compress�£o da gordura infrapatelar indicando efus�£o articular severa (l�­quido na articula�§�£o do joelho)." },
      { term: "Goniometria", definition: "Mensura�§�£o dos �¢ngulos de flex�£o e extens�£o das articula�§�µes, muito utilizada para avaliar a amplitude de movimento (ADM) na fisioterapia ortop��dica." },
      { term: "Contratura Muscular", definition: "Encurtamento anormal e permanente de um m�ºsculo ou tend�£o, comum na contratura do m�ºsculo infraespinhoso ou quadr�­ceps." },
      { term: "Necrose Ass��ptica da Cabe�§a do F�ªmur (Doen�§a de Legg-Calv��-Perthes)", definition: "Condi�§�£o onde h�¡ interrup�§�£o do suprimento sangu�­neo para a cabe�§a femoral, causando necrose e dor severa. Afeta tipicamente c�£es jovens de ra�§as toy/pequenas." },
      { term: "Panoste�­te", definition: "Inflama�§�£o da cavidade medular dos ossos longos que causa dor intermitente e claudica�§�£o migrat�³ria em c�£es jovens de ra�§as grandes em fase de crescimento." },
      { term: "Les�£o Neurop�¡tica", definition: "�‰ o termo mais correto e espec�­fico. Ele indica uma patologia ou dano estrutural direto nos pr�³prios nervos (como na neuropatia diab��tica ou compress�µes nervosas)." },
      { term: "Padr�£o Neurog�ªnico (na Eletromiografia)", definition: "Em exames de SNM, usa-se 'padr�£o neurog�ªnico' para diferenciar um problema que nasce no nervo (neurog�ªnico) de um problema que nasce diretamente no m�ºsculo (miop�¡tico)." },
      { term: "T�´nus Muscular", definition: "Natureza: �‰ um estado permanente e cont�­nuo. Est�­mulo: �‰ gerado pelo estiramento passivo e constante do m�ºsculo (gravidade), detectado pelo fuso muscular (reflexo miot�¡tico). Fun�§�£o: Manter a postura, a estabilidade das articula�§�µes e a prontid�£o motora. Resultado: N�£o gera um movimento vis�­vel; � apenas uma tens�£o de base." },
      { term: "Reflexo de Retirada (Reflexo Flexor)", definition: "Natureza: �‰ uma resposta tempor�¡ria, r�¡pida e abrupta. Est�­mulo: �‰ ativado exclusivamente por um est�­mulo nocivo ou doloroso (como pisar em um prego ou tocar em uma superf�­cie muito quente), detectado por nociceptores. Fun�§�£o: Prote�§�£o imediata e sobreviv�ªncia do organismo. Resultado: Gera um movimento motor vigoroso (ex: flex�£o r�¡pida da perna ou do bra�§o) para afastar o corpo do perigo." },
      { term: "Intumesc�ªncia Cervicotor�¡cica", definition: "Espessamento da medula espinhal (segmentos C6-T2). �‰ a regi�£o onde se originam os nervos espinhais que formam o plexo braquial, respons�¡vel pela inerva�§�£o dos membros tor�¡cicos (anteriores)." },
      { term: "Intumesc�ªncia Lombossacra", definition: "Espessamento da medula espinhal (segmentos L4-S3). �‰ a regi�£o onde se originam os nervos espinhais que formam o plexo lombossacro, respons�¡vel pela inerva�§�£o dos membros p��lvicos (posteriores)." }
    ],
  },
  
  {
    id: "neuro-basica",
    title: "Desvendando a Neurologia Cl�­nica",
    specialty: "Neurologia",
    description: "Aprenda a realizar o exame neurol�³gico perfeito. Saiba como localizar a les�£o no sistema nervoso e definir se o caso � cir�ºrgico ou cl�­nico com seguran�§a.",
    cover: neuro,
    hours: 30,
    modules: 6,
    lessons: 45,
    students: 0,
    progress: 0,
    teacher: teachers[1], // Dr. Renan
    level: "Intermedi�¡rio",
    featured: false,
    purchased: false,
  },
  {
    id: "hemato-descomplicada",
    title: "Hemograma na Pr�¡tica Veterin�¡ria",
    specialty: "Hematologia",
    description: "Pare de ler apenas os n�ºmeros do hemograma. Entenda o que as c��lulas est�£o te dizendo e feche diagn�³sticos ocultos com a Dra. Carolina.",
    cover: derma, // Usando uma imagem gen��rica como fallback
    hours: 15,
    modules: 4,
    lessons: 20,
    students: 0,
    progress: 0,
    teacher: teachers[2], // Dra. Carolina
    level: "Iniciante",
    featured: false,
    purchased: false,
  },
  {
    id: "emergencia-intensiva",
    title: "Suporte B�¡sico e Avan�§ado de Vida",
    specialty: "Emerg�ªncia",
    description: "Saiba exatamente o que fazer nos primeiros 5 minutos de uma emerg�ªncia. Protocolos de RCP, fluidoterapia e estabiliza�§�£o de pacientes cr�­ticos.",
    cover: cardio, // Usando uma imagem gen��rica como fallback
    hours: 40,
    modules: 8,
    lessons: 60,
    students: 0,
    progress: 0,
    teacher: teachers[3], // Dra. Nathalia
    level: "Avan�§ado",
    featured: true,
    purchased: false,
  },
  {
    id: "clinica-medica",
    title: "Cl�­nica M��dica de Pequenos Animais",
    specialty: "Cl�­nica M��dica",
    description: "Aprenda a conduzir o atendimento cl�­nico do dia a dia de forma assertiva, com protocolos atualizados e foco total na resolu�§�£o dos casos.",
    cover: derma, // Usando imagem de fallback
    hours: 50,
    modules: 10,
    lessons: 80,
    students: 0,
    progress: 0,
    teacher: teachers[3], // Dra. Nathalia
    level: "Intermedi�¡rio",
    featured: true,
    purchased: false,
  }
];

export const specialties = [
  "Ortopedia", "Neurologia", "Gest�£o", "Hematologia", "Emerg�ªncia", "Cl�­nica M��dica"
];

export const ortopediaModules = [
  {
    id: 1,
    title: "M�³dulo 1 �€” Introdu�§�£o �  Ortopedia Cl�­nica",
    done: true,
    topics: [
      "Biomec�¢nica do c�£o e gato na cl�­nica m��dica",
      "Descomplicando a neuroanatomia",
      "Como realizar uma avalia�§�£o cl�­nica de excel�ªncia",
      "Biologia x score da les�£o ortop��dica",
      "Montando uma anamnese ortop��dica",
      "Altera�§�µes ortop��dicas cl�¡ssicas e como trat�¡-las"
    ]
  },
  {
    id: 2,
    title: "M�³dulo 2 �€” Diferenciando les�£o motora muscular x neurol�³gica",
    done: false,
    topics: ["Sinais cl�­nicos", "Testes de reflexo", "Casos pr�¡ticos de diagn�³stico diferencial"]
  },
  {
    id: 3,
    title: "M�³dulo 3 �€” Tratando les�µes ortop��dicas",
    done: false,
    topics: ["Protocolos de tratamento conservador", "Indica�§�µes cir�ºrgicas", "Manejo da dor"]
  },
  {
    id: 4,
    title: "M�³dulo 4 �€” A conex�£o com o tutor � o sucesso do tratamento",
    done: false,
    topics: ["Como comunicar o diagn�³stico", "Alinhando expectativas", "Ades�£o ao tratamento em casa"]
  },
  {
    id: 5,
    title: "M�³dulo 5 �€” Manejo Alimentar",
    done: false,
    topics: [
      "Import�¢ncia da nutri�§�£o na recupera�§�£o ortop��dica",
      "Suplementa�§�£o: Condroprotetores e �”mega-3",
      "Controle e manejo de peso no paciente osteoartr�³sico",
      "Dietas terap�ªuticas e prescri�§�£o nutricional",
      "Casos pr�¡ticos de evolu�§�£o com suporte nutricional"
    ]
  },
  {
    id: 6,
    title: "M�³dulo 6 �€” Tipos de Exames na Ortopedia e Neurologia",
    done: false,
    topics: [
      "Radiografia Simples vs. Contrastada: Indica�§�µes cruciais",
      "Tomografia Computadorizada (TC): Quando o Raio-X n�£o � suficiente?",
      "Resson�¢ncia Magn��tica (RM): O padr�£o-ouro para les�µes neurol�³gicas",
      "Diferenciais e Crit��rios de Encaminhamento: Quando e qual exame solicitar"
    ]
  },
  {
    id: 7,
    title: "M�³dulo 7 �€” 90% das altera�§�µes que v�£o chegar na sua cl�­nica",
    done: false,
    topics: [
      "Displasia Coxofemoral",
      "Ruptura de Ligamento Cruzado Cranial (RLCC)",
      "Artrose Articular",
      "Doen�§a do Disco Intervertebral (DDIV)",
      "Altera�§�µes Metab�³licas"
    ]
  }
];


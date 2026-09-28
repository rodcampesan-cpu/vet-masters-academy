import ortho from "@/assets/course-ortho.jpg";
import cardio from "@/assets/course-cardio.jpg";
import derma from "@/assets/course-derma.jpg";
import neuro from "@/assets/course-neuro.jpg";
import t1 from "@/assets/dr-rodrigo.png";
import draNathaliaImg from "@/assets/dra-nathalia.jpg";
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
  level: "Iniciante" | "Intermedi├írio" | "Avan├ºado";
  featured?: boolean;
  purchased?: boolean;
  externalLink?: string;
  glossary?: GlossaryTerm[];
}

export const teachers: Teacher[] = [
  {
    id: "t1", name: "Dr. Rodrigo Nicola", title: "M├®dico Veterin├írio",
    specialty: "Ortopedia e Neurocirurgia", avatar: t1, avatarPosition: "center 30%",
    bioTopics: [
      { label: "Forma├º├úo", value: "Universidade Anhanguera de S├úo Paulo" },
      { label: "Resid├¬ncia", value: "Ortopedia ÔÇö Associa├º├úo Anclivepa SP" },
      { label: "P├│s-Gradua├º├úo", value: "Ortopedia e Neurocirurgia ÔÇö Anclivepa SP" },
      { label: "Especializa├º├úo", value: "Master Avan├ºado em Ortopedia ÔÇö Anclivepa SP" },
      { label: "Associa├º├úo", value: "Membro da O.A. Internacional" },
      { label: "Atua├º├úo", value: "Chefe de Ortopedia e Neurologia ÔÇö Dr. Pets Santo Andr├®" },
      { label: "Experi├¬ncia", value: "Empres├írio h├í mais de 25 anos no mercado Pet" },
    ],
  },
  {
    id: "t2", name: "Dr. Renan Dias", title: "Especialista em Neurologia",
    specialty: "Neurologista", avatar: t2, avatarPosition: "center 15%",
    bioTopics: [
      { label: "Especialidade", value: "Neurologia Veterin├íria" },
      { label: "Atua├º├úo", value: "Atendimento cl├¡nico especializado em neurologia" },
    ],
  },
  {
    id: "t3", name: "Dra. Carolina", title: "Especialista em Hematologia",
    specialty: "Hematologista", avatar: "https://i.pravatar.cc/150?img=5",
    bioTopics: [
      { label: "Especialidade", value: "Hematologia Veterin├íria" },
      { label: "Atua├º├úo", value: "Diagn├│stico e tratamento de doen├ºas sangu├¡neas" },
    ],
  },
  {
    id: "t4", name: "Dra. Nathalia Cristina", title: "Especialista em Cl├¡nica M├®dica",
    specialty: "Cl├¡nica M├®dica", avatar: draNathaliaImg,
    bioTopics: [
      { label: "Especialidade", value: "Cl├¡nica M├®dica" },
      { label: "Atua├º├úo", value: "Atendimento de rotina e acompanhamento cl├¡nico" },
    ],
  },
];

export const courses: Course[] = [
  {
    id: "mentoria-flix",
    title: "Mentoria Flix: M├®todo P.E.T.",
    specialty: "Gest├úo",
    description: "Transforme seu neg├│cio pet. Aprenda gest├úo, estrutura├º├úo, contrata├º├úo e vendas com quem j├í construiu empresas s├│lidas na medicina veterin├íria.",
    cover: mentoriaFlixImg,
    hours: 20,
    modules: 8,
    lessons: 30,
    students: 0,
    progress: 0,
    teacher: teachers[0],
    level: "Avan├ºado",
    purchased: false,
    externalLink: "https://mentoriaflix.com.br",
  },
  {
    id: "ortopedia-avancada",
    title: "Ortopedia Cl├¡nica de Excel├¬ncia",
    specialty: "Ortopedia",
    description:
      "Domine a ortopedia cl├¡nica sem precisar operar. Aprenda a diagnosticar com seguran├ºa, solicitar exames precisos e conduzir atendimentos que encantam o tutor, gerando confian├ºa absoluta na sua conduta m├®dica.",
    cover: ortho,
    hours: 48,
    modules: 12,
    lessons: 86,
    students: 0,
    progress: 0,
    teacher: teachers[0],
    level: "Avan├ºado",
    featured: true,
    purchased: false,
    glossary: [
      { term: "Claudica├º├úo", definition: "Falta de firmeza ou assimetria no andar, popularmente conhecido como 'mancar'. Pode ser de apoio (dor ao pisar) ou de eleva├º├úo (dor ao mover o membro)." },
      { term: "Crepita├º├úo", definition: "Ru├¡do ou sensa├º├úo de atrito (ro├ºar) de ossos ou cartilagens desgastadas durante o movimento articular ou ├á palpa├º├úo de fraturas." },
      { term: "Sinal de Ortolani", definition: "Teste ortop├®dico espec├¡fico utilizado para detectar a frouxid├úo da articula├º├úo coxofemoral em c├úes jovens (indicativo de Displasia Coxofemoral)." },
      { term: "Teste de Gaveta Cranial", definition: "Manobra semiol├│gica que avalia a instabilidade do joelho. Positivo quando a t├¡bia se desloca cranialmente em rela├º├úo ao f├¬mur, indicando ruptura do Ligamento Cruzado Cranial." },
      { term: "Teste de Compress├úo Tibial", definition: "Teste indireto para avaliar a integridade do Ligamento Cruzado Cranial simulando a carga de peso no membro p├®lvico." },
      { term: "TPLO (Osteotomia de Nivelamento do Plat├┤ Tibial)", definition: "T├®cnica cir├║rgica que altera a biomec├ónica do joelho nivelando o plat├┤ tibial, anulando a necessidade do ligamento cruzado cranial." },
      { term: "TTA (Avan├ºamento da Tuberosidade Tibial)", definition: "T├®cnica cir├║rgica que neutraliza as for├ºas de cisalhamento do joelho avan├ºando a inser├º├úo do ligamento patelar." },
      { term: "Displasia Coxofemoral", definition: "Doen├ºa de desenvolvimento e heredit├íria caracterizada pela m├í forma├º├úo e incongru├¬ncia da articula├º├úo do quadril, levando ├á osteoartrose secund├íria." },
      { term: "Luxa├º├úo Patelar", definition: "Deslocamento da patela de seu local anat├┤mico normal (sulco troclear), podendo ser medial (mais comum em ra├ºas pequenas) ou lateral." },
      { term: "Artrodese", definition: "Procedimento cir├║rgico que promove a fus├úo ├│ssea permanente de uma articula├º├úo, eliminando o movimento e a dor." },
      { term: "Osteoss├¡ntese", definition: "Cirurgia de redu├º├úo e fixa├º├úo de fraturas ├│sseas utilizando implantes como placas, parafusos, pinos e hastes." },
      { term: "Osteocondrite Dissecante (OCD)", definition: "Falha na ossifica├º├úo endocondral que resulta no espessamento e posterior desprendimento de um retalho de cartilagem articular (flap), comum no ombro de c├úes jovens." },
      { term: "N├úo-uni├úo", definition: "Complica├º├úo onde ocorre a falha definitiva na consolida├º├úo (cicatriza├º├úo) de uma fratura ├│ssea." },
      { term: "Calo ├ôsseo", definition: "Forma├º├úo de tecido ├│sseo e cartilaginoso imaturo que estabiliza e cicatriza uma fratura ao longo das semanas." },
      { term: "Sinal da Almofada de Gordura", definition: "Achado radiogr├ífico onde h├í compress├úo da gordura infrapatelar indicando efus├úo articular severa (l├¡quido na articula├º├úo do joelho)." },
      { term: "Goniometria", definition: "Mensura├º├úo dos ├óngulos de flex├úo e extens├úo das articula├º├Áes, muito utilizada para avaliar a amplitude de movimento (ADM) na fisioterapia ortop├®dica." },
      { term: "Contratura Muscular", definition: "Encurtamento anormal e permanente de um m├║sculo ou tend├úo, comum na contratura do m├║sculo infraespinhoso ou quadr├¡ceps." },
      { term: "Necrose Ass├®ptica da Cabe├ºa do F├¬mur (Doen├ºa de Legg-Calv├®-Perthes)", definition: "Condi├º├úo onde h├í interrup├º├úo do suprimento sangu├¡neo para a cabe├ºa femoral, causando necrose e dor severa. Afeta tipicamente c├úes jovens de ra├ºas toy/pequenas." },
      { term: "Panoste├¡te", definition: "Inflama├º├úo da cavidade medular dos ossos longos que causa dor intermitente e claudica├º├úo migrat├│ria em c├úes jovens de ra├ºas grandes em fase de crescimento." },
      { term: "Les├úo Neurop├ítica", definition: "├ë o termo mais correto e espec├¡fico. Ele indica uma patologia ou dano estrutural direto nos pr├│prios nervos (como na neuropatia diab├®tica ou compress├Áes nervosas)." },
      { term: "Padr├úo Neurog├¬nico (na Eletromiografia)", definition: "Em exames de SNM, usa-se 'padr├úo neurog├¬nico' para diferenciar um problema que nasce no nervo (neurog├¬nico) de um problema que nasce diretamente no m├║sculo (miop├ítico)." },
      { term: "T├┤nus Muscular", definition: "Natureza: ├ë um estado permanente e cont├¡nuo. Est├¡mulo: ├ë gerado pelo estiramento passivo e constante do m├║sculo (gravidade), detectado pelo fuso muscular (reflexo miot├ítico). Fun├º├úo: Manter a postura, a estabilidade das articula├º├Áes e a prontid├úo motora. Resultado: N├úo gera um movimento vis├¡vel; ├® apenas uma tens├úo de base." },
      { term: "Reflexo de Retirada (Reflexo Flexor)", definition: "Natureza: ├ë uma resposta tempor├íria, r├ípida e abrupta. Est├¡mulo: ├ë ativado exclusivamente por um est├¡mulo nocivo ou doloroso (como pisar em um prego ou tocar em uma superf├¡cie muito quente), detectado por nociceptores. Fun├º├úo: Prote├º├úo imediata e sobreviv├¬ncia do organismo. Resultado: Gera um movimento motor vigoroso (ex: flex├úo r├ípida da perna ou do bra├ºo) para afastar o corpo do perigo." },
      { term: "Intumesc├¬ncia Cervicotor├ícica", definition: "Espessamento da medula espinhal (segmentos C6-T2). ├ë a regi├úo onde se originam os nervos espinhais que formam o plexo braquial, respons├ível pela inerva├º├úo dos membros tor├ícicos (anteriores)." },
      { term: "Intumesc├¬ncia Lombossacra", definition: "Espessamento da medula espinhal (segmentos L4-S3). ├ë a regi├úo onde se originam os nervos espinhais que formam o plexo lombossacro, respons├ível pela inerva├º├úo dos membros p├®lvicos (posteriores)." }
    ],
  },
  {
    id: "neuro-basica",
    title: "Desvendando a Neurologia Cl├¡nica",
    specialty: "Neurologia",
    description: "Aprenda a realizar o exame neurol├│gico perfeito. Saiba como localizar a les├úo no sistema nervoso e definir se o caso ├® cir├║rgico ou cl├¡nico com seguran├ºa.",
    cover: neuro,
    hours: 30,
    modules: 6,
    lessons: 45,
    students: 0,
    progress: 0,
    teacher: teachers[1], // Dr. Renan
    level: "Intermedi├írio",
    featured: false,
    purchased: false,
  },
  {
    id: "hemato-descomplicada",
    title: "Hemograma na Pr├ítica Veterin├íria",
    specialty: "Hematologia",
    description: "Pare de ler apenas os n├║meros do hemograma. Entenda o que as c├®lulas est├úo te dizendo e feche diagn├│sticos ocultos com a Dra. Carolina.",
    cover: derma, // Usando uma imagem gen├®rica como fallback
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
    title: "Suporte B├ísico e Avan├ºado de Vida",
    specialty: "Emerg├¬ncia",
    description: "Saiba exatamente o que fazer nos primeiros 5 minutos de uma emerg├¬ncia. Protocolos de RCP, fluidoterapia e estabiliza├º├úo de pacientes cr├¡ticos.",
    cover: cardio, // Usando uma imagem gen├®rica como fallback
    hours: 40,
    modules: 8,
    lessons: 60,
    students: 0,
    progress: 0,
    teacher: teachers[3], // Dra. Nathalia
    level: "Avan├ºado",
    featured: true,
    purchased: false,
  },
  {
    id: "clinica-medica",
    title: "Cl├¡nica M├®dica de Pequenos Animais",
    specialty: "Cl├¡nica M├®dica",
    description: "Aprenda a conduzir o atendimento cl├¡nico do dia a dia de forma assertiva, com protocolos atualizados e foco total na resolu├º├úo dos casos.",
    cover: derma, // Usando imagem de fallback
    hours: 50,
    modules: 10,
    lessons: 80,
    students: 0,
    progress: 0,
    teacher: teachers[3], // Dra. Nathalia
    level: "Intermedi├írio",
    featured: true,
    purchased: false,
  }
];

export const specialties = [
  "Ortopedia", "Neurologia", "Gest├úo", "Hematologia", "Emerg├¬ncia", "Cl├¡nica M├®dica"
];

export const ortopediaModules = [
  {
    id: 1,
    title: "M├│dulo 1 ÔÇö Introdu├º├úo ├á Ortopedia Cl├¡nica",
    done: true,
    topics: [
      "Biomec├ónica do c├úo e gato na cl├¡nica m├®dica",
      "Descomplicando a neuroanatomia",
      "Como realizar uma avalia├º├úo cl├¡nica de excel├¬ncia",
      "Biologia x score da les├úo ortop├®dica",
      "Montando uma anamnese ortop├®dica",
      "Altera├º├Áes ortop├®dicas cl├íssicas e como trat├í-las"
    ]
  },
  {
    id: 2,
    title: "M├│dulo 2 ÔÇö Diferenciando les├úo motora muscular x neurol├│gica",
    done: false,
    topics: ["Sinais cl├¡nicos", "Testes de reflexo", "Casos pr├íticos de diagn├│stico diferencial"]
  },
  {
    id: 3,
    title: "M├│dulo 3 ÔÇö Tratando les├Áes ortop├®dicas",
    done: false,
    topics: ["Protocolos de tratamento conservador", "Indica├º├Áes cir├║rgicas", "Manejo da dor"]
  },
  {
    id: 4,
    title: "M├│dulo 4 ÔÇö A conex├úo com o tutor ├® o sucesso do tratamento",
    done: false,
    topics: ["Como comunicar o diagn├│stico", "Alinhando expectativas", "Ades├úo ao tratamento em casa"]
  },
  {
    id: 5,
    title: "M├│dulo 5 ÔÇö Manejo Alimentar",
    done: false,
    topics: [
      "Import├óncia da nutri├º├úo na recupera├º├úo ortop├®dica",
      "Suplementa├º├úo: Condroprotetores e ├ömega-3",
      "Controle e manejo de peso no paciente osteoartr├│sico",
      "Dietas terap├¬uticas e prescri├º├úo nutricional",
      "Casos pr├íticos de evolu├º├úo com suporte nutricional"
    ]
  },
  {
    id: 6,
    title: "M├│dulo 6 ÔÇö Tipos de Exames na Ortopedia e Neurologia",
    done: false,
    topics: [
      "Radiografia Simples vs. Contrastada: Indica├º├Áes cruciais",
      "Tomografia Computadorizada (TC): Quando o Raio-X n├úo ├® suficiente?",
      "Resson├óncia Magn├®tica (RM): O padr├úo-ouro para les├Áes neurol├│gicas",
      "Diferenciais e Crit├®rios de Encaminhamento: Quando e qual exame solicitar"
    ]
  },
  {
    id: 7,
    title: "M├│dulo 7 ÔÇö 90% das altera├º├Áes que v├úo chegar na sua cl├¡nica",
    done: false,
    topics: [
      "Displasia Coxofemoral",
      "Ruptura de Ligamento Cruzado Cranial (RLCC)",
      "Artrose Articular",
      "Doen├ºa do Disco Intervertebral (DDIV)",
      "Altera├º├Áes Metab├│licas"
    ]
  }
];

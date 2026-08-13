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
  level: "Iniciante" | "Intermediário" | "Avançado";
  featured?: boolean;
  purchased?: boolean;
  externalLink?: string;
  glossary?: GlossaryTerm[];
}

export const teachers: Teacher[] = [
  {
    id: "t1", name: "Dr. Rodrigo Nicola", title: "Médico Veterinário",
    specialty: "Ortopedia e Neurocirurgia", avatar: t1, avatarPosition: "center 30%",
    bioTopics: [
      { label: "Formação", value: "Universidade Anhanguera de São Paulo" },
      { label: "Residência", value: "Ortopedia — Associação Anclivepa SP" },
      { label: "Pós-Graduação", value: "Ortopedia e Neurocirurgia — Anclivepa SP" },
      { label: "Especialização", value: "Master Avançado em Ortopedia — Anclivepa SP" },
      { label: "Associação", value: "Membro da O.A. Internacional" },
      { label: "Atuação", value: "Chefe de Ortopedia e Neurologia — Dr. Pets Santo André" },
      { label: "Experiência", value: "Empresário há mais de 25 anos no mercado Pet" },
    ],
  },
  {
    id: "t2", name: "Dr. Renan Dias", title: "Especialista em Neurologia",
    specialty: "Neurologista e Neurocirurgião", avatar: t2, avatarPosition: "center 15%",
    bioTopics: [
      { label: "Especialidade", value: "Neurologia e Neurocirurgia Veterinária" },
      { label: "Atuação", value: "Atendimento clínico especializado em neurologia" },
    ],
  },
  {
    id: "t3", name: "Dra. Carolina", title: "Especialista em Hematologia",
    specialty: "Hematologista", avatar: "https://i.pravatar.cc/150?img=5",
    bioTopics: [
      { label: "Especialidade", value: "Hematologia Veterinária" },
      { label: "Atuação", value: "Diagnóstico e tratamento de doenças sanguíneas" },
    ],
  },
  {
    id: "t4", name: "Dra. Nathalia Cristina", title: "Especialista em Emergência",
    specialty: "Intensivista", avatar: "https://i.pravatar.cc/150?img=9",
    bioTopics: [
      { label: "Especialidade", value: "Medicina de Emergência e Terapia Intensiva" },
      { label: "Atuação", value: "Atendimento de pacientes críticos em UTI veterinária" },
    ],
  },
];

export const courses: Course[] = [
  {
    id: "ortopedia-avancada",
    title: "Ortopedia Clínica de Excelência",
    specialty: "Ortopedia",
    description:
      "Domine a ortopedia clínica sem precisar operar. Aprenda a diagnosticar com segurança, solicitar exames precisos e conduzir atendimentos que encantam o tutor, gerando confiança absoluta na sua conduta médica.",
    cover: ortho,
    hours: 48,
    modules: 12,
    lessons: 86,
    students: 0,
    progress: 0,
    teacher: teachers[0],
    level: "Avançado",
    featured: true,
    purchased: true,
    glossary: [
      { term: "Claudicação", definition: "Falta de firmeza ou assimetria no andar, popularmente conhecido como 'mancar'. Pode ser de apoio (dor ao pisar) ou de elevação (dor ao mover o membro)." },
      { term: "Crepitação", definition: "Ruído ou sensação de atrito (roçar) de ossos ou cartilagens desgastadas durante o movimento articular ou à palpação de fraturas." },
      { term: "Sinal de Ortolani", definition: "Teste ortopédico específico utilizado para detectar a frouxidão da articulação coxofemoral em cães jovens (indicativo de Displasia Coxofemoral)." },
      { term: "Teste de Gaveta Cranial", definition: "Manobra semiológica que avalia a instabilidade do joelho. Positivo quando a tíbia se desloca cranialmente em relação ao fêmur, indicando ruptura do Ligamento Cruzado Cranial." },
      { term: "Teste de Compressão Tibial", definition: "Teste indireto para avaliar a integridade do Ligamento Cruzado Cranial simulando a carga de peso no membro pélvico." },
      { term: "TPLO (Osteotomia de Nivelamento do Platô Tibial)", definition: "Técnica cirúrgica que altera a biomecânica do joelho nivelando o platô tibial, anulando a necessidade do ligamento cruzado cranial." },
      { term: "TTA (Avançamento da Tuberosidade Tibial)", definition: "Técnica cirúrgica que neutraliza as forças de cisalhamento do joelho avançando a inserção do ligamento patelar." },
      { term: "Displasia Coxofemoral", definition: "Doença de desenvolvimento e hereditária caracterizada pela má formação e incongruência da articulação do quadril, levando à osteoartrose secundária." },
      { term: "Luxação Patelar", definition: "Deslocamento da patela de seu local anatômico normal (sulco troclear), podendo ser medial (mais comum em raças pequenas) ou lateral." },
      { term: "Artrodese", definition: "Procedimento cirúrgico que promove a fusão óssea permanente de uma articulação, eliminando o movimento e a dor." },
      { term: "Osteossíntese", definition: "Cirurgia de redução e fixação de fraturas ósseas utilizando implantes como placas, parafusos, pinos e hastes." },
      { term: "Osteocondrite Dissecante (OCD)", definition: "Falha na ossificação endocondral que resulta no espessamento e posterior desprendimento de um retalho de cartilagem articular (flap), comum no ombro de cães jovens." },
      { term: "Não-união", definition: "Complicação onde ocorre a falha definitiva na consolidação (cicatrização) de uma fratura óssea." },
      { term: "Calo Ósseo", definition: "Formação de tecido ósseo e cartilaginoso imaturo que estabiliza e cicatriza uma fratura ao longo das semanas." },
      { term: "Sinal da Almofada de Gordura", definition: "Achado radiográfico onde há compressão da gordura infrapatelar indicando efusão articular severa (líquido na articulação do joelho)." },
      { term: "Goniometria", definition: "Mensuração dos ângulos de flexão e extensão das articulações, muito utilizada para avaliar a amplitude de movimento (ADM) na fisioterapia ortopédica." },
      { term: "Contratura Muscular", definition: "Encurtamento anormal e permanente de um músculo ou tendão, comum na contratura do músculo infraespinhoso ou quadríceps." },
      { term: "Necrose Asséptica da Cabeça do Fêmur (Doença de Legg-Calvé-Perthes)", definition: "Condição onde há interrupção do suprimento sanguíneo para a cabeça femoral, causando necrose e dor severa. Afeta tipicamente cães jovens de raças toy/pequenas." },
      { term: "Panosteíte", definition: "Inflamação da cavidade medular dos ossos longos que causa dor intermitente e claudicação migratória em cães jovens de raças grandes em fase de crescimento." }
    ],
  },
  {
    id: "mentoria-flix",
    title: "Mentoria Flix: Método P.E.T.",
    specialty: "Gestão",
    description: "Transforme seu negócio pet. Aprenda gestão, estruturação, contratação e vendas com quem já construiu empresas sólidas na medicina veterinária.",
    cover: mentoriaFlixImg,
    hours: 20,
    modules: 8,
    lessons: 30,
    students: 0,
    progress: 0,
    teacher: teachers[0],
    level: "Avançado",
    purchased: false,
    externalLink: "https://mentoriaflix.com.br",
  },
  {
    id: "neuro-basica",
    title: "Desvendando a Neurologia Clínica",
    specialty: "Neurologia",
    description: "Aprenda a realizar o exame neurológico perfeito. Saiba como localizar a lesão no sistema nervoso e definir se o caso é cirúrgico ou clínico com segurança.",
    cover: neuro,
    hours: 30,
    modules: 6,
    lessons: 45,
    students: 0,
    progress: 0,
    teacher: teachers[1], // Dr. Renan
    level: "Intermediário",
    featured: false,
    purchased: false,
  },
  {
    id: "hemato-descomplicada",
    title: "Hemograma na Prática Veterinária",
    specialty: "Hematologia",
    description: "Pare de ler apenas os números do hemograma. Entenda o que as células estão te dizendo e feche diagnósticos ocultos com a Dra. Carolina.",
    cover: derma, // Usando uma imagem genérica como fallback
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
    title: "Suporte Básico e Avançado de Vida",
    specialty: "Emergência",
    description: "Saiba exatamente o que fazer nos primeiros 5 minutos de uma emergência. Protocolos de RCP, fluidoterapia e estabilização de pacientes críticos.",
    cover: cardio, // Usando uma imagem genérica como fallback
    hours: 40,
    modules: 8,
    lessons: 60,
    students: 0,
    progress: 0,
    teacher: teachers[3], // Dra. Nathalia
    level: "Avançado",
    featured: true,
    purchased: false,
  }
];

export const specialties = [
  "Ortopedia", "Neurologia", "Gestão", "Hematologia", "Emergência"
];

export const ortopediaModules = [
  {
    id: 1,
    title: "Módulo 1 — Introdução à Ortopedia Clínica",
    done: true,
    topics: [
      "Biomecânica do cão e gato na clínica médica",
      "Como realizar uma avaliação clínica de excelência",
      "Biologia x score da lesão ortopédica",
      "Montando uma anamnese ortopédica",
      "Alterações ortopédicas clássicas e como tratá-las"
    ]
  },
  {
    id: 2,
    title: "Módulo 2 — Diferenciando lesão motora muscular x neurológica",
    done: false,
    topics: ["Sinais clínicos", "Testes de reflexo", "Casos práticos de diagnóstico diferencial"]
  },
  {
    id: 3,
    title: "Módulo 3 — Tratando lesões ortopédicas",
    done: false,
    topics: ["Protocolos de tratamento conservador", "Indicações cirúrgicas", "Manejo da dor"]
  },
  {
    id: 4,
    title: "Módulo 4 — A conexão com o tutor é o sucesso do tratamento",
    done: false,
    topics: ["Como comunicar o diagnóstico", "Alinhando expectativas", "Adesão ao tratamento em casa"]
  },
  {
    id: 5,
    title: "Módulo 5 — Manejo Alimentar",
    done: false,
    topics: [
      "Importância da nutrição na recuperação ortopédica",
      "Suplementação: Condroprotetores e Ômega-3",
      "Controle e manejo de peso no paciente osteoartrósico",
      "Dietas terapêuticas e prescrição nutricional",
      "Casos práticos de evolução com suporte nutricional"
    ]
  },
  {
    id: 6,
    title: "Módulo 6 — Tipos de Exames na Ortopedia e Neurologia",
    done: false,
    topics: [
      "Radiografia Simples vs. Contrastada: Indicações cruciais",
      "Tomografia Computadorizada (TC): Quando o Raio-X não é suficiente?",
      "Ressonância Magnética (RM): O padrão-ouro para lesões neurológicas",
      "Diferenciais e Critérios de Encaminhamento: Quando e qual exame solicitar"
    ]
  },
  {
    id: 7,
    title: "Módulo 7 — 90% das alterações que vão chegar na sua clínica",
    done: false,
    topics: [
      "Displasia Coxofemoral",
      "Ruptura de Ligamento Cruzado Cranial (RLCC)",
      "Artrose Articular",
      "Doença do Disco Intervertebral (DDIV)",
      "Alterações Metabólicas"
    ]
  }
];

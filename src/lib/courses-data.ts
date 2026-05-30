import ortho from "@/assets/course-ortho.jpg";
import cardio from "@/assets/course-cardio.jpg";
import derma from "@/assets/course-derma.jpg";
import neuro from "@/assets/course-neuro.jpg";
import t1 from "@/assets/dr-rodrigo.png";
import t2 from "@/assets/teacher-2.jpg";
import t3 from "@/assets/teacher-3.jpg";

export interface Teacher {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
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
}

export const teachers: Teacher[] = [
  { id: "t1", name: "Dr. Rodrigo Nicola", title: "Médico Veterinário de Respeito", specialty: "Ortopedia e Neurocirurgia", avatar: t1 },
  { id: "t2", name: "Dr. Renan Dias", title: "Especialista em Neurologia", specialty: "Neurologista e Neurocirurgião", avatar: t2 },
  { id: "t3", name: "Dr. Renan Dias", title: "Mestre em Neurologia", specialty: "Neurologista e Neurocirurgião", avatar: t2 },
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
    students: 1240,
    progress: 32,
    teacher: teachers[0],
    level: "Avançado",
    featured: true,
  },
  {
    id: "neurologia-essencial",
    title: "Neurologia Essencial",
    specialty: "Neurologia",
    description:
      "Exame neurológico passo a passo, localização de lesão e interpretação de exames complementares de neuroimagem.",
    cover: neuro,
    hours: 40,
    modules: 10,
    lessons: 71,
    students: 760,
    progress: 0,
    teacher: teachers[1],
    level: "Avançado",
  },
];

export const specialties = [
  "Ortopedia", "Neurologia"
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
    title: "Módulo 6 — 90% das alterações que vão chegar na sua clínica",
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

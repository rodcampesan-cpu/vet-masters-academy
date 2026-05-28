import ortho from "@/assets/course-ortho.jpg";
import cardio from "@/assets/course-cardio.jpg";
import derma from "@/assets/course-derma.jpg";
import neuro from "@/assets/course-neuro.jpg";
import t1 from "@/assets/teacher-1.jpg";
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
  { id: "t1", name: "Dr. Ricardo Almeida", title: "PhD em Cirurgia Veterinária", specialty: "Ortopedia & Neurocirurgia", avatar: t1 },
  { id: "t2", name: "Dra. Camila Souza", title: "Especialista em Cardiologia", specialty: "Cardiologia Veterinária", avatar: t2 },
  { id: "t3", name: "Dr. Eduardo Mendes", title: "Mestre em Diagnóstico por Imagem", specialty: "Neurologia & Imagem", avatar: t3 },
];

export const courses: Course[] = [
  {
    id: "ortopedia-avancada",
    title: "Ortopedia Avançada em Pequenos Animais",
    specialty: "Ortopedia",
    description:
      "Do diagnóstico ao procedimento cirúrgico: técnicas modernas em osteossíntese, manejo de fraturas complexas e reabilitação pós-cirúrgica.",
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
    id: "cardiologia-clinica",
    title: "Cardiologia Clínica Veterinária",
    specialty: "Cardiologia",
    description:
      "Interpretação de ECG, ecocardiograma e protocolos terapêuticos para cardiopatias mais prevalentes em cães e gatos.",
    cover: cardio,
    hours: 36,
    modules: 9,
    lessons: 62,
    students: 980,
    progress: 0,
    teacher: teachers[1],
    level: "Intermediário",
  },
  {
    id: "dermatologia-pratica",
    title: "Dermatologia Prática",
    specialty: "Dermatologia",
    description:
      "Abordagem sistemática das dermatopatias: do exame físico ao diagnóstico diferencial e tratamentos atualizados.",
    cover: derma,
    hours: 28,
    modules: 8,
    lessons: 54,
    students: 1530,
    progress: 0,
    teacher: teachers[1],
    level: "Iniciante",
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
    teacher: teachers[2],
  level: "Avançado",
  },
];

export const specialties = [
  "Ortopedia", "Neurologia", "Cardiologia", "Dermatologia",
  "Clínica Médica", "Diagnóstico por Imagem", "Oftalmologia", "Anestesiologia",
];

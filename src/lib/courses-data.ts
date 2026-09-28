import ortho from "@/assets/course-ortho.jpg";
import cardio from "@/assets/course-cardio.jpg";
import derma from "@/assets/course-derma.jpg";
import neuro from "@/assets/course-neuro.jpg";
import t1 from "@/assets/dr-rodrigo.png";
import t2 from "@/assets/teacher-2.jpg";
import t3 from "@/assets/teacher-3.jpg";
import mentoriaFlixImg from "@/assets/mentoria-flix.png";
import draNathaliaImg from "@/assets/dra-nathalia.jpg";

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
  level: "Iniciante" | "IntermediÃ¡rio" | "AvanÃ§ado";
  featured?: boolean;
  purchased?: boolean;
  externalLink?: string;
  glossary?: GlossaryTerm[];
}

export const teachers: Teacher[] = [
  {
    id: "t1", name: "Dr. Rodrigo Nicola", title: "MÃ©dico VeterinÃ¡rio",
    specialty: "Ortopedia e Neurocirurgia", avatar: t1, avatarPosition: "center 30%",
    bioTopics: [
      { label: "FormaÃ§Ã£o", value: "Universidade Anhanguera de SÃ£o Paulo" },
      { label: "ResidÃªncia", value: "Ortopedia â€” AssociaÃ§Ã£o Anclivepa SP" },
      { label: "PÃ³s-GraduaÃ§Ã£o", value: "Ortopedia e Neurocirurgia â€” Anclivepa SP" },
      { label: "EspecializaÃ§Ã£o", value: "Master AvanÃ§ado em Ortopedia â€” Anclivepa SP" },
      { label: "AssociaÃ§Ã£o", value: "Membro da O.A. Internacional" },
      { label: "AtuaÃ§Ã£o", value: "Chefe de Ortopedia e Neurologia â€” Dr. Pets Santo AndrÃ©" },
      { label: "ExperiÃªncia", value: "EmpresÃ¡rio hÃ¡ mais de 25 anos no mercado Pet" },
    ],
  },
  {
    id: "t2", name: "Dr. Renan Dias", title: "Especialista em Neurologia",
    specialty: "Neurologista", avatar: t2, avatarPosition: "center 15%",
    bioTopics: [
      { label: "Especialidade", value: "Neurologia VeterinÃ¡ria" },
      { label: "AtuaÃ§Ã£o", value: "Atendimento clÃ­nico especializado em neurologia" },
    ],
  },
  {
    id: "t3", name: "Dra. Nathalia", title: "Especialista em Hematologia",
    specialty: "Hematologista", avatar: draNathaliaImg,
    bioTopics: [
      { label: "Especialidade", value: "Hematologia VeterinÃ¡ria" },
      { label: "AtuaÃ§Ã£o", value: "DiagnÃ³stico e tratamento de doenÃ§as sanguÃ­neas" },
    ],
  },
  {
    id: "t4", name: "Dra. Nathalia Cristina", title: "Especialista em ClÃ­nica MÃ©dica",
    specialty: "ClÃ­nica MÃ©dica", avatar: "https://i.pravatar.cc/150?img=9",
    bioTopics: [
      { label: "Especialidade", value: "ClÃ­nica MÃ©dica" },
      { label: "AtuaÃ§Ã£o", value: "Atendimento de rotina e acompanhamento clÃ­nico" },
    ],
  },
];

export const courses: Course[] = [
  {
    id: "mentoria-flix",
    title: "Mentoria Flix: MÃ©todo P.E.T.",
    specialty: "GestÃ£o",
    description: "Transforme seu negÃ³cio pet. Aprenda gestÃ£o, estruturaÃ§Ã£o, contrataÃ§Ã£o e vendas com quem jÃ¡ construiu empresas sÃ³lidas na medicina veterinÃ¡ria.",
    cover: mentoriaFlixImg,
    hours: 20,
    modules: 8,
    lessons: 30,
    students: 0,
    progress: 0,
    teacher: teachers[0],
    level: "AvanÃ§ado",
    purchased: false,
    externalLink: "https://mentoriaflix.com.br",
  },
  {
    id: "ortopedia-avancada",
    title: "Ortopedia ClÃ­nica de ExcelÃªncia",
    specialty: "Ortopedia",
    description:
      "Domine a ortopedia clÃ­nica sem precisar operar. Aprenda a diagnosticar com seguranÃ§a, solicitar exames precisos e conduzir atendimentos que encantam o tutor, gerando confianÃ§a absoluta na sua conduta mÃ©dica.",
    cover: ortho,
    hours: 48,
    modules: 12,
    lessons: 86,
    students: 0,
    progress: 0,
    teacher: teachers[0],
    level: "AvanÃ§ado",
    featured: true,
    purchased: false,
    glossary: [
      { term: "ClaudicaÃ§Ã£o", definition: "Falta de firmeza ou assimetria no andar, popularmente conhecido como 'mancar'. Pode ser de apoio (dor ao pisar) ou de elevaÃ§Ã£o (dor ao mover o membro)." },
      { term: "CrepitaÃ§Ã£o", definition: "RuÃ­do ou sensaÃ§Ã£o de atrito (roÃ§ar) de ossos ou cartilagens desgastadas durante o movimento articular ou Ã  palpaÃ§Ã£o de fraturas." },
      { term: "Sinal de Ortolani", definition: "Teste ortopÃ©dico especÃ­fico utilizado para detectar a frouxidÃ£o da articulaÃ§Ã£o coxofemoral em cÃ£es jovens (indicativo de Displasia Coxofemoral)." },
      { term: "Teste de Gaveta Cranial", definition: "Manobra semiolÃ³gica que avalia a instabilidade do joelho. Positivo quando a tÃ­bia se desloca cranialmente em relaÃ§Ã£o ao fÃªmur, indicando ruptura do Ligamento Cruzado Cranial." },
      { term: "Teste de CompressÃ£o Tibial", definition: "Teste indireto para avaliar a integridade do Ligamento Cruzado Cranial simulando a carga de peso no membro pÃ©lvico." },
      { term: "TPLO (Osteotomia de Nivelamento do PlatÃ´ Tibial)", definition: "TÃ©cnica cirÃºrgica que altera a biomecÃ¢nica do joelho nivelando o platÃ´ tibial, anulando a necessidade do ligamento cruzado cranial." },
      { term: "TTA (AvanÃ§amento da Tuberosidade Tibial)", definition: "TÃ©cnica cirÃºrgica que neutraliza as forÃ§as de cisalhamento do joelho avanÃ§ando a inserÃ§Ã£o do ligamento patelar." },
      { term: "Displasia Coxofemoral", definition: "DoenÃ§a de desenvolvimento e hereditÃ¡ria caracterizada pela mÃ¡ formaÃ§Ã£o e incongruÃªncia da articulaÃ§Ã£o do quadril, levando Ã  osteoartrose secundÃ¡ria." },
      { term: "LuxaÃ§Ã£o Patelar", definition: "Deslocamento da patela de seu local anatÃ´mico normal (sulco troclear), podendo ser medial (mais comum em raÃ§as pequenas) ou lateral." },
      { term: "Artrodese", definition: "Procedimento cirÃºrgico que promove a fusÃ£o Ã³ssea permanente de uma articulaÃ§Ã£o, eliminando o movimento e a dor." },
      { term: "OsteossÃ­ntese", definition: "Cirurgia de reduÃ§Ã£o e fixaÃ§Ã£o de fraturas Ã³sseas utilizando implantes como placas, parafusos, pinos e hastes." },
      { term: "Osteocondrite Dissecante (OCD)", definition: "Falha na ossificaÃ§Ã£o endocondral que resulta no espessamento e posterior desprendimento de um retalho de cartilagem articular (flap), comum no ombro de cÃ£es jovens." },
      { term: "NÃ£o-uniÃ£o", definition: "ComplicaÃ§Ã£o onde ocorre a falha definitiva na consolidaÃ§Ã£o (cicatrizaÃ§Ã£o) de uma fratura Ã³ssea." },
      { term: "Calo Ã“sseo", definition: "FormaÃ§Ã£o de tecido Ã³sseo e cartilaginoso imaturo que estabiliza e cicatriza uma fratura ao longo das semanas." },
      { term: "Sinal da Almofada de Gordura", definition: "Achado radiogrÃ¡fico onde hÃ¡ compressÃ£o da gordura infrapatelar indicando efusÃ£o articular severa (lÃ­quido na articulaÃ§Ã£o do joelho)." },
      { term: "Goniometria", definition: "MensuraÃ§Ã£o dos Ã¢ngulos de flexÃ£o e extensÃ£o das articulaÃ§Ãµes, muito utilizada para avaliar a amplitude de movimento (ADM) na fisioterapia ortopÃ©dica." },
      { term: "Contratura Muscular", definition: "Encurtamento anormal e permanente de um mÃºsculo ou tendÃ£o, comum na contratura do mÃºsculo infraespinhoso ou quadrÃ­ceps." },
      { term: "Necrose AssÃ©ptica da CabeÃ§a do FÃªmur (DoenÃ§a de Legg-CalvÃ©-Perthes)", definition: "CondiÃ§Ã£o onde hÃ¡ interrupÃ§Ã£o do suprimento sanguÃ­neo para a cabeÃ§a femoral, causando necrose e dor severa. Afeta tipicamente cÃ£es jovens de raÃ§as toy/pequenas." },
      { term: "PanosteÃ­te", definition: "InflamaÃ§Ã£o da cavidade medular dos ossos longos que causa dor intermitente e claudicaÃ§Ã£o migratÃ³ria em cÃ£es jovens de raÃ§as grandes em fase de crescimento." },
      { term: "LesÃ£o NeuropÃ¡tica", definition: "Ã‰ o termo mais correto e especÃ­fico. Ele indica uma patologia ou dano estrutural direto nos prÃ³prios nervos (como na neuropatia diabÃ©tica ou compressÃµes nervosas)." },
      { term: "PadrÃ£o NeurogÃªnico (na Eletromiografia)", definition: "Em exames de SNM, usa-se 'padrÃ£o neurogÃªnico' para diferenciar um problema que nasce no nervo (neurogÃªnico) de um problema que nasce diretamente no mÃºsculo (miopÃ¡tico)." },
      { term: "TÃ´nus Muscular", definition: "Natureza: Ã‰ um estado permanente e contÃ­nuo. EstÃ­mulo: Ã‰ gerado pelo estiramento passivo e constante do mÃºsculo (gravidade), detectado pelo fuso muscular (reflexo miotÃ¡tico). FunÃ§Ã£o: Manter a postura, a estabilidade das articulaÃ§Ãµes e a prontidÃ£o motora. Resultado: NÃ£o gera um movimento visÃ­vel; Ã© apenas uma tensÃ£o de base." },
      { term: "Reflexo de Retirada (Reflexo Flexor)", definition: "Natureza: Ã‰ uma resposta temporÃ¡ria, rÃ¡pida e abrupta. EstÃ­mulo: Ã‰ ativado exclusivamente por um estÃ­mulo nocivo ou doloroso (como pisar em um prego ou tocar em uma superfÃ­cie muito quente), detectado por nociceptores. FunÃ§Ã£o: ProteÃ§Ã£o imediata e sobrevivÃªncia do organismo. Resultado: Gera um movimento motor vigoroso (ex: flexÃ£o rÃ¡pida da perna ou do braÃ§o) para afastar o corpo do perigo." },
      { term: "IntumescÃªncia CervicotorÃ¡cica", definition: "Espessamento da medula espinhal (segmentos C6-T2). Ã‰ a regiÃ£o onde se originam os nervos espinhais que formam o plexo braquial, responsÃ¡vel pela inervaÃ§Ã£o dos membros torÃ¡cicos (anteriores)." },
      { term: "IntumescÃªncia Lombossacra", definition: "Espessamento da medula espinhal (segmentos L4-S3). Ã‰ a regiÃ£o onde se originam os nervos espinhais que formam o plexo lombossacro, responsÃ¡vel pela inervaÃ§Ã£o dos membros pÃ©lvicos (posteriores)." }
    ],
  },
  
  {
    id: "neuro-basica",
    title: "Desvendando a Neurologia ClÃ­nica",
    specialty: "Neurologia",
    description: "Aprenda a realizar o exame neurolÃ³gico perfeito. Saiba como localizar a lesÃ£o no sistema nervoso e definir se o caso Ã© cirÃºrgico ou clÃ­nico com seguranÃ§a.",
    cover: neuro,
    hours: 30,
    modules: 6,
    lessons: 45,
    students: 0,
    progress: 0,
    teacher: teachers[1], // Dr. Renan
    level: "IntermediÃ¡rio",
    featured: false,
    purchased: false,
  },
  {
    id: "hemato-descomplicada",
    title: "Hemograma na PrÃ¡tica VeterinÃ¡ria",
    specialty: "Hematologia",
    description: "Pare de ler apenas os nÃºmeros do hemograma. Entenda o que as cÃ©lulas estÃ£o te dizendo e feche diagnÃ³sticos ocultos com a Dra. Carolina.",
    cover: derma, // Usando uma imagem genÃ©rica como fallback
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
    title: "Suporte BÃ¡sico e AvanÃ§ado de Vida",
    specialty: "EmergÃªncia",
    description: "Saiba exatamente o que fazer nos primeiros 5 minutos de uma emergÃªncia. Protocolos de RCP, fluidoterapia e estabilizaÃ§Ã£o de pacientes crÃ­ticos.",
    cover: cardio, // Usando uma imagem genÃ©rica como fallback
    hours: 40,
    modules: 8,
    lessons: 60,
    students: 0,
    progress: 0,
    teacher: teachers[3], // Dra. Nathalia
    level: "AvanÃ§ado",
    featured: true,
    purchased: false,
  },
  {
    id: "clinica-medica",
    title: "ClÃ­nica MÃ©dica de Pequenos Animais",
    specialty: "ClÃ­nica MÃ©dica",
    description: "Aprenda a conduzir o atendimento clÃ­nico do dia a dia de forma assertiva, com protocolos atualizados e foco total na resoluÃ§Ã£o dos casos.",
    cover: derma, // Usando imagem de fallback
    hours: 50,
    modules: 10,
    lessons: 80,
    students: 0,
    progress: 0,
    teacher: teachers[3], // Dra. Nathalia
    level: "IntermediÃ¡rio",
    featured: true,
    purchased: false,
  }
];

export const specialties = [
  "Ortopedia", "Neurologia", "GestÃ£o", "Hematologia", "EmergÃªncia", "ClÃ­nica MÃ©dica"
];

export const ortopediaModules = [
  {
    id: 1,
    title: "MÃ³dulo 1 â€” IntroduÃ§Ã£o Ã  Ortopedia ClÃ­nica",
    done: true,
    topics: [
      "BiomecÃ¢nica do cÃ£o e gato na clÃ­nica mÃ©dica",
      "Descomplicando a neuroanatomia",
      "Como realizar uma avaliaÃ§Ã£o clÃ­nica de excelÃªncia",
      "Biologia x score da lesÃ£o ortopÃ©dica",
      "Montando uma anamnese ortopÃ©dica",
      "AlteraÃ§Ãµes ortopÃ©dicas clÃ¡ssicas e como tratÃ¡-las"
    ]
  },
  {
    id: 2,
    title: "MÃ³dulo 2 â€” Diferenciando lesÃ£o motora muscular x neurolÃ³gica",
    done: false,
    topics: ["Sinais clÃ­nicos", "Testes de reflexo", "Casos prÃ¡ticos de diagnÃ³stico diferencial"]
  },
  {
    id: 3,
    title: "MÃ³dulo 3 â€” Tratando lesÃµes ortopÃ©dicas",
    done: false,
    topics: ["Protocolos de tratamento conservador", "IndicaÃ§Ãµes cirÃºrgicas", "Manejo da dor"]
  },
  {
    id: 4,
    title: "MÃ³dulo 4 â€” A conexÃ£o com o tutor Ã© o sucesso do tratamento",
    done: false,
    topics: ["Como comunicar o diagnÃ³stico", "Alinhando expectativas", "AdesÃ£o ao tratamento em casa"]
  },
  {
    id: 5,
    title: "MÃ³dulo 5 â€” Manejo Alimentar",
    done: false,
    topics: [
      "ImportÃ¢ncia da nutriÃ§Ã£o na recuperaÃ§Ã£o ortopÃ©dica",
      "SuplementaÃ§Ã£o: Condroprotetores e Ã”mega-3",
      "Controle e manejo de peso no paciente osteoartrÃ³sico",
      "Dietas terapÃªuticas e prescriÃ§Ã£o nutricional",
      "Casos prÃ¡ticos de evoluÃ§Ã£o com suporte nutricional"
    ]
  },
  {
    id: 6,
    title: "MÃ³dulo 6 â€” Tipos de Exames na Ortopedia e Neurologia",
    done: false,
    topics: [
      "Radiografia Simples vs. Contrastada: IndicaÃ§Ãµes cruciais",
      "Tomografia Computadorizada (TC): Quando o Raio-X nÃ£o Ã© suficiente?",
      "RessonÃ¢ncia MagnÃ©tica (RM): O padrÃ£o-ouro para lesÃµes neurolÃ³gicas",
      "Diferenciais e CritÃ©rios de Encaminhamento: Quando e qual exame solicitar"
    ]
  },
  {
    id: 7,
    title: "MÃ³dulo 7 â€” 90% das alteraÃ§Ãµes que vÃ£o chegar na sua clÃ­nica",
    done: false,
    topics: [
      "Displasia Coxofemoral",
      "Ruptura de Ligamento Cruzado Cranial (RLCC)",
      "Artrose Articular",
      "DoenÃ§a do Disco Intervertebral (DDIV)",
      "AlteraÃ§Ãµes MetabÃ³licas"
    ]
  }
];

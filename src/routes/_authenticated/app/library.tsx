import { createFileRoute } from "@tanstack/react-router";
import { FileText, Search, ExternalLink, Download, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { scientificPapers } from "@/lib/library-data";

export const Route = createFileRoute("/_authenticated/app/library")({
  head: () => ({ meta: [{ title: "Biblioteca — VetClass Pro" }] }),
  component: LibraryPage,
});

const coreDocuments = [
  {
    id: "art-1",
    title: "Double plating technique for fixing tibial plateau leveling osteotomy and modified cranial closing wedge ostectomy",
    authors: "R. Nicola et al.",
    type: "Artigo Científico",
    category: "Papers e Artigos",
    year: "2019",
    url: "https://doi.org/10.1590/1678-4162-12168",
    description: "Relato de caso detalhando o uso da técnica de dupla placa na correção cirúrgica de ruptura do ligamento cruzado cranial."
  },
  {
    id: "art-2",
    title: "Head and pelvic vertical displacement in dogs with induced swinging limb motion asymmetry",
    authors: "Bergh A et al.",
    type: "Artigo Científico (Open Access)",
    category: "Papers e Artigos",
    year: "2018",
    url: "https://doi.org/10.1371/journal.pone.0204591",
    description: "Estudo publicado na PLoS One analisando a assimetria e o movimento vertical pélvico e de cabeça em cães."
  },
  {
    id: "art-3",
    title: "Feline Musculoskeletal Pain Index for degenerative joint disease-associated pain",
    authors: "Benito J et al.",
    type: "Artigo Científico",
    category: "Papers e Artigos",
    year: "2013",
    url: "https://doi.org/10.1111/jvim.12079",
    description: "Publicado no J Vet Intern Med. Criação e validação do FMPI, índice essencial para avaliar dor musculoesquelética em felinos."
  },
  {
    id: "art-4",
    title: "Checklist for detection of degenerative joint disease-associated pain in cats",
    authors: "Enomoto M et al.",
    type: "Protocolo Clínico",
    category: "Diretrizes e Protocolos",
    year: "2020",
    url: "https://doi.org/10.1177/1098612X20942385",
    description: "Checklist publicado no J Feline Med Surg para detecção rápida e prática de dor associada a doença articular degenerativa."
  },
  {
    id: "art-5",
    title: "AAHA 2022 Pain Management Guidelines for Dogs and Cats",
    authors: "AAHA (American Animal Hospital Association)",
    type: "Diretriz / Guideline",
    category: "Diretrizes e Protocolos",
    year: "2022",
    url: "https://www.aaha.org/aaha-guidelines/2022-aaha-pain-management-guidelines-for-dogs-and-cats/",
    description: "Diretrizes completas de 2022 para manejo e avaliação de dor crônica e aguda em cães e gatos."
  },
  {
    id: "art-6",
    title: "Canine Brief Pain Inventory and response to treatment in dogs with osteoarthritis",
    authors: "Brown DC et al.",
    type: "Artigo Científico",
    category: "Papers e Artigos",
    year: "2008",
    url: "https://doi.org/10.2460/javma.233.10.1601",
    description: "Publicado na JAVMA. Estudo base sobre o CBPI (Canine Brief Pain Inventory) na osteoartrite canina."
  },
  {
    id: "art-7",
    title: "Vertical head and pelvic movement symmetry at the trot in dogs with induced supporting limb lameness",
    authors: "Álvarez CBG et al.",
    type: "Artigo Científico",
    category: "Papers e Artigos",
    year: "2017",
    url: "https://doi.org/10.1016/j.tvjl.2017.01.014",
    description: "Publicação no The Veterinary Journal avaliando a simetria de marcha em cães."
  },
  {
    id: "art-8",
    title: "ACVIM Consensus Statement on the Management of Status Epilepticus and Cluster Seizures in Dogs and Cats",
    authors: "ACVIM Board of Regents",
    type: "Diretriz / Guideline",
    category: "Diretrizes e Protocolos",
    year: "2024",
    url: "https://onlinelibrary.wiley.com/doi/10.1111/jvim.16976",
    description: "Consenso atualizado de 2024 da ACVIM para o manejo emergencial do status epilepticus e convulsões em cluster."
  },
  {
    id: "art-9",
    title: "ACVIM Small Animal Consensus Statement on Seizure Management in Dogs",
    authors: "Podell M et al.",
    type: "Diretriz / Guideline",
    category: "Diretrizes e Protocolos",
    year: "2016",
    url: "https://onlinelibrary.wiley.com/doi/10.1111/jvim.13841",
    description: "Diretriz essencial da ACVIM sobre diagnóstico e tratamento crônico da epilepsia canina."
  },
  {
    id: "art-10",
    title: "WSAVA Global Guidelines for the Recognition, Assessment and Treatment of Pain",
    authors: "WSAVA Global Pain Council",
    type: "Diretriz / Guideline",
    category: "Diretrizes e Protocolos",
    year: "2022",
    url: "https://wsava.org/committees/global-pain-council/",
    description: "Diretrizes globais da WSAVA para o reconhecimento e tratamento da dor na clínica de pequenos animais."
  },
  {
    id: "art-11",
    title: "COAST Development Group’s international consensus guidelines for the treatment of canine osteoarthritis",
    authors: "Cachon T et al.",
    type: "Diretriz / Guideline",
    category: "Diretrizes e Protocolos",
    year: "2023",
    url: "https://www.frontiersin.org/articles/10.3389/fvets.2023.1137888/full",
    description: "Consenso internacional (COAST) focando no tratamento e estadiamento atualizado da osteoartrite canina."
  },
  {
    id: "art-12",
    title: "Diagnosis and Management of Dogs with Degenerative Myelopathy",
    authors: "Coates JR, Wininger FA.",
    type: "Artigo Científico",
    category: "Papers e Artigos",
    year: "2010",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3052809/",
    description: "Revisão detalhada das estratégias de diagnóstico, manejo clínico e reabilitação na mielopatia degenerativa canina."
  },
  {
    id: "art-13",
    title: "Integrative Approaches to Myopathies and Muscular Dystrophies",
    authors: "MDPI Veterinary Sciences",
    type: "Artigo Científico",
    category: "Papers e Artigos",
    year: "2023",
    url: "https://www.mdpi.com/journal/vetsci/special_issues/Myopathies_Muscular_Dystrophies",
    description: "Revisão abrangente de abordagens terapêuticas (fisioterapia, farmacologia) para miopatias imunomediadas e hereditárias."
  },
  {
    id: "art-14",
    title: "Diagnosis, prevention, and management of canine hip dysplasia: a review",
    authors: "Schachner ER, Lopez MJ.",
    type: "Artigo Científico",
    category: "Papers e Artigos",
    year: "2015",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6067592/",
    description: "Uma excelente revisão de acesso aberto cobrindo fatores genéticos, ambientais e o manejo conservativo da Displasia Coxofemoral."
  },
  {
    id: "art-15",
    title: "Patellar luxation in dogs",
    authors: "Di Dona F et al.",
    type: "Artigo Científico",
    category: "Papers e Artigos",
    year: "2018",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5985856/",
    description: "Revisão clássica na Veterinary Medicine: Research and Reports detalhando apresentação clínica, diagnóstico e manejo da luxação de patela."
  },
  {
    id: "art-16",
    title: "Do dogs with non-surgically managed cranial cruciate ligament disease have better outcomes with rehabilitation?",
    authors: "Veterinary Evidence (Knowledge Summary)",
    type: "Revisão Baseada em Evidências",
    category: "Papers e Artigos",
    year: "2019",
    url: "https://veterinaryevidence.org/index.php/ve/article/view/178",
    description: "Sumário de evidências comparando o impacto clínico da reabilitação formal em cães com ruptura de ligamento cruzado tratada de forma conservadora."
  },
  {
    id: "art-17",
    title: "Complications of external coaptation in dogs and cats",
    authors: "Meeson RL, Davidson C, Arthurs GI.",
    type: "Artigo Científico",
    category: "Diretrizes e Protocolos",
    year: "2011",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3058661/",
    description: "Revisão clínica sobre o uso correto e as complicações de talas, ataduras e imobilização externa (external coaptation) em pequenos animais."
  },
  {
    id: "art-18",
    title: "Bandaging, casting and splinting: A practical review of the Modified Robert Jones Bandage",
    authors: "Veterinary Information Network / Open Resources",
    type: "Protocolo Clínico",
    category: "Diretrizes e Protocolos",
    year: "2020",
    url: "https://pubmed.ncbi.nlm.nih.gov/17585472/",
    description: "Artigo prático descrevendo as indicações, a técnica correta de aplicação e os riscos da atadura de Robert Jones e do Modified Robert Jones (MRJ)."
  },
  {
    id: "art-19",
    title: "Damage Control Orthopedics: The importance of initial trauma stabilization",
    authors: "Open Access Veterinary Trauma Review",
    type: "Artigo Científico",
    category: "Diretrizes e Protocolos",
    year: "2022",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6961313/",
    description: "Revisão sobre o conceito de 'Damage Control Orthopedics' (Controle de Danos na Ortopedia), explicando por que estabilizar fraturas e estabilizar o paciente sistemicamente deve vir antes de cirurgias ortopédicas definitivas longas."
  }
];

const staticDocuments = [...coreDocuments, ...scientificPapers];

const categories = ["Todos", "Minhas Aulas", "Papers e Artigos", "Diretrizes e Protocolos"];

function LibraryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const [documents, setDocuments] = useState<any[]>(staticDocuments);

  useEffect(() => {
    async function loadDbLessons() {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .not('material_url', 'is', null);

        if (data && data.length > 0) {
          const dbDocs = data.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            authors: "Vet Master",
            type: "Slide de Aula",
            category: "Minhas Aulas",
            year: lesson.created_at ? new Date(lesson.created_at).getFullYear().toString() : "2026",
            url: lesson.material_url,
            description: `Material de apoio para a aula: ${lesson.title || "Sem título"}`
          }));
          
          setDocuments([...dbDocs, ...staticDocuments]);
        }
      } catch (err) {
        console.error("Erro ao carregar aulas", err);
      }
    }
    loadDbLessons();
  }, []);

  const filtered = documents.filter((d) => 
    (cat === "Todos" || d?.category === cat) &&
    (!q || (d?.title && d.title.toLowerCase().includes(q.toLowerCase())) || (d?.authors && d.authors.toLowerCase().includes(q.toLowerCase())))
  );

  return (
    <div className="space-y-8 px-4 py-8 sm:px-8">
      <div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Biblioteca</h1>
        <p className="mt-2 text-muted-foreground">Artigos, protocolos e materiais de apoio para sua rotina.</p>
      </div>

      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título ou autor..."
            className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-3 text-sm outline-none focus:border-coral"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                cat === c
                  ? "bg-coral text-coral-foreground shadow-coral"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((doc) => (
          <div key={doc.id} className="flex gap-5 rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-coral/10 text-coral">
              <FileText className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {doc?.category || "Geral"}
                </span>
                <span className="text-xs font-medium text-coral">{doc?.type || "Documento"}</span>
              </div>
              <h3 className="font-display text-base font-bold leading-snug text-foreground">
                {doc?.title || "Sem Título"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {doc?.description || ""}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  {doc?.authors || "Autor Desconhecido"} • {doc?.year || ""}
                </p>
                <div className="flex gap-2">
                  <a 
                    href={doc?.url || "#"} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition" 
                    title="Ler online"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  {doc?.url && doc.url.startsWith('/') && (
                    <a 
                      href={doc.url} 
                      download={(doc?.title || "arquivo") + ".pdf"}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-coral text-white hover:bg-coral/90 transition shadow-sm" 
                      title="Baixar PDF"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Nenhum documento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}

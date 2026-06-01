import { createFileRoute } from "@tanstack/react-router";
import { FileText, Search, ExternalLink, Download, BookOpen } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/app/library")({
  head: () => ({ meta: [{ title: "Biblioteca — VetClass Pro" }] }),
  component: LibraryPage,
});

const documents = [
  {
    id: "art-1",
    title: "Double plating technique for fixing tibial plateau leveling osteotomy and modified cranial closing wedge ostectomy",
    authors: "R. Nicola et al.",
    type: "Artigo Científico",
    category: "Ortopedia",
    year: "2019",
    url: "https://doi.org/10.1590/1678-4162-12168",
    description: "Relato de caso detalhando o uso da técnica de dupla placa na correção cirúrgica de ruptura do ligamento cruzado cranial com ângulo de platô tibial excessivo."
  }
];

const categories = ["Todos", "Ortopedia", "Neurologia", "Gestão", "Protocolos"];

function LibraryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");

  const filtered = documents.filter((d) => 
    (cat === "Todos" || d.category === cat) &&
    (!q || d.title.toLowerCase().includes(q.toLowerCase()) || d.authors.toLowerCase().includes(q.toLowerCase()))
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
                  {doc.category}
                </span>
                <span className="text-xs font-medium text-coral">{doc.type}</span>
              </div>
              <h3 className="font-display text-base font-bold leading-snug text-foreground">
                {doc.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {doc.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">
                  {doc.authors} • {doc.year}
                </p>
                <div className="flex gap-2">
                  <a href={doc.url} target="_blank" rel="noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition" title="Ler online">
                    <ExternalLink className="h-4 w-4" />
                  </a>
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

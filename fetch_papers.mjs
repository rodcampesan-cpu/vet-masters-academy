import fs from 'fs';

async function fetchPapers(query, category, count) {
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&resultType=core&pageSize=${count}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (!data.resultList || !data.resultList.result) return [];
  
  return data.resultList.result.map(result => {
    const title = result.title;
    const authors = result.authorString || "Autores Desconhecidos";
    const year = result.pubYear;
    const url = result.pmcid ? `https://www.ncbi.nlm.nih.gov/pmc/articles/${result.pmcid}/` : (result.doi ? `https://doi.org/${result.doi}` : `https://pubmed.ncbi.nlm.nih.gov/${result.pmid}/`);
    
    // Attempt to get abstract snippet
    let description = result.abstractText ? result.abstractText.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...' : "Leia o artigo completo para mais detalhes.";
    
    return {
      id: result.id,
      title,
      authors,
      type: "Artigo Científico",
      category,
      year: year ? String(year) : "2026",
      url,
      description
    };
  });
}

async function main() {
  const englishOrthoPapers = await fetchPapers('(canine OR dog OR feline OR cat) AND (orthopedic OR orthopaedic OR fracture OR neurosurgery OR spine) AND (OPEN_ACCESS:y)', 'Papers e Artigos', 25);
  const englishGuidelines = await fetchPapers('(canine OR dog OR feline OR cat) AND (orthopedic OR orthopaedic OR fracture OR neurosurgery OR spine) AND (guideline OR protocol OR consensus) AND (OPEN_ACCESS:y)', 'Diretrizes e Protocolos', 25);
  const ptOrthoPapers = await fetchPapers('(cães OR cão OR gatos OR gato) AND (ortopedia OR fratura OR articular OR neurocirurgia OR coluna) AND (OPEN_ACCESS:y)', 'Papers e Artigos', 25);
  const ptGuidelines = await fetchPapers('(cães OR cão OR gatos OR gato) AND (ortopedia OR fratura OR articular OR neurocirurgia OR coluna) AND (diretrizes OR protocolo OR tratamento) AND (OPEN_ACCESS:y)', 'Diretrizes e Protocolos', 25);
  
  const allPapers = [...englishOrthoPapers, ...englishGuidelines, ...ptOrthoPapers, ...ptGuidelines];
  
  // Dedup by id
  const seenIds = new Set();
  const dedupedPapers = [];
  for (const paper of allPapers) {
      if (!seenIds.has(paper.id)) {
          seenIds.add(paper.id);
          dedupedPapers.push(paper);
      }
  }

  const fileContent = `export const scientificPapers = ${JSON.stringify(dedupedPapers, null, 2)};\n`;
  fs.writeFileSync('src/lib/library-data.ts', fileContent);
}

main().catch(console.error);

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
  console.log("Fetching English Ortho/Neuro guidelines...");
  const englishGuidelines = await fetchPapers('(canine OR dog OR feline OR cat) AND (orthopedic OR orthopaedic OR fracture OR neurosurgery OR spine) AND (guideline OR protocol OR consensus) AND (OPEN_ACCESS:y)', 'Diretrizes e Protocolos', 60);
  
  console.log("Fetching Portuguese Ortho/Neuro guidelines...");
  const ptGuidelines = await fetchPapers('(canine OR feline OR dog OR cat) AND (orthopedics OR orthopaedics OR fracture) AND (OPEN_ACCESS:y)', 'Diretrizes e Protocolos', 60);
  
  console.log("Fetching English Ortho/Neuro papers...");
  const englishOrthoPapers = await fetchPapers('(canine OR dog OR feline OR cat) AND (orthopedic OR orthopaedic OR fracture OR neurosurgery OR spine) NOT (guideline OR protocol OR consensus) AND (OPEN_ACCESS:y)', 'Papers e Artigos', 60);
  
  console.log("Fetching Portuguese Ortho/Neuro papers...");
  const ptOrthoPapers = await fetchPapers('("veterinary" OR "canine" OR "feline") AND ("orthopedics" OR "fracture" OR "neurosurgery") AND (OPEN_ACCESS:y)', 'Papers e Artigos', 60);
  
  const allPapers = [...englishGuidelines, ...ptGuidelines, ...englishOrthoPapers, ...ptOrthoPapers];
  
  // Strict regex to ensure it's veterinary (dogs/cats)
  const vetRegex = /cão|cães|gato|gatos|canino|felino|dog|dogs|cat|cats|canine|feline|veterinary|veterinária|veterinário/i;
  // Strict regex to ensure it's ortho/neuro
  const orthoRegex = /ortopedia|ortopédica|fratura|osso|articular|neurocirurgia|coluna|orthopedic|orthopaedic|fracture|bone|joint|neurosurgery|spine/i;
  
  // Dedup by id and filter
  const seenIds = new Set();
  const dedupedPapers = [];
  for (const paper of allPapers) {
      if (!seenIds.has(paper.id)) {
          const textToSearch = (paper.title + " " + paper.description).toLowerCase();
          
          if (vetRegex.test(textToSearch) && orthoRegex.test(textToSearch)) {
              seenIds.add(paper.id);
              dedupedPapers.push(paper);
          }
      }
  }

  const fileContent = `export const scientificPapers = ${JSON.stringify(dedupedPapers.slice(0, 50), null, 2)};\n`;
  fs.writeFileSync('src/lib/library-data.ts', fileContent);
}

main().catch(console.error);

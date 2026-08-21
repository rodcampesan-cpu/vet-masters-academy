import fs from 'fs';

async function fetchPapers(query, category, count) {
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&resultType=core&pageSize=${count}`;
  const response = await fetch(url);
  const data = await response.json();
  
  return data.resultList.result.map(result => {
    const title = result.title;
    const authors = result.authorString || "Unknown Authors";
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
      year,
      url,
      description
    };
  });
}

async function main() {
  console.log("Fetching Orthopedics papers...");
  const orthoPapers = await fetchPapers('(canine OR dog) AND (orthopedic OR orthopaedic OR bone OR joint) AND (OPEN_ACCESS:y)', 'Papers e Artigos', 25);
  
  console.log("Fetching Protocols papers...");
  const protocolPapers = await fetchPapers('(canine OR dog OR feline OR cat) AND (guideline OR consensus OR treatment protocol) AND (OPEN_ACCESS:y)', 'Diretrizes e Protocolos', 25);
  
  const allPapers = [...orthoPapers, ...protocolPapers];
  
  const fileContent = `export const scientificPapers = ${JSON.stringify(allPapers, null, 2)};\n`;
  
  fs.writeFileSync('src/lib/library-data.ts', fileContent);
  console.log("Wrote 50 papers to src/lib/library-data.ts");
}

main().catch(console.error);

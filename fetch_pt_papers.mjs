import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

async function fetchPortuguesePapers(query, category, count) {
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&resultType=core&pageSize=${count}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (!data.resultList || !data.resultList.result) {
      console.log(`No results for ${query}`);
      return [];
  }
  
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
      year,
      url,
      description
    };
  });
}

async function main() {
  console.log("Fetching Portuguese Orthopedics papers...");
  // Look for Portuguese words in title
  const ptOrthoPapers = await fetchPortuguesePapers('TITLE:(cães OR gatos OR veterinária OR ortopedia OR osso OR fratura OR articular) AND (OPEN_ACCESS:y)', 'Papers e Artigos', 20);
  
  console.log("Fetching Portuguese Protocols papers...");
  const ptProtocolPapers = await fetchPortuguesePapers('TITLE:(cães OR gatos OR veterinária OR tratamento OR protocolo OR diretriz) AND (OPEN_ACCESS:y)', 'Diretrizes e Protocolos', 20);
  
  const newPapers = [...ptOrthoPapers, ...ptProtocolPapers];
  
  // Read existing file and append
  const filePath = 'src/lib/library-data.ts';
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the closing bracket
  // The file ends with ];\n
  const appendStr = ",\n" + newPapers.map(p => JSON.stringify(p, null, 2)).join(",\n") + "\n];\n";
  
  content = content.replace(/\n];\n*$/, appendStr);
  
  fs.writeFileSync(filePath, content);
  console.log(`Added ${newPapers.length} Portuguese papers to src/lib/library-data.ts`);
}

main().catch(console.error);

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI("AQ.Ab8RN6I3GP-u7Lljf57K00i6U9bhlXxBmSWpIhOBW0swgoIrLQ");

function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}

async function main() {
  console.log("Iniciando extração com Gemini 2.5 Pro...");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const folders = ["mod1", "mod2"];
  const baseDir = path.join(process.cwd(), "public", "materials", "ortopedia");
  
  let allImages = [];
  
  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter(f => f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png"));
      for (const file of files) {
        allImages.push(fileToGenerativePart(path.join(folderPath, file), "image/jpeg"));
      }
    }
  }

  console.log(`Carregadas ${allImages.length} imagens. Enviando para a IA (pode levar alguns minutos)...`);

  const prompt = `Você é um médico veterinário especialista. 
Aqui estão as páginas de um Tratado de Ortopedia Clínica Veterinária.
Por favor, leia todas as páginas com muita atenção e extraia absolutamente todo o conhecimento médico, técnico e prático contido nelas.
Transcreva e organize o conteúdo em um formato de "Base de Conhecimento" (Markdown) estruturado por tópicos e capítulos, preservando todos os ensinamentos, diagnósticos, tratamentos e dicas clínicas.
Não resuma demais: eu preciso da máxima riqueza de detalhes para treinar uma IA médica no futuro.`;

  try {
    const result = await model.generateContent([prompt, ...allImages]);
    const response = await result.response;
    const text = response.text();
    
    // Salvar na pasta knowledge
    const knowledgeDir = path.join(process.cwd(), "src", "lib", "knowledge");
    if (!fs.existsSync(knowledgeDir)) {
      fs.mkdirSync(knowledgeDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(knowledgeDir, "ortopedia.txt"), text);
    console.log("Extração concluída com sucesso! Arquivo salvo em src/lib/knowledge/ortopedia.txt");
  } catch (error) {
    console.error("Erro durante a extração:", error.message);
  }
}

main();

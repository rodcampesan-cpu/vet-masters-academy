import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AQ.Ab8RN6I3GP-u7Lljf57K00i6U9bhlXxBmSWpIhOBW0swgoIrLQ");

async function main() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Responda apenas com a palavra OK.");
    const response = await result.response;
    console.log("Sucesso:", response.text());
  } catch (error) {
    console.error("Erro na API:", error.message);
  }
}

main();

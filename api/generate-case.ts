import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  const apiKey = "AQ.Ab8RN6I3GP-u7Lljf57K00i6U9bhlXxBmSWpIhOBW0swgoIrLQ";
  const genAI = new GoogleGenerativeAI(apiKey);

  const systemInstruction = `Você é um gerador automático de casos clínicos para uma plataforma de estudos em medicina veterinária.
A partir do tema solicitado pelo usuário, você deve criar um caso interativo completo com anamnese, histórico, achados e diagnóstico.
A sua resposta DEVE ser um objeto JSON válido, sem markdown, contendo estritamente a seguinte estrutura:

{
  "title": "Um título criativo e descritivo do caso",
  "specialty": "Especialidade principal (ex: Ortopedia, Dermatologia, etc)",
  "difficulty": "Iniciante, Intermediário ou Avançado",
  "patient": "Nome, Espécie, Raça, Idade, Sexo (Ex: Rex, Cão, Poodle, 8 anos, Macho)",
  "description": "Breve resumo do caso (2 a 3 linhas)",
  "anamnesisText": "Texto detalhado contando a história clínica inicial e os sintomas observados pelo tutor.",
  "chatHistory": [
    { "isVet": true, "text": "Pergunta investigativa inicial do veterinário." },
    { "isVet": false, "text": "Resposta simulada do tutor fornecendo dicas vitais." }
  ],
  "aiHint": "Uma dica clínica direta que ajude o aluno a focar no diagnóstico correto.",
  "examList": [
    "Lista de 3 a 5 achados do exame físico ou sinais vitais (ex: FC 120bpm, TR 39°C...)",
    "Foco principal do exame",
    "Resultado de testes específicos"
  ],
  "images": [
    "Nome do Exame de Imagem ou Sangue 1 (ex: Raio-X de Tórax)",
    "Nome do Exame de Imagem ou Sangue 2"
  ],
  "examConclusion": "Laudo conclusivo dos exames de imagem ou sangue simulados.",
  "options": [
    "Opção de diagnóstico incorreta 1",
    "Opção de diagnóstico incorreta 2",
    "Opção correta",
    "Opção de diagnóstico incorreta 3"
  ],
  "correctAnswer": "A mesma string idêntica da opção correta",
  "feedbackCorrect": "Mensagem de parabéns com uma rápida explicação fisiopatológica de por que estava certo.",
  "feedbackIncorrect": "Mensagem educacional guiando o aluno a perceber onde ele errou na avaliação dos exames.",
  "playbookProtocol": "Protocolo de tratamento completo detalhando a abordagem terapêutica, prescrição de medicamentos (com doses sugeridas) e manejo a longo prazo (passo a passo)."
}`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent("Gere o seguinte caso em JSON: " + description);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

    const jsonCase = JSON.parse(text);
    return res.status(200).json(jsonCase);
  } catch (error: unknown) {
    console.error("Error generating case:", error);
    return res.status(500).json({ error: "Failed to generate case" });
  }
}

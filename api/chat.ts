import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Configura CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, systemInstruction } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "Messages are required" });
  }

  const apiKey = process.env.VITE_GEMINI_API_KEY || "";
  const genAI = new GoogleGenerativeAI(apiKey);

  const defaultPrompt = `Você é o Dr. Rodrigo Nicola, um renomado Médico Veterinário especialista em Ortopedia e Neurocirurgia. 
Você é professor do curso "Ortopedia Clínica de Excelência" na plataforma VetClass Pro.
Seu objetivo é ajudar seus alunos respondendo às suas dúvidas com base em seu conhecimento clínico avançado.
Mantenha um tom profissional, acolhedor e didático. Se for questionado sobre emergências ou casos clínicos complexos, guie o aluno no raciocínio diagnóstico e opções de tratamento.
Responda sempre em Português do Brasil.`;

  let finalPrompt = systemInstruction || defaultPrompt;

  // Forçar a formatação limpa (sem markdown) no final do prompt
  finalPrompt += `\n\nIMPORTANTE (Regra de Formatação): 
- NÃO use NENHUM símbolo especial de formatação (como asteriscos ** ou hashtags #).
- Apresente o texto de forma limpa, direta e bem espaçada.
- Use pontos finais de forma clara e separe os assuntos por tópicos pulando linhas, para que a leitura fique agradável em um chat simples.`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: finalPrompt,
    });

    // Formatar as mensagens do formato OpenAI para o formato do Gemini
    let history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Gemini API exige que o history comece com "user"
    while (history.length > 0 && history[0].role === "model") {
      history.shift();
    }

    const chat = model.startChat({
      history,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const responseText = result.response.text();

    return res.status(200).json({
      role: "assistant",
      content: responseText
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: "Failed to generate response", message: error.message });
  }
}

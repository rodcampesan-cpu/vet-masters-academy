import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/app/ai-tutor")({
  head: () => ({ meta: [{ title: "Tutor Vet IA — VetClass Pro" }] }),
  component: AITutorPage,
});

function AITutorPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Olá! Sou o Tutor Vet IA. Estou aqui para tirar todas as suas dúvidas clínicas com a experiência do ortopedista e neurocirurgião Dr. Rodrigo Nicola Delgado. Qual é o caso ou dúvida que vamos discutir hoje?"
    }
  ]);
  const [input, setInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Ler a instrução do professor do localStorage
      const professorContext = localStorage.getItem("aiTeacherContext");

      const apiMessages = newMessages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content }));
      
      const payload: any = { messages: apiMessages };
      if (professorContext) {
        payload.systemInstruction = professorContext;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na API');
      }

      setMessages(prev => [...prev, {
        role: "ai",
        content: data.content
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: "ai",
        content: `Desculpe, ocorreu um erro de conexão com meu cérebro: ${error.message}. Por favor, verifique a chave de acesso ou tente novamente.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 h-[calc(100vh-160px)] flex flex-col">
      <div className="flex items-center gap-3 mb-6 flex-shrink-0">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-coral to-primary text-white shadow-soft">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">Tutor Vet IA</h1>
          <p className="text-sm text-muted-foreground">Sua inteligência artificial educacional veterinária.</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto rounded-t-2xl border border-border border-b-0 bg-card p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${msg.role === 'user' ? 'bg-secondary' : 'bg-coral text-white'}`}>
              {msg.role === 'user' ? <User className="h-5 w-5 text-muted-foreground" /> : <Bot className="h-5 w-5" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === 'user' ? 'bg-secondary text-foreground rounded-tr-sm' : 'bg-coral/10 border border-coral/20 text-foreground rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 rounded-b-2xl border border-border bg-card p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte sobre um caso, peça um resumo de aula..." 
              className="pr-12 h-12 rounded-xl bg-secondary/50 border-transparent focus:border-coral focus:bg-background"
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="h-12 px-6 rounded-xl bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
            {isLoading ? "Digitando..." : <><Send className="h-4 w-4 mr-2" /> Enviar</>}
          </Button>
        </div>
        <div className="mt-3 flex justify-center gap-2">
          <BadgeSuggest text="Resumir a última aula" />
          <BadgeSuggest text="Protocolo de emergência" />
          <BadgeSuggest text="Questões para prova" />
        </div>
      </div>
    </div>
  );
}

function BadgeSuggest({ text }: { text: string }) {
  return (
    <button className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground hover:text-coral hover:border-coral/50 transition">
      {text}
    </button>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
      content: "Olá! Sou o Tutor Vet IA. Estou aqui para te ajudar com dúvidas clínicas, sugerir artigos científicos ou até montar um plano de estudos focado na sua especialidade. O que vamos estudar hoje?"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "ai",
        content: "Entendi sua dúvida! Com base nos protocolos mais recentes e nas diretrizes da WSAVA, a abordagem recomendada seria realizar uma triagem completa antes da intervenção. Quer que eu te envie o link direto para a aula do Prof. Carlos sobre este tema exato?"
      }]);
    }, 1500);
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
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' ? 'bg-secondary text-foreground rounded-tr-sm' : 'bg-coral/10 border border-coral/20 text-foreground rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
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
            />
          </div>
          <Button onClick={handleSend} disabled={!input.trim()} className="h-12 px-6 rounded-xl bg-coral text-coral-foreground hover:bg-coral/90 shadow-coral">
            <Send className="h-4 w-4 mr-2" /> Enviar
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

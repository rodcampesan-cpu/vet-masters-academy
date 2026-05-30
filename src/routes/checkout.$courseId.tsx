import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { courses } from "@/lib/courses-data";
import { CheckCircle2, ShieldCheck, Lock, CreditCard, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/$courseId")({
  head: () => ({ meta: [{ title: "Checkout Seguro — VetClass Pro" }] }),
  loader: ({ params }) => {
    const found = courses.find((x) => x.id === params.courseId);
    if (!found) throw notFound();
    return { course: found };
  },
  component: CheckoutPage,
});

function CheckoutPage() {
  const { course } = Route.useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulando processamento de pagamento
    setTimeout(() => {
      toast.success("Pagamento aprovado com sucesso! Bem-vindo à VetClass Pro.");
      navigate({ to: "/app" }); // Redireciona para o Início autenticado
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header Simples do Checkout */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-coral p-2 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">VetClass<span className="text-coral">Pro</span></span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: Resumo do Produto */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                <img src={course.cover} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <img src={course.teacher.avatar} alt="Professor" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                  <span className="text-white text-sm font-medium">{course.teacher.name}</span>
                </div>
              </div>
              
              <h2 className="font-display font-bold text-xl leading-tight mb-2">{course.title}</h2>
              <p className="text-sm text-slate-500 mb-6">{course.description}</p>
              
              <div className="space-y-3 mb-6">
                {[
                  "Acesso completo por 12 meses",
                  "Material didático em PDF para download",
                  "Certificado de conclusão reconhecido",
                  "Acesso à Comunidade VIP de Alunos"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">Garantia de 7 Dias</h4>
                  <p className="text-xs text-emerald-700">Satisfação garantida ou seu dinheiro 100% de volta.</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Formulário de Pagamento */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <form onSubmit={handleCheckout} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
              
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-coral text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">1</span> 
                Dados Pessoais
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Nome Completo</label>
                    <Input required placeholder="Ex: João da Silva" className="bg-slate-50 border-slate-200" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">CPF</label>
                    <Input required placeholder="000.000.000-00" className="bg-slate-50 border-slate-200" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">E-mail (Acesso ao curso)</label>
                    <Input required type="email" placeholder="seu@email.com" className="bg-slate-50 border-slate-200" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Celular (WhatsApp)</label>
                    <Input required placeholder="(00) 90000-0000" className="bg-slate-50 border-slate-200" />
                  </div>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                <span className="bg-coral text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">2</span> 
                Pagamento
              </h3>

              <Tabs defaultValue="pix" className="w-full mb-8">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-slate-100 p-1 rounded-xl h-auto">
                  <TabsTrigger value="pix" className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <QrCode className="h-4 w-4 mr-2" /> PIX (Aprovação na hora)
                  </TabsTrigger>
                  <TabsTrigger value="credit" className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <CreditCard className="h-4 w-4 mr-2" /> Cartão de Crédito
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="pix" className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                  <QrCode className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-700">O código PIX será gerado na próxima tela.</p>
                  <p className="text-xs text-slate-500 mt-1">Seu acesso será liberado imediatamente após o pagamento.</p>
                </TabsContent>
                
                <TabsContent value="credit" className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Número do Cartão</label>
                    <Input required placeholder="0000 0000 0000 0000" className="bg-slate-50 border-slate-200" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Nome no Cartão</label>
                      <Input required placeholder="Nome impresso" className="bg-slate-50 border-slate-200" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Validade</label>
                      <Input required placeholder="MM/AA" className="bg-slate-50 border-slate-200" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Resumo e Botão Final */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-sm text-slate-500 line-through">De R$ 1.497,00</p>
                    <p className="text-xs font-semibold text-coral mt-1">Oferta Especial</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-black text-3xl text-slate-900">R$ 997<span className="text-lg text-slate-500">,00</span></p>
                    <p className="text-xs text-slate-500">ou 12x de R$ 99,70</p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-14 text-lg font-bold bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/30 transition-all hover:-translate-y-1"
                >
                  {loading ? "Processando..." : (
                    <>
                      <Lock className="h-5 w-5 mr-2" /> Comprar Agora
                    </>
                  )}
                </Button>
                
                <p className="text-center text-[10px] text-slate-400 mt-4 flex justify-center items-center gap-1">
                  <Lock className="h-3 w-3" /> Pagamento 100% Seguro e Criptografado
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

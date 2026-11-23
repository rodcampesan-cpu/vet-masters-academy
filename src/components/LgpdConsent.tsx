import { useState, useEffect } from "react";
import { ShieldCheck, Cookie, X, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function LgpdConsent() {
  const [visible, setVisible] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já deu o consentimento anteriormente
    const consent = localStorage.getItem("vetmaster_lgpd_consent");
    if (!consent) {
      // Delay de 1 segundo para entrada suave
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("vetmaster_lgpd_consent", "all");
    setVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("vetmaster_lgpd_consent", "essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Banner Flutuante LGPD */}
      <div 
        className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-[9998] animate-fade-in"
        role="region"
        aria-label="Aviso de Privacidade e Cookies"
      >
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-1.5">
                  Privacidade e Proteção de Dados (LGPD)
                </h4>
                <button
                  onClick={handleAcceptEssential}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors"
                  title="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Utilizamos cookies e tecnologias similares para personalizar conteúdo, oferecer recursos seguros e aprimorar a sua experiência na plataforma, em conformidade com a <strong>LGPD (Lei nº 13.709/2018)</strong>.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-xs transition-all hover:scale-105 cursor-pointer"
                >
                  Aceitar Todos
                </Button>

                <Button
                  onClick={handleAcceptEssential}
                  variant="outline"
                  size="sm"
                  className="text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 font-semibold text-xs h-9 px-3.5 rounded-xl cursor-pointer"
                >
                  Apenas Necessários
                </Button>

                <button
                  type="button"
                  onClick={() => setShowPolicy(true)}
                  className="text-[11px] font-semibold text-coral hover:underline ml-auto flex items-center gap-1 py-1 cursor-pointer"
                >
                  <FileText className="h-3 w-3" /> Termos & Privacidade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Completo de Política de Privacidade e Termos LGPD */}
      <Dialog open={showPolicy} onOpenChange={setShowPolicy}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900">
          <DialogHeader className="text-left border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <ShieldCheck className="h-6 w-6" />
              <span className="text-xs font-bold uppercase tracking-wider">Segurança & Conformidade</span>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Política de Privacidade e Proteção de Dados
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Em cumprimento à Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais — LGPD).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <section>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">1. Compromisso com sua Privacidade</h5>
              <p>
                A Vetmasterclass compromete-se com a segurança, transparência e confidencialidade dos dados pessoais coletados de seus alunos, visitantes e profissionais cadastrados em nossa plataforma de ensino.
              </p>
            </section>

            <section>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">2. Dados Pessoais Coletados</h5>
              <p>Podemos coletar os seguintes dados estritamente necessários para a execução dos nossos serviços:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li><strong>Dados de Identificação:</strong> Nome completo, e-mail, telefone/WhatsApp para liberação de acesso e comunicação;</li>
                <li><strong>Dados de Navegação:</strong> Endereço IP, registros de data/hora de acesso à sala de aula, progresso das aulas e respostas nos simuladores clínicos;</li>
                <li><strong>Cookies de Sessão:</strong> Para manter o aluno conectado e salvar preferências de estudo.</li>
              </ul>
            </section>

            <section>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">3. Finalidade do Tratamento</h5>
              <p>Seus dados são utilizados exclusivamente para:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Fornecer acesso autenticado às aulas, casos clínicos, biblioteca e Tutor Vet IA;</li>
                <li>Emitir certificados de conclusão e registrar o progresso de formação acadêmica;</li>
                <li>Garantir a segurança contra acessos não autorizados e fraudes;</li>
                <li>Enviar comunicações sobre atualizações de aulas e suporte via WhatsApp/e-mail quando autorizado.</li>
              </ul>
            </section>

            <section>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">4. Direitos do Titular (Art. 18 da LGPD)</h5>
              <p>
                Você, como titular dos dados, pode a qualquer momento solicitar: confirmação da existência de tratamento, acesso aos seus dados, correção de dados incompletos ou inexatos, anonimização, bloqueio ou eliminação de dados desnecessários, e revogação do consentimento.
              </p>
            </section>

            <section>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">5. Segurança e Armazenamento</h5>
              <p>
                Utilizamos padrões internacionais de segurança cibernética, criptografia de ponta a ponta (SSL/HTTPS), autenticação segura e bancos de dados isolados protegidos por políticas rigorosas de controle de acesso (RLS).
              </p>
            </section>

            <section>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">6. Contato com o Encarregado (DPO)</h5>
              <p>
                Para exercer seus direitos ou tirar dúvidas sobre o tratamento de seus dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados pelo canal oficial de suporte ou WhatsApp disponível na plataforma.
              </p>
            </section>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <Button
              onClick={() => {
                handleAcceptAll();
                setShowPolicy(false);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs h-10 px-5"
            >
              Concordar e Aceitar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

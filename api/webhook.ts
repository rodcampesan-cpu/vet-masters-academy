import { VercelRequest, VercelResponse } from '@vercel/node';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  try {
    const { action, data, type } = req.body;
    const paymentId = data?.id;

    // O Mercado Pago envia o ID do pagamento quando a action é payment.created ou type é payment
    if (!paymentId || type !== 'payment') {
      return res.status(200).json({ received: true });
    }

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("ERRO: MERCADOPAGO_ACCESS_TOKEN não configurado no Vercel");
      return res.status(500).json({ error: 'Configuração incompleta' });
    }

    // Busca os detalhes do pagamento no Mercado Pago para garantir a veracidade
    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });

    if (paymentInfo.status === 'approved') {
      const externalReference = paymentInfo.external_reference;
      
      if (!externalReference) {
        console.error("ERRO: external_reference não encontrado no pagamento", paymentId);
        return res.status(200).json({ received: true }); // Retorna 200 pro MP parar de enviar
      }

      // external_reference formato: "userUUID_courseId"
      const [userId, courseId] = externalReference.split('_');

      // Conecta ao Supabase usando a chave Admin (Service Role) para bypassar as regras de RLS e poder inserir dados
      const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseServiceKey) {
        console.error("ERRO: Credenciais do Supabase ausentes nas variáveis de ambiente");
        return res.status(500).json({ error: 'Credenciais banco de dados ausentes' });
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Insere ou atualiza o status de liberação do curso para o aluno
      const { error } = await supabase
        .from('purchases')
        .upsert({
          user_id: userId,
          course_id: courseId,
          status: 'approved',
          payment_id: String(paymentId),
          amount: paymentInfo.transaction_amount,
          updated_at: new Date().toISOString()
        }, { onConflict: 'payment_id' }); // Se quiser usar UPSERT, defina restrição

      if (error) {
        console.error("Erro ao inserir no Supabase:", error);
      } else {
        console.log(`Sucesso! Curso ${courseId} liberado para usuário ${userId}`);
      }
    }

    // Sempre retorne 200 para o Mercado Pago, senão ele vai ficar tentando re-enviar a notificação
    return res.status(200).json({ received: true });

  } catch (error: any) {
    console.error('Erro no Webhook:', error);
    return res.status(500).json({ error: 'Erro interno', details: error.message });
  }
}

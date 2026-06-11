import { VercelRequest, VercelResponse } from '@vercel/node';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configuração de CORS (Permitir chamadas do frontend)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  try {
    const { courseId, title, price, userEmail, userId } = req.body;
    
    if (!courseId || !price || !userEmail || !userId) {
      return res.status(400).json({ error: 'Faltam dados obrigatórios (courseId, price, userEmail, userId)' });
    }

    // Pega o token seguro das variáveis de ambiente da Vercel
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("ERRO: MERCADOPAGO_ACCESS_TOKEN não configurado no Vercel");
      return res.status(500).json({ error: 'Configuração do servidor incompleta.' });
    }

    // Inicia o cliente do Mercado Pago
    const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });
    const preference = new Preference(client);

    // O external_reference é crucial para sabermos quem comprou o que no Webhook depois
    const externalReference = `${userId}_${courseId}`;

    const body = {
      items: [
        {
          id: courseId,
          title: title || 'Curso VetClass Pro',
          quantity: 1,
          unit_price: Number(price),
          currency_id: 'BRL',
        }
      ],
      payer: {
        email: userEmail
      },
      external_reference: externalReference,
      back_urls: {
        success: `https://vet-class-pro.vercel.app/app`,
        failure: `https://vet-class-pro.vercel.app/checkout/${courseId}`,
        pending: `https://vet-class-pro.vercel.app/app`
      },
      auto_return: 'approved',
      // Você pode definir statement_descriptor para aparecer na fatura do cartão
      statement_descriptor: 'VETCLASS PRO'
    };

    const result = await preference.create({ body });

    // Retorna o ID e o link de pagamento seguro para redirecionar o usuário
    return res.status(200).json({ 
      id: result.id, 
      init_point: result.init_point 
    });

  } catch (error: any) {
    console.error('Erro MercadoPago Preference:', error);
    return res.status(500).json({ error: 'Falha ao criar pagamento', details: error.message });
  }
}

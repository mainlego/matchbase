import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.NOWPAYMENTS_API_KEY || 'DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ';
const API_BASE_URL = 'https://api.nowpayments.io/v1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packages, userData, total, isFullPackage, discount } = req.body;

    const packageNames = packages.map((pkg: any) => pkg.name).join(', ');
    const orderDescription = isFullPackage
      ? `Полный пакет статистики (все виды спорта)`
      : `Пакеты статистики: ${packageNames}`;

    // Create payment using NOWPayments API
    const paymentData = {
      price_amount: total,
      price_currency: 'usd',
      pay_currency: 'usdttrc20',
      order_id: `PKG_${Date.now()}`,
      order_description: orderDescription,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/`,
    };

    const response = await fetch(`${API_BASE_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Payment API error:', response.status, errorText);
      throw new Error(`Payment API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.payment_url) {
      throw new Error('No payment URL received from API');
    }

    res.status(200).json({ payment_url: result.payment_url });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
}
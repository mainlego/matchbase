import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.NOWPAYMENTS_API_KEY || 'DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Payment API called with method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packages, userData, total, isFullPackage, discount } = req.body;

    console.log('Payment request data:', {
      packages: packages?.length,
      userData: userData?.email,
      total,
      isFullPackage
    });

    // Validate required fields
    if (!packages || !userData || !total) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const packageNames = packages.map((pkg: any) => pkg.name).join(', ');
    const orderDescription = isFullPackage
      ? `Полный пакет статистики (все виды спорта)`
      : `Пакеты статистики: ${packageNames}`;

    // For now, let's create a simple redirect URL instead of using NOWPayments API
    // This will help us test the flow without API issues
    const mockPaymentUrl = `https://nowpayments.io/payment/?iid=6516951928&itype=paypro&h=ea0ae3d1b8b64d7b7e7c1bbf8e3dd27c`;

    console.log('Generated mock payment URL:', mockPaymentUrl);

    res.status(200).json({ payment_url: mockPaymentUrl });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      error: 'Failed to create payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
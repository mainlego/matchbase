import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.NOWPAYMENTS_API_KEY || 'DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ';
const API_BASE_URL = 'https://api.nowpayments.io/v1';

// Hardcoded USDT TRC20 address for payments
const PAYMENT_ADDRESS = 'TCJRMnnxbpT32EQP7hCRja5TUGmMDYMrVn';

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
      ? `Full sports statistics package (all sports)`
      : `Sports statistics packages: ${packageNames}`;

    const orderId = `PKG_${Date.now()}`;

    // For now, let's use a simple approach - create a payment page with instructions
    // Since NOWPayments API seems to have issues with direct payment URL creation

    console.log('Creating simple payment solution...');

    // Create a payment instructions page
    const paymentInstructions = {
      order_id: orderId,
      amount_usd: total,
      amount_usdt: (total * 0.996).toFixed(2), // Approximate USDT amount
      payment_address: PAYMENT_ADDRESS,
      network: 'TRC20',
      currency: 'USDT',
      description: orderDescription,
      customer_email: userData.email,
      telegram: userData.telegramId
    };

    // Store payment info (in production, this should be in a database)
    console.log('Payment instructions created:', paymentInstructions);

    // Create a simple payment link that will show instructions
    const baseUrl = req.headers.origin || 'https://sport-matces.vercel.app';
    const paymentUrl = `${baseUrl}/payment?` + new URLSearchParams({
      order_id: orderId,
      amount: total.toString(),
      address: PAYMENT_ADDRESS,
      network: 'TRC20',
      email: userData.email
    }).toString();

    console.log('Payment URL created:', paymentUrl);

    res.status(200).json({
      payment_url: paymentUrl,
      payment_details: {
        payment_id: orderId,
        pay_address: PAYMENT_ADDRESS,
        pay_amount: paymentInstructions.amount_usdt,
        pay_currency: 'USDT TRC20',
        payment_status: 'waiting',
        instructions: 'Send exact amount to the provided address'
      }
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      error: 'Failed to create payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.NOWPAYMENTS_API_KEY || 'DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ';
const API_BASE_URL = 'https://api.nowpayments.io/v1';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Payment API called with method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // First check if NOWPayments API is available
    try {
      const statusResponse = await fetch(`${API_BASE_URL}/status`, {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      console.log('NOWPayments status check:', statusResponse.status);
    } catch (statusError) {
      console.log('NOWPayments status check failed:', statusError);
    }

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

    // Create payment using NOWPayments API
    const paymentData = {
      price_amount: total,
      price_currency: 'usd',
      pay_currency: 'usdttrc20',
      order_id: `PKG_${Date.now()}`,
      order_description: orderDescription,
      success_url: `${req.headers.origin || 'https://sport-matces.vercel.app'}/success`,
      cancel_url: `${req.headers.origin || 'https://sport-matces.vercel.app'}/`,
      ipn_callback_url: `${req.headers.origin || 'https://sport-matces.vercel.app'}/api/payment-callback`,
    };

    console.log('API_KEY available:', !!API_KEY);
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('Sending payment data to NOWPayments:', JSON.stringify(paymentData, null, 2));

    const response = await fetch(`${API_BASE_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(paymentData),
    });

    const responseText = await response.text();
    console.log('NOWPayments response status:', response.status);
    console.log('NOWPayments response:', responseText);

    if (!response.ok) {
      console.error('Payment API error:', response.status, responseText);

      // If NOWPayments API is down, provide fallback
      if (response.status >= 500) {
        console.log('Using fallback payment method due to API error');
        const fallbackUrl = `https://t.me/monroanim`;
        return res.status(200).json({
          payment_url: fallbackUrl,
          fallback: true,
          message: 'Payment service temporarily unavailable. Please contact support for manual payment.'
        });
      }

      return res.status(response.status).json({
        error: 'Payment API error',
        details: responseText
      });
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse NOWPayments response:', parseError);
      return res.status(500).json({
        error: 'Invalid response from payment provider',
        details: responseText
      });
    }

    if (!result.payment_url) {
      console.error('No payment URL in response:', result);
      return res.status(500).json({
        error: 'No payment URL received from payment provider',
        details: result
      });
    }

    console.log('Payment URL created successfully:', result.payment_url);
    res.status(200).json({ payment_url: result.payment_url });

  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({
      error: 'Failed to create payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
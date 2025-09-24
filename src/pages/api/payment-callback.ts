import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Payment callback received:', {
    method: req.method,
    body: req.body,
    headers: req.headers
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const paymentData = req.body;

    // Here you would typically:
    // 1. Verify the payment signature
    // 2. Update your database with payment status
    // 3. Send confirmation email/telegram message
    // 4. Provide access to the purchased packages

    console.log('Payment status:', paymentData.payment_status);
    console.log('Order ID:', paymentData.order_id);
    console.log('Amount:', paymentData.price_amount);

    if (paymentData.payment_status === 'finished') {
      console.log('Payment completed successfully for order:', paymentData.order_id);
      // TODO: Grant access to the purchased packages
    } else if (paymentData.payment_status === 'failed') {
      console.log('Payment failed for order:', paymentData.order_id);
      // TODO: Handle failed payment
    } else {
      console.log('Payment status updated:', paymentData.payment_status);
    }

    // Always respond with OK to acknowledge receipt
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Payment callback error:', error);
    res.status(500).json({ error: 'Callback processing failed' });
  }
}
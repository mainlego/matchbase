import { Match, UserData, CartItem } from '@/types';

const API_KEY = process.env.NOWPAYMENTS_API_KEY || 'DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ';
const API_BASE_URL = 'https://api.nowpayments.io/v1';

export async function createPayment(match: Match, userData: UserData): Promise<string> {
  try {
    const orderDescription = `${match.sport} - ${match.homeTeam} vs ${match.awayTeam} (5 years stats)`;

    const paymentParams = new URLSearchParams({
      amount: match.price.toString(),
      currency: 'USD',
      order_id: `${match.id}_${Date.now()}`,
      order_description: orderDescription,
      customer_email: userData.email,
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/match/${match.id}`,
      partially_paid_url: `${window.location.origin}/partial`,
      metadata: JSON.stringify({
        telegramId: userData.telegramId,
        email: userData.email,
        matchId: match.id,
        matchDetails: `${match.homeTeam} vs ${match.awayTeam}`,
        statsYears: match.statsYears,
      }),
    });

    const paymentUrl = `${POS_URL}?${paymentParams.toString()}`;

    return paymentUrl;
  } catch (error) {
    console.error('Payment creation error:', error);
    throw new Error('Failed to create payment');
  }
}

interface PackagePaymentData {
  packages: CartItem[];
  userData: UserData;
  total: number;
  isFullPackage: boolean;
  discount: number;
}

export async function createPackagePayment(data: PackagePaymentData): Promise<string> {
  try {
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Payment API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.payment_url) {
      throw new Error('No payment URL received from API');
    }

    return result.payment_url;
  } catch (error) {
    console.error('Package payment creation error:', error);
    throw new Error('Failed to create package payment');
  }
}

export async function verifyPayment(paymentId: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.nowpayments.io/v1/payment/${paymentId}`, {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const data = await response.json();
    return data.payment_status === 'finished';
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
}
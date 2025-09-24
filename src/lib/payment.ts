import { Match, UserData, CartItem } from '@/types';

const API_KEY = process.env.NOWPAYMENTS_API_KEY || 'DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ';
const POS_URL = process.env.NOWPAYMENTS_POS_URL || 'https://nowpayments.io/pos-terminal/matchbase';

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
    const { packages, userData, total, isFullPackage, discount } = data;

    const packageNames = packages.map(pkg => pkg.name).join(', ');
    const orderDescription = isFullPackage
      ? `Полный пакет статистики (4 вида спорта) - скидка ${discount} USDT`
      : `Пакеты статистики: ${packageNames}`;

    const paymentParams = new URLSearchParams({
      amount: total.toString(),
      currency: 'USDT',
      order_id: `PKG_${Date.now()}`,
      order_description: orderDescription,
      customer_email: userData.email,
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/`,
      partially_paid_url: `${window.location.origin}/partial`,
      metadata: JSON.stringify({
        telegramId: userData.telegramId,
        email: userData.email,
        packages: packages.map(pkg => ({
          id: pkg.packageId,
          sport: pkg.sport,
          name: pkg.name,
          price: pkg.price
        })),
        total,
        isFullPackage,
        discount,
        orderType: 'package'
      }),
    });

    const paymentUrl = `${POS_URL}?${paymentParams.toString()}`;

    return paymentUrl;
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
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FaCopy, FaCheckCircle, FaQrcode } from 'react-icons/fa';

export default function Payment() {
  const router = useRouter();
  const { order_id, amount, address, network, email } = router.query;
  const [copied, setCopied] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!order_id || !amount || !address) {
      router.push('/');
    }
  }, [router.isReady, order_id, amount, address]);

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address as string);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyAmount = () => {
    const usdtAmount = (parseFloat(amount as string) * 0.996).toFixed(2);
    navigator.clipboard.writeText(usdtAmount);
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const usdtAmount = amount ? (parseFloat(amount as string) * 0.996).toFixed(2) : '0';

  return (
    <Layout title="Оплата - MatchBase">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6">
            <h1 className="text-2xl font-bold">Инструкции по оплате</h1>
            <p className="mt-2 opacity-90">Заказ #{order_id}</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                ⚠️ Важно: Отправьте точную сумму USDT на указанный адрес
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Сумма к оплате
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {usdtAmount} USDT
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      ≈ ${amount} USD
                    </div>
                  </div>
                  <button
                    onClick={handleCopyAmount}
                    className="p-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {copiedAmount ? <FaCheckCircle size={20} /> : <FaCopy size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Адрес для отправки (Сеть: {network})
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm break-all">
                    {address}
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="p-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {copied ? <FaCheckCircle size={20} /> : <FaCopy size={20} />}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Инструкции:</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Скопируйте адрес кошелька</li>
                  <li>Откройте ваш кошелек (Trust Wallet, MetaMask, и т.д.)</li>
                  <li>Выберите USDT на сети TRC20 (Tron)</li>
                  <li>Вставьте адрес и точную сумму</li>
                  <li>Подтвердите транзакцию</li>
                  <li>После оплаты свяжитесь с нами в Telegram</li>
                </ol>
              </div>

              <div className="text-center space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  После оплаты свяжитесь с нами для подтверждения
                </p>
                <a
                  href={`https://t.me/monroanim?text=Оплатил заказ ${order_id}, сумма ${usdtAmount} USDT, email: ${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Подтвердить оплату в Telegram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 dark:text-gray-400 hover:text-primary transition"
          >
            ← Вернуться на главную
          </button>
        </div>
      </div>
    </Layout>
  );
}
import { useEffect, useState } from 'react';
import { Match } from '@/types';
import { useStore } from '@/lib/store';
import { createPayment } from '@/lib/payment';

interface PaymentModalProps {
  match: Match;
  onClose: () => void;
}

export default function PaymentModal({ match, onClose }: PaymentModalProps) {
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [error, setError] = useState('');
  const { userData } = useStore();

  useEffect(() => {
    const initPayment = async () => {
      try {
        setLoading(true);
        const url = await createPayment(match, userData!);
        setPaymentUrl(url);
      } catch (err) {
        setError('Ошибка при создании платежа. Попробуйте позже.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      initPayment();
    }
  }, [match, userData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Оплата через NOWPayments</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Информация о заказе:</h4>
                <p>Матч: {match.homeTeam} vs {match.awayTeam}</p>
                <p>Стоимость: ${match.price}</p>
                <p>Telegram: {userData?.telegramId}</p>
                <p>Email: {userData?.email}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Для завершения оплаты перейдите по ссылке ниже и следуйте инструкциям NOWPayments:
                </p>
                <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 text-white text-center py-3 px-6 rounded-lg hover:bg-green-700 transition font-bold"
                >
                  Оплатить через NOWPayments
                </a>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <p>• После успешной оплаты статистика будет отправлена в Telegram</p>
                <p>• Копия также будет отправлена на указанный email</p>
                <p>• Обработка платежа может занять до 10 минут</p>
                <p>• При возникновении проблем свяжитесь с @matchbase_support</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
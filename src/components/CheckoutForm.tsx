import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Match, UserData } from '@/types';
import { useStore } from '@/lib/store';
import PaymentModal from './PaymentModal';

interface CheckoutFormProps {
  match: Match;
}

export default function CheckoutForm({ match }: CheckoutFormProps) {
  const [showPayment, setShowPayment] = useState(false);
  const { setUserData } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const onSubmit = (data: UserData) => {
    setUserData(data);
    setShowPayment(true);
  };

  return (
    <>
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6">Оформление покупки</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Telegram ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="@username или ID"
              {...register('telegramId', {
                required: 'Telegram ID обязателен',
                pattern: {
                  value: /^[@]?[a-zA-Z0-9_]+$/,
                  message: 'Неверный формат Telegram ID',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {errors.telegramId && (
              <p className="text-red-500 text-sm mt-1">{errors.telegramId.message}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Статистика будет отправлена в Telegram после оплаты
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Неверный формат email',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Резервная копия статистики будет отправлена на email
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-400">Матч:</span>
              <span className="font-semibold">{match.homeTeam} vs {match.awayTeam}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-400">Период статистики:</span>
              <span className="font-semibold">{match.statsYears} лет</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Стоимость:</span>
              <span className="text-2xl font-bold text-primary">${match.price}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Перейти к оплате
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Принимаем криптовалюту через NOWPayments</p>
          <p>Безопасная и анонимная оплата</p>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          match={match}
          onClose={() => setShowPayment(false)}
        />
      )}
    </>
  );
}
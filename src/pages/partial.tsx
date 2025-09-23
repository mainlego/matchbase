import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Partial() {
  const router = useRouter();

  return (
    <Layout title="Частичная оплата - MatchBase">
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-4" />

          <h1 className="text-2xl font-bold mb-4">Частичная оплата получена</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Мы получили частичную оплату за ваш заказ. Пожалуйста, доплатите оставшуюся сумму для получения статистики.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Свяжитесь с поддержкой для решения вопроса: @matchbase_support
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition"
            >
              На главную
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
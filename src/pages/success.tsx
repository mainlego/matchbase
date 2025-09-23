import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { FaCheckCircle } from 'react-icons/fa';

export default function Success() {
  const router = useRouter();

  return (
    <Layout title="Оплата успешна - MatchBase">
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

          <h1 className="text-2xl font-bold mb-4">Оплата успешно завершена!</h1>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Спасибо за покупку! Статистика матча будет отправлена на указанные контакты в течение 10 минут.
          </p>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold mb-2">Что дальше?</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Проверьте Telegram для получения статистики</li>
              <li>• Копия будет отправлена на email</li>
              <li>• При проблемах: @matchbase_support</li>
            </ul>
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    </Layout>
  );
}
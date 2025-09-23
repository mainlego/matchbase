import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Match } from '@/types';
import { mockMatches } from '@/lib/data';
import { useStore } from '@/lib/store';
import Layout from '@/components/Layout';
import MatchDetails from '@/components/MatchDetails';
import CheckoutForm from '@/components/CheckoutForm';

export default function MatchPage() {
  const router = useRouter();
  const { id } = router.query;
  const [match, setMatch] = useState<Match | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const { setSelectedMatch } = useStore();

  useEffect(() => {
    if (id) {
      const foundMatch = mockMatches.find((m) => m.id === id);
      if (foundMatch) {
        setMatch(foundMatch);
        setSelectedMatch(foundMatch);
      } else {
        router.push('/');
      }
    }
  }, [id, router, setSelectedMatch]);

  if (!match) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.push('/')}
          className="mb-6 text-primary hover:text-blue-700 flex items-center gap-2"
        >
          ← Вернуться к матчам
        </button>

        <MatchDetails match={match} />

        {!showCheckout ? (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Приобрести статистику</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Получите полный доступ к статистике этого матча за последние 5 лет
            </p>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Купить за ${match.price}
            </button>
          </div>
        ) : (
          <CheckoutForm match={match} />
        )}
      </div>
    </Layout>
  );
}
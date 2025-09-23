import { useState } from 'react';
import { Match, Sport } from '@/types';
import { mockMatches } from '@/lib/data';
import Layout from '@/components/Layout';
import SportFilter from '@/components/SportFilter';
import MatchCard from '@/components/MatchCard';
import Hero from '@/components/Hero';

export default function Home() {
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');

  const filteredMatches = selectedSport === 'all'
    ? mockMatches
    : mockMatches.filter(match => match.sport === selectedSport);

  return (
    <Layout>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Доступная статистика матчей
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Получите подробную статистику за последние 5 лет для принятия взвешенных решений
          </p>
        </div>

        <SportFilter
          selectedSport={selectedSport}
          onSelectSport={setSelectedSport}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Нет доступных матчей в выбранной категории
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
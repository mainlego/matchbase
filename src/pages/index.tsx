import { useState } from 'react';
import { Sport } from '@/types';
import { sportPackages } from '@/lib/packages';
import Layout from '@/components/Layout';
import SportFilter from '@/components/SportFilter';
import PackageCard from '@/components/PackageCard';
import Cart from '@/components/Cart';
import Hero from '@/components/Hero';

export default function Home() {
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');

  const filteredPackages = selectedSport === 'all'
    ? sportPackages
    : sportPackages.filter(pkg => pkg.sport === selectedSport);

  return (
    <Layout>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Пакеты спортивной статистики
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Выберите отдельные пакеты или полный пакет со всеми видами спорта
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
              <div className="text-lg font-bold">🎉 Отдельные пакеты</div>
              <div className="text-sm">4 пакета = 1990 USDT вместо 2400 USDT</div>
              <div className="text-xs opacity-90">Экономия: 410 USDT</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
              <div className="text-lg font-bold">⭐ Полный пакет</div>
              <div className="text-sm">Все виды спорта за 1990 USDT</div>
              <div className="text-xs opacity-90">9700+ матчей за 8 лет</div>
            </div>
          </div>
        </div>

        <SportFilter
          selectedSport={selectedSport}
          onSelectSport={setSelectedSport}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Нет доступных пакетов в выбранной категории
            </p>
          </div>
        )}
      </div>

      <Cart />
    </Layout>
  );
}
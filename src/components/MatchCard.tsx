import { Match } from '@/types';
import Link from 'next/link';
import { FaFutbol, FaBasketballBall, FaVolleyballBall } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';

interface MatchCardProps {
  match: Match;
}

const sportIcons = {
  football: FaFutbol,
  basketball: FaBasketballBall,
  tennis: GiTennisRacket,
  volleyball: FaVolleyballBall,
};

export default function MatchCard({ match }: MatchCardProps) {
  const Icon = sportIcons[match.sport];
  const formattedDate = new Date(match.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link href={`/match/${match.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-blue-700 p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Icon size={24} />
            <span className="text-sm font-medium">{match.league}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {match.homeTeam}
            </div>
            <div className="text-gray-500 my-2">VS</div>
            <div className="font-bold text-lg text-gray-900 dark:text-white">
              {match.awayTeam}
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            {formattedDate}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Статистика за {match.statsYears} лет
              </div>
              <div className="text-xl font-bold text-primary">
                ${match.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
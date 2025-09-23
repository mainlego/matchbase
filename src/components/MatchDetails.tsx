import { Match } from '@/types';
import { FaFutbol, FaBasketballBall, FaVolleyballBall } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';
import { BiTime, BiCalendar, BiTrophy } from 'react-icons/bi';

interface MatchDetailsProps {
  match: Match;
}

const sportIcons = {
  football: FaFutbol,
  basketball: FaBasketballBall,
  tennis: GiTennisRacket,
  volleyball: FaVolleyballBall,
};

export default function MatchDetails({ match }: MatchDetailsProps) {
  const Icon = sportIcons[match.sport];
  const formattedDate = new Date(match.date).toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-blue-700 p-8 text-white">
        <div className="flex items-center justify-center mb-4">
          <Icon size={48} />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">{match.league}</h2>
      </div>

      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-2xl font-bold">{match.homeTeam}</div>
            <div className="text-xl text-gray-500 px-4">VS</div>
            <div className="text-2xl font-bold">{match.awayTeam}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <BiCalendar className="mx-auto mb-2 text-primary" size={32} />
            <div className="text-sm text-gray-600 dark:text-gray-400">Дата матча</div>
            <div className="font-semibold">{formattedDate}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <BiTime className="mx-auto mb-2 text-primary" size={32} />
            <div className="text-sm text-gray-600 dark:text-gray-400">Период анализа</div>
            <div className="font-semibold">{match.statsYears} лет данных</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <BiTrophy className="mx-auto mb-2 text-primary" size={32} />
            <div className="text-sm text-gray-600 dark:text-gray-400">Турнир</div>
            <div className="font-semibold">{match.league}</div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="font-semibold mb-3 text-primary">Что включает статистика:</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✓ Результаты личных встреч за 5 лет</li>
            <li>✓ Форма команд в последних 10 матчах</li>
            <li>✓ Статистика выступлений дома и на выезде</li>
            <li>✓ Средние показатели голов/очков</li>
            <li>✓ Результаты против команд схожего уровня</li>
            <li>✓ Травмы и дисквалификации ключевых игроков</li>
            <li>✓ Погодные условия и их влияние (для открытых видов)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
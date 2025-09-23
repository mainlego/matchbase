import { Sport } from '@/types';
import { FaFutbol, FaBasketballBall, FaVolleyballBall } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';

interface SportFilterProps {
  selectedSport: Sport | 'all';
  onSelectSport: (sport: Sport | 'all') => void;
}

const sports = [
  { id: 'all', name: 'Все виды', icon: null },
  { id: 'football', name: 'Футбол', icon: FaFutbol },
  { id: 'basketball', name: 'Баскетбол', icon: FaBasketballBall },
  { id: 'tennis', name: 'Теннис', icon: GiTennisRacket },
  { id: 'volleyball', name: 'Волейбол', icon: FaVolleyballBall },
];

export default function SportFilter({ selectedSport, onSelectSport }: SportFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {sports.map((sport) => {
        const Icon = sport.icon;
        const isActive = selectedSport === sport.id;

        return (
          <button
            key={sport.id}
            onClick={() => onSelectSport(sport.id as Sport | 'all')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
              ${isActive
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }
            `}
          >
            {Icon && <Icon size={20} />}
            <span>{sport.name}</span>
          </button>
        );
      })}
    </div>
  );
}
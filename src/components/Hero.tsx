import { useState, useEffect } from 'react';
import { FaFutbol, FaBasketballBall, FaVolleyballBall, FaChartLine } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';

export default function Hero() {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: 8, label: 'лет данных', icon: FaChartLine },
    { number: 4, label: 'вида спорта', icon: FaFutbol },
    { number: 9700, label: 'матчей', icon: FaBasketballBall },
  ];

  const sports = [
    { icon: FaFutbol, name: 'Футбол', color: 'from-green-500 to-green-600' },
    { icon: FaBasketballBall, name: 'Баскетбол', color: 'from-orange-500 to-orange-600' },
    { icon: GiTennisRacket, name: 'Теннис', color: 'from-yellow-500 to-yellow-600' },
    { icon: FaVolleyballBall, name: 'Волейбол', color: 'from-blue-500 to-blue-600' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-purple-800 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-white rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              🏆 Премиум спортивная аналитика
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Профессиональная статистика спортивных матчей
          </h1>

          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Полный анализ данных за последние <span className="font-bold text-yellow-300">8 лет</span> для точных прогнозов и успешных ставок
          </p>

          {/* Interactive stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`
                    bg-white/20 backdrop-blur-md rounded-2xl px-8 py-6 transform transition-all duration-500 hover:scale-110 hover:bg-white/30
                    ${currentStat === index ? 'scale-110 bg-white/30 shadow-2xl' : ''}
                  `}
                >
                  <Icon className="text-4xl mb-3 mx-auto text-yellow-300" />
                  <span className="text-4xl font-bold block">
                    {stat.number.toLocaleString()}+
                  </span>
                  <span className="block text-sm opacity-90 font-medium">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Sports icons */}
          <div className="flex justify-center gap-4 mb-12">
            {sports.map((sport, index) => {
              const Icon = sport.icon;
              return (
                <div
                  key={index}
                  className={`
                    bg-gradient-to-r ${sport.color} p-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300
                    animate-bounce
                  `}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Icon className="text-2xl text-white" />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                const packagesSection = document.querySelector('.packages-section');
                packagesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              Посмотреть пакеты
            </button>
            <a
              href="https://t.me/monroanim"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 hover:scale-105 transform transition-all duration-300"
            >
              Связаться с нами
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-primary to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Профессиональная статистика спортивных матчей
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Анализ данных за последние 5 лет для точных прогнозов
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-3xl font-bold">5</span>
              <span className="block text-sm">лет данных</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-3xl font-bold">4</span>
              <span className="block text-sm">вида спорта</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-3xl font-bold">1000+</span>
              <span className="block text-sm">матчей</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
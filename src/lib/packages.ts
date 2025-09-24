import { Package, Sport } from '@/types';

export const sportPackages: Package[] = [
  {
    id: 'football-package',
    sport: 'football',
    name: 'Футбольный пакет',
    description: 'Полная статистика футбольных матчей за 8 лет',
    price: 600,
    currency: 'USDT',
    matchCount: 2500,
    popular: true,
    features: [
      'UEFA Champions League, Europa League',
      'Английская Премьер-лига, Ла Лига, Серия А',
      'Бундеслига, Лига 1, РПЛ',
      'Чемпионат мира, Евро, Кубки стран',
      'Статистика 2500+ матчей за 8 лет',
      'Детальная аналитика команд и игроков',
      'xG, xA, heat maps, pass maps'
    ]
  },
  {
    id: 'basketball-package',
    sport: 'basketball',
    name: 'Баскетбольный пакет',
    description: 'Полная статистика баскетбольных матчей за 8 лет',
    price: 600,
    currency: 'USDT',
    matchCount: 2200,
    features: [
      'NBA Regular Season и Playoffs',
      'EuroLeague, EuroCup',
      'FIBA чемпионаты мира и Европы',
      'Олимпийские игры, Кубок мира',
      'Статистика 2200+ матчей за 8 лет',
      'Продвинутая аналитика (PER, TS%, BPM)',
      'Shot charts, defensive ratings'
    ]
  },
  {
    id: 'tennis-package',
    sport: 'tennis',
    name: 'Теннисный пакет',
    description: 'Полная статистика теннисных матчей за 8 лет',
    price: 600,
    currency: 'USDT',
    matchCount: 3200,
    features: [
      'ATP Masters 1000, ATP 500, ATP 250',
      'WTA 1000, WTA 500, WTA 250',
      'Grand Slam: Wimbledon, US Open, French Open, Australian Open',
      'Davis Cup, Fed Cup, Olympics',
      'Статистика 3200+ матчей за 8 лет',
      'Анализ по покрытиям (хард, грунт, трава)',
      'Детальная статистика ударов и тактики'
    ]
  },
  {
    id: 'volleyball-package',
    sport: 'volleyball',
    name: 'Волейбольный пакет',
    description: 'Полная статистика волейбольных матчей за 8 лет',
    price: 600,
    currency: 'USDT',
    matchCount: 1800,
    features: [
      'Чемпионат мира, Олимпийские игры',
      'Лига наций FIVB',
      'Чемпионаты Европы, Азии, Америки',
      'Клубные турниры CEV',
      'Статистика 1800+ матчей за 8 лет',
      'Анализ по сетам и розыгрышам',
      'Статистика атак, блоков, подач'
    ]
  },
  {
    id: 'all-sports-package',
    sport: 'football' as Sport, // Using football as primary sport
    name: 'Полный пакет статистики',
    description: 'Полная статистика по всем видам спорта за 8 лет',
    price: 1990,
    currency: 'USDT',
    matchCount: 9700, // 2500 + 2200 + 3200 + 1800
    popular: true,
    features: [
      'Все виды спорта: футбол, баскетбол, теннис, волейбол',
      'Статистика 9700+ матчей за 8 лет',
      'Экономия 410 USDT при покупке отдельных пакетов',
      'UEFA Champions League, Europa League',
      'NBA Regular Season и Playoffs, EuroLeague',
      'ATP Masters, WTA, Grand Slam турниры',
      'FIVB Лига наций, Чемпионаты мира',
      'Продвинутая аналитика по всем видам спорта',
      'Heat maps, shot charts, xG статистика',
      'Полный доступ ко всем данным'
    ]
  }
];

export const FULL_PACKAGE_PRICE = 1990;
export const INDIVIDUAL_PACKAGE_PRICE = 600;
export const FULL_PACKAGE_DISCOUNT = 410; // 2400 - 1990

export function calculateTotal(selectedPackages: string[]): number {
  // Check if full package (all sports) is selected
  if (selectedPackages.includes('all-sports-package')) {
    return FULL_PACKAGE_PRICE;
  }
  // Check if all 4 individual packages are selected
  if (selectedPackages.length === 4 && !selectedPackages.includes('all-sports-package')) {
    return FULL_PACKAGE_PRICE;
  }
  return selectedPackages.length * INDIVIDUAL_PACKAGE_PRICE;
}

export function getDiscountAmount(selectedPackages: string[]): number {
  // If full package is selected or all 4 individual packages
  if (selectedPackages.includes('all-sports-package') ||
      (selectedPackages.length === 4 && !selectedPackages.includes('all-sports-package'))) {
    return FULL_PACKAGE_DISCOUNT;
  }
  return 0;
}
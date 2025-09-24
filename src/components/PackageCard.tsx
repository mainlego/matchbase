import { Package } from '@/types';
import { FaFutbol, FaBasketballBall, FaVolleyballBall, FaCheck, FaTrophy } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';
import { useStore } from '@/lib/store';

interface PackageCardProps {
  package: Package;
}

const sportIcons = {
  football: FaFutbol,
  basketball: FaBasketballBall,
  tennis: GiTennisRacket,
  volleyball: FaVolleyballBall,
};

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const Icon = pkg.id === 'all-sports-package' ? FaTrophy : sportIcons[pkg.sport];
  const { addToCart, removeFromCart, isInCart } = useStore();
  const inCart = isInCart(pkg.id);

  const handleToggleCart = () => {
    if (inCart) {
      removeFromCart(pkg.id);
    } else {
      addToCart({
        packageId: pkg.id,
        sport: pkg.sport,
        name: pkg.name,
        price: pkg.price,
      });
    }
  };

  const isFullPackage = pkg.id === 'all-sports-package';

  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden
      ${inCart ? 'ring-2 ring-primary ring-opacity-50 transform scale-105' : ''}
      ${isFullPackage ? 'ring-2 ring-purple-500 ring-opacity-30' : ''}
    `}>
      <div className={`p-6 text-white ${isFullPackage ? 'bg-gradient-to-r from-purple-500 to-purple-700' : 'bg-gradient-to-r from-primary to-blue-700'}`}>
        <div className="flex items-center justify-between mb-3">
          <Icon size={32} />
          <div className="text-right">
            <div className="text-2xl font-bold">{pkg.price}</div>
            <div className="text-sm opacity-90">{pkg.currency}</div>
          </div>
        </div>
        <h3 className="text-xl font-bold">{pkg.name}</h3>
        <p className="text-sm opacity-90 mt-1">{pkg.description}</p>
      </div>

      <div className="p-6">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {pkg.matchCount}+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            матчей в пакете
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {pkg.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleToggleCart}
          className={`
            w-full py-3 px-6 rounded-lg font-bold transition-all duration-300
            ${inCart
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-primary text-white hover:bg-blue-700'
            }
          `}
        >
          {inCart ? (
            <span className="flex items-center justify-center gap-2">
              <FaCheck size={16} />
              В корзине
            </span>
          ) : (
            'Добавить в корзину'
          )}
        </button>
      </div>
    </div>
  );
}
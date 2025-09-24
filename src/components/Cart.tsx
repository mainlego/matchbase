import { useStore } from '@/lib/store';
import { calculateTotal, getDiscountAmount, FULL_PACKAGE_PRICE } from '@/lib/packages';
import { FaShoppingCart, FaTimes, FaGift } from 'react-icons/fa';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function Cart() {
  const { cart, removeFromCart } = useStore();
  const [showCheckout, setShowCheckout] = useState(false);

  if (cart.length === 0) return null;

  const total = calculateTotal(cart.map(item => item.packageId));
  const discount = getDiscountAmount(cart.map(item => item.packageId));
  const hasFullPackage = cart.some(item => item.packageId === 'all-sports-package');
  const originalPrice = hasFullPackage ? 1990 : cart.length * 600;
  const isFullPackage = cart.length === 4 || hasFullPackage;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-2 border-primary/20 min-w-80">
          <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <FaShoppingCart size={20} />
              <h3 className="font-bold">Корзина ({cart.length})</h3>
            </div>
          </div>

          <div className="p-4 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.packageId} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {item.price} USDT
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.packageId)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}

            {isFullPackage && (
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mt-3">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <FaGift size={16} />
                  <span className="font-semibold text-sm">
                    {hasFullPackage ? 'Полный пакет!' : 'Скидка за полный пакет!'}
                  </span>
                </div>
                <div className="text-xs text-green-600 dark:text-green-500 mt-1">
                  {hasFullPackage ? 'Все виды спорта включены' : `Экономия: ${discount} USDT`}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <div className="space-y-2 mb-4">
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 line-through">
                    {originalPrice} USDT
                  </span>
                  <span className="text-red-500 font-medium">
                    -{discount} USDT
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Итого:</span>
                <span className="text-primary">{total} USDT</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
}
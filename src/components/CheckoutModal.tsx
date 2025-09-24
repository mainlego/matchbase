import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserData } from '@/types';
import { useStore } from '@/lib/store';
import { calculateTotal, getDiscountAmount } from '@/lib/packages';
import { createPackagePayment } from '@/lib/payment';
import { FaTimes, FaGift } from 'react-icons/fa';

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const { cart, setUserData, clearCart } = useStore();

  const total = calculateTotal(cart.map(item => item.packageId));
  const discount = getDiscountAmount(cart.map(item => item.packageId));
  const hasFullPackage = cart.some(item => item.packageId === 'all-sports-package');
  const originalPrice = hasFullPackage ? 1990 : cart.length * 600;
  const isFullPackage = cart.length === 4 || hasFullPackage;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    try {
      setLoading(true);
      setUserData(data);

      const url = await createPackagePayment({
        packages: cart,
        userData: data,
        total,
        isFullPackage,
        discount
      });

      setPaymentUrl(url);
    } catch (error) {
      console.error('Payment creation error:', error);
      alert('Ошибка при создании платежа. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRedirect = () => {
    window.open(paymentUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Оформление заказа</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!paymentUrl ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telegram ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="@username или ID"
                  {...register('telegramId', {
                    required: 'Telegram ID обязателен',
                    pattern: {
                      value: /^[@]?[a-zA-Z0-9_]+$/,
                      message: 'Неверный формат Telegram ID',
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {errors.telegramId && (
                  <p className="text-red-500 text-sm mt-1">{errors.telegramId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  {...register('email', {
                    required: 'Email обязателен',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Неверный формат email',
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Детали заказа:</h4>
                {cart.map((item) => (
                  <div key={item.packageId} className="flex justify-between py-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm font-medium">{item.price} USDT</span>
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
                    {!hasFullPackage && (
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600 dark:text-gray-400 line-through">
                          {originalPrice} USDT
                        </span>
                        <span className="text-red-500 font-medium">
                          -{discount} USDT
                        </span>
                      </div>
                    )}
                    {hasFullPackage && (
                      <div className="text-xs text-green-600 dark:text-green-500 mt-1">
                        Все виды спорта включены
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Итого:</span>
                    <span className="text-primary">{total} USDT</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Создание платежа...' : 'Перейти к оплате'}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Платеж готов!</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Нажмите кнопку ниже для перехода к оплате через NOWPayments
              </p>
              <button
                onClick={handlePaymentRedirect}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition"
              >
                Оплатить {total} USDT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
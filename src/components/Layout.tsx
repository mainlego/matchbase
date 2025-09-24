import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'MatchBase - Спортивная статистика' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Профессиональная статистика спортивных матчей за 5 лет" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <header className="bg-white dark:bg-gray-900 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-3">
                  <img src="/logo.svg" alt="MatchBase" className="h-10 w-auto" />
                </Link>
              </div>
              <nav className="flex space-x-4">
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary">
                  Главная
                </Link>
                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary">
                  О нас
                </a>
                <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-primary">
                  Контакты
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-white dark:bg-gray-900 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">MatchBase</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Профессиональная статистика спортивных матчей с анализом за 5 лет
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Виды спорта</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Футбол</li>
                  <li>Баскетбол</li>
                  <li>Теннис</li>
                  <li>Волейбол</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Контакты</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: support@matchbase.com<br />
                  Telegram: @matchbase_support
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
              © 2024 MatchBase. Все права защищены.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
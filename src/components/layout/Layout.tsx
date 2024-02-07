import { ReactNode } from 'react';

import Footer from './footer/Footer';
import Header from './header/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center min-h-[70vh] p-1 md:p-4 bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col w-full min-h-[30vh] rounded p-1 md:p-4 bg-gradient-to-tl from-gray-300 to-gray-400 text-gray-900 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

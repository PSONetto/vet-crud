import List from '../../components/list/List';
import Logo from '../../components/logo/Logo';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col w-full min-h-[50vh] rounded p-4 bg-gradient-to-tl from-gray-300 to-gray-400 text-gray-900 dark:from-gray-700 dark:to-gray-800 dark:text-gray-100">
        <Logo />
        <List />
      </div>
    </main>
  );
}

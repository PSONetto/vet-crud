import Logo from './Logo';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-zinc-600 dark:bg-zinc-900 p-3">
      <Logo />
    </header>
  );
}

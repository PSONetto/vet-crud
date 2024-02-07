import Logo from './Logo';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-900 p-3">
      <Logo />
    </header>
  );
}

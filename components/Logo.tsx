import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="text-xl font-bold text-white hover:text-yellow-400 transition-colors">
      Trylo
    </Link>
  );
} 
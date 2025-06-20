import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-transparent p-4 z-50">
      <div className="flex items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Ngoostadz
          </span>
        </Link>
      </div>
    </header>
  );
} 
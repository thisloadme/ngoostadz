'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  id: string;
  title: string;
  icon: JSX.Element;
  href: string;
}

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      title: 'Beranda',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: '/'
    },
    /*
    {
      id: 'website',
      title: 'Referensi Website Belajar Islam',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      href: '/websites'
    },
    */
    {
      id: 'chatbot',
      title: 'Chatbot Islami',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      href: '/chat'
    },
    /*
    {
      id: 'hadith',
      title: 'Belajar Hadits',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: '/hadith'
    }
    */
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div 
      className="fixed left-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 flex flex-col items-center space-y-6 shadow-lg z-50 rounded-2xl"
    >
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => setIsHovered(item.id)}
          onMouseLeave={() => setIsHovered(null)}
        >
          <Link href={item.href}>
            <div 
              className={`p-3 rounded-lg transition-all duration-300 ease-in-out cursor-pointer relative ${
                isActive(item.href)
                  ? 'bg-blue-500 shadow-lg'
                  : 'hover:bg-blue-500/50'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive(item.href) ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
              {isActive(item.href) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full transition-all duration-300" />
              )}
            </div>
          </Link>
          
          {/* Tooltip */}
          {isHovered === item.id && (
            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm z-50 animate-fade-in">
              {item.title}
              {/* Arrow */}
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 
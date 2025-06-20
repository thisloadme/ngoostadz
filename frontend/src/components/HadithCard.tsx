'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

interface Hadith {
  hadith: string;
  narrator: string;
  number: string;
}

export default function HadithCard() {
  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchHadith = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API_BASE_URL}/api/hadith`);
      if (!response.ok) throw new Error('Failed to fetch hadith');
      
      const data: Hadith = await response.json();
      setHadith(data);
    } catch (err) {
      console.error('Error fetching hadith:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHadith();
  }, []);

  return (
    <div className="bg-slate-800/80 p-6 rounded-lg shadow-lg border border-slate-700/50 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-green-400">Hadits Hari Ini</h3>
        <button 
          onClick={fetchHadith}
          disabled={isLoading}
          className="text-green-400 hover:text-green-300 transition-colors p-1 rounded-full hover:bg-slate-700/50 disabled:opacity-50"
          title="Muat hadits baru"
        >
          <svg 
            className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
        </button>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-700 rounded w-1/3 mt-2"></div>
        </div>
      ) : error || !hadith ? (
        <div className="text-center text-red-400">
          <p>Gagal memuat hadits.</p>
          <button onClick={fetchHadith} className="mt-2 text-sm underline">Coba lagi</button>
        </div>
      ) : (
        <div>
          <p className="text-slate-200 mb-3 text-lg leading-relaxed">
            "{hadith.hadith}"
          </p>
          <p className="text-sm text-green-400 font-semibold">
            {hadith.narrator} {hadith.number && `(${hadith.number})`}
          </p>
        </div>
      )}
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function DailyQuote() {
  const [quote, setQuote] = useState({
    text: '',
    isLoading: true,
    error: false
  });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/quote`);
        if (!response.ok) throw new Error('Failed to fetch quote');
        
        const data = await response.json();
        setQuote({
          text: data.quote,
          isLoading: false,
          error: false
        });
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote({
          text: 'Sesungguhnya Allah bersama orang-orang yang sabar.',
          isLoading: false,
          error: true
        });
      }
    };

    fetchQuote();
  }, []);

  const handleRefresh = async () => {
    setQuote(prev => ({ ...prev, isLoading: true }));
    const fetchQuote = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/quote`);
        if (!response.ok) throw new Error('Failed to fetch quote');
        
        const data = await response.json();
        setQuote({
          text: data.quote,
          isLoading: false,
          error: false
        });
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote(prev => ({ ...prev, isLoading: false, error: true }));
      }
    };

    fetchQuote();
  };

  return (
    <div className="bg-gradient-to-br from-blue-900/50 to-slate-800 rounded-lg p-6 shadow-lg border border-blue-800/30">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <svg 
            className="h-8 w-8 text-blue-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M8 10.5h-.5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h.5a1.5 1.5 0 0 1 1.5 1.5v.5a1.5 1.5 0 0 1-1.5 1.5zm7-1.5h-.5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h.5a1.5 1.5 0 0 1 1.5 1.5v.5a1.5 1.5 0 0 1-1.5 1.5z M8 16.5h-.5a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2h.5a1.5 1.5 0 0 1 1.5 1.5v.5a1.5 1.5 0 0 1-1.5 1.5zm7-1.5h-.5a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2h.5a1.5 1.5 0 0 1 1.5 1.5v.5a1.5 1.5 0 0 1-1.5 1.5z" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-300">
              Quote Hari Ini
            </h3>
            <button 
              onClick={handleRefresh}
              disabled={quote.isLoading}
              className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-blue-900/30 disabled:opacity-50"
            >
              <svg 
                className={`h-5 w-5 ${quote.isLoading ? 'animate-spin' : ''}`}
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
          {quote.isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-blue-800/50 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-blue-800/50 rounded w-1/2"></div>
            </div>
          ) : (
            <p className="text-slate-200 italic">
              "{quote.text}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 
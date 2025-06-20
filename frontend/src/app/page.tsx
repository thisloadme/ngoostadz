'use client';

import DailyQuote from '@/components/DailyQuote';
import HadithCard from '@/components/HadithCard';

export default function Home() {
  return (
    <div className="h-full overflow-auto bg-slate-900">
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Ngoostadz
            </h1>
            <p className="text-lg text-slate-300">
              Portal Belajar Islam Berbasis AI
            </p>
          </div>
          
          <DailyQuote />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HadithCard />
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-lg shadow-2xl border border-blue-500 flex flex-col justify-center items-center text-center">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-yellow-400 text-slate-900 text-xs font-bold px-2 py-1 rounded-full uppercase shadow-md">
                Hot
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Mulai Percakapan
              </h2>
              <p className="text-blue-200 mb-6 flex-grow">
                Jangan ragu, mulai perjalanan belajarmu sekarang juga dengan bertanya pada chatbot kami.
              </p>
              <a
                href="/chat"
                className="bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Tanya Sekarang
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 flex flex-col">
              <h2 className="text-xl font-semibold text-blue-400 mb-3">
                Chatbot Cerdas
              </h2>
              <p className="text-slate-300 flex-grow">
                Tanyakan apa saja seputar Islam dan dapatkan jawaban instan dari AI yang dirancang khusus untuk memberikan informasi akurat berdasarkan sumber terpercaya.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 flex flex-col">
              <h2 className="text-xl font-semibold text-purple-400 mb-3">
                Tentang Ngoostadz
              </h2>
              <p className="text-slate-300 flex-grow">
                Ngoostadz adalah platform pembelajaran Islam yang didukung oleh teknologi AI. Misi kami adalah menyediakan akses mudah dan terpercaya terhadap pengetahuan Islam, membantu Anda belajar lebih dalam melalui chatbot interaktif dan sumber otentik lainnya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
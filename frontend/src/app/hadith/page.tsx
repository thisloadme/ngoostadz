export default function HadithPage() {
  const hadithCollections = [
    {
      title: 'Shahih Bukhari',
      description: 'Kumpulan hadits yang diriwayatkan oleh Imam Bukhari, salah satu kumpulan hadits paling terpercaya dalam Islam.',
      totalHadith: '7.563 hadits',
      categories: ['Shahih', 'Primer']
    },
    {
      title: 'Shahih Muslim',
      description: 'Koleksi hadits yang dikumpulkan oleh Imam Muslim, dikenal sebagai salah satu dari Kutub al-Sittah (Enam Kitab Kanonik).',
      totalHadith: '7.470 hadits',
      categories: ['Shahih', 'Primer']
    },
    {
      title: 'Sunan Abu Dawud',
      description: 'Salah satu koleksi hadits utama yang fokus pada hukum Islam dan praktik ibadah sehari-hari.',
      totalHadith: '5.274 hadits',
      categories: ['Sunan', 'Fiqih']
    },
    {
      title: 'Jami at-Tirmidhi',
      description: 'Koleksi hadits yang mencakup berbagai aspek kehidupan Muslim, termasuk etika dan perilaku.',
      totalHadith: '3.956 hadits',
      categories: ['Sunan', 'Akhlak']
    },
    {
      title: 'Sunan an-Nasa\'i',
      description: 'Salah satu koleksi hadits dengan standar yang sangat ketat dalam penerimaan hadits.',
      totalHadith: '5.761 hadits',
      categories: ['Sunan', 'Fiqih']
    }
  ];

  return (
    <div className="h-full overflow-auto bg-slate-900">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">
            Belajar Hadits
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Pelajari hadits-hadits shahih dari berbagai kitab hadits terpercaya.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {hadithCollections.map((collection, index) => (
              <div key={index} className="bg-slate-800 rounded-lg shadow-lg p-6 transition-transform hover:-translate-y-1 duration-200 border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-400">
                      {collection.title}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      {collection.totalHadith}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {collection.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  {collection.description}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Mulai Belajar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
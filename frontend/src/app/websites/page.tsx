export default function WebsitesPage() {
  const websites = [
    {
      title: 'Muslim.or.id',
      description: 'Portal Islam yang menyajikan berbagai artikel dan kajian Islam dari ulama terpercaya.',
      url: 'https://muslim.or.id',
      categories: ['Artikel', 'Fatwa', 'Kajian']
    },
    {
      title: 'Rumaysho.com',
      description: 'Website Islam dengan konten seputar fiqih, hadits, dan pembelajaran Al-Quran.',
      url: 'https://rumaysho.com',
      categories: ['Fiqih', 'Hadits', 'Al-Quran']
    },
    {
      title: 'Konsultasisyariah.com',
      description: 'Portal konsultasi syariah Islam yang menjawab berbagai permasalahan umat.',
      url: 'https://konsultasisyariah.com',
      categories: ['Konsultasi', 'Syariah', 'Fatwa']
    },
    {
      title: 'Almanhaj.or.id',
      description: 'Website yang menyajikan artikel-artikel Islam sesuai pemahaman salafush shalih.',
      url: 'https://almanhaj.or.id',
      categories: ['Artikel', 'Manhaj', 'Tazkiyah']
    },
    {
      title: 'Yufid.com',
      description: 'Platform belajar Islam online dengan berbagai format media pembelajaran.',
      url: 'https://yufid.com',
      categories: ['Video', 'Audio', 'Artikel']
    }
  ];

  return (
    <div className="h-full overflow-auto bg-slate-900">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-100 mb-6">
            Referensi Website Belajar Islam
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Kumpulan website Islam terpercaya yang dapat membantu Anda memperdalam pemahaman tentang Islam.
          </p>
          <div className="space-y-6">
            {websites.map((website, index) => (
              <div key={index} className="bg-slate-800 rounded-lg shadow-lg p-6 transition-transform hover:-translate-y-1 duration-200 border border-slate-700">
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                  {website.title}
                </h2>
                <p className="text-slate-300 mb-4">{website.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {website.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
                  >
                    Kunjungi Website
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
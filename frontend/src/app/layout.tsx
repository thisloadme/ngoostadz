import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'Ngoostadz',
  description: 'A chatbot powered by Gemini AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${poppins.className} h-full bg-slate-950`}>
        <Header />
        <Sidebar />
        <main className="h-full pl-[72px] pt-16">
          {children}
        </main>
      </body>
    </html>
  )
} 
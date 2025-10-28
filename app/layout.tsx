import './globals.css'
import { Inter, Montserrat } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'SK Bebuloh Labuan - Sekolah Kebangsaan Bebuloh Labuan',
  description: 'Official website of SK Bebuloh Labuan - Laman web rasmi SK Bebuloh Labuan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-inter bg-pastel-bg min-h-screen">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

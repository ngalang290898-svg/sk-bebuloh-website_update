import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '../lib/i18n' // Fixed path

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: 'SK Bebuloh WP Labuan - Sekolah Kebangsaan Bebuloh WP Labuan',
  description: 'Official website of Sekolah Kebangsaan Bebuloh WP Labuan - A premier educational institution in Labuan',
  keywords: 'SK Bebuloh, Labuan, education, sekolah, primary school',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}

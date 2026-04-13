import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EL Kholasa - AI PDF Summarizer',
  description:
    'EL Kholasa is an AI-powered tool that helps you quickly summarize PDF files into clear, concise insights. Save time and focus on what matters.',

  keywords: [
    'PDF summarizer',
    'AI summarizer',
    'EL Kholasa',
    'document summary',
    'AI tools',
    'summarize PDF online',
  ],

  authors: [{ name: 'Omar Yasser' }],

  creator: 'Omar Yasser',

  openGraph: {
    title: 'EL Kholasa - AI PDF Summarizer',
    description:
      'Upload your PDF and get an instant AI-generated summary in seconds.',
    url: 'https://your-domain.com',
    siteName: 'EL Kholasa',
    images: [
      {
        url: '/og-image.png', // add later
        width: 1200,
        height: 630,
        alt: 'EL Kholasa PDF Summarizer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EL Kholasa - AI PDF Summarizer',
    description: 'Summarize PDFs instantly using AI with EL Kholasa.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: '/favicon.ico',
  },
}
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'antialiased',
        fontMono.variable,
        'font-sans',
        geist.variable
      )}
    >
      <body>
        <Navbar />
        <div className="container mx-auto">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  )
}

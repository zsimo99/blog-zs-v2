import AuthProvider from '@/components/AuthProvider'
import './globals.css'
import Header from '@/components/shared/Header'
import { DarkModeProvider } from '@/context/ThemeContext'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: 'DEV Blog',
  description: 'Share your knowledge and connect with developers',
}

export default function RootLayout({ children }) {
  return (
    <DarkModeProvider>
      <html lang="en">
        <body className={`bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen ${inter.className}`} suppressHydrationWarning={true}>
          <AuthProvider>
            <Header />
            <main className="pt-[65px]">
              {children}
            </main>
          </AuthProvider>
        </body>
      </html>
    </DarkModeProvider>
  )
}

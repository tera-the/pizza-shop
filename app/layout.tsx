import { Nunito } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { Header } from '@/components/shared/header';

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Next Pizza | Главная страница',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main className='min-h-screen'>
          <Header />

          {children}
        </main>
      </body>
    </html>
  );
}
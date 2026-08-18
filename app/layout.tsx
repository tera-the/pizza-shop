import { Nunito } from 'next/font/google';
import '@/app/globals.css';

const nunito = Nunito({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-nunito',
    display: 'swap',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
            <head>
                <link data-rh="true" rel='icon' href='/logo.png' />
            </head>
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
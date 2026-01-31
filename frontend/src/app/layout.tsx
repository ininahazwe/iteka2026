import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/src/components/providers';

export const metadata: Metadata = {
    title: 'Iteka Youth Organization',
    description: 'Empowering Rwandan youth through talent discovery, skills development, and peace promotion',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
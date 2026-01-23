
import { Metadata } from 'next';
import { Providers } from '../components/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Iteka Youth Organization',
  description: 'Empowering youth in Rwanda',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
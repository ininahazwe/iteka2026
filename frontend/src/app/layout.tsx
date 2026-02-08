// app/layout.tsx
import Providers from "@/src/components/providers";
import Script from 'next/script';
import './globals.css';

export const metadata = {
    title: 'Iteka Youth Organization',
    description: "Empowering Rwanda's youth",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                strategy="afterInteractive"
            />
        </head>
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
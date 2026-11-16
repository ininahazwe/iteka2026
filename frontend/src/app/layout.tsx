// app/layout.tsx
import Script from 'next/script';
import localFont from 'next/font/local';
import './globals.css';
import Providers from "@/src/components/providers";
import type { Metadata } from 'next';
import { OrganizationSchema, WebSiteSchema } from '@/src/components/StructureData';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from '@/src/lib/seo';

// Polices hébergées localement (fichiers dans src/fonts) : le build ne dépend plus
// de Google Fonts. Ce sont des polices variables, donc toutes les graisses sont disponibles.
const inter = localFont({
    src: '../fonts/inter-latin-wght-normal.woff2',
    variable: '--font-sans',
    weight: '100 900',
    display: 'swap',
});
const spaceGrotesk = localFont({
    src: '../fonts/space-grotesk-latin-wght-normal.woff2',
    variable: '--font-display',
    weight: '300 700',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} | Empowering Rwanda's Youth`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    openGraph: {
        type: 'website',
        siteName: SITE_NAME,
        locale: 'en_US',
        title: `${SITE_NAME} | Empowering Rwanda's Youth`,
        description: SITE_DESCRIPTION,
        images: [{ url: DEFAULT_OG_IMAGE, alt: SITE_NAME }],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${SITE_NAME} | Empowering Rwanda's Youth`,
        description: SITE_DESCRIPTION,
        images: [DEFAULT_OG_IMAGE],
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <head>
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                strategy="afterInteractive"
            />
        </head>
        <body>
        <OrganizationSchema />
        <WebSiteSchema />
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
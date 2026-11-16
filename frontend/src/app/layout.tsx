// app/layout.tsx
import Script from 'next/script';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Providers from "@/src/components/providers";
import type { Metadata } from 'next';
import { OrganizationSchema, WebSiteSchema } from '@/src/components/StructureData';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from '@/src/lib/seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });

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
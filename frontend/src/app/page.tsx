import { HydrationBoundary } from '@tanstack/react-query';
import { dehydratedState } from '@/src/lib/prefetch';
import type { Metadata } from 'next';
import { pageMetadata, SITE_NAME } from '@/src/lib/seo';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
    ...pageMetadata({
        title: SITE_NAME,
        description:
            "Iteka Youth Organization empowers Rwanda's youth through talent discovery, skills development and peacebuilding. Discover our programmes, impact and how to get involved.",
        path: '/',
    }),
    title: { absolute: `${SITE_NAME} | Empowering Rwanda's Youth` },
};

// Rendu serveur : les données WordPress sont dans le HTML initial (SEO), régénérées toutes les 5 min.
export const revalidate = 300;

export default async function Page() {
    return (
        <HydrationBoundary state={await dehydratedState(['programmes', 'actualites', 'testimonials', 'impactStats', 'gallery', 'partners', 'events'])}>
            <HomeClient />
        </HydrationBoundary>
    );
}

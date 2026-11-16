import { HydrationBoundary } from '@tanstack/react-query';
import { dehydratedState } from '@/src/lib/prefetch';
import { cache } from 'react';
import type { Metadata } from 'next';
import { fetchFestival } from '@/src/lib/api';
import { pageMetadata, toDescription, mediaAbsoluteUrl } from '@/src/lib/seo';
import FestivalClient from './FestivalClient';

const getFestival = cache(() => fetchFestival().catch(() => null));

export async function generateMetadata(): Promise<Metadata> {
    const festival: any = await getFestival();
    const data = festival?.data || festival;
    const fallback = 'Join the Iteka Festival, a celebration of youth talent, creativity and peacebuilding in Rwanda.';
    if (!data?.title) {
        return pageMetadata({ title: 'Iteka Festival', description: fallback, path: '/festival' });
    }
    return pageMetadata({
        title: data.edition ? `${data.title} - ${data.edition}` : data.title,
        description: toDescription(data.description) || fallback,
        path: '/festival',
        image: mediaAbsoluteUrl(data.hero_image?.data?.url || data.hero_image?.url),
    });
}

// Rendu serveur : les données WordPress sont dans le HTML initial (SEO), régénérées toutes les 5 min.
export const revalidate = 300;

export default async function Page() {
    return (
        <HydrationBoundary state={await dehydratedState(['festival'])}>
            <FestivalClient />
        </HydrationBoundary>
    );
}

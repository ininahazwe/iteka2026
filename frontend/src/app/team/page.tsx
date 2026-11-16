import { HydrationBoundary } from '@tanstack/react-query';
import { dehydratedState } from '@/src/lib/prefetch';
import TeamClient from './TeamClient';

// Rendu serveur : les données WordPress sont dans le HTML initial (SEO), régénérées toutes les 5 min.
export const revalidate = 300;

export default async function Page() {
    return (
        <HydrationBoundary state={await dehydratedState(['teamMembers'])}>
            <TeamClient />
        </HydrationBoundary>
    );
}

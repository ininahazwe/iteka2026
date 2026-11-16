import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Our Approach',
    description: "Discover Iteka's evidence-based approach to youth empowerment: talent discovery, skills development and peacebuilding with lasting impact.",
    path: '/approach',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

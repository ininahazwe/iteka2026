import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'About Us',
    description: "Learn the story, mission and team behind Iteka Youth Organization, building a better future for Rwandan youth one young person at a time.",
    path: '/about',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

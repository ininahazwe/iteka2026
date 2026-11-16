import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Programmes',
    description: "Explore Iteka's youth programmes in Rwanda: skills development, health and wellbeing, rights and social development, and more.",
    path: '/programmes',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

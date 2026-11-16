import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'News & Updates',
    description: "Stay informed about Iteka's latest initiatives, achievements and press coverage.",
    path: '/news',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

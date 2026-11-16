import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Our Impact',
    description: "See how Iteka Youth Organization is creating lasting impact and transforming communities across Rwanda through youth-led programmes.",
    path: '/impact',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

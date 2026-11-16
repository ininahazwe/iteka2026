import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Gallery',
    description: "Photos that capture the moments, people and impact of Iteka Youth Organization in Rwanda.",
    path: '/gallery',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

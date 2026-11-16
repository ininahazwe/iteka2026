import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Thank You',
    description: 'Thank you for supporting Iteka Youth Organization.',
    path: '/donate/success',
    noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

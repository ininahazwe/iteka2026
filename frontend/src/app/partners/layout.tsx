import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Partners',
    description: "Meet the organizations partnering with Iteka Youth Organization to empower Rwandan youth and achieve more together.",
    path: '/partners',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

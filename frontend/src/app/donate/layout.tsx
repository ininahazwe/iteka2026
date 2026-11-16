import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Donate',
    description: "Support Iteka Youth Organization. Your donation helps empower young people in Rwanda through talent discovery, skills development and peace promotion.",
    path: '/donate',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Contact Us',
    description: "Have questions about Iteka Youth Organization or our programmes? Get in touch with our team in Kigali, Rwanda.",
    path: '/contact',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

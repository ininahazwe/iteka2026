import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Our Team',
    description: "Meet the dedicated professionals at Iteka Youth Organization committed to empowering Rwanda's youth and creating lasting change.",
    path: '/team',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

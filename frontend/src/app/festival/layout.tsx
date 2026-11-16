import type { Metadata } from 'next';
import { pageMetadata } from '@/src/lib/seo';

export const metadata: Metadata = pageMetadata({
    title: 'Iteka Festival',
    description: "Join the Iteka Festival, a celebration of youth talent, creativity and peacebuilding in Rwanda. Discover the programme and register.",
    path: '/festival',
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

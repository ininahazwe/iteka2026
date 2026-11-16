import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import shared from '@/src/styles/shared.module.css';

export const metadata = {
    title: 'Page Not Found',
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <>
            <Header />
            <div className={shared.fullscreenCenter}>
                <h1 className={shared.sectionTitleCenter} style={{ marginBottom: 16 }}>Page Not Found</h1>
                <p className={shared.sectionSubCenter} style={{ marginBottom: 16 }}>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link href="/" className={shared.btnPrimary}>
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>
            <Footer />
        </>
    );
}

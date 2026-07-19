'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import styles from './DonateSuccess.module.css';

export default function DonateSuccessPage() {
    const router = useRouter();

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.card}>
                    {/* Success Icon */}
                    <div className={styles.iconCircle}>
                        <CheckCircle size={48} />
                    </div>

                    {/* Title */}
                    <h1 className={styles.title}>Thank You for Your Generosity!</h1>

                    {/* Message */}
                    <p className={styles.message}>
                        Your donation has been successfully processed. You'll receive a confirmation email shortly
                        with your receipt and details about how your contribution will make a difference.
                    </p>

                    {/* Impact Message */}
                    <div className={styles.impactBox}>
                        <p className={styles.impactLabel}>Your Impact</p>
                        <p className={styles.impactText}>
                            Your generous donation will directly support our programmes empowering young people in Rwanda
                            through talent discovery, skills development, and peace promotion. We'll keep you updated on
                            the impact of your contribution.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actions}>
                        <button onClick={() => router.push('/')} className={styles.primaryButton}>
                            <Home size={20} />
                            Back to Home
                        </button>
                        <button onClick={() => router.push('/programmes')} className={styles.secondaryButton}>
                            Explore Our Programmes
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Social Share */}
                    <div className={styles.shareSection}>
                        <p className={styles.shareText}>
                            Help us reach more supporters by sharing our mission
                        </p>
                        <div className={styles.shareRow}>
                            <button className={styles.shareButton}>Share</button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

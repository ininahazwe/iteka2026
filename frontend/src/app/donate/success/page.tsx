// src/app/donate/success/page.tsx
'use client';

import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { useRouter } from 'next/navigation';

export default function DonateSuccessPage() {
    const router = useRouter();

    return (
        <>
            <Header />
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold mb-4 text-iteka-green">Thank You!</h1>
                    <p className="text-gray-700 mb-6">
                        Your donation has been received. You'll get a confirmation email shortly.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full bg-iteka-orange text-white py-3 rounded font-semibold hover:bg-opacity-90"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => router.push('/programmes')}
                            className="w-full border border-gray-300 py-3 rounded font-semibold hover:bg-gray-50"
                        >
                            Explore Our Programmes
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
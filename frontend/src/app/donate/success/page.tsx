'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function DonateSuccessPage() {
    const router = useRouter();

    return (
        <>
            <Header />

            <main className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
                <div className="max-w-2xl w-full mx-auto px-4">
                    <div className="bg-white p-12 rounded-lg shadow-md text-center">
                        {/* Success Icon */}
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold text-iteka-dark mb-4">
                            Thank You for Your Generosity!
                        </h1>

                        {/* Message */}
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            Your donation has been successfully processed. You'll receive a confirmation email shortly
                            with your receipt and details about how your contribution will make a difference.
                        </p>

                        {/* Impact Message */}
                        <div className="bg-[#E8F5E9] p-6 rounded-lg mb-8">
                            <p className="text-iteka-dark font-semibold mb-2">Your Impact</p>
                            <p className="text-gray-700 text-sm">
                                Your generous donation will directly support our programmes empowering young people in Rwanda
                                through talent discovery, skills development, and peace promotion. We'll keep you updated on
                                the impact of your contribution.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/')}
                                className="w-full bg-iteka-orange text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </button>
                            <button
                                onClick={() => router.push('/programmes')}
                                className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                            >
                                Explore Our Programmes
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Social Share */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-4">
                                Help us reach more supporters by sharing our mission
                            </p>
                            <div className="flex justify-center gap-3">
                                <button className="px-4 py-2 bg-gray-100 rounded-md text-sm font-semibold hover:bg-gray-200 transition">
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
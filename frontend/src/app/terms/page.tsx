import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export const metadata = {
    title: 'Terms of Service | Iteka Youth Organization',
    description: 'Terms governing the use of the Iteka Youth Organization website.',
};

export default function TermsPage() {
    const lastUpdated = 'July 2026';

    return (
        <>
            <Header />

            <main className="bg-white">
                <section className="py-16 md:py-24">
                    <div className="max-w-3xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-iteka-dark mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-sm text-gray-500 mb-12">Last updated: {lastUpdated}</p>

                        <div className="space-y-10 text-gray-700 leading-relaxed">
                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing or using itekarwanda.org (the "Site"), operated by Iteka Youth
                                    Organization ("Iteka", "we", "us"), you agree to these Terms of Service. If
                                    you do not agree, please do not use the Site.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">2. Use of the Site</h2>
                                <p>
                                    You agree to use the Site only for lawful purposes and in a way that does
                                    not infringe the rights of, or restrict or inhibit the use and enjoyment
                                    of the Site by, anyone else. You may not attempt to gain unauthorized
                                    access to any part of the Site, its systems, or related networks.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">3. Donations</h2>
                                <p>
                                    Donations made through the Site are processed securely by Stripe. By
                                    submitting a donation, you confirm that you are authorized to use the
                                    payment method provided. Donations are voluntary contributions made in
                                    support of our mission; unless required by law, donations are
                                    non-refundable. Contact us at{' '}
                                    <a href="mailto:hello@itekarwanda.org" className="text-iteka-orange hover:underline">
                                        hello@itekarwanda.org
                                    </a>{' '}
                                    for any donation-related query, including receipts.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">4. Programme Applications</h2>
                                <p>
                                    Submitting an application through the Site does not guarantee admission to
                                    any Iteka programme. Selection is at our sole discretion based on
                                    programme criteria and available capacity.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">5. Intellectual Property</h2>
                                <p>
                                    All content on the Site — including text, images, logos, and design —
                                    is the property of Iteka Youth Organization or its licensors, unless
                                    otherwise noted, and is protected by applicable intellectual property
                                    laws. You may not reproduce, distribute, or use this content commercially
                                    without our prior written consent.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">6. Third-Party Links</h2>
                                <p>
                                    The Site may link to third-party websites (e.g. partner organizations,
                                    social media). We are not responsible for the content or privacy practices
                                    of external sites.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">7. Limitation of Liability</h2>
                                <p>
                                    The Site and its content are provided "as is" without warranties of any
                                    kind. To the fullest extent permitted by law, Iteka Youth Organization
                                    shall not be liable for any indirect, incidental, or consequential damages
                                    arising from your use of the Site.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">8. Changes to These Terms</h2>
                                <p>
                                    We may update these Terms from time to time. Continued use of the Site
                                    after changes are posted constitutes acceptance of the revised Terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">9. Governing Law</h2>
                                <p>
                                    These Terms are governed by the laws of the Republic of Rwanda.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">10. Contact</h2>
                                <p>
                                    Questions about these Terms can be sent to{' '}
                                    <a href="mailto:hello@itekarwanda.org" className="text-iteka-orange hover:underline">
                                        hello@itekarwanda.org
                                    </a>
                                    .
                                </p>
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    These terms are provided as a general reference and do not constitute
                                    legal advice. We recommend having them reviewed by legal counsel familiar
                                    with Rwandan law before relying on them for compliance purposes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

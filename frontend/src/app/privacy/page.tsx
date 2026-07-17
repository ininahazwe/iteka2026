import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export const metadata = {
    title: 'Privacy Policy | Iteka Youth Organization',
    description: 'How Iteka Youth Organization collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
    const lastUpdated = 'July 2026';

    return (
        <>
            <Header />

            <main className="bg-white">
                <section className="py-16 md:py-24">
                    <div className="max-w-3xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-iteka-dark mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-gray-500 mb-12">Last updated: {lastUpdated}</p>

                        <div className="space-y-10 text-gray-700 leading-relaxed">
                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">1. Who We Are</h2>
                                <p>
                                    Iteka Youth Organization ("Iteka", "we", "us") is a youth empowerment
                                    organization based in Kigali, Rwanda. This policy explains what personal
                                    data we collect through itekarwanda.org, why we collect it, and how it is
                                    handled.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">2. Information We Collect</h2>
                                <p className="mb-3">We collect information you provide directly to us, including:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Contact form submissions: name, email, phone number, and message content.</li>
                                    <li>Newsletter sign-up: email address.</li>
                                    <li>Donations: name, email, and payment details, processed directly by Stripe (we do not store card numbers).</li>
                                    <li>Programme applications: information you submit via linked application forms.</li>
                                </ul>
                                <p className="mt-3">
                                    We also collect limited technical data automatically (IP address, browser
                                    type, pages visited) via standard web server logs and Google reCAPTCHA, used
                                    to secure our forms against spam and abuse.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">3. How We Use Your Information</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Respond to enquiries submitted through our contact form.</li>
                                    <li>Send newsletter updates about our programmes and impact, if you subscribed.</li>
                                    <li>Process and receipt donations.</li>
                                    <li>Review and follow up on programme applications.</li>
                                    <li>Protect our site against spam, fraud, and abuse.</li>
                                </ul>
                                <p className="mt-3">
                                    We do not sell or rent your personal data to third parties.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">4. Third-Party Services</h2>
                                <p className="mb-3">We rely on the following processors to operate this site:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Stripe</strong> — payment processing for donations.</li>
                                    <li><strong>Resend</strong> — transactional email delivery (contact form, newsletter notifications).</li>
                                    <li><strong>Google reCAPTCHA</strong> — spam and bot protection on our forms.</li>
                                    <li><strong>Cloudinary</strong> — hosting of images displayed on the site.</li>
                                </ul>
                                <p className="mt-3">
                                    Each of these providers processes data under their own privacy policy and
                                    security standards.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">5. Data Retention</h2>
                                <p>
                                    We retain contact and donation records for as long as necessary to respond
                                    to your request, comply with accounting and legal obligations, and maintain
                                    donor records. You may request deletion at any time (see Section 7).
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">6. Cookies</h2>
                                <p>
                                    We use only the minimal cookies required for site functionality and fraud
                                    prevention (e.g. Google reCAPTCHA). We do not use third-party advertising
                                    trackers.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">7. Your Rights</h2>
                                <p>
                                    You may request access to, correction of, or deletion of your personal data
                                    at any time by contacting us at{' '}
                                    <a href="mailto:hello@itekarwanda.org" className="text-iteka-orange hover:underline">
                                        hello@itekarwanda.org
                                    </a>
                                    . You may also unsubscribe from our newsletter using the link included in
                                    any newsletter email, or by contacting us directly.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-iteka-dark mb-3">8. Contact</h2>
                                <p>
                                    Questions about this Privacy Policy can be sent to{' '}
                                    <a href="mailto:hello@itekarwanda.org" className="text-iteka-orange hover:underline">
                                        hello@itekarwanda.org
                                    </a>{' '}
                                    or by post to Iteka Youth Organization, Kigali, Rwanda.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    This policy is provided as a general reference and does not constitute
                                    legal advice. We recommend having it reviewed by legal counsel familiar
                                    with Rwandan data protection law before relying on it for compliance
                                    purposes.
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

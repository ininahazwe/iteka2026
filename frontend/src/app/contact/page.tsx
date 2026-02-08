// app/contact/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Vérifier que reCAPTCHA est chargé
  useEffect(() => {
    if (executeRecaptcha) {
      setRecaptchaReady(true);
    }
  }, [executeRecaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaReady || !executeRecaptcha) {
      setStatus('error');
      setErrorMessage('reCAPTCHA not loaded. Please refresh the page.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const recaptchaToken = await executeRecaptcha('contact_form');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        honeypot: '',
      });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message');
    }
  };

  return (
      <>
        <Header />
        <main className="min-h-screen py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Get In Touch</h1>

            {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                  <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
                  <p>Thank you for contacting us. We&apos;ll get back to you soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow">
                  {/* Afficher un avertissement si reCAPTCHA n'est pas chargé */}
                  {!recaptchaReady && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded">
                        Loading security verification...
                      </div>
                  )}

                  {/* Honeypot field (hidden) */}
                  <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                  />

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={100}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iteka-orange focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iteka-orange focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Phone (optional)</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iteka-orange focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iteka-orange focus:outline-none"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        required
                        rows={6}
                        maxLength={2000}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-iteka-orange focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.message.length}/2000 characters
                    </p>
                  </div>

                  {status === 'error' && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded">
                        {errorMessage}
                      </div>
                  )}

                  <button
                      type="submit"
                      disabled={status === 'loading' || !recaptchaReady}
                      className="w-full bg-iteka-orange text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">
                      Terms of Service
                    </a>{' '}
                    apply.
                  </p>
                </form>
            )}
          </div>
        </main>
        <Footer />
      </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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

        <main>
          {/* Hero Section */}
          <section className="bg-white py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-iteka-dark" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
                Get In Touch
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Have questions? We'd love to hear from you
              </p>
            </div>
          </section>

          {/* Contact Info + Form */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-iteka-dark mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-iteka-dark" />
                        </div>
                        <div>
                          <p className="font-semibold text-iteka-dark">Email</p>
                          <a href="mailto:hello@itekarwanda.org" className="text-gray-600 hover:text-iteka-orange">
                            hello@itekarwanda.org
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-iteka-dark" />
                        </div>
                        <div>
                          <p className="font-semibold text-iteka-dark">Phone</p>
                          <p className="text-gray-600">+250 XXX XXX XXX</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-iteka-dark" />
                        </div>
                        <div>
                          <p className="font-semibold text-iteka-dark">Office</p>
                          <p className="text-gray-600">Kigali, Rwanda</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#E8F5E9] p-6 rounded-lg">
                    <h3 className="font-bold text-iteka-dark mb-2">Office Hours</h3>
                    <p className="text-sm text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-sm text-gray-700">Saturday - Sunday: Closed</p>
                  </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-2">
                  {status === 'success' ? (
                      <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                          <Send className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-iteka-dark mb-3">Message Sent!</h3>
                        <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-iteka-orange hover:underline font-semibold"
                        >
                          Send another message
                        </button>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
                        {!recaptchaReady && (
                            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded">
                              Loading security verification...
                            </div>
                        )}

                        <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                maxLength={100}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-iteka-orange focus:border-transparent outline-none transition"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-iteka-orange focus:border-transparent outline-none transition"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (optional)</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-iteka-orange focus:border-transparent outline-none transition"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-iteka-orange focus:border-transparent outline-none transition"
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Message <span className="text-red-500">*</span>
                          </label>
                          <textarea
                              required
                              rows={6}
                              maxLength={2000}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-iteka-orange focus:border-transparent outline-none transition"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {formData.message.length}/2000 characters
                          </p>
                        </div>

                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                              {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading' || !recaptchaReady}
                            className="w-full bg-iteka-orange text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                        >
                          {status === 'loading' ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                Sending...
                              </>
                          ) : (
                              <>
                                <Send className="w-5 h-5" />
                                Send Message
                              </>
                          )}
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
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
  );
}
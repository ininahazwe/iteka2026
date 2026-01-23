'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { submitContactMessage } from '@/src/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
      setTimeout(() => setSubmitted(false), 5000);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-iteka-pink to-iteka-orange flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl opacity-90">We'd love to hear from you</p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {/* Info Cards */}
              <div className="text-center">
                <div className="bg-iteka-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-gray-600">Kigali, Rwanda</p>
              </div>

              <div className="text-center">
                <div className="bg-iteka-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <a href="mailto:hello@itekarwanda.org" className="text-iteka-orange hover:underline">
                  hello@itekarwanda.org
                </a>
              </div>

              <div className="text-center">
                <div className="bg-iteka-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-600">+250 XXX XXX XXX</p>
              </div>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  ✓ Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-iteka-orange"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-iteka-orange"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-iteka-orange"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-iteka-orange"
                      placeholder="Subject"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-iteka-orange"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-iteka-orange text-white py-3 rounded font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
                >
                  {mutation.isPending ? 'Sending...' : 'Send Message'}
                </button>

                {mutation.isError && (
                  <p className="text-red-600 text-sm">
                    Error sending message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
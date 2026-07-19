'use client';

import { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import styles from './Contact.module.css';
import shared from '@/src/styles/shared.module.css';

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
          {/* Hero */}
          <section className={shared.pageHero}>
            <div className={shared.pageHeroInner}>
              <div className={styles.heroIcon}>
                <Mail size={28} />
              </div>
              <h1 className={shared.pageHeroTitle}>Get In Touch</h1>
              <p className={shared.pageHeroText}>Have questions? We'd love to hear from you</p>
            </div>
          </section>

          {/* Contact Info + Form */}
          <section className={styles.section}>
            <div className={shared.container}>
              <div className={styles.grid}>
                {/* Contact Info */}
                <div className={styles.infoCol}>
                  <div>
                    <h2 className={styles.infoTitle}>Contact Information</h2>
                    <div className={styles.infoList}>
                      <div className={styles.infoItem}>
                        <div className={styles.infoIconCircle}>
                          <Mail size={20} />
                        </div>
                        <div>
                          <p className={styles.infoLabel}>Email</p>
                          <a href="mailto:hello@itekarwanda.org" className={styles.infoValue}>
                            hello@itekarwanda.org
                          </a>
                        </div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoIconCircle}>
                          <Phone size={20} />
                        </div>
                        <div>
                          <p className={styles.infoLabel}>Phone</p>
                          <p className={styles.infoValue}>+250 XXX XXX XXX</p>
                        </div>
                      </div>

                      <div className={styles.infoItem}>
                        <div className={styles.infoIconCircle}>
                          <MapPin size={20} />
                        </div>
                        <div>
                          <p className={styles.infoLabel}>Office</p>
                          <p className={styles.infoValue}>Kigali, Rwanda</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.hoursBox}>
                    <h3 className={styles.hoursTitle}>Office Hours</h3>
                    <p className={styles.hoursText}>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className={styles.hoursText}>Saturday - Sunday: Closed</p>
                  </div>
                </div>

                {/* Form */}
                <div>
                  {status === 'success' ? (
                      <div className={styles.successCard}>
                        <div className={styles.successIconCircle}>
                          <Send size={28} />
                        </div>
                        <h3 className={styles.successTitle}>Message Sent!</h3>
                        <p className={styles.successText}>Thank you for contacting us. We'll get back to you soon.</p>
                        <button onClick={() => setStatus('idle')} className={styles.successReset}>
                          Send another message
                        </button>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit} className={styles.formCard}>
                        {!recaptchaReady && (
                            <div className={styles.captchaNotice}>
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

                        <div className={styles.fieldGrid}>
                          <div>
                            <label className={styles.fieldLabel}>
                              Name <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                required
                                maxLength={100}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={styles.textInput}
                            />
                          </div>

                          <div>
                            <label className={styles.fieldLabel}>
                              Email <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={styles.textInput}
                            />
                          </div>
                        </div>

                        <div className={styles.fieldGrid}>
                          <div>
                            <label className={styles.fieldLabel}>Phone (optional)</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={styles.textInput}
                            />
                          </div>

                          <div>
                            <label className={styles.fieldLabel}>Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className={styles.textInput}
                            />
                          </div>
                        </div>

                        <div className={styles.messageField}>
                          <label className={styles.fieldLabel}>
                            Message <span className={styles.required}>*</span>
                          </label>
                          <textarea
                              required
                              rows={6}
                              maxLength={2000}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className={styles.textarea}
                          />
                          <p className={styles.charCount}>
                            {formData.message.length}/2000 characters
                          </p>
                        </div>

                        {status === 'error' && (
                            <div className={styles.errorBox}>{errorMessage}</div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading' || !recaptchaReady}
                            className={styles.submitButton}
                        >
                          {status === 'loading' ? (
                              <>
                                <div className={styles.spinnerSm}></div>
                                Sending...
                              </>
                          ) : (
                              <>
                                <Send size={20} />
                                Send Message
                              </>
                          )}
                        </button>

                        <p className={styles.recaptchaNote}>
                          This site is protected by reCAPTCHA and the Google{' '}
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                          </a>{' '}
                          and{' '}
                          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
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

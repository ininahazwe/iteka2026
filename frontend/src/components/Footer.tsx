'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone, ArrowRight, Check } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus('loading');
    try {
      const recaptchaToken = executeRecaptcha ? await executeRecaptcha('newsletter_signup') : undefined;

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, recaptchaToken }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch {
      setNewsletterStatus('error');
    }
  };

  const footerLinks = {
    about: [
      { href: '/about', label: 'About Us' },
      { href: '/approach', label: 'Our Approach' },
      { href: '/team', label: 'Team' },
      { href: '/partners', label: 'Partners' },
    ],
    work: [
      { href: '/programmes', label: 'Programmes' },
      { href: '/impact', label: 'Impact' },
      { href: '/festival', label: 'Festival' },
      { href: '/gallery', label: 'Gallery' },
    ],
    resources: [
      { href: '/news', label: 'News' },
      { href: '/contact', label: 'Contact' },
      { href: '/donate', label: 'Donate' },
    ],
  };

  const socialLinks = [
    { href: 'https://www.facebook.com/itekayouthorganization/', icon: Facebook, label: 'Facebook' },
    { href: 'https://x.com/ItekaYouth', icon: Twitter, label: 'Twitter' },
    { href: 'https://www.linkedin.com/company/iteka-youth-organization', icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
      <footer className={styles.footer}>
        {/* Main Footer */}
        <div className={styles.inner}>
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.logoLink}>
                <h3 className={styles.logoText}>iteka</h3>
              </Link>
              <p className={styles.tagline}>
                Empowering young people in Rwanda through talent discovery, skills development,
                and peace promotion.
              </p>

              {/* Newsletter */}
              <div>
                <p className={styles.newsletterLabel}>Stay Updated</p>
                {newsletterStatus === 'success' ? (
                    <p className={styles.newsletterSuccess}>
                      <Check size={16} /> Thanks for subscribing!
                    </p>
                ) : (
                    <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                      <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Your email"
                          className={styles.newsletterInput}
                      />
                      <button
                          type="submit"
                          disabled={newsletterStatus === 'loading'}
                          className={styles.newsletterButton}
                          aria-label="Subscribe"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </form>
                )}
                {newsletterStatus === 'error' && (
                    <p className={styles.newsletterError}>Something went wrong. Try again.</p>
                )}
              </div>
            </div>

            {/* About */}
            <div className={styles.linkCol}>
              <h4 className={styles.linkColTitle}>About</h4>
              <ul className={styles.linkList}>
                {footerLinks.about.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Work */}
            <div className={styles.linkCol}>
              <h4 className={styles.linkColTitle}>Work</h4>
              <ul className={styles.linkList}>
                {footerLinks.work.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className={styles.linkCol}>
              <h4 className={styles.linkColTitle}>Resources</h4>
              <ul className={styles.linkList}>
                {footerLinks.resources.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.contactCol}>
              <h4 className={styles.linkColTitle}>Contact</h4>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <MapPin size={16} />
                  <span>Kigali, Rwanda</span>
                </li>
                <li className={styles.contactItem}>
                  <Mail size={16} />
                  <a href="mailto:hello@itekarwanda.org">hello@itekarwanda.org</a>
                </li>
                <li className={styles.contactItem}>
                  <Phone size={16} />
                  <a href="tel:+250789429057">+250 789 429 057</a>
                </li>
              </ul>

              {/* Social Links */}
              <div className={styles.socialRow}>
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                      <a
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialLink}
                          aria-label={social.label}
                      >
                      <Icon size={16} />
                      </a>
                );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Iteka Youth Organization. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
  );
}
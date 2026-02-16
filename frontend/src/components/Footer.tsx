'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

export default function Footer() {
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
    { href: '#', icon: Facebook, label: 'Facebook' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Instagram, label: 'Instagram' },
  ];

  return (
      <footer className="bg-iteka-dark text-white">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Brand - 4 cols */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <h3 className="text-3xl font-bold text-white">iteka</h3>
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Empowering young people in Rwanda through talent discovery, skills development,
                and peace promotion.
              </p>

              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-white mb-3">Stay Updated</p>
                <form className="flex gap-2">
                  <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-iteka-orange"
                  />
                  <button
                      type="submit"
                      className="bg-iteka-orange text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
                      aria-label="Subscribe"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* About - 2 cols */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">About</h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link, idx) => (
                    <li key={idx}>
                      <Link
                          href={link.href}
                          className="text-gray-300 hover:text-iteka-orange transition text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Work - 2 cols */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Work</h4>
              <ul className="space-y-3">
                {footerLinks.work.map((link, idx) => (
                    <li key={idx}>
                      <Link
                          href={link.href}
                          className="text-gray-300 hover:text-iteka-orange transition text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Resources - 2 cols */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, idx) => (
                    <li key={idx}>
                      <Link
                          href={link.href}
                          className="text-gray-300 hover:text-iteka-orange transition text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            {/* Contact - 2 cols */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-iteka-orange" />
                  <span>Kigali, Rwanda</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-iteka-orange" />
                  <a
                      href="mailto:hello@itekarwanda.org"
                      className="text-gray-300 hover:text-iteka-orange transition"
                  >
                    hello@itekarwanda.org
                  </a>
                </li>
                <li className="flex items-start gap-2 text-gray-300">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-iteka-orange" />
                  <span>+250 XXX XXX XXX</span>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                      <a
                          key={idx}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-white/10 hover:bg-iteka-orange flex items-center justify-center transition"
                          aria-label={social.label}
                      >
                      <Icon className="w-4 h-4" />
                      </a>
                );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Iteka Youth Organization. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/approach', label: 'Our Approach' },
    { href: '/programmes', label: 'Programmes' },
    { href: '/impact', label: 'Our Impact' },
    { href: '/partners', label: 'Partners' },
    { href: '/festival', label: 'Festival' },
    { href: '/news', label: 'News' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-iteka-orange">iteka</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-iteka-orange transition text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Donate Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/donate"
              className="bg-iteka-orange text-white px-6 py-2 rounded hover:bg-opacity-90 transition text-sm font-medium"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="block px-4 py-2 text-iteka-orange font-medium hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/approach', label: 'Approach' },
    {
      label: 'Work',
      sublinks: [
        { href: '/programmes', label: 'Programmes' },
        { href: '/impact', label: 'Impact' },
        { href: '/festival', label: 'Festival' },
      ]
    },
    { href: '/news', label: 'News' },
    {
      label: 'More',
      sublinks: [
        { href: '/partners', label: 'Partners' },
        { href: '/team', label: 'Team' },
        { href: '/gallery', label: 'Gallery' },
      ]
    },
    { href: '/contact', label: 'Contact' },
  ];

  return (
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <Image
                    src="/logo-iteka.png"
                    alt="Iteka"
                    width={100}
                    height={32}
                    className="h-8 w-auto"
                    priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, idx) => (
                  link.sublinks ? (
                      <div key={idx} className="group relative">
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-iteka-orange transition flex items-center gap-1">
                          {link.label}
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                          {link.sublinks.map((sublink, subIdx) => (
                              <Link
                                  key={subIdx}
                                  href={sublink.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-iteka-orange first:rounded-t-lg last:rounded-b-lg transition"
                              >
                                {sublink.label}
                              </Link>
                          ))}
                        </div>
                      </div>
                  ) : (
                      <Link
                          key={idx}
                          href={link.href}
                          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-iteka-orange transition"
                      >
                        {link.label}
                      </Link>
                  )
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                  href="/donate"
                  className="bg-iteka-orange text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition text-sm font-semibold"
              >
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
                aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
              ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
              <nav className="lg:hidden py-4 border-t border-gray-100">
                <div className="space-y-1">
                  {navLinks.map((link, idx) => (
                      link.sublinks ? (
                          <div key={idx} className="space-y-1">
                            <div className="px-4 py-2 text-sm font-semibold text-gray-900">
                              {link.label}
                            </div>
                            {link.sublinks.map((sublink, subIdx) => (
                                <Link
                                    key={subIdx}
                                    href={sublink.href}
                                    className="block pl-8 pr-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-iteka-orange transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sublink.label}
                                </Link>
                            ))}
                          </div>
                      ) : (
                          <Link
                              key={idx}
                              href={link.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-iteka-orange transition rounded-md"
                              onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                      )
                  ))}
                  <Link
                      href="/donate"
                      className="block mx-4 mt-4 px-4 py-3 bg-iteka-orange text-white text-center font-semibold rounded-md hover:bg-opacity-90 transition"
                      onClick={() => setMobileMenuOpen(false)}
                  >
                    Donate
                  </Link>
                </div>
              </nav>
          )}
        </div>
      </header>
  );
}
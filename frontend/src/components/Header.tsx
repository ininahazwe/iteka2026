'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import styles from './Header.module.css';

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
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.row}>
            {/* Logo */}
            <Link href="/" className={styles.logoLink}>
              <Image
                  src="/logo-transp.png"
                  alt="Iteka"
                  width={200}
                  height={100}
                  className={styles.logo}
                  priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.nav}>
              {navLinks.map((link, idx) => (
                  link.sublinks ? (
                      <div key={idx} className={styles.navItem}>
                        <button className={styles.navButton}>
                          {link.label}
                          <ChevronDown size={16} />
                        </button>
                        <div className={styles.dropdown}>
                          {link.sublinks.map((sublink, subIdx) => (
                              <Link
                                  key={subIdx}
                                  href={sublink.href}
                                  className={styles.dropdownLink}
                              >
                                {sublink.label}
                              </Link>
                          ))}
                        </div>
                      </div>
                  ) : (
                      <Link key={idx} href={link.href} className={styles.navLink}>
                        {link.label}
                      </Link>
                  )
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className={styles.ctaWrap}>
              <Link href="/donate" className={styles.btnDonate}>
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={styles.mobileToggle}
                aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                  <X size={24} color="var(--iteka-ink)" />
              ) : (
                  <Menu size={24} color="var(--iteka-ink)" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
              <nav className={styles.mobileNav}>
                {navLinks.map((link, idx) => (
                    link.sublinks ? (
                        <div key={idx}>
                          <div className={styles.mobileGroupLabel}>{link.label}</div>
                          {link.sublinks.map((sublink, subIdx) => (
                              <Link
                                  key={subIdx}
                                  href={sublink.href}
                                  className={styles.mobileSubLink}
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
                            className={styles.mobileLink}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                    )
                ))}
                <Link
                    href="/donate"
                    className={styles.mobileDonate}
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

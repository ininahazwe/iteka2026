'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-iteka-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-iteka-orange mb-2">iteka</h3>
            <p className="text-gray-300 text-sm">
              Empowering youth in Rwanda through talent discovery, skills development, and peace promotion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-iteka-orange transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programmes" className="text-gray-300 hover:text-iteka-orange transition">
                  Programmes
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-gray-300 hover:text-iteka-orange transition">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-iteka-orange transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-iteka-orange transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-iteka-orange transition">
                  News
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-300 hover:text-iteka-orange transition">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-300 hover:text-iteka-orange transition">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300 text-sm mb-2">Kigali, Rwanda</p>
            <p className="text-gray-300 text-sm mb-2">
              <a href="mailto:hello@itekarwanda.org" className="hover:text-iteka-orange transition">
                hello@itekarwanda.org
              </a>
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-iteka-orange hover:text-opacity-80 transition">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-iteka-orange hover:text-opacity-80 transition">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.655 3.74A11.65 11.65 0 112.305 5.064a4.106 4.106 0 001.273 5.477A4.072 4.072 0 012.8 10.385v.051a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-iteka-orange hover:text-opacity-80 transition">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Iteka Youth Organization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
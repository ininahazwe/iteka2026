'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchGalleries } from '@/src/lib/api';

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'Events', label: 'Events' },
  { value: 'Programmes', label: 'Programmes' },
  { value: 'Festival', label: 'Festival' },
  { value: 'Team', label: 'Team' },
  { value: 'Community', label: 'Community' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['galleries', selectedCategory],
    queryFn: () => fetchGalleries(selectedCategory || undefined),
  });

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-iteka-cyan to-iteka-green flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl opacity-90">Moments from our programmes and events</p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    selectedCategory === cat.value
                      ? 'bg-iteka-orange text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Images Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading images...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No images found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() =>
                      setSelectedImage(
                        `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes?.image?.data?.attributes?.url}`
                      )
                    }
                    className="relative group overflow-hidden rounded-lg aspect-video bg-gray-200"
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes?.image?.data?.attributes?.url}`}
                      alt={img.attributes?.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-4xl max-h-96 object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </>
  );
}
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchProgrammes } from '@/src/lib/api';

export default function ProgrammesPage() {
  const { data: programmes = [], isLoading } = useQuery({
    queryKey: ['programmes'],
    queryFn: fetchProgrammes,
  });

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-iteka-orange to-iteka-brown flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Our Programmes</h1>
            <p className="text-xl opacity-90">Discover our initiatives empowering youth in Rwanda</p>
          </div>
        </section>

        {/* Programmes Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading programmes...</p>
              </div>
            ) : programmes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No programmes found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programmes.map((prog) => (
                  <Link
                    key={prog.id}
                    href={`/programmes/${prog.attributes?.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-2xl transition duration-300"
                  >
                    {prog.attributes?.featured_image?.data && (
                      <div className="relative h-64 overflow-hidden bg-gray-200">
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${prog.attributes.featured_image.data.attributes.url}`}
                          alt={prog.attributes?.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-iteka-dark mb-3 group-hover:text-iteka-orange transition">
                        {prog.attributes?.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {prog.attributes?.short_description}
                      </p>
                      <div className="flex items-center text-iteka-orange font-semibold group-hover:translate-x-2 transition">
                        Learn More →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
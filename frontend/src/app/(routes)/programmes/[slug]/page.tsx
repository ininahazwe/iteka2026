'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchProgrammeBySlug } from '@/src/lib/api';

export default function ProgrammeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: programme, isLoading } = useQuery({
    queryKey: ['programme', slug],
    queryFn: () => fetchProgrammeBySlug(slug),
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!programme) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-gray-600 mb-4">Programme not found</p>
          <Link href="/programmes" className="text-iteka-orange hover:underline">
            Back to Programmes
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const attrs = programme.attributes;

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        {attrs?.featured_image?.data && (
          <section className="relative h-96 overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.featured_image.data.attributes.url}`}
              alt={attrs?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <h1 className="text-5xl font-bold">{attrs?.name}</h1>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            {/* Description */}
            <div className="prose prose-lg max-w-none mb-12">
              <div
                dangerouslySetInnerHTML={{
                  __html: attrs?.description || '',
                }}
              />
            </div>

            {/* Impact Stats */}
            {attrs?.impact_stats && attrs.impact_stats.length > 0 && (
              <div className="mb-12 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Programme Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {attrs.impact_stats.map((stat: any, idx: number) => (
                    <div key={idx} className="text-center">
                      <div className="text-3xl font-bold text-iteka-orange">
                        {stat.value}
                      </div>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {attrs?.requirements && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: attrs.requirements,
                  }}
                />
              </div>
            )}

            {/* CTA */}
            {attrs?.application_form_url && (
              <div className="bg-iteka-orange text-white p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                <a
                  href={attrs.application_form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-iteka-orange px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
                >
                  Apply Now
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Gallery */}
        {attrs?.gallery?.data && attrs.gallery.data.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {attrs.gallery.data.slice(0, 6).map((img: any) => (
                  <div key={img.id} className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.url}`}
                      alt="Gallery"
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/programmes" className="text-iteka-orange hover:underline font-semibold">
              ← Back to Programmes
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
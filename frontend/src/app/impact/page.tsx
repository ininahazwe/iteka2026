// app/impact/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchImpactStats, fetchTestimonials } from '@/src/lib/api';

export default function ImpactPage() {
  const { data: stats = [], isLoading: statsLoading } = useQuery({
    queryKey: ['impact-stats'],
    queryFn: fetchImpactStats,
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  // Fonction helper pour obtenir l'URL de l'image
  const getImageUrl = (image: any) => {
    if (!image) return null;

    if (image.data?.attributes?.url) {
      return `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.attributes.url}`;
    }

    if (image.url) {
      return `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`;
    }

    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_STRAPI_URL}${image}`;
    }

    return null;
  };

  return (
      <>
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative h-96 bg-gradient-to-r from-iteka-pink to-iteka-orange flex items-center justify-center text-white">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 text-center">
              <h1 className="text-5xl font-bold mb-4">Our Impact</h1>
              <p className="text-xl opacity-90">Transforming lives and communities across Rwanda</p>
            </div>
          </section>

          {/* Impact Statistics */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">By The Numbers</h2>

              {statsLoading ? (
                  <div className="text-center text-gray-600">Loading impact data...</div>
              ) : stats.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat: any) => (
                        <div key={stat.id} className="text-center p-8 bg-gradient-to-br from-iteka-orange to-iteka-brown rounded-lg text-white hover:shadow-xl transition">
                          <div className="text-6xl font-bold mb-2">{stat.attributes?.value}</div>
                          <p className="text-lg">{stat.attributes?.label}</p>
                          {stat.attributes?.description && (
                              <p className="text-sm mt-2 opacity-80">{stat.attributes.description}</p>
                          )}
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="text-center text-gray-600">No impact statistics available</div>
              )}
            </div>
          </section>

          {/* Impact Stories */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-4 text-center">Stories of Change</h2>
              <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
                Hear directly from the young people whose lives have been transformed through our programmes
              </p>

              {testimonialsLoading ? (
                  <div className="text-center text-gray-600">Loading testimonials...</div>
              ) : testimonials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial: any) => {
                      const photoUrl = getImageUrl(testimonial.attributes?.author_photo);

                      return (
                          <div
                              key={testimonial.id}
                              className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition"
                          >
                            <div className="flex items-start mb-4">
                              {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-iteka-orange mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                              ))}
                            </div>
                            <p className="text-gray-700 italic mb-4">
                              &quot;{testimonial.attributes?.quote}&quot;
                            </p>
                            <div className="flex items-center">
                              {photoUrl && (
                                  <img
                                      src={photoUrl}
                                      alt={testimonial.attributes?.author_name}
                                      className="w-12 h-12 rounded-full mr-4 object-cover"
                                  />
                              )}
                              <div>
                                <p className="font-bold text-iteka-dark">
                                  {testimonial.attributes?.author_name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {testimonial.attributes?.author_role}
                                </p>
                              </div>
                            </div>
                          </div>
                      );
                    })}
                  </div>
              ) : (
                  <div className="text-center text-gray-600">No testimonials available</div>
              )}
            </div>
          </section>

          {/* Impact Focus Areas */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center">Areas of Impact</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-iteka-orange to-iteka-brown text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Youth Employment</h3>
                  <p>
                    We equip young people with job-ready skills and connect them to employment
                    opportunities with leading organizations.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-iteka-pink to-iteka-orange text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Entrepreneurship</h3>
                  <p>
                    Through our business training and mentorship, we help youth start and grow their own
                    ventures.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-iteka-green to-iteka-cyan text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Education</h3>
                  <p>
                    We provide scholarships, tutoring, and mentoring to help young people succeed
                    academically.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-iteka-cyan to-iteka-brown text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Peace & Unity</h3>
                  <p>
                    Our intercultural programmes build bridges between youth and promote reconciliation and
                    unity.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-iteka-yellow to-iteka-orange text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Leadership</h3>
                  <p>
                    We develop future leaders through specialized training and community leadership
                    opportunities.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-iteka-brown to-iteka-pink text-white p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Community Development</h3>
                  <p>
                    Young people apply their skills to address local challenges and drive positive community
                    change.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Commitment */}
          <section className="py-20 bg-iteka-dark text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">Our Commitment</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                We are committed to measuring and demonstrating our impact. Every programme is evaluated
                using rigorous metrics to ensure we are creating lasting positive change in the lives of
                young people and their communities. Our impact reports are available for transparency and
                accountability.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </>
  );
}
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

    if (image.data?.url) {
      return `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.data.url}`;
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
                        <div key={stat.id} className="text-center text-white p-8 bg-gradient-to-br from-iteka-orange to-iteka-brown rounded-lg hover:shadow-xl transition">
                          <div className="text-6xl font-bold mb-2">{stat.value}</div>
                          <p className="text-lg">{stat.label}</p>
                          {stat.description && (
                              <p className="text-sm mt-2 opacity-80">{stat.description}</p>
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

              {testimonials.map((testimonial: any) => {
                const photoUrl = getImageUrl(testimonial.author_photo);

                return (
                    <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
                      {/* ... étoiles ... */}
                      <p className="text-gray-700 italic mb-4">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="flex items-center">
                        {photoUrl && (
                            <img
                                src={photoUrl}
                                alt={testimonial.author_name}
                                className="w-12 h-12 rounded-full mr-4 object-cover"
                            />
                        )}
                        <div>
                          <p className="font-bold text-iteka-dark">{testimonial.author_name}</p>
                          <p className="text-sm text-gray-600">{testimonial.author_role}</p>
                        </div>
                      </div>
                    </div>
                );
              })}
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
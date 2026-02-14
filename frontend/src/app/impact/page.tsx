'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Award, Globe, Heart, Target, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchImpactStats, fetchTestimonials, fetchGalleryImages } from '@/src/lib/api';

export default function ImpactPage() {
  const { data: stats = [], isLoading: statsLoading } = useQuery({
    queryKey: ['impact-stats'],
    queryFn: fetchImpactStats,
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryImages,
  });

  const impactAreas = [
    {
      title: 'Youth Employment',
      description: 'We equip young people with job-ready skills and connect them to employment opportunities with leading organizations.',
      icon: Briefcase,
    },
    {
      title: 'Entrepreneurship',
      description: 'Through our business training and mentorship, we help youth start and grow their own ventures.',
      icon: Lightbulb,
    },
    {
      title: 'Education',
      description: 'We provide scholarships, tutoring, and mentoring to help young people succeed academically.',
      icon: GraduationCap,
    },
    {
      title: 'Peace & Unity',
      description: 'Our intercultural programmes build bridges between youth and promote reconciliation and unity.',
      icon: Heart,
    },
    {
      title: 'Leadership',
      description: 'We develop future leaders through specialized training and community leadership opportunities.',
      icon: Award,
    },
    {
      title: 'Community Development',
      description: 'Young people apply their skills to address local challenges and drive positive community change.',
      icon: Globe,
    },
  ];

  return (
      <>
        <Header />

        <main>
          {/* Hero Section - Simple */}
          <section className="bg-white py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
                Creating Lasting Impact.
                <br />
                <span className="text-iteka-orange">Transforming Communities.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how we're empowering thousands of young Rwandans to discover their potential
                and create positive change in their communities.
              </p>
            </div>
          </section>

          {/* Impact Statistics - Fond vert */}
          <section className="py-20 bg-[#E8F5E9]">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                Our Impact By The Numbers
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Measurable results that demonstrate our commitment to youth empowerment
              </p>

              {statsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent"></div>
                    <p className="text-gray-600 mt-4">Loading impact data...</p>
                  </div>
              ) : stats.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat: any) => (
                        <div key={stat.id} className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition">
                          <div className="text-5xl font-bold text-iteka-dark mb-2">
                            {stat.value}
                          </div>
                          <p className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</p>
                          {stat.description && (
                              <p className="text-sm text-gray-600">{stat.description}</p>
                          )}
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="text-center text-gray-600 py-12">No impact statistics available</div>
              )}
            </div>
          </section>

          {/* Impact Story Grid with Image */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                {/* Image */}
                <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                  {galleryImages[0]?.image?.data?.url ? (
                      <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[0].image.data.url}`}
                          alt="Impact Story"
                          className="w-full h-full object-cover"
                      />
                  ) : (
                      <div className="w-full h-full bg-gradient-to-br from-iteka-orange to-iteka-dark"></div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-iteka-dark" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">
                    Evidence-Based Results
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    We are committed to measuring and demonstrating our impact. Every programme is evaluated
                    using rigorous metrics to ensure we are creating lasting positive change in the lives of
                    young people and their communities.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-700">
                      <strong>Quarterly assessments</strong> to track participant progress and outcomes
                    </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-700">
                      <strong>Annual impact reports</strong> available for transparency and accountability
                    </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-700">
                      <strong>Third-party evaluations</strong> to ensure objectivity and rigor
                    </span>
                    </li>
                  </ul>
                  <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                  >
                    Request Impact Report
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Stories / Testimonials */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                Stories of Transformation
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
                Hear directly from the young people whose lives have been transformed through our programmes
              </p>

              {testimonialsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent"></div>
                  </div>
              ) : testimonials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition">
                          <div className="text-4xl text-iteka-orange mb-4">&ldquo;</div>
                          <p className="text-gray-700 mb-6 leading-relaxed italic">
                            {testimonial.quote}
                          </p>
                          <div className="flex items-center gap-4">
                            {testimonial.author_photo?.data?.url && (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${testimonial.author_photo.data.url}`}
                                    alt={testimonial.author_name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                            )}
                            <div>
                              <p className="font-bold text-iteka-dark">{testimonial.author_name}</p>
                              <p className="text-sm text-gray-600">{testimonial.author_role}</p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="text-center text-gray-600 py-12">No testimonials available</div>
              )}
            </div>
          </section>

          {/* Impact Focus Areas - Cards avec icônes */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                Areas of Impact
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Our programmes create lasting change across six key focus areas
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {impactAreas.map((area, idx) => {
                  const Icon = area.icon;
                  return (
                      <div key={idx} className="bg-[#E8F5E9] p-8 rounded-lg hover:shadow-lg transition group">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 group-hover:bg-iteka-orange transition">
                          <Icon className="w-7 h-7 text-iteka-dark group-hover:text-white transition" />
                        </div>
                        <h3 className="text-xl font-bold text-iteka-dark mb-3">{area.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{area.description}</p>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Visual Impact Gallery */}
          {galleryImages.length > 0 && (
              <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                    Impact In Action
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.slice(0, 8).map((img: any, idx: number) => (
                        <div
                            key={idx}
                            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                        >
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img?.image?.data?.url}`}
                              alt={img?.caption || 'Impact'}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition"></div>
                        </div>
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 border-2 border-iteka-dark px-6 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                    >
                      View Full Gallery
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* Commitment Statement - Fond vert */}
          <section className="py-20 bg-[#E8F5E9]">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-iteka-dark" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-6">
                Our Commitment to Transparency
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-8">
                We are committed to measuring and demonstrating our impact. Every programme is evaluated
                using rigorous metrics to ensure we are creating lasting positive change in the lives of
                young people and their communities. Our impact reports are available for transparency and
                accountability.
              </p>
              <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
              >
                Request Impact Report
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                Be Part of Our Impact
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Your support helps us expand our reach and deepen our impact across Rwanda
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/donate"
                    className="bg-iteka-orange text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition inline-flex items-center gap-2"
                >
                  Support Our Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                    href="/programmes"
                    className="border-2 border-iteka-dark text-iteka-dark px-8 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                >
                  Explore Programmes
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
  );
}
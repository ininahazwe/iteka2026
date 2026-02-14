'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, Users, Target, Globe, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

import {
  fetchProgrammes,
  fetchActualites,
  fetchTestimonials,
  fetchImpactStats,
  fetchGalleryImages,
} from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const { data: programmes = [] } = useQuery({
    queryKey: ['programmes'],
    queryFn: fetchProgrammes,
  });

  const { data: actualites = [] } = useQuery({
    queryKey: ['actualites'],
    queryFn: fetchActualites,
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const { data: stats = [] } = useQuery({
    queryKey: ['impact-stats'],
    queryFn: fetchImpactStats,
  });

  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryImages,
  });

  const featuredProgrammes = programmes.filter((p: any) => p?.is_featured);
  const featuredNews = actualites.slice(0, 3);

  // État pour les 3 images rotatives
  const [heroImage1, setHeroImage1] = useState(0);
  const [heroImage2, setHeroImage2] = useState(1);
  const [heroImage3, setHeroImage3] = useState(2);

  // Rotation aléatoire des images toutes les 3 secondes (décalées)
  useEffect(() => {
    if (galleryImages.length < 3) return;

    const getRandomIndex = (exclude: number[]) => {
      let index;
      do {
        index = Math.floor(Math.random() * galleryImages.length);
      } while (exclude.includes(index));
      return index;
    };

    // Image 1 change toutes les 3s
    const interval1 = setInterval(() => {
      setHeroImage1((prev) => getRandomIndex([heroImage2, heroImage3]));
    }, 3000);

    // Image 2 change toutes les 3s (décalage de 1s)
    const interval2 = setInterval(() => {
      setHeroImage2((prev) => getRandomIndex([heroImage1, heroImage3]));
    }, 3000);

    // Image 3 change toutes les 3s (décalage de 2s)
    const interval3 = setInterval(() => {
      setHeroImage3((prev) => getRandomIndex([heroImage1, heroImage2]));
    }, 3000);

    // Décalage initial
    setTimeout(() => {}, 1000);
    setTimeout(() => {}, 2000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [galleryImages]);

  return (
      <>
        <Header />

        <main>
          {/* Hero Section - Grid Layout */}
          <section className="bg-white py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                {/* Left: Text Content */}
                <div className="lg:col-span-3 space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark leading-tight">
                    Empowerment With Purpose.
                    <br />
                    <span className="text-iteka-orange">Results With Impact.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                    Discover talents. Develop skills. Promote peace among Rwandan youth.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                        href="/programmes"
                        className="bg-iteka-dark text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition inline-flex items-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/contact"
                        className="border-2 border-iteka-dark text-iteka-dark px-6 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                    >
                      Get In Touch
                    </Link>
                  </div>
                </div>

                {/* Right: Images Grid (1 grande verticale + 2 horizontales) */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4 h-[500px]">
                  {galleryImages.length >= 3 ? (
                      <>
                        {/* Image 1 - Grande verticale (occupe 2 lignes, gauche) */}
                        <div className="relative row-span-2 rounded-lg overflow-hidden shadow-md">
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[heroImage1]?.image?.data?.url}`}
                              alt={galleryImages[heroImage1]?.caption || 'Iteka Youth'}
                              className="w-full h-full object-cover transition-opacity duration-500"
                          />
                        </div>

                        {/* Image 2 - Horizontale en haut (droite) */}
                        <div className="relative rounded-lg overflow-hidden shadow-md">
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[heroImage2]?.image?.data?.url}`}
                              alt={galleryImages[heroImage2]?.caption || 'Iteka Youth'}
                              className="w-full h-full object-cover transition-opacity duration-500"
                          />
                        </div>

                        {/* Image 3 - Horizontale en bas (droite) */}
                        <div className="relative rounded-lg overflow-hidden shadow-md">
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[heroImage3]?.image?.data?.url}`}
                              alt={galleryImages[heroImage3]?.caption || 'Iteka Youth'}
                              className="w-full h-full object-cover transition-opacity duration-500"
                          />
                        </div>
                      </>
                  ) : (
                      // Placeholder si pas assez d'images
                      <>
                        <div className="row-span-2 rounded-lg bg-gradient-to-br from-iteka-orange to-iteka-dark"></div>
                        <div className="rounded-lg bg-gradient-to-br from-iteka-dark to-gray-700"></div>
                        <div className="rounded-lg bg-gradient-to-br from-gray-600 to-iteka-orange"></div>
                      </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Partners Logos */}
          <section className="py-8 bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-sm text-gray-500 text-center mb-6">Our Supported Partners</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {/* Placeholder - Remplacer par vraies logos partenaires */}
                <div className="h-12 w-24 bg-gray-300 rounded"></div>
                <div className="h-12 w-24 bg-gray-300 rounded"></div>
                <div className="h-12 w-24 bg-gray-300 rounded"></div>
                <div className="h-12 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          </section>

          {/* Who We Are / What We Do - Alternating Grid */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 space-y-20">
              {/* Who We Are */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-64 rounded-lg overflow-hidden">
                    {galleryImages[3]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[3].image.data.url}`}
                            alt="Who We Are"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                  <div className="h-64 rounded-lg overflow-hidden mt-8">
                    {galleryImages[4]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[4].image.data.url}`}
                            alt="Who We Are"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">Who We Are</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Iteka Youth Organization is Rwanda's leading platform for youth empowerment. Founded on the belief that every young person has unique talents, we provide comprehensive support through talent discovery, skills development, and peace promotion initiatives.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Since 2015, we've reached over 2,500 young people across Rwanda, creating lasting impact in communities through evidence-based programmes and strategic partnerships.
                  </p>
                  <Link
                      href="/about"
                      className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                  >
                    Learn About Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* What We Do */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4 order-2 lg:order-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">What We Do</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our programmes are anchored on evidence-based approaches that transform lives through:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-600">
                      <strong>Talent Discovery:</strong> Identifying unique abilities in arts, sports, technology, and entrepreneurship
                    </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-600">
                      <strong>Skills Development:</strong> Professional training and mentorship programmes
                    </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-iteka-orange flex-shrink-0"></div>
                      <span className="text-gray-600">
                      <strong>Peace Building:</strong> Community dialogue and conflict resolution initiatives
                    </span>
                    </li>
                  </ul>
                  <Link
                      href="/programmes"
                      className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                  >
                    Explore Our Programmes
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
                  <div className="h-64 rounded-lg overflow-hidden">
                    {galleryImages[5]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[5].image.data.url}`}
                            alt="What We Do"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                  <div className="h-64 rounded-lg overflow-hidden mt-8">
                    {galleryImages[6]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[6].image.data.url}`}
                            alt="What We Do"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Expertise - Cards with Icons */}
          {featuredProgrammes.length > 0 && (
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">
                      Our Expertise, Your Impact
                    </h2>
                    <Link
                        href="/programmes"
                        className="hidden md:inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                    >
                      View All Programmes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProgrammes.slice(0, 6).map((prog: any, idx: number) => {
                      const icons = [Users, Target, Globe, Award, Users, Target];
                      const Icon = icons[idx % icons.length];

                      return (
                          <Link
                              key={prog.id}
                              href={`/programmes/${prog?.slug}`}
                              className="group bg-[#E8F5E9] p-6 rounded-lg hover:shadow-lg transition"
                          >
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 group-hover:bg-iteka-orange group-hover:text-white transition">
                              <Icon className="w-6 h-6 text-iteka-dark group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-iteka-dark mb-2">
                              {prog?.name}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                              {prog?.short_description}
                            </p>
                          </Link>
                      );
                    })}
                  </div>

                  <div className="text-center mt-8 md:hidden">
                    <Link
                        href="/programmes"
                        className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                    >
                      View All Programmes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* Impact Stats */}
          {stats.length > 0 && (
              <section className="py-16 bg-[#E8F5E9]">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat: any) => (
                        <div key={stat.id}>
                          <div className="text-4xl md:text-5xl font-bold text-iteka-dark mb-2">
                            {stat?.value}
                          </div>
                          <p className="text-sm md:text-base text-gray-600">{stat?.label}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </section>
          )}

          {/* Latest News - Carousel Style */}
          {featuredNews.length > 0 && (
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex justify-between items-center mb-12">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-2">
                        Driving Development Through Insight
                      </h2>
                      <p className="text-gray-600">Stay updated with our latest initiatives</p>
                    </div>
                    <Link
                        href="/news"
                        className="hidden md:inline-flex items-center gap-2 border-2 border-iteka-dark px-4 py-2 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                    >
                      View All News
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredNews.map((article: any) => (
                        <Link
                            key={article.id}
                            href={`/news/${article?.slug}`}
                            className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition"
                        >
                          {article?.featured_image?.data && (
                              <div className="relative h-48 overflow-hidden bg-gray-200">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featured_image.data.url}`}
                                    alt={article?.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                              </div>
                          )}
                          <div className="p-6">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {article?.category}
                      </span>
                            <h3 className="text-lg font-bold text-iteka-dark mt-2 mb-2 group-hover:text-iteka-orange transition line-clamp-2">
                              {article?.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {article?.excerpt}
                            </p>
                          </div>
                        </Link>
                    ))}
                  </div>

                  <div className="text-center mt-8 md:hidden">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                    >
                      View All News
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* Testimonials - Simplified */}
          {testimonials.length > 0 && (
              <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                    Voices From Our Community
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.slice(0, 2).map((testimonial: any) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-8 rounded-lg shadow-sm"
                        >
                          <div className="text-4xl text-iteka-orange mb-4">&ldquo;</div>
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            {testimonial?.quote}
                          </p>
                          <div className="flex items-center gap-4">
                            {testimonial?.author_photo?.data && (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${testimonial.author_photo.data.url}`}
                                    alt={testimonial?.author_name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                            )}
                            <div>
                              <p className="font-bold text-iteka-dark">
                                {testimonial?.author_name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {testimonial?.author_role}
                              </p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </section>
          )}

          {/* CTA Section */}
          <section className="py-20 bg-[#E8F5E9]">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                Join Us And Let's Make A Better World Today!
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Your support empowers Rwandan youth to discover their potential and create lasting change in their communities.
              </p>
              <Link
                  href="/donate"
                  className="inline-block bg-iteka-orange text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
              >
                Donate Now
              </Link>
            </div>
          </section>

          {/* Impact Gallery */}
          {galleryImages.length > 0 && (
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">
                      Our Impact In Action
                    </h2>
                    <Link
                        href="/gallery"
                        className="hidden md:inline-flex items-center gap-2 border-2 border-iteka-dark px-4 py-2 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                    >
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

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

                  <div className="text-center mt-8 md:hidden">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                    >
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
          )}
        </main>

        <Footer />
      </>
  );
}
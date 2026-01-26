'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import {
  fetchProgrammes,
  fetchActualites,
  fetchTestimonials,
  fetchImpactStats,
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

  const featuredProgrammes = programmes.filter((p: any) => p.attributes?.is_featured);
  const featuredNews = actualites.slice(0, 3);

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] bg-gradient-to-r from-iteka-dark to-iteka-brown flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Empowering <span className="text-iteka-orange">Youth</span> in Rwanda
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Discover talents. Develop skills. Promote peace.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/programmes"
                className="bg-iteka-orange text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
              >
                Explore Programmes
              </Link>
              <Link
                href="/donate"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-iteka-dark transition"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-iteka-dark mb-8 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Iteka Youth Organization is dedicated to empowering young people in Rwanda through
              talent discovery, skills development, and peace promotion. We believe that every young
              person has the potential to make a positive impact in their community.
            </p>
          </div>
        </section>

        {/* Impact Stats */}
        {stats.length > 0 && (
          <section className="py-20 bg-iteka-dark text-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-16">Our Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat: any) => (
                  <div key={stat.id} className="text-center">
                    <div className="text-5xl font-bold text-iteka-orange mb-2">
                      {stat.attributes?.value}
                    </div>
                    <p className="text-lg text-gray-300">{stat.attributes?.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Programmes */}
        {featuredProgrammes.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-iteka-dark mb-4 text-center">
                Featured Programmes
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Discover our core initiatives empowering youth
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredProgrammes.slice(0, 3).map((prog: any) => (
                  <Link
                    key={prog.id}
                    href={`/programmes/${prog.attributes?.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition"
                  >
                    {prog.attributes?.featured_image?.data && (
                      <div className="relative h-64 overflow-hidden bg-gray-200">
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${prog.attributes.featured_image.data.attributes.url}`}
                          alt={prog.attributes?.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-iteka-dark mb-2 group-hover:text-iteka-orange transition">
                        {prog.attributes?.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {prog.attributes?.short_description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/programmes"
                  className="inline-block bg-iteka-orange text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
                >
                  View All Programmes
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-iteka-dark mb-12 text-center">
                What Our Youth Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.slice(0, 4).map((testimonial: any) => (
                  <div
                    key={testimonial.id}
                    className="bg-gray-50 p-8 rounded-lg border-l-4 border-iteka-orange"
                  >
                    <p className="text-gray-700 mb-4 italic">
                      &quot;{testimonial.attributes?.quote}&quot;
                    </p>
                    <div className="flex items-center">
                      {testimonial.attributes?.author_photo?.data && (
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${testimonial.attributes.author_photo.data.attributes.url}`}
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
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest News */}
        {featuredNews.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold text-iteka-dark mb-4 text-center">
                Latest News
              </h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Stay updated with our latest initiatives and achievements
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredNews.map((article: any) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.attributes?.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition"
                  >
                    {article.attributes?.featured_image?.data && (
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.attributes.featured_image.data.attributes.url}`}
                          alt={article.attributes?.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-iteka-orange text-white text-xs px-3 py-1 rounded-full">
                          {article.attributes?.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-iteka-dark mb-2 group-hover:text-iteka-orange transition">
                        {article.attributes?.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {article.attributes?.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  href="/news"
                  className="inline-block bg-iteka-orange text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
                >
                  Read More News
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-iteka-orange text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Movement</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of empowering the next generation of leaders in Rwanda
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/contact"
                className="bg-white text-iteka-orange px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
              >
                Get In Touch
              </Link>
              <Link
                href="/donate"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-iteka-orange transition"
              >
                Support Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
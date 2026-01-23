'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchActualites } from '@/src/lib/api';

export default function NewsPage() {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['actualites'],
    queryFn: fetchActualites,
  });

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-iteka-brown to-iteka-dark flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Latest News</h1>
            <p className="text-xl opacity-90">Stay updated with our latest initiatives and stories</p>
          </div>
        </section>

        {/* Articles */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No articles found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.attributes?.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-2xl transition duration-300"
                  >
                    {article.attributes?.featured_image?.data && (
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.attributes.featured_image.data.attributes.url}`}
                          alt={article.attributes?.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-iteka-orange text-white text-xs px-3 py-1 rounded-full">
                          {article.attributes?.category}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {new Date(article.attributes?.article_date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-iteka-dark mb-3 group-hover:text-iteka-orange transition line-clamp-2">
                        {article.attributes?.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {article.attributes?.excerpt}
                      </p>
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
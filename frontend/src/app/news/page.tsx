'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchActualites } from '@/src/lib/api';

export default function NewsPage() {
    const { data: articles = [], isLoading } = useQuery({
        queryKey: ['actualites'],
        queryFn: fetchActualites,
    });

    const featuredArticle = articles[0];
    const otherArticles = articles.slice(1);

    return (
        <>
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-white py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
                            Latest News & Updates
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            Stay informed about our latest initiatives, achievements, and press coverage
                        </p>
                    </div>
                </section>

                {/* Featured Article */}
                {featuredArticle && (
                    <section className="py-12 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            <Link href={`/news/${featuredArticle.slug || featuredArticle.documentId}`}>
                                <article className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        {/* Image */}
                                        {featuredArticle.featured_image?.data?.url && (
                                            <div className="relative h-64 lg:h-full overflow-hidden bg-gray-200">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${featuredArticle.featured_image.data.url}`}
                                                    alt={featuredArticle.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                />
                                                <div className="absolute top-4 left-4">
                          <span className="bg-iteka-orange text-white text-xs px-3 py-1 rounded-full font-semibold">
                            Featured
                          </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 mb-4">
                                                {featuredArticle.category && (
                                                    <span className="text-xs text-iteka-orange font-semibold uppercase tracking-wide">
                            {featuredArticle.category}
                          </span>
                                                )}
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                                                    {new Date(featuredArticle.article_date || featuredArticle.publishedAt).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                        </span>
                                            </div>
                                            <h2 className="text-3xl font-bold text-iteka-dark mb-4 group-hover:text-iteka-orange transition">
                                                {featuredArticle.title}
                                            </h2>
                                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                                {featuredArticle.excerpt}
                                            </p>
                                            <div className="inline-flex items-center gap-2 text-iteka-orange font-semibold group-hover:underline">
                                                Read Full Story
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </div>
                    </section>
                )}

                {/* Articles Grid */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent"></div>
                                <p className="text-gray-600 mt-4">Loading news...</p>
                            </div>
                        ) : otherArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {otherArticles.map((article: any) => (
                                    <Link
                                        key={article.documentId}
                                        href={`/news/${article.slug || article.documentId}`}
                                        className="group"
                                    >
                                        <article className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-iteka-orange hover:shadow-lg transition">
                                            {article.featured_image?.data?.url && (
                                                <div className="aspect-video overflow-hidden bg-gray-200">
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featured_image.data.url}`}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="flex items-center gap-3 mb-3">
                                                    {article.category && (
                                                        <span className="bg-[#E8F5E9] text-iteka-dark text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                                                            {article.category}
                            </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(article.article_date || article.publishedAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                                <h3 className="text-xl font-bold text-iteka-dark mb-3 group-hover:text-iteka-orange transition line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                    {article.excerpt}
                                                </p>
                                                <div className="flex items-center text-iteka-orange font-semibold text-sm group-hover:underline">
                                                    Read More
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600">No news articles available at the moment.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-[#E8F5E9]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                            Stay Connected
                        </h2>
                        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                            Follow us on social media for real-time updates and behind-the-scenes content
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                href="/contact"
                                className="bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
                            >
                                Subscribe to Updates
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
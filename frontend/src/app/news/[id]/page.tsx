'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, ExternalLink, Share2 } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchActualiteBySlug } from '@/src/lib/api';

export default function NewsDetailPage() {
    const params = useParams();
    const slug = params.id as string;

    const { data: article, isLoading } = useQuery({
        queryKey: ['actualite', slug],
        queryFn: () => fetchActualiteBySlug(slug),
    });

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent mb-4"></div>
                        <p className="text-gray-600">Loading article...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!article) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-iteka-dark mb-4">Article Not Found</h2>
                        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to News
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main>
                {/* Hero Image */}
                {article.featured_image?.data?.url && (
                    <section className="relative h-[400px] overflow-hidden bg-gray-900">
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featured_image.data.url}`}
                            alt={article.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </section>
                )}

                {/* Article Content */}
                <section className="py-12 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        {/* Back Link */}
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to News
                        </Link>

                        {/* Category & Date */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {article.category && (
                                <span className="bg-iteka-orange text-white text-sm px-4 py-1 rounded-full font-semibold">
                  {article.category}
                </span>
                            )}
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                                {new Date(article.article_date || article.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
              </span>
                            {article.author && (
                                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                                    {article.author}
                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-iteka-dark mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Excerpt */}
                        {article.excerpt && (
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                                {article.excerpt}
                            </p>
                        )}

                        {/* Source */}
                        {article.source && (
                            <div className="mb-8 pb-8 border-b border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Source: <span className="font-semibold text-iteka-dark">{article.source}</span>
                                    {article.source_url && (
                                        <a
                                            href={article.source_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-2 text-iteka-orange hover:underline inline-flex items-center gap-1"
                                        >
                                            View Original
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </p>
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="mb-12 pb-8 border-b border-gray-200">
                                <p className="text-sm text-gray-600 mb-3">Tags:</p>
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag: any, idx: number) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                                        >
                      {tag.name}
                    </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-iteka-dark">Share this article</p>
                                <button className="inline-flex items-center gap-2 text-iteka-orange hover:underline">
                                    <Share2 className="w-5 h-5" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related/CTA */}
                <section className="py-20 bg-[#E8F5E9]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-iteka-dark mb-4">
                            Stay Informed
                        </h2>
                        <p className="text-gray-700 mb-8">
                            Explore more stories about our impact and initiatives
                        </p>
                        <Link
                            href="/news"
                            className="inline-flex items-center gap-2 bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
                        >
                            View All News
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
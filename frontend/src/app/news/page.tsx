'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function NewsPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/actualites?populate=*&sort=publishedAt:desc`
            );
            const json = await res.json();
            return json.data;
        },
    });

    return (
        <>
            <Header />

            <main>
                <section className="bg-iteka-orange text-white py-24">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">Iteka in the News</h1>
                        <p className="text-xl">Latest updates and press coverage</p>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        {isLoading ? (
                            <p className="text-center text-gray-600">Loading news...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data?.map((article: any) => (
                                    <Link
                                        key={article.documentId}
                                        href={`/news/${article.documentId}`}
                                        className="group"
                                    >
                                        <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
                                            {article.featured_image?.url && (
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={
                                                            article.featured_image.url.startsWith('http')
                                                                ? article.featured_image.url
                                                                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featured_image.url}`
                                                        }
                                                        alt={article.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <div className="text-sm text-gray-500 mb-2">
                                                    {new Date(article.publishedAt).toLocaleDateString()}
                                                </div>
                                                <h3 className="text-xl font-bold mb-3 group-hover:text-iteka-orange transition">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-3">
                                                    {article.excerpt}
                                                </p>
                                            </div>
                                        </article>
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
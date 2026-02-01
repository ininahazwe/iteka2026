'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function NewsDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: article, isLoading } = useQuery({
        queryKey: ['news', id],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/actualites/${id}?populate=*`
            );
            const json = await res.json();
            return json.data;
        },
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

    if (!article) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <p className="text-gray-600 mb-4">Article not found</p>
                    <Link href="/news" className="text-iteka-orange hover:underline">
                        Back to News
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main>
                {article.featured_image?.url && (
                    <section className="relative h-96 overflow-hidden">
                        <img
                            src={
                                article.featured_image.url.startsWith('http')
                                    ? article.featured_image.url
                                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featured_image.url}`
                            }
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                    </section>
                )}

                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-sm text-gray-500 mb-4">
                            {new Date(article.published_at).toLocaleDateString()} · {article.source}
                        </div>
                        <h1 className="text-5xl font-bold mb-8">{article.title}</h1>

                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        <div className="mt-12 pt-8 border-t">
                            <Link href="/news" className="text-iteka-orange hover:underline font-semibold">
                                ← Back to News
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
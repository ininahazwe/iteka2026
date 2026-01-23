'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchActualiteBySlug } from '@/src/lib/api';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: article, isLoading } = useQuery({
    queryKey: ['actualite', slug],
    queryFn: () => fetchActualiteBySlug(slug),
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

  const attrs = article.attributes;

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        {attrs?.featured_image?.data && (
          <section className="relative h-96 overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.featured_image.data.attributes.url}`}
              alt={attrs?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="absolute inset-0 flex items-end">
              <div className="p-8 w-full text-white">
                <h1 className="text-5xl font-bold mb-4">{attrs?.title}</h1>
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b">
              <span className="bg-iteka-orange text-white text-sm px-3 py-1 rounded-full">
                {attrs?.category}
              </span>
              <span className="text-gray-600 text-sm">
                {new Date(attrs?.article_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              {attrs?.author && (
                <span className="text-gray-600 text-sm">By {attrs.author}</span>
              )}
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{
                __html: attrs?.content || '',
              }}
            />

            {/* Source */}
            {attrs?.source && (
              <div className="bg-gray-50 p-6 rounded-lg mb-12">
                <p className="text-gray-700">
                  <span className="font-semibold">Source:</span> {attrs.source}
                  {attrs?.source_url && (
                    <>
                      {' '}
                      <a
                        href={attrs.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-iteka-orange hover:underline"
                      >
                        Read original
                      </a>
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Tags */}
            {attrs?.tags && attrs.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {attrs.tags.map((tag: any, idx: number) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back Link */}
            <Link href="/news" className="text-iteka-orange hover:underline font-semibold">
              ← Back to News
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
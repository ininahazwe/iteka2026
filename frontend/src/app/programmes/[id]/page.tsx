'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function ProgrammeDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: programme, isLoading } = useQuery({
        queryKey: ['programme', id],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/programmes/${id}?populate=*`
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

    if (!programme) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <p className="text-gray-600 mb-4">Programme not found</p>
                    <Link href="/programmes" className="text-iteka-orange hover:underline">
                        Back to Programmes
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
                {/* Hero */}
                {programme.featured_image?.url && (
                    <section className="relative h-96 overflow-hidden">
                        <img
                            src={
                                programme.featured_image.url.startsWith('http')
                                    ? programme.featured_image.url
                                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${programme.featured_image.url}`
                            }
                            alt={programme.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <h1 className="text-5xl font-bold">{programme.name}</h1>
                        </div>
                    </section>
                )}

                {/* Content */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        {/* Description */}
                        {programme.description && (
                            <div className="prose prose-lg max-w-none mb-12">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: programme.description,
                                    }}
                                />
                            </div>
                        )}

                        {/* Impact Stats */}
                        {programme.impact_stats && programme.impact_stats.length > 0 && (
                            <div className="mb-12 bg-gray-50 p-8 rounded-lg">
                                <h2 className="text-2xl font-bold mb-6">Programme Impact</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {programme.impact_stats.map((stat: any, idx: number) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-3xl font-bold text-iteka-orange">
                                                {stat.value}
                                            </div>
                                            <p className="text-gray-600 text-sm">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Requirements */}
                        {programme.requirements && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                                <div
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: programme.requirements,
                                    }}
                                />
                            </div>
                        )}

                        {/* CTA */}
                        {programme.application_form_url && (
                            <div className="bg-iteka-orange text-white p-8 rounded-lg text-center">
                                <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                                <a
                                    href={programme.application_form_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white text-iteka-orange px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
                                >
                                    Apply Now
                                </a>
                            </div>
                        )}
                    </div>
                </section>

                {/* Gallery */}
                {programme.gallery && programme.gallery.length > 0 && (
                    <section className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-12">Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {programme.gallery.slice(0, 6).map((img: any, idx: number) => (
                                    <div key={idx} className="aspect-video overflow-hidden rounded-lg">
                                        <img
                                            src={
                                                img.url?.startsWith('http')
                                                    ? img.url
                                                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
                                            }
                                            alt={`Gallery ${idx + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Back Link */}
                <section className="py-12 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <Link href="/programmes" className="text-iteka-orange hover:underline font-semibold">
                            ← Back to Programmes
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
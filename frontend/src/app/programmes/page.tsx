'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function ProgrammesPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['programmes'],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/programmes?populate=*&sort=order:asc`
            );
            const json = await res.json();
            return json.data;
        },
    });

    return (
        <>
            <Header />

            <main>
                {/* Hero */}
                <section className="bg-iteka-green text-white py-24">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">Our Programmes</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            Empowering Rwandan youth through talent discovery, skills development, and peace promotion
                        </p>
                    </div>
                </section>

                {/* Programmes Grid */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        {isLoading ? (
                            <p className="text-center text-gray-600">Loading programmes...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data?.map((programme: any) => (
                                    <Link
                                        key={programme.id}
                                        href={`/programmes/${programme.documentId}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
                                            {programme.featured_image?.url && (
                                                <div className="aspect-video overflow-hidden">
                                                    <img
                                                        src={
                                                            programme.featured_image.url.startsWith('http')
                                                                ? programme.featured_image.url
                                                                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${programme.featured_image.url}`
                                                        }
                                                        alt={programme.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <h3 className="text-2xl font-bold mb-3 group-hover:text-iteka-orange transition">
                                                    {programme.name}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-3">
                                                    {programme.short_description}
                                                </p>
                                            </div>
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
'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default function GalleryPage() {
    const [filter, setFilter] = useState('all');

    const { data, isLoading } = useQuery({
        queryKey: ['gallery'],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/galleries?populate=*&sort=order:asc`
            );
            const json = await res.json();
            return json.data;
        },
    });

    const categories = ['all', 'events', 'programmes', 'festival', 'team', 'community'];

    const filteredData = data?.filter((item: any) =>
        filter === 'all' || item.category?.toLowerCase() === filter
    );

    console.log("Images URLs:", filteredData?.map((i: any) => i.image?.url));
    console.log("Base URL:", process.env.NEXT_PUBLIC_STRAPI_URL);

    return (
        <>
            <Header />

            <main>
                <section className="bg-gradient-to-r from-iteka-orange to-iteka-magenta text-white py-24">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">Gallery</h1>
                        <p className="text-xl">Moments that define our journey</p>
                    </div>
                </section>

                <section className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap gap-4 justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2 rounded-full capitalize transition ${
                                        filter === cat
                                            ? 'bg-iteka-orange text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        {isLoading ? (
                            <p className="text-center text-gray-600">Loading gallery...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredData?.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                                    >
                                        <img
                                            src={
                                                item.image?.url?.startsWith('http')
                                                    ? item.image.url
                                                    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image?.url}`
                                            }
                                            alt={item.caption || 'Gallery image'}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                        />
                                        {item.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 opacity-0 group-hover:opacity-100 transition">
                                                <p className="text-sm">{item.caption}</p>
                                            </div>
                                        )}
                                    </div>
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
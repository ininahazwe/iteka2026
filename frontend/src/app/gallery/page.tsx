'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Filter, Image as ImageIcon } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchGalleryImages } from '@/src/lib/api';

export default function GalleryPage() {
    const [filter, setFilter] = useState('all');

    const { data: images = [], isLoading } = useQuery({
        queryKey: ['gallery'],
        queryFn: fetchGalleryImages,
    });

    const categories = [
        { value: 'all', label: 'All' },
        { value: 'events', label: 'Events' },
        { value: 'programmes', label: 'Programmes' },
        { value: 'festival', label: 'Festival' },
        { value: 'team', label: 'Team' },
        { value: 'community', label: 'Community' },
    ];

    const filteredImages = images.filter((item: any) =>
        filter === 'all' || item.category?.toLowerCase() === filter
    );

    return (
        <>
        <Header />

        <main>
            {/* Hero Section */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-8 h-8 text-iteka-dark" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
                        Our Gallery
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600">
                        Moments that define our journey and celebrate our impact
                    </p>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="py-8 bg-gray-50 border-y border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <Filter className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-700">Filter by:</span>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setFilter(cat.value)}
                                className={`px-6 py-2 rounded-full font-semibold transition ${
                                    filter === cat.value
                                        ? 'bg-iteka-orange text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Results count */}
                    <p className="text-sm text-gray-600 mb-6">
                        Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
                        {filter !== 'all' && ` in ${categories.find(c => c.value === filter)?.label}`}
                    </p>

                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent"></div>
                            <p className="text-gray-600 mt-4">Loading gallery...</p>
                        </div>
                    ) : filteredImages.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredImages.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer bg-gray-100"
                                >
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image?.data?.url || item.image?.url}`}
                                        alt={item.caption || 'Gallery image'}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                                    {item.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition">
                                            <p className="text-sm font-medium line-clamp-2">{item.caption}</p>
                                        </div>
                                    )}
                                    {item.category && (
                                        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition">
                        <span className="bg-white/90 text-iteka-dark text-xs px-3 py-1 rounded-full font-semibold capitalize">
                          {item.category}
                        </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-600 text-lg">No images found in this category.</p>
                            <button
                                onClick={() => setFilter('all')}
                                className="mt-4 text-iteka-orange hover:underline font-semibold"
                            >
                                View all images
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#E8F5E9]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                        Be Part of Our Story
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Join us in creating more moments worth celebrating
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="/programmes"
                        className="bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
                        >
                        Explore Programmes
                    </a>
                    <a
                        href="/contact"
                        className="border-2 border-iteka-dark text-iteka-dark px-8 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                    >
                    Get Involved
                </a>
            </div>
        </div>
        </section>
</main>

    <Footer />
</>
);
}
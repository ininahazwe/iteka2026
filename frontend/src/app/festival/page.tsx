'use client';

import { useQuery } from '@tanstack/react-query';
import { Calendar, MapPin, Ticket, Download, Music, Users, Sparkles } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchFestival } from '@/src/lib/api';

export default function FestivalPage() {
    const { data: festival, isLoading } = useQuery({
        queryKey: ['festival'],
        queryFn: fetchFestival,
    });

    const data = festival?.data || festival;

    const getUrl = (media: any) => {
        const url = media?.url || media?.data?.url;
        if (!url) return '';
        return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent mb-4"></div>
                        <p className="text-gray-600">Loading festival information...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!data) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-iteka-dark mb-4">Festival Information Not Found</h2>
                        <p className="text-gray-600">Check back soon for festival updates.</p>
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
                {/* Hero Section */}
                <section className="relative h-[500px] overflow-hidden bg-gradient-to-br from-iteka-dark to-gray-800">
                    {data.hero_image && (
                        <>
                            <img
                                src={getUrl(data.hero_image)}
                                alt={data.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                        </>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                        <div className="max-w-4xl px-4">
                            <div className="inline-block bg-iteka-orange text-white text-sm px-4 py-2 rounded-full font-semibold mb-4">
                                Annual Cultural Festival
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.title}</h1>
                            {data.edition && (
                                <p className="text-2xl md:text-3xl text-gray-200 mb-6">{data.edition}</p>
                            )}
                            {data.registration_url && (
                                <a
                                    href={data.registration_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-iteka-orange text-white px-8 py-4 rounded-md font-semibold hover:bg-opacity-90 transition text-lg"
                                >
                                <Ticket className="w-5 h-5" />
                                Register Now
                                </a>
                                )}
                        </div>
                    </div>
                </section>

                {/* Quick Info Bar - Fond vert */}
                <section className="bg-[#E8F5E9] py-12 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {data.date_start && (
                                <div className="flex items-center gap-4 bg-white p-6 rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-6 h-6 text-iteka-dark" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Date</p>
                                        <p className="text-lg font-bold text-iteka-dark">
                                            {new Date(data.date_start).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                            {data.date_end && data.date_end !== data.date_start && (
                                                <> - {new Date(data.date_end).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}</>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {data.location && (
                                <div className="flex items-center gap-4 bg-white p-6 rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-iteka-dark" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Location</p>
                                        <p className="text-lg font-bold text-iteka-dark">{data.location}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 bg-white p-6 rounded-lg">
                                <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-iteka-dark" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Expected</p>
                                    <p className="text-lg font-bold text-iteka-dark">1,000+ Attendees</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Description */}
                {data.description && (
                    <section className="py-20 bg-white">
                        <div className="max-w-4xl mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-8 text-center">
                                About The Festival
                            </h2>
                            <div
                                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            />
                        </div>
                    </section>
                )}

                {/* Highlights */}
                {data.highlights && data.highlights.length > 0 && (
                    <section className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                                Festival Highlights
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data.highlights.map((highlight: any, idx: number) => (
                                    <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                                        {highlight.image && (
                                            <div className="aspect-video overflow-hidden bg-gray-200">
                                                <img
                                                    src={getUrl(highlight.image)}
                                                    alt={highlight.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Sparkles className="w-5 h-5 text-iteka-orange" />
                                                <h3 className="text-xl font-bold text-iteka-dark">{highlight.title}</h3>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery */}
                {data.gallery && data.gallery.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                                Festival Moments
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.gallery.map((img: any, idx: number) => (
                                    <div key={idx} className="aspect-video overflow-hidden rounded-lg shadow-md group cursor-pointer">
                                        <img
                                            src={getUrl(img)}
                                            alt={`Festival Moment ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* What to Expect */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                            What to Expect
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg text-center">
                                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
                                    <Music className="w-8 h-8 text-iteka-dark" />
                                </div>
                                <h3 className="text-xl font-bold text-iteka-dark mb-3">Live Performances</h3>
                                <p className="text-gray-600">
                                    Experience traditional and contemporary Rwandan music, dance, and cultural performances
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-lg text-center">
                                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
                                    <Users className="w-8 h-8 text-iteka-dark" />
                                </div>
                                <h3 className="text-xl font-bold text-iteka-dark mb-3">Cultural Exchange</h3>
                                <p className="text-gray-600">
                                    Connect with youth from across Rwanda and celebrate our diverse cultural heritage
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-lg text-center">
                                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-8 h-8 text-iteka-dark" />
                                </div>
                                <h3 className="text-xl font-bold text-iteka-dark mb-3">Talent Showcase</h3>
                                <p className="text-gray-600">
                                    Watch young artists showcase their talents in arts, music, dance, and entrepreneurship
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program PDF */}
                {data.program_pdf && (
                    <section className="py-20 bg-white">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <div className="bg-[#E8F5E9] p-12 rounded-lg">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
                                    <Download className="w-8 h-8 text-iteka-dark" />
                                </div>
                                <h2 className="text-3xl font-bold text-iteka-dark mb-4">Full Festival Programme</h2>
                                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                                    Download the complete programme to see all performances, activities, and schedule details
                                </p>
                                <a
                                    href={getUrl(data.program_pdf)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
                                >
                                <Download className="w-5 h-5" />
                                Download Programme (PDF)
                            </a>
                        </div>
                    </div>
                    </section>
                    )}

                {/* CTA Final */}
                <section className="py-20 bg-iteka-orange text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Don't Miss This Celebration!
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Join us for an unforgettable celebration of Rwandan culture, talent, and unity
                        </p>
                        {data.registration_url && (
                            <a
                                href={data.registration_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-iteka-orange px-8 py-4 rounded-md font-semibold hover:bg-opacity-90 transition text-lg"
                            >
                            <Ticket className="w-5 h-5" />
                            Register for the Festival
                            </a>
                            )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
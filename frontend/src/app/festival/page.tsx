'use client';

import { useQuery } from '@tanstack/react-query';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchFestival } from '@/src/lib/api';

export default function FestivalPage() {
    const { data: festival, isLoading } = useQuery({
        queryKey: ['festival'],
        queryFn: fetchFestival,
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

    // Dans Strapi v5, si vous récupérez un objet unique (Single Type),
    // vérifiez si les données sont dans festival ou festival.data
    const data = festival?.data || festival;

    if (!data) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-600">Festival information not found</p>
                </div>
                <Footer />
            </>
        );
    }

    // Helper pour les URLs Strapi v5
    const getUrl = (media: any) => {
        const url = media?.url;
        if (!url) return '';
        return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
    };

    return (
        <>
            <Header />

            <main>
                {/* Hero Section - Accès direct aux propriétés */}
                {data.hero_image && (
                    <section className="relative h-96 overflow-hidden">
                        <img
                            src={getUrl(data.hero_image)}
                            alt={data.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                            <h1 className="text-6xl font-bold mb-4">{data.title}</h1>
                            {data.edition && <p className="text-2xl">{data.edition}</p>}
                        </div>
                    </section>
                )}

                {/* Festival Info */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {data.date_start && (
                                <div className="text-center">
                                    <div className="text-iteka-orange text-4xl mb-2">📅</div>
                                    <h3 className="font-bold text-gray-600 text-sm mb-1">DATE</h3>
                                    <p className="text-lg font-semibold text-iteka-dark">
                                        {new Date(data.date_start).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            )}

                            {data.location && (
                                <div className="text-center">
                                    <div className="text-iteka-orange text-4xl mb-2">📍</div>
                                    <h3 className="font-bold text-gray-600 text-sm mb-1">LOCATION</h3>
                                    <p className="text-lg font-semibold text-iteka-dark">{data.location}</p>
                                </div>
                            )}

                            {data.registration_url && (
                                <div className="text-center">
                                    <div className="text-iteka-orange text-4xl mb-2">🎫</div>
                                    <a
                                        href={data.registration_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-iteka-orange text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition"
                                    >
                                        Register Now
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {data.description && (
                            <div className="prose prose-lg max-w-none mb-12">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.description,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </section>

                {/* Gallery - Strapi v5 renvoie un tableau d'objets directs */}
                {data.gallery && data.gallery.length > 0 && (
                    <section className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl font-bold mb-12 text-iteka-dark">Festival Highlights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data.gallery.map((img: any) => (
                                    <div key={img.id} className="aspect-video overflow-hidden rounded-lg shadow-md">
                                        <img
                                            src={getUrl(img)}
                                            alt="Festival Highlight"
                                            className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Program PDF */}
                {data.program_pdf && (
                    <section className="py-20 bg-white">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <h2 className="text-3xl font-bold mb-6 text-iteka-dark">Festival Programme</h2>
                            <a
                                href={getUrl(data.program_pdf)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-iteka-orange text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
                            >
                                Download Full Programme (PDF)
                            </a>
                        </div>
                    </section>
                )}

                {/* CTA Final */}
                <section className="py-20 bg-iteka-orange text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-6">Don't Miss Out!</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join us for an unforgettable celebration.
                        </p>
                        {data.registration_url && (
                            <a
                                href={data.registration_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white text-iteka-orange px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
                            >
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
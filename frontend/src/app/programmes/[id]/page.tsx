'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Users, Calendar, MapPin, Award } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchProgrammeBySlug } from '@/src/lib/api';

export default function ProgrammeDetailPage() {
    const params = useParams();
    const slug = params.id as string;

    const { data: programme, isLoading } = useQuery({
        queryKey: ['programme', slug],
        queryFn: () => fetchProgrammeBySlug(slug),
    });

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent mb-4"></div>
                        <p className="text-gray-600">Loading programme...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!programme) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-iteka-dark mb-4">Programme Not Found</h2>
                        <p className="text-gray-600 mb-6">The programme you're looking for doesn't exist.</p>
                        <Link
                            href="/programmes"
                            className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Programmes
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
                {/* Hero Section */}
                <section className="relative h-[400px] overflow-hidden bg-gradient-to-br from-iteka-dark to-gray-800">
                    {programme.featured_image?.data?.url && (
                        <>
                            <img
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${programme.featured_image.data.url}`}
                                alt={programme.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
                        </>
                    )}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 w-full">
                            <div className="max-w-3xl">
                                {programme.is_featured && (
                                    <span className="inline-block bg-iteka-orange text-white text-sm px-4 py-1 rounded-full font-semibold mb-4">
                    Featured Programme
                  </span>
                                )}
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                    {programme.name}
                                </h1>
                                {programme.short_description && (
                                    <p className="text-xl text-gray-200">
                                        {programme.short_description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Info Bar - Fond vert */}
                <section className="bg-[#E8F5E9] py-8 border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <Users className="w-5 h-5 text-iteka-dark" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Target Audience</p>
                                    <p className="font-semibold text-iteka-dark">Youth 18-35</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-iteka-dark" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Duration</p>
                                    <p className="font-semibold text-iteka-dark">Ongoing</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-iteka-dark" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Location</p>
                                    <p className="font-semibold text-iteka-dark">Kigali & Nationwide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* Description */}
                                {programme.description && (
                                    <div>
                                        <h2 className="text-3xl font-bold text-iteka-dark mb-6">About This Programme</h2>
                                        <div
                                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: programme.description }}
                                        />
                                    </div>
                                )}

                                {/* Requirements */}
                                {programme.requirements && (
                                    <div>
                                        <h2 className="text-3xl font-bold text-iteka-dark mb-6">Requirements</h2>
                                        <div
                                            className="prose prose-lg max-w-none text-gray-700"
                                            dangerouslySetInnerHTML={{ __html: programme.requirements }}
                                        />
                                    </div>
                                )}

                                {/* Impact Stats */}
                                {programme.impact_stats && programme.impact_stats.length > 0 && (
                                    <div className="bg-[#E8F5E9] p-8 rounded-lg">
                                        <h2 className="text-2xl font-bold text-iteka-dark mb-6">Programme Impact</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            {programme.impact_stats.map((stat: any, idx: number) => (
                                                <div key={idx} className="text-center">
                                                    <div className="text-3xl md:text-4xl font-bold text-iteka-dark mb-2">
                                                        {stat.value}
                                                    </div>
                                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Application CTA */}
                                {programme.application_form_url ? (
                                    <div className="bg-iteka-orange text-white p-6 rounded-lg">
                                        <h3 className="text-xl font-bold mb-3">Ready to Apply?</h3>
                                        <p className="text-sm mb-4 opacity-90">
                                            Join hundreds of youth transforming their communities
                                        </p>

                                        <a href={programme.application_form_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-white text-iteka-orange px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition text-center"
                                        >
                                        Apply Now
                                    </a>
                                    </div>
                                    ) : (
                                    <div className="bg-[#E8F5E9] p-6 rounded-lg">
                                    <h3 className="text-xl font-bold text-iteka-dark mb-3">Interested?</h3>
                                    <p className="text-sm text-gray-700 mb-4">
                                    Contact us to learn more about this programme and how to get involved
                                    </p>
                                    <Link
                                    href="/contact"
                                    className="block w-full bg-iteka-dark text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition text-center"
                                    >
                                    Get In Touch
                                    </Link>
                                    </div>
                                    )}

                                {/* What You'll Gain */}
                                <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                                    <h3 className="text-lg font-bold text-iteka-dark mb-4">What You'll Gain</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-iteka-orange flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">Professional skills development</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-iteka-orange flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">Mentorship from experts</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-iteka-orange flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">Networking opportunities</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-iteka-orange flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">Certificates of completion</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-iteka-orange flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">Community impact projects</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Share/Contact */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-bold text-iteka-dark mb-3">Need More Info?</h3>
                                    <p className="text-sm text-gray-700 mb-4">
                                        Our team is here to answer your questions
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline text-sm"
                                    >
                                        Contact Us
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                {programme.gallery?.data && programme.gallery.data.length > 0 && (
                    <section className="py-20 bg-gray-50">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl font-bold text-iteka-dark mb-12">Programme Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {programme.gallery.data.slice(0, 6).map((img: any, idx: number) => (
                                    <div key={idx} className="aspect-video overflow-hidden rounded-lg group cursor-pointer">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`}
                                            alt={`Gallery ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related CTA */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="bg-[#E8F5E9] p-12 rounded-lg text-center">
                            <h2 className="text-3xl font-bold text-iteka-dark mb-4">
                                Explore More Programmes
                            </h2>
                            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                                Discover other opportunities to develop your talents and create impact in your community
                            </p>
                            <Link
                                href="/programmes"
                                className="inline-flex items-center gap-2 bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                View All Programmes
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
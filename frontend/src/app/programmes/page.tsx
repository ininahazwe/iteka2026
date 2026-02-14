'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, Users, Target, Award, Globe, BookOpen, Heart } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchProgrammes } from '@/src/lib/api';

export default function ProgrammesPage() {
    const { data: programmes = [], isLoading } = useQuery({
        queryKey: ['programmes'],
        queryFn: fetchProgrammes,
    });

    const icons = [Users, Target, Award, Globe, BookOpen, Heart];

    return (
        <>
            <Header />

            <main>
                {/* Hero Section - Simple */}
                <section className="bg-white py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
                            Transformative Programmes.
                            <br />
                            <span className="text-iteka-orange">Real Impact.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our comprehensive suite of programmes designed to empower Rwandan youth
                            through talent discovery, skills development, and peace promotion.
                        </p>
                    </div>
                </section>

                {/* Stats Overview - Fond vert */}
                <section className="py-12 bg-[#E8F5E9]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-iteka-dark mb-1">
                                    {programmes.length}+
                                </div>
                                <p className="text-sm md:text-base text-gray-600">Active Programmes</p>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-iteka-dark mb-1">2,500+</div>
                                <p className="text-sm md:text-base text-gray-600">Youth Reached</p>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-iteka-dark mb-1">15+</div>
                                <p className="text-sm md:text-base text-gray-600">Partner Organizations</p>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-iteka-dark mb-1">12+</div>
                                <p className="text-sm md:text-base text-gray-600">Districts Covered</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programme Categories */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                            Programme Focus Areas
                        </h2>
                        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                            Our programmes span three core pillars of youth empowerment
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-[#E8F5E9] p-8 rounded-lg text-center">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-iteka-dark" />
                                </div>
                                <h3 className="text-xl font-bold text-iteka-dark mb-3">Talent Discovery</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Programmes focused on identifying unique abilities in arts, sports, technology,
                                    and entrepreneurship
                                </p>
                            </div>

                            <div className="bg-[#E8F5E9] p-8 rounded-lg text-center">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-iteka-dark" />
                                </div>
                                <h3 className="text-xl font-bold text-iteka-dark mb-3">Skills Development</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Professional training, mentorship, and hands-on learning experiences for career readiness
                                </p>
                            </div>

                            <div className="bg-[#E8F5E9] p-8 rounded-lg text-center">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-iteka-dark" />
                                </div>
                                <h3 className="text-xl font-bold text-iteka-dark mb-3">Peace Promotion</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Community dialogue and conflict resolution initiatives fostering unity and understanding
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programmes Grid */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                            All Our Programmes
                        </h2>

                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent"></div>
                                <p className="text-gray-600 mt-4">Loading programmes...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {programmes.map((programme: any, idx: number) => {
                                    const Icon = icons[idx % icons.length];

                                    return (
                                        <Link
                                            key={programme.id}
                                            href={`/programmes/${programme.slug || programme.documentId}`}
                                            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                                        >
                                            {/* Image */}
                                            {programme.featured_image?.data?.url && (
                                                <div className="aspect-video overflow-hidden bg-gray-200">
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${programme.featured_image.data.url}`}
                                                        alt={programme.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                    />
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center group-hover:bg-iteka-orange transition">
                                                        <Icon className="w-5 h-5 text-iteka-dark group-hover:text-white transition" />
                                                    </div>
                                                    {programme.is_featured && (
                                                        <span className="bg-iteka-orange text-white text-xs px-3 py-1 rounded-full font-semibold">
                              Featured
                            </span>
                                                    )}
                                                </div>

                                                <h3 className="text-xl font-bold text-iteka-dark mb-3 group-hover:text-iteka-orange transition">
                                                    {programme.name}
                                                </h3>

                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                                                    {programme.short_description}
                                                </p>

                                                <div className="flex items-center text-iteka-orange font-semibold text-sm group-hover:underline">
                                                    Learn More
                                                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

                        {!isLoading && programmes.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">No programmes available at the moment.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* How to Join */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-6">
                            How to Join Our Programmes
                        </h2>
                        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                            Getting started with Iteka is simple. Follow these steps to begin your journey
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-iteka-orange text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    1
                                </div>
                                <h3 className="font-bold text-iteka-dark mb-2">Choose a Programme</h3>
                                <p className="text-sm text-gray-600">
                                    Browse our programmes and select one that matches your interests and goals
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-iteka-orange text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    2
                                </div>
                                <h3 className="font-bold text-iteka-dark mb-2">Submit Application</h3>
                                <p className="text-sm text-gray-600">
                                    Complete the online application form with your information and motivation
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-iteka-orange text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    3
                                </div>
                                <h3 className="font-bold text-iteka-dark mb-2">Start Learning</h3>
                                <p className="text-sm text-gray-600">
                                    Once accepted, begin your transformative journey with Iteka
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA - Fond vert */}
                <section className="py-20 bg-[#E8F5E9]">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                            Ready to Transform Your Future?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of young Rwandans who are discovering their potential and creating positive change
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition inline-flex items-center gap-2"
                            >
                                Apply Now
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/about"
                                className="border-2 border-iteka-dark text-iteka-dark px-8 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                            >
                                Learn About Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
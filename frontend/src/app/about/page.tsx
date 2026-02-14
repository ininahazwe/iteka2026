'use client';

import { useQuery } from '@tanstack/react-query';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';
import { fetchTeamMembers, fetchImpactStats, fetchGalleryImages } from '@/src/lib/api';

export default function AboutPage() {
  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: fetchTeamMembers,
  });

  const { data: stats = [] } = useQuery({
    queryKey: ['impact-stats'],
    queryFn: fetchImpactStats,
  });

  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryImages,
  });

  const leadership = teamMembers.filter((member: any) => member?.is_leadership);

  return (
      <>
        <Header />

        <main>
          {/* Hero Section - Simple */}
          <section className="bg-white py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
                Building A Better Future
                <br />
                <span className="text-iteka-orange">One Youth At A Time</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Iteka Youth Organization is Rwanda's leading platform for youth empowerment,
                dedicated to discovering talents, developing skills, and promoting peace.
              </p>
            </div>
          </section>

          {/* Mission, Vision, Values - Cards avec fond vert */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                What Drives Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Mission */}
                <div className="bg-[#E8F5E9] p-8 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-iteka-dark" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-iteka-dark">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To empower young people in Rwanda through talent discovery, skills development, and
                    peace promotion, enabling them to become leaders and agents of positive change in their
                    communities.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-[#E8F5E9] p-8 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
                    <Eye className="w-6 h-6 text-iteka-dark" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-iteka-dark">Our Vision</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A Rwanda where every young person has the opportunity to discover their talents,
                    develop their skills, and contribute to building a peaceful, prosperous, and inclusive
                    society.
                  </p>
                </div>

                {/* Values */}
                <div className="bg-[#E8F5E9] p-8 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6">
                    <Heart className="w-6 h-6 text-iteka-dark" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-iteka-dark">Our Values</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Inclusivity, Excellence, Integrity, Innovation, and Peace. We believe in the power of
                    youth and are committed to creating an environment where every young person can thrive.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story - Grid avec image */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
                  {galleryImages[0]?.image?.data?.url ? (
                      <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[0].image.data.url}`}
                          alt="Our Story"
                          className="w-full h-full object-cover"
                      />
                  ) : (
                      <div className="w-full h-full bg-gradient-to-br from-iteka-orange to-iteka-dark"></div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">Our Story</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Iteka Youth Organization was founded with a simple but powerful belief: every young
                      person in Rwanda has untapped potential waiting to be discovered and developed.
                    </p>
                    <p>
                      We recognized that while Rwanda has an incredibly talented youth population, many young
                      people lack access to platforms and resources to discover their talents and develop
                      critical skills for the future. We also saw the need for initiatives that promote peace,
                      unity, and understanding among youth from diverse backgrounds.
                    </p>
                    <p>
                      Iteka was born out of this need. The word "Iteka" itself means "decree" or "law" in
                      Kinyarwanda, representing our commitment to making youth empowerment a priority and a
                      right for all young people in Rwanda.
                    </p>
                    <p>
                      Today, through our carefully designed programmes and partnerships, we continue to
                      discover new talent, build essential skills, and foster peace among the next generation
                      of Rwandan leaders.
                    </p>
                  </div>
                  <Link
                      href="/impact"
                      className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                  >
                    See Our Impact
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Stats - Fond vert clair */}
          {stats.length > 0 && (
              <section className="py-16 bg-[#E8F5E9]">
                <div className="max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                    Our Impact By The Numbers
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat: any) => (
                        <div key={stat.id}>
                          <div className="text-4xl md:text-5xl font-bold text-iteka-dark mb-2">
                            {stat?.value}
                          </div>
                          <p className="text-sm md:text-base text-gray-600">{stat?.label}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </section>
          )}

          {/* Core Pillars */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                Our Core Pillars
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                Everything we do is built on three foundational pillars that guide our work and impact
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white border-2 border-gray-200 p-8 rounded-lg hover:border-iteka-orange transition">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-6">
                    <Users className="w-6 h-6 text-iteka-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-iteka-dark mb-3">Talent Discovery</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Identifying unique abilities in arts, sports, technology, entrepreneurship, and leadership
                    through structured programmes and community engagement.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 p-8 rounded-lg hover:border-iteka-orange transition">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-6">
                    <Award className="w-6 h-6 text-iteka-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-iteka-dark mb-3">Skills Development</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Professional training, mentorship programmes, and hands-on learning experiences that
                    prepare youth for meaningful careers and entrepreneurship.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 p-8 rounded-lg hover:border-iteka-orange transition">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-6">
                    <Globe className="w-6 h-6 text-iteka-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-iteka-dark mb-3">Peace Promotion</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Community dialogue initiatives, conflict resolution training, and unity programmes that
                    foster understanding and collaboration among diverse youth.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership Team */}
          {leadership.length > 0 && (
              <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                    Meet Our Leadership
                  </h2>
                  <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Our dedicated team brings together expertise in youth development, education, and community building
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {leadership.map((member: any) => (
                        <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
                          {member?.photo?.data?.url && (
                              <div className="aspect-square overflow-hidden bg-gray-200">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.data.url}`}
                                    alt={member?.name}
                                    className="w-full h-full object-cover"
                                />
                              </div>
                          )}
                          <div className="p-6">
                            <h3 className="font-bold text-iteka-dark mb-1">{member?.name}</h3>
                            <p className="text-sm text-iteka-orange mb-3">{member?.role}</p>
                            {member?.bio && (
                                <p className="text-sm text-gray-600 line-clamp-3">
                                  {member.bio.replace(/<[^>]*>/g, '')}
                                </p>
                            )}
                          </div>
                        </div>
                    ))}
                  </div>

                  <div className="text-center mt-12">
                    <Link
                        href="/team"
                        className="inline-flex items-center gap-2 text-iteka-orange font-semibold hover:underline"
                    >
                      View Full Team
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* Photo Grid - Impact visuel */}
          {galleryImages.length > 0 && (
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                    Iteka In Action
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.slice(0, 8).map((img: any, idx: number) => (
                        <div
                            key={idx}
                            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                        >
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img?.image?.data?.url}`}
                              alt={img?.caption || 'Iteka in action'}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition"></div>
                        </div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 border-2 border-iteka-dark px-6 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                    >
                      View Full Gallery
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* CTA - Fond vert clair */}
          <section className="py-20 bg-[#E8F5E9]">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                Ready to Get Involved?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Whether as a participant, partner, or supporter, there are many ways to be part of our mission
                to empower Rwanda's youth.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/programmes"
                    className="bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition inline-flex items-center gap-2"
                >
                  Explore Programmes
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                    href="/contact"
                    className="border-2 border-iteka-dark text-iteka-dark px-8 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
  );
}
'use client';

import { useQuery } from '@tanstack/react-query';
import { Users, Linkedin } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchTeamMembers } from '@/src/lib/api';

export default function TeamPage() {
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ['team-members'],
    queryFn: fetchTeamMembers,
  });

  const leadership = teamMembers.filter((member: any) => member?.is_leadership);
  const team = teamMembers.filter((member: any) => !member?.is_leadership);

  return (
      <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-iteka-dark" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
              Meet Our Team
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to empowering Rwanda's youth and creating lasting change
            </p>
          </div>
        </section>

        {/* Leadership Team */}
        {leadership.length > 0 && (
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                  Leadership Team
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                  Our experienced leaders guide Iteka's vision and strategy
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {leadership.map((member: any) => (
                      <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
                        {member?.photo?.data?.url && (
                            <div className="aspect-square overflow-hidden bg-gray-200">
                              <img
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.data.url}`}
                                  alt={member?.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                            </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-iteka-dark mb-1">{member?.name}</h3>
                          <p className="text-sm text-iteka-orange font-semibold mb-3">{member?.role}</p>
                          {member?.bio && (
                              <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed mb-4">
                                {member.bio.replace(/<[^>]*>/g, '')}
                              </p>
                          )}
                          {member?.linkedin_url && (
                          <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-iteka-orange hover:underline text-sm font-semibold"
                            >
                            <Linkedin className="w-4 h-4" />
                            Connect on LinkedIn
                            </a>
                            )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>
        )}

        {/* Team Members */}
        {team.length > 0 && (
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                  Our Team
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {team.map((member: any) => (
                      <div key={member.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-iteka-orange hover:shadow-md transition group">
                        {member?.photo?.data?.url && (
                            <div className="aspect-square overflow-hidden bg-gray-200">
                              <img
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.data.url}`}
                                  alt={member?.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                            </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-bold text-iteka-dark mb-1">{member?.name}</h3>
                          <p className="text-sm text-gray-600">{member?.role}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>
        )}

        {/* Loading State */}
        {isLoading && (
            <section className="py-20 bg-white">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent"></div>
                <p className="text-gray-600 mt-4">Loading team...</p>
              </div>
            </section>
        )}

        {/* Empty State */}
        {!isLoading && teamMembers.length === 0 && (
            <section className="py-20 bg-white">
              <div className="text-center">
                <p className="text-gray-600 text-lg">No team members found.</p>
              </div>
            </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-[#E8F5E9]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
              Join Our Team
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join our mission
            </p>
            <a
              href="/contact"
              className="inline-block bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
            >
            Get In Touch
          </a>
        </div>
      </section>
      </main>

  <Footer />
</>
);
}
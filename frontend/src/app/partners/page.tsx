'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, Handshake, DollarSign, Lightbulb, Target, Mail } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchPartners } from '@/src/lib/api';

export default function PartnersPage() {
  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
  });

  const featured = partners.filter((p: any) => p.is_featured);
  const others = partners.filter((p: any) => !p.is_featured);

  const getLogoUrl = (logo: any) => {
    if (!logo) return null;
    const url = logo.url || logo.data?.url;
    if (!url) return null;
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };

  const partnershipTypes = [
    {
      title: 'Financial Partnerships',
      description: 'Organizations that provide funding to support our programmes and operations',
      icon: DollarSign,
    },
    {
      title: 'Technical Partnerships',
      description: 'Partners who contribute expertise, resources, and knowledge to enhance our programmes',
      icon: Lightbulb,
    },
    {
      title: 'Strategic Partnerships',
      description: 'Organizations we collaborate with to expand reach and create greater impact',
      icon: Target,
    },
  ];

  return (
      <>
        <Header />

        <main>
          {/* Hero Section - Simple */}
          <section className="bg-white py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-iteka-dark mb-6">
                Partnering For Impact.
                <br />
                <span className="text-iteka-orange">Together We Achieve More.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our work is strengthened through strategic partnerships with organizations committed
                to empowering Rwanda's youth and creating sustainable change.
              </p>
            </div>
          </section>

          {/* Partnership Philosophy */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                    <Handshake className="w-7 h-7 text-iteka-dark" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark">
                    Building a Powerful Ecosystem
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our partnerships with government agencies, NGOs, private sector companies, educational
                    institutions, and community organizations create a powerful ecosystem that enables us
                    to reach more young people and create sustainable impact.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Together, we leverage complementary strengths, share resources, and coordinate efforts
                    to maximize our collective impact on youth empowerment across Rwanda.
                  </p>
                </div>

                {/* Stats or Visual */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="text-4xl font-bold text-iteka-dark mb-2">
                      {partners.length}+
                    </div>
                    <p className="text-gray-600">Active Partners</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="text-4xl font-bold text-iteka-dark mb-2">12+</div>
                    <p className="text-gray-600">Districts Reached</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="text-4xl font-bold text-iteka-dark mb-2">2.5K+</div>
                    <p className="text-gray-600">Youth Impacted</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <div className="text-4xl font-bold text-iteka-dark mb-2">5+</div>
                    <p className="text-gray-600">Years Collaborating</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Partners */}
          {featured.length > 0 && (
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                    Strategic Partners
                  </h2>
                  <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Long-term collaborators driving transformative change with us
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((partner: any) => {
                      const logoUrl = getLogoUrl(partner.logo);
                      return (
                          <div
                              key={partner.id}
                              className="bg-white border-2 border-gray-200 p-8 rounded-lg hover:border-iteka-orange hover:shadow-lg transition group"
                          >
                            {logoUrl && (
                                <div className="mb-6 h-24 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-white transition">
                                  <img
                                      src={logoUrl}
                                      alt={partner.name}
                                      className="max-h-20 max-w-full object-contain"
                                  />
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-iteka-dark mb-2">
                              {partner.name}
                            </h3>
                            <p className="text-sm text-iteka-orange font-semibold mb-3">
                              {partner.partnership_type}
                            </p>
                            {partner.description && (
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                  {partner.description}
                                </p>
                            )}
                            {partner.website && (
                                <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-iteka-orange hover:underline text-sm font-semibold"
                                >
                                  Visit Website
                                  <ArrowRight className="w-3 h-3" />
                                </a>
                            )}
                          </div>
                      );
                    })}
                  </div>
                </div>
              </section>
          )}

          {/* All Partners - Logo Grid */}
          {others.length > 0 && (
              <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                    Our Partner Network
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {others.map((partner: any) => {
                      const logoUrl = getLogoUrl(partner.logo);
                      return (
                          <div
                              key={partner.id}
                              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg hover:shadow-md transition group"
                          >
                            {logoUrl && (
                                <img
                                    src={logoUrl}
                                    alt={partner.name}
                                    className="max-h-16 max-w-full object-contain mb-3 group-hover:scale-110 transition"
                                />
                            )}
                            <p className="text-xs text-gray-600 text-center group-hover:text-iteka-orange transition font-semibold">
                              {partner.name}
                            </p>
                          </div>
                      );
                    })}
                  </div>
                </div>
              </section>
          )}

          {/* Loading State */}
          {isLoading && (
              <section className="py-20 bg-white">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-iteka-orange border-t-transparent"></div>
                  <p className="text-gray-600 mt-4">Loading partners...</p>
                </div>
              </section>
          )}

          {/* Empty State */}
          {!isLoading && partners.length === 0 && (
              <section className="py-20 bg-white">
                <div className="text-center">
                  <p className="text-gray-600 text-lg">No partners available at the moment.</p>
                </div>
              </section>
          )}

          {/* Partnership Types */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4 text-center">
                Types of Partnerships
              </h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                We collaborate with partners in various ways to maximize impact
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {partnershipTypes.map((type, idx) => {
                  const Icon = type.icon;
                  return (
                      <div key={idx} className="bg-[#E8F5E9] p-8 rounded-lg text-center hover:shadow-lg transition group">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 group-hover:bg-iteka-orange transition">
                          <Icon className="w-8 h-8 text-iteka-dark group-hover:text-white transition" />
                        </div>
                        <h3 className="text-xl font-bold text-iteka-dark mb-3">{type.title}</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Partnership Benefits */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-12 text-center">
                Why Partner With Us
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-bold text-iteka-dark mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-iteka-orange"></div>
                    Proven Track Record
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Over 2,500 youth empowered across Rwanda through evidence-based programmes
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-bold text-iteka-dark mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-iteka-orange"></div>
                    Local Expertise
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Deep understanding of Rwanda's youth landscape and community needs
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-bold text-iteka-dark mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-iteka-orange"></div>
                    Measurable Impact
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Rigorous monitoring and evaluation to demonstrate tangible results
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <h3 className="font-bold text-iteka-dark mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-iteka-orange"></div>
                    Strong Network
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Extensive connections across government, civil society, and private sector
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Become a Partner - CTA */}
          <section className="py-20 bg-[#E8F5E9]">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-iteka-dark" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-iteka-dark mb-4">
                Become a Partner
              </h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                We welcome partnerships with organizations committed to youth empowerment.
                Let's work together to create lasting impact across Rwanda.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                    href="mailto:hello@itekarwanda.org?subject=Partnership Inquiry"
                    className="inline-flex items-center gap-2 bg-iteka-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                    href="/contact"
                    className="border-2 border-iteka-dark text-iteka-dark px-8 py-3 rounded-md font-semibold hover:bg-iteka-dark hover:text-white transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
  );
}
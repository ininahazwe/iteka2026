// app/partners/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchPartners } from '@/src/lib/api';

export default function PartnersPage() {
  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
  });

  // Strapi v5 : on accède directement à .is_featured
  const featured = partners.filter((p: any) => p.is_featured);
  const others = partners.filter((p: any) => !p.is_featured);
  // Fonction helper pour obtenir l'URL du logo
  const getLogoUrl = (logo: any) => {
    if (!logo) return null;

    // Strapi v5 : l'URL est directement dans l'objet media
    const url = logo.url;

    if (!url) return null;
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };

  return (
      <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-r from-iteka-green to-iteka-cyan flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Our Partners</h1>
            <p className="text-xl opacity-90">Working together to empower Rwanda's youth</p>
          </div>
        </section>

        {/* About Partnerships */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6 text-center">Partnerships for Impact</h2>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Our work is strengthened through strategic partnerships with government agencies, NGOs,
              private sector companies, educational institutions, and community organizations. Together,
              we create a powerful ecosystem that enables us to reach more young people and create
              sustainable impact.
            </p>
          </div>
        </section>

        {/* Featured Partners */}
        {featured.length > 0 && (
            <section className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Strategic Partners</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featured.map((partner: any) => {
                    // Strapi v5 : on passe directement partner.logo
                    const logoUrl = getLogoUrl(partner.logo);

                    return (
                        <div key={partner.id} className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition">
                          {logoUrl && (
                              <div className="mb-6 h-24 flex items-center justify-center bg-gray-50 rounded">
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
                              <a href={partner.website}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-iteka-orange hover:underline text-sm font-semibold"
                              >
                                Visit Website →
                              </a>
                          )}
                        </div>
                    );
                  })}
                </div>
              </div>
            </section>
        )}

        {/* All Partners */}
        {others.length > 0 && (
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {others.map((partner: any) => {
                    const logoUrl = getLogoUrl(partner.logo);

                    return (
                        <div key={partner.id} className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition group">
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

        {isLoading && (
            <section className="py-20 bg-white text-center">
              <p className="text-gray-600">Loading partners...</p>
            </section>
        )}

        {!isLoading && partners.length === 0 && (
            <section className="py-20 bg-white text-center">
              <p className="text-gray-600">No partners found</p>
            </section>
        )}

        {/* Partnership Types */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Types of Partnerships</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold mb-2">Financial Partnerships</h3>
                <p className="text-gray-600">
                  Organizations that provide funding to support our programmes and operations
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold mb-2">Technical Partnerships</h3>
                <p className="text-gray-600">
                  Partners who contribute expertise, resources, and knowledge to enhance our programmes
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">Strategic Partnerships</h3>
                <p className="text-gray-600">
                  Organizations we collaborate with to expand reach and create greater impact
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Become a Partner */}
        <section className="py-20 bg-iteka-orange text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Become a Partner</h2>
            <p className="text-xl mb-8 opacity-90">
              We welcome partnerships with organizations committed to youth empowerment. Let's work
              together to create lasting impact.
            </p>

            <a href="mailto:hello@itekarwanda.org?subject=Partnership Inquiry"
              className="inline-block bg-white text-iteka-orange px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
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
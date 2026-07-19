'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, Handshake, DollarSign, Lightbulb, Target, Mail } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchPartners } from '@/src/lib/api';
import styles from './Partners.module.css';
import shared from '@/src/styles/shared.module.css';

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
          {/* Hero */}
          <section className={shared.pageHero}>
            <div className={shared.pageHeroInner}>
              <h1 className={shared.pageHeroTitle}>
                Partnering For Impact.
                <br />
                <span className={shared.accent}>Together We Achieve More.</span>
              </h1>
              <p className={shared.pageHeroText}>
                Our work is strengthened through strategic partnerships with organizations committed
                to empowering Rwanda's youth and creating sustainable change.
              </p>
            </div>
          </section>

          {/* Partnership Philosophy */}
          <section className={styles.philosophySection}>
            <div className={shared.container}>
              <div className={styles.philosophyGrid}>
                <div className={styles.philosophyCopy}>
                  <div className={shared.iconCircle} style={{ marginBottom: 0 }}>
                    <Handshake size={24} />
                  </div>
                  <h2 className={styles.philosophyTitle}>Building a Powerful Ecosystem</h2>
                  <p className={styles.philosophyText}>
                    Our partnerships with government agencies, NGOs, private sector companies, educational
                    institutions, and community organizations create a powerful ecosystem that enables us
                    to reach more young people and create sustainable impact.
                  </p>
                  <p className={styles.philosophyText}>
                    Together, we leverage complementary strengths, share resources, and coordinate efforts
                    to maximize our collective impact on youth empowerment across Rwanda.
                  </p>
                </div>

                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statCardValue}>{partners.length}+</div>
                    <p className={styles.statCardLabel}>Active Partners</p>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statCardValue}>12+</div>
                    <p className={styles.statCardLabel}>Districts Reached</p>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statCardValue}>2.5K+</div>
                    <p className={styles.statCardLabel}>Youth Impacted</p>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statCardValue}>5+</div>
                    <p className={styles.statCardLabel}>Years Collaborating</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Partners */}
          {featured.length > 0 && (
              <section className={styles.featuredSection}>
                <div className={shared.container}>
                  <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 16 }}>Strategic Partners</h2>
                  <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                    Long-term collaborators driving transformative change with us
                  </p>

                  <div className={styles.featuredGrid}>
                    {featured.map((partner: any) => {
                      const logoUrl = getLogoUrl(partner.logo);
                      return (
                          <div key={partner.id} className={`${shared.borderCard} ${styles.featuredCard}`}>
                            {logoUrl && (
                                <div className={styles.featuredLogoWrap}>
                                  <img src={logoUrl} alt={partner.name} />
                                </div>
                            )}
                            <h3 className={styles.featuredName}>{partner.name}</h3>
                            <p className={styles.featuredType}>{partner.partnership_type}</p>
                            {partner.description && (
                                <p className={styles.featuredDescription}>{partner.description}</p>
                            )}
                            {partner.website && (
                                <a
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.featuredLink}
                                >
                                  Visit Website
                                  <ArrowRight size={14} />
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
              <section className={styles.logoGridSection}>
                <div className={shared.container}>
                  <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>Our Partner Network</h2>

                  <div className={styles.logoGrid}>
                    {others.map((partner: any) => {
                      const logoUrl = getLogoUrl(partner.logo);
                      return (
                          <div key={partner.id} className={styles.logoCard}>
                            {logoUrl && <img src={logoUrl} alt={partner.name} />}
                            <p className={styles.logoCardName}>{partner.name}</p>
                          </div>
                      );
                    })}
                  </div>
                </div>
              </section>
          )}

          {/* Loading State */}
          {isLoading && (
              <div className={shared.loadingWrap}>
                <div className={shared.spinner}></div>
                <p className={shared.loadingText}>Loading partners...</p>
              </div>
          )}

          {/* Empty State */}
          {!isLoading && partners.length === 0 && (
              <div className={styles.emptyWrap}>
                <p className={styles.emptyText}>No partners available at the moment.</p>
              </div>
          )}

          {/* Partnership Types */}
          <section className={styles.typesSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 16 }}>Types of Partnerships</h2>
              <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                We collaborate with partners in various ways to maximize impact
              </p>

              <div className={styles.typesGrid}>
                {partnershipTypes.map((type, idx) => {
                  const Icon = type.icon;
                  return (
                      <div key={idx} className={styles.typeCard}>
                        <div className={styles.typeIconCircle}>
                          <Icon size={28} />
                        </div>
                        <h3 className={styles.typeTitle}>{type.title}</h3>
                        <p className={styles.typeText}>{type.description}</p>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Partnership Benefits */}
          <section className={styles.whySection}>
            <div className={styles.whyInner}>
              <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>Why Partner With Us</h2>

              <div className={styles.whyGrid}>
                <div className={styles.whyCard}>
                  <h3 className={styles.whyCardTitle}>
                    <span className={styles.whyDot}></span>
                    Proven Track Record
                  </h3>
                  <p className={styles.whyCardText}>
                    Over 2,500 youth empowered across Rwanda through evidence-based programmes
                  </p>
                </div>

                <div className={styles.whyCard}>
                  <h3 className={styles.whyCardTitle}>
                    <span className={styles.whyDot}></span>
                    Local Expertise
                  </h3>
                  <p className={styles.whyCardText}>
                    Deep understanding of Rwanda's youth landscape and community needs
                  </p>
                </div>

                <div className={styles.whyCard}>
                  <h3 className={styles.whyCardTitle}>
                    <span className={styles.whyDot}></span>
                    Measurable Impact
                  </h3>
                  <p className={styles.whyCardText}>
                    Rigorous monitoring and evaluation to demonstrate tangible results
                  </p>
                </div>

                <div className={styles.whyCard}>
                  <h3 className={styles.whyCardTitle}>
                    <span className={styles.whyDot}></span>
                    Strong Network
                  </h3>
                  <p className={styles.whyCardText}>
                    Extensive connections across government, civil society, and private sector
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Become a Partner - CTA */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaInner}>
              <div className={styles.ctaIconCircle}>
                <Mail size={28} />
              </div>
              <h2 className={styles.ctaTitle}>Become a Partner</h2>
              <p className={styles.ctaText}>
                We welcome partnerships with organizations committed to youth empowerment.
                Let's work together to create lasting impact across Rwanda.
              </p>
              <div className={styles.ctaButtons}>
                <a href="mailto:hello@itekarwanda.org?subject=Partnership Inquiry" className={shared.btnPrimary}>
                  Get In Touch
                  <ArrowRight size={16} />
                </a>
                <Link href="/contact" className={shared.btnOutline}>
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

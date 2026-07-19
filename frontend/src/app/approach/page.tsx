'use client';

import { useQuery } from '@tanstack/react-query';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Link from 'next/link';
import { ArrowRight, Search, BookOpen, Heart, Users, Globe, CheckCircle } from 'lucide-react';
import { fetchGalleryImages } from '@/src/lib/api';
import styles from './Approach.module.css';
import shared from '@/src/styles/shared.module.css';

export default function ApproachPage() {
  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryImages,
  });

  const approaches = [
    {
      number: '01',
      title: 'Talent Discovery',
      description:
          'We employ structured, community-embedded approaches to identify exceptional ability in arts, sports, technology, entrepreneurship, and leadership among young people who are too often overlooked. Our talent discovery frameworks are designed to surface potential early and create clear pathways from identification to opportunity.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Skills Development',
      description:
          'We deliver professional training, mentorship, and hands-on learning experiences that translate raw talent into marketable, sustainable skills. Our programmes are designed in alignment with labour market needs, equipping youth with both technical competencies and transferable capabilities for careers and entrepreneurship.',
      icon: BookOpen,
    },
    {
      number: '03',
      title: 'Social Cohesion & Peace',
      description:
          'We create structured intercultural platforms that bring together young people from refugee and host communities to collaborate, dialogue, and build shared futures. Our peacebuilding approach is grounded in the arts and culture as tools for reconciliation, inclusion, and long-term community resilience.',
      icon: Heart,
    },
    {
      number: '04',
      title: 'Community Impact',
      description:
          'We encourage youth to apply their talents and skills to address local challenges and contribute positively to their communities.',
      icon: Globe,
    },
  ];

  const principles = [
    { title: 'Youth-Centered', description: 'Everything we do is designed with young people at the center' },
    { title: 'Inclusive', description: 'We welcome all youth regardless of background, gender, or ability' },
    { title: 'Evidence-Based', description: 'Our programmes are grounded in research and data' },
    { title: 'Sustainable', description: 'We build long-term partnerships and capacity' },
    { title: 'Locally-Led', description: 'We work with and through local communities' },
    { title: 'Impact-Focused', description: 'We measure and optimize for tangible community transformation' },
  ];

  const methodology = [
    {
      step: '1',
      title: 'Assessment & Identification',
      description: 'We conduct comprehensive assessments to understand each young person\'s strengths, interests, and potential challenges.',
    },
    {
      step: '2',
      title: 'Personalised Programmes',
      description: 'Based on these assessments, we design personalised learning paths that match individual needs and goals.',
    },
    {
      step: '3',
      title: 'Mentorship & Support',
      description: 'Each participant is paired with mentors and support networks to guide them through their journey.',
    },
    {
      step: '4',
      title: 'Application & Impact',
      description: 'We facilitate opportunities for youth to apply what they\'ve learned and make a tangible difference in their communities.',
    },
    {
      step: '5',
      title: 'Continuous Evaluation',
      description: 'We continuously monitor, evaluate, and refine our programmes based on feedback and evidence of impact.',
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
                Evidence-Based Empowerment.
                <br />
                <span className={shared.accent}>Lasting Impact.</span>
              </h1>
              <p className={shared.pageHeroText}>
                Our approach combines proven methodologies with local insights to create sustainable
                pathways for youth development across Rwanda.
              </p>
            </div>
          </section>

          {/* Our Four Pillars */}
          <section className={styles.pillarsSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter}>Our Four Pillars</h2>
              <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                Everything we do is built on these four interconnected pillars that work together to
                transform young lives.
              </p>

              <div className={styles.fourPillarsGrid}>
                {approaches.map((approach) => {
                  const Icon = approach.icon;
                  return (
                      <div key={approach.number} className={styles.fourPillarCard}>
                        <div className={`${shared.iconCircle} ${styles.iconCircleFixed}`} style={{ marginBottom: 0 }}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <div className={styles.pillarNumber}>{approach.number}</div>
                          <h3 className={styles.pillarCardTitle}>{approach.title}</h3>
                          <p className={styles.pillarCardText}>{approach.description}</p>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* A Holistic Framework */}
          <section className={styles.frameworkSection}>
            <div className={shared.container}>
              <div className={styles.frameworkGrid}>
                <div className={shared.mediaGrid}>
                  <div className={shared.mediaTile}>
                    {galleryImages[7]?.image?.data?.url && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[7].image.data.url}`}
                            alt="Our Approach"
                        />
                    )}
                  </div>
                  <div className={`${shared.mediaTile} ${shared.mediaTileOffset}`}>
                    {galleryImages[8]?.image?.data?.url && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[8].image.data.url}`}
                            alt="Our Approach"
                        />
                    )}
                  </div>
                </div>

                <div className={styles.frameworkCopy}>
                  <h2 className={styles.frameworkHeading}>A Holistic Framework</h2>
                  <p className={styles.frameworkText}>
                    Our approach is rooted in the belief that young people are not problems to be solved,
                    but assets to be developed. When given the right opportunities, support, and platform,
                    young people can and will transform their communities.
                  </p>
                  <p className={styles.frameworkText}>
                    We combine rigorous assessment, personalized programming, continuous mentorship, and
                    real-world application to ensure sustainable impact. Every programme is designed to be
                    youth-centered, inclusive, and evidence-based.
                  </p>
                  <Link href="/programmes" className={shared.btnPrimary}>
                    See Our Programmes
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Core Principles */}
          <section className={styles.principlesSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>
                Our Core Principles
              </h2>

              <div className={styles.principlesGrid}>
                {principles.map((principle, idx) => (
                    <div key={idx} className={shared.borderCard}>
                      <div className={styles.principleRow}>
                        <div className={styles.principleIcon}>
                          <CheckCircle size={18} />
                        </div>
                        <div>
                          <h3 className={styles.principleTitle}>{principle.title}</h3>
                          <p className={styles.principleText}>{principle.description}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Methodology */}
          <section className={styles.methodologySection}>
            <div className={styles.methodologyInner}>
              <h2 className={shared.sectionTitleCenter}>Our Methodology</h2>
              <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                A proven 5-step process that transforms potential into impact
              </p>

              <div className={styles.methodologyList}>
                {methodology.map((item, idx) => (
                    <div key={idx} className={styles.methodologyItem}>
                      <div className={styles.methodologyStep}>{item.step}</div>
                      <div className={styles.methodologyBody}>
                        <h3 className={styles.methodologyTitle}>{item.title}</h3>
                        <p className={styles.methodologyText}>{item.description}</p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partnerships */}
          <section className={styles.partnershipsSection}>
            <div className={styles.partnershipsInner}>
              <div className={shared.iconCircle} style={{ margin: '0 auto' }}>
                <Users size={28} />
              </div>
              <h2 className={styles.partnershipsTitle}>Partnership-Driven Approach</h2>
              <p className={styles.partnershipsText}>
                We believe in the power of collaboration. Our approach is strengthened through
                partnerships with government, NGOs, private sector, educational institutions, and
                community organizations.
              </p>
              <p className={styles.partnershipsText}>
                Together, we create an ecosystem where young people can discover their talents, develop
                critical skills, and become agents of positive change in their communities and beyond.
              </p>
              <div className={shared.centerBlock}>
                <Link href="/partners" className={shared.btnOutline}>
                  Meet Our Partners
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* Results Focus */}
          <section className={styles.resultsSection}>
            <div className={shared.container}>
              <div className={styles.resultsGrid}>
                <div className={styles.resultsCopy}>
                  <h2 className={styles.resultsHeading}>Measured For Impact</h2>
                  <p className={styles.resultsText}>
                    Every programme we run is designed with clear, measurable outcomes. We track
                    participant progress, skill development, and community impact to ensure our approach
                    delivers real results.
                  </p>
                  <ul className={shared.bulletList}>
                    <li className={shared.bulletItem}>
                      <div className={shared.bulletDot}></div>
                      <span className={shared.bulletText}>
                        <strong>Quarterly assessments</strong> to track individual growth and programme effectiveness
                      </span>
                    </li>
                    <li className={shared.bulletItem}>
                      <div className={shared.bulletDot}></div>
                      <span className={shared.bulletText}>
                        <strong>Community feedback loops</strong> to ensure relevance and local ownership
                      </span>
                    </li>
                    <li className={shared.bulletItem}>
                      <div className={shared.bulletDot}></div>
                      <span className={shared.bulletText}>
                        <strong>Long-term tracking</strong> of participant outcomes and community transformation
                      </span>
                    </li>
                  </ul>
                  <Link href="/impact" className={shared.btnPrimary}>
                    See Our Impact
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className={shared.mediaGrid}>
                  <div className={shared.mediaTile}>
                    {galleryImages[9]?.image?.data?.url && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[9].image.data.url}`}
                            alt="Impact"
                        />
                    )}
                  </div>
                  <div className={`${shared.mediaTile} ${shared.mediaTileOffset}`}>
                    {galleryImages[10]?.image?.data?.url && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[10].image.data.url}`}
                            alt="Impact"
                        />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.ctaSection}>
            <div className={shared.container}>
              <div className={shared.bandBox}>
                <h2 className={shared.bandTitle}>Experience Our Approach</h2>
                <p className={shared.bandText}>
                  Learn more about how our evidence-based methodology creates lasting change in
                  communities
                </p>
                <div className={styles.ctaButtons}>
                  <Link href="/programmes" className={shared.btnPrimary}>
                    Explore Programmes
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact" className={shared.btnOutline}>
                    Partner With Us
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
  );
}

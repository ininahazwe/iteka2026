'use client';

import { useQuery } from '@tanstack/react-query';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Users, Award, Globe } from 'lucide-react';
import { fetchTeamMembers, fetchImpactStats, fetchGalleryImages } from '@/src/lib/api';
import styles from './About.module.css';
import shared from '@/src/styles/shared.module.css';

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

  const accentColors = ['#E87722', '#00A3A3', '#E91E63', '#3F7A4F'];

  return (
      <>
        <Header />

        <main>
          {/* Hero */}
          <section className={shared.pageHero}>
            <div className={shared.pageHeroInner}>
              <h1 className={shared.pageHeroTitle}>
                Building A Better Future
                <br />
                <span className={shared.accent}>One Youth At A Time</span>
              </h1>
              <p className={shared.pageHeroText}>
                Founded on the conviction that every young person possesses unique potential,
                Iteka Youth Organisation is dedicated to empowering the next generation across Rwanda.
              </p>
            </div>
          </section>

          {/* Mission, Vision, Values */}
          <section className={styles.mvvSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>
                What Drives Us
              </h2>
              <div className={styles.mvvGrid}>
                <div className={shared.tintCard}>
                  <div className={shared.iconCircle}>
                    <Target size={24} />
                  </div>
                  <h3 className={styles.mvvCardTitle}>Our Mission</h3>
                  <p className={styles.mvvCardText}>
                    To empower young people through transformative learning, creativity, and
                    values-driven programmes that inspire leadership, resilience, and service to
                    communities for social impact.
                  </p>
                </div>

                <div className={shared.tintCard}>
                  <div className={shared.iconCircle}>
                    <Eye size={24} />
                  </div>
                  <h3 className={styles.mvvCardTitle}>Our Vision</h3>
                  <p className={styles.mvvCardText}>
                    A community of confident, innovative, capable, and compassionate young people
                    actively contributing to a thriving, just, peaceful, and inclusive society.
                  </p>
                </div>

                <div className={shared.tintCard}>
                  <div className={shared.iconCircle}>
                    <Heart size={24} />
                  </div>
                  <h3 className={styles.mvvCardTitle}>Our Values</h3>
                  <p className={styles.mvvCardText}>
                    Humanity, Integrity, Unity, Diversity, Determination, Dignity, Honour, and Impact.
                    We uphold these values to foster togetherness and honesty and to deliver
                    high-quality work and make a positive difference in our society.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className={styles.storySection}>
            <div className={shared.container}>
              <div className={styles.storyGrid}>
                <div className={styles.storyImage}>
                  {galleryImages[0]?.image?.data?.url && (
                      <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[0].image.data.url}`}
                          alt="Our Story"
                      />
                  )}
                </div>

                <div className={styles.storyCopy}>
                  <h2 className={styles.storyHeading}>Our Story</h2>
                  <p className={styles.storyText}>
                    Founded on the conviction that every young person possesses unique potential, Iteka
                    Youth Organisation is dedicated to empowering the next generation across Rwanda.
                  </p>
                  <p className={styles.storyText}>
                    We deliver diverse, evidence-based initiatives spanning education, socio-economic
                    development and the arts.
                  </p>
                  <p className={styles.storyText}>
                    By intentionally identifying, nurturing, and amplifying youth talent, we cultivate a
                    resilient generation capable of driving positive social change and fostering
                    sustainable peace in their communities.
                  </p>
                  <Link href="/impact" className={shared.btnPrimary}>
                    See Our Impact
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          {stats.length > 0 && (
              <section className={styles.mvvSection}>
                <div className={shared.container}>
                  <div className={shared.bandBox}>
                    <h2 className={shared.bandTitle}>Our Impact By The Numbers</h2>
                    <div className={shared.bandStatsGrid}>
                      {stats.map((stat: any, idx: number) => (
                          <div key={stat.id}>
                            <div className={shared.statValue} style={{ color: accentColors[idx % accentColors.length] }}>
                              {stat?.value}
                            </div>
                            <p className={shared.statLabel}>{stat?.label}</p>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
          )}

          {/* Core Pillars */}
          <section className={styles.pillarsSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter}>Our Core Pillars</h2>
              <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                Everything we do is built on three foundational pillars that guide our work and impact
              </p>

              <div className={styles.pillarsGrid}>
                <div className={styles.pillarCard}>
                  <div className={shared.iconCircle} style={{ background: 'color-mix(in srgb, var(--iteka-green) 12%, white)' }}>
                    <Users size={24} />
                  </div>
                  <h3 className={styles.pillarTitle}>Talent Discovery</h3>
                  <p className={styles.pillarText}>
                    We employ structured, community-embedded approaches to identify exceptional ability
                    in arts, sports, technology, entrepreneurship, and leadership among young people who
                    are too often overlooked. Our frameworks surface potential early and create clear
                    pathways from identification to opportunity.
                  </p>
                </div>

                <div className={styles.pillarCard}>
                  <div className={shared.iconCircle} style={{ background: 'color-mix(in srgb, var(--iteka-green) 12%, white)' }}>
                    <Award size={24} />
                  </div>
                  <h3 className={styles.pillarTitle}>Skills Development</h3>
                  <p className={styles.pillarText}>
                    We deliver professional training, mentorship, and hands-on learning experiences that
                    translate raw talent into marketable, sustainable skills, aligned with labour market
                    needs for careers and entrepreneurship.
                  </p>
                </div>

                <div className={styles.pillarCard}>
                  <div className={shared.iconCircle} style={{ background: 'color-mix(in srgb, var(--iteka-green) 12%, white)' }}>
                    <Globe size={24} />
                  </div>
                  <h3 className={styles.pillarTitle}>Social Cohesion &amp; Peace</h3>
                  <p className={styles.pillarText}>
                    We create structured intercultural platforms that bring together young people from
                    refugee and host communities to collaborate, dialogue, and build shared futures —
                    grounded in the arts and culture as tools for reconciliation and inclusion.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership Team */}
          {leadership.length > 0 && (
              <section className={styles.leadershipSection}>
                <div className={shared.container}>
                  <h2 className={shared.sectionTitleCenter}>Meet Our Leadership</h2>
                  <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                    Our dedicated team brings together expertise in youth development, education, and
                    community building
                  </p>

                  <div className={styles.leadershipGrid}>
                    {leadership.map((member: any) => (
                        <div key={member.id} className={styles.leadershipCard}>
                          {member?.photo?.data?.url && (
                              <div className={styles.leadershipPhoto}>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.photo.data.url}`}
                                    alt={member?.name}
                                />
                              </div>
                          )}
                          <div className={styles.leadershipBody}>
                            <h3 className={styles.leadershipName}>{member?.name}</h3>
                            <p className={styles.leadershipRole}>{member?.role}</p>
                            {member?.bio && (
                                <p className={styles.leadershipBio}>{member.bio.replace(/<[^>]*>/g, '')}</p>
                            )}
                          </div>
                        </div>
                    ))}
                  </div>

                  <div className={shared.centerBlock}>
                    <Link href="/team" className={shared.btnPrimary}>
                      View Full Team
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* Photo Grid */}
          {galleryImages.length > 0 && (
              <section className={styles.gallerySection}>
                <div className={shared.container}>
                  <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>
                    Iteka In Action
                  </h2>

                  <div className={shared.photoGrid}>
                    {galleryImages.slice(0, 8).map((img: any, idx: number) => (
                        <div key={idx} className={shared.photoItem}>
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img?.image?.data?.url}`}
                              alt={img?.caption || 'Iteka in action'}
                          />
                          <div className={shared.photoOverlay}></div>
                        </div>
                    ))}
                  </div>

                  <div className={shared.centerBlock}>
                    <Link href="/gallery" className={shared.btnOutline}>
                      View Full Gallery
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* CTA */}
          <section className={styles.ctaSection}>
            <div className={shared.container}>
              <div className={shared.bandBox}>
                <h2 className={shared.bandTitle}>Ready to Get Involved?</h2>
                <p className={shared.bandText}>
                  Whether as a participant, partner, or supporter, there are many ways to be part of our
                  mission to empower Rwanda's youth.
                </p>
                <div className={styles.ctaButtons}>
                  <Link href="/programmes" className={shared.btnPrimary}>
                    Explore Programmes
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact" className={shared.btnOutline}>
                    Get In Touch
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

'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Award, Globe, Heart, Target, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchImpactStats, fetchTestimonials, fetchGalleryImages } from '@/src/lib/api';
import styles from './Impact.module.css';
import shared from '@/src/styles/shared.module.css';

export default function ImpactPage() {
  const { data: stats = [], isLoading: statsLoading } = useQuery({
    queryKey: ['impact-stats'],
    queryFn: fetchImpactStats,
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryImages,
  });

  const accentColors = ['#E87722', '#00A3A3', '#E91E63', '#3F7A4F'];

  const impactAreas = [
    { title: 'Youth Employment', description: 'We equip young people with job-ready skills and connect them to employment opportunities with leading organizations.', icon: Briefcase },
    { title: 'Entrepreneurship', description: 'Through our business training and mentorship, we help youth start and grow their own ventures.', icon: Lightbulb },
    { title: 'Education', description: 'We provide scholarships, tutoring, and mentoring to help young people succeed academically.', icon: GraduationCap },
    { title: 'Peace & Unity', description: 'Our intercultural programmes build bridges between youth and promote reconciliation and unity.', icon: Heart },
    { title: 'Leadership', description: 'We develop future leaders through specialized training and community leadership opportunities.', icon: Award },
    { title: 'Community Development', description: 'Young people apply their skills to address local challenges and drive positive community change.', icon: Globe },
  ];

  return (
      <>
        <Header />

        <main>
          {/* Hero */}
          <section className={shared.pageHero}>
            <div className={shared.pageHeroInner}>
              <h1 className={shared.pageHeroTitle}>
                Creating Lasting Impact.
                <br />
                <span className={shared.accent}>Transforming Communities.</span>
              </h1>
              <p className={styles.heroQuote}>
                &ldquo;Behind every statistic is a story of transformation. By investing in youth, we are
                building a resilient foundation for the entire community.&rdquo;
              </p>
              <p className={styles.heroText}>
                Through our targeted interventions, we have seen young creatives launch sustainable
                enterprises, athletes become community leaders, and young people lead essential dialogues
                that bridge divides. We do not just track numbers; we measure lasting change.
              </p>
            </div>
          </section>

          {/* Impact Statistics */}
          <section className={styles.statsSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter}>Our Impact By The Numbers</h2>
              <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                Measurable results that demonstrate our commitment to youth empowerment
              </p>

              {statsLoading ? (
                  <div className={shared.loadingWrap}>
                    <div className={shared.spinner}></div>
                    <p className={shared.loadingText}>Loading impact data...</p>
                  </div>
              ) : stats.length > 0 ? (
                  <div className={styles.statsGridWhite}>
                    {stats.map((stat: any, idx: number) => (
                        <div key={stat.id} className={styles.statCard}>
                          <div className={styles.statCardValue} style={{ color: accentColors[idx % accentColors.length] }}>
                            {stat.value}
                          </div>
                          <p className={styles.statCardLabel}>{stat.label}</p>
                          {stat.description && <p className={styles.statCardDesc}>{stat.description}</p>}
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className={styles.emptyText}>No impact statistics available</div>
              )}
            </div>
          </section>

          {/* Art for Youth Resilience */}
          <section className={styles.artSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 32 }}>
                The Power of Creative Expression in Healing and Resilience
              </h2>
              <div className={styles.proseText}>
                <p>
                  For young people displaced by conflict or facing systemic barriers across the Great
                  Lakes region, art is far more than a form of creative expression&mdash;it is a vital
                  lifeline. The Art for Youth Resilience and Livelihood Programme was established to
                  provide a sanctuary where vulnerable youth and displaced persons can heal from trauma,
                  rebuild social connections, and reclaim their agency.
                </p>
                <p>
                  By bridging the gap between raw creative talent and sustainable economic independence,
                  we empower participants to transform their artistic passions into viable livelihoods.
                  Through this intersection of psychosocial support, cultural preservation, and
                  entrepreneurship, Iteka is fostering a new generation of resilient changemakers who are
                  actively weaving a fabric of peace and unity across borders.
                </p>
                <p>
                  Through this targeted initiative, we have directly engaged 93 participants across
                  Burundi, the Democratic Republic of the Congo (DRC), and Rwanda, creating a vibrant
                  cross-border community rooted in healing, expression, and economic opportunity.
                </p>
              </div>

              <div className={styles.glanceGrid}>
                <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                  <div className={styles.glanceValue}>93</div>
                  <p className={styles.glanceLabel}>Direct Participants</p>
                  <p className={styles.glanceSub}>50 Female | 43 Male</p>
                </div>
                <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                  <div className={styles.glanceValue}>75%</div>
                  <p className={styles.glanceLabel}>Refugee Status</p>
                  <p className={styles.glanceSub}>Supporting displaced youth</p>
                </div>
                <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                  <div className={styles.glanceValue}>98%</div>
                  <p className={styles.glanceLabel}>Youth-Led Impact</p>
                  <p className={styles.glanceSub}>Aged between 20 and 35</p>
                </div>
              </div>

              <div className={styles.disciplinesInner}>
                <h3 className={styles.disciplinesTitle}>Creative Disciplines and Livelihoods</h3>
                <p className={styles.disciplinesText}>
                  To ensure diverse pathways to resilience and economic independence, participants were
                  engaged and upskilled across 11 distinct art forms:
                </p>
                <div className={styles.disciplinesGrid}>
                  <div className={shared.borderCard}>
                    <h4 className={styles.disciplineTitle}>Performing Arts</h4>
                    <p className={styles.disciplineText}>Dance &amp; Choreography, Music &amp; Drumming, Singing, Theatre and Comic Acting</p>
                  </div>
                  <div className={shared.borderCard}>
                    <h4 className={styles.disciplineTitle}>Literary Arts</h4>
                    <p className={styles.disciplineText}>Poetry and Storytelling, Creative Writing</p>
                  </div>
                  <div className={shared.borderCard}>
                    <h4 className={styles.disciplineTitle}>Visual and Media Arts</h4>
                    <p className={styles.disciplineText}>Visual Arts and Painting, Film and Photography</p>
                  </div>
                  <div className={shared.borderCard}>
                    <h4 className={styles.disciplineTitle}>Applied Arts and Livelihoods</h4>
                    <p className={styles.disciplineText}>Fashion and Design, Culinary Arts, Handicrafts</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Iteka Community Project */}
          <section className={styles.communitySection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter}>The Iteka Community Project</h2>
              <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                In 2024, our community-driven interventions prioritised socio-economic empowerment,
                health, and holistic well-being through targeted, grassroots campaigns.
              </p>
              <div className={styles.communityGrid}>
                <div className={shared.flatCard}>
                  <h3 className={styles.communityCardTitle}>Socio-Economic Empowerment: The Sewing Initiative</h3>
                  <p className={styles.communityCardText}>
                    To foster local self-reliance, we initiated a specialised sewing and tailoring project.
                    We trained seven women from the local community, equipping them with vocational skills
                    to produce high-quality school uniforms for the children at Iteka Junior Academy. This
                    initiative not only created sustainable livelihood opportunities for the women but also
                    strengthened our internal community ecosystem.
                  </p>
                </div>
                <div className={shared.flatCard}>
                  <h3 className={styles.communityCardTitle}>Health and Well-being: Menstrual Hygiene Management</h3>
                  <p className={styles.communityCardText}>
                    We actively championed health and dignity by tackling period poverty. Most notably, in
                    observance of International Women&rsquo;s Day 2024 in the Muhanga District, we launched
                    an essential outreach campaign. We distributed 30 comprehensive sanitary pad kits and
                    provided vital reproductive health education and psychosocial support to young girls and
                    women within the community.
                  </p>
                </div>
                <div className={shared.flatCard}>
                  <h3 className={styles.communityCardTitle}>Advocacy: Youth and Children&rsquo;s Rights</h3>
                  <p className={styles.communityCardText}>
                    Through dynamic public performances and focused advocacy campaigns, we continued to
                    amplify the voices of the younger generation. Our initiatives focused on raising
                    awareness of children&rsquo;s and youth rights, celebrating their cultural and academic
                    achievements, and actively addressing the systemic challenges they face.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Evidence-Based Results */}
          <section className={styles.storySection}>
            <div className={shared.container}>
              <div className={styles.storyGrid}>
                <div className={styles.storyImage}>
                  {galleryImages[0]?.image?.data?.url && (
                      <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[0].image.data.url}`}
                          alt="Impact Story"
                      />
                  )}
                </div>

                <div className={styles.storyCopy}>
                  <div className={shared.iconCircle}>
                    <TrendingUp size={24} />
                  </div>
                  <h2 className={styles.storyHeading}>Evidence-Based Results</h2>
                  <p className={styles.storyText}>
                    We are committed to measuring and demonstrating our impact. Every programme is
                    evaluated using rigorous metrics to ensure we are creating lasting positive change in
                    the lives of young people and their communities.
                  </p>
                  <ul className={shared.bulletList}>
                    <li className={shared.bulletItem}>
                      <div className={shared.bulletDot}></div>
                      <span className={shared.bulletText}>
                        <strong>Quarterly assessments</strong> to track participant progress and outcomes
                      </span>
                    </li>
                    <li className={shared.bulletItem}>
                      <div className={shared.bulletDot}></div>
                      <span className={shared.bulletText}>
                        <strong>Annual impact reports</strong> available for transparency and accountability
                      </span>
                    </li>
                    <li className={shared.bulletItem}>
                      <div className={shared.bulletDot}></div>
                      <span className={shared.bulletText}>
                        <strong>Third-party evaluations</strong> to ensure objectivity and rigor
                      </span>
                    </li>
                  </ul>
                  <Link href="/contact" className={shared.btnPrimary}>
                    Request Impact Report
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className={styles.testimonialsSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter}>Stories of Transformation</h2>
              <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                Hear directly from the young people whose lives have been transformed through our
                programmes
              </p>

              {testimonialsLoading ? (
                  <div className={shared.loadingWrap}>
                    <div className={shared.spinner}></div>
                  </div>
              ) : testimonials.length > 0 ? (
                  <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className={shared.testimonialCard}>
                          <div className={shared.quoteMark}>&ldquo;</div>
                          <p className={shared.testimonialText}>{testimonial.quote}</p>
                          <div className={shared.testimonialAuthorRow}>
                            {testimonial.author_photo?.data?.url && (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${testimonial.author_photo.data.url}`}
                                    alt={testimonial.author_name}
                                    className={shared.testimonialAvatar}
                                />
                            )}
                            <div>
                              <p className={shared.testimonialName}>{testimonial.author_name}</p>
                              <p className={shared.testimonialRole}>{testimonial.author_role}</p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className={styles.emptyText}>No testimonials available</div>
              )}
            </div>
          </section>

          {/* Areas of Impact */}
          <section className={styles.focusSection}>
            <div className={shared.container}>
              <h2 className={shared.sectionTitleCenter}>Areas of Impact</h2>
              <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                Our programmes create lasting change across six key focus areas
              </p>

              <div className={styles.focusGrid}>
                {impactAreas.map((area, idx) => {
                  const Icon = area.icon;
                  return (
                      <div key={idx} className={`${shared.tintCard} ${styles.focusCard}`}>
                        <div className={styles.focusIconWrap}>
                          <Icon size={26} />
                        </div>
                        <h3 className={styles.focusTitle}>{area.title}</h3>
                        <p className={styles.focusText}>{area.description}</p>
                      </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Visual Impact Gallery */}
          {galleryImages.length > 0 && (
              <section className={styles.gallerySection}>
                <div className={shared.container}>
                  <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>
                    Impact In Action
                  </h2>
                  <div className={shared.photoGrid}>
                    {galleryImages.slice(0, 8).map((img: any, idx: number) => (
                        <div key={idx} className={shared.photoItem}>
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img?.image?.data?.url}`}
                              alt={img?.caption || 'Impact'}
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

          {/* Commitment to Transparency */}
          <section className={styles.commitmentSection}>
            <div className={styles.commitmentInner}>
              <div className={shared.iconCircle} style={{ margin: '0 auto' }}>
                <Target size={28} />
              </div>
              <h2 className={styles.commitmentTitle}>Our Commitment to Transparency</h2>
              <p className={styles.commitmentText}>
                We are committed to measuring and demonstrating our impact. Every programme is evaluated
                using rigorous metrics to ensure we are creating lasting positive change in the lives of
                young people and their communities. Our impact reports are available for transparency and
                accountability.
              </p>
              <Link href="/contact" className={shared.btnPrimary}>
                Request Impact Report
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.ctaSection}>
            <div className={shared.container}>
              <div className={shared.bandBox}>
                <h2 className={shared.bandTitle}>Be Part of Our Impact</h2>
                <p className={shared.bandText}>
                  Your support helps us expand our reach and deepen our impact across Rwanda
                </p>
                <div className={styles.ctaButtons}>
                  <Link href="/donate" className={shared.btnPrimary}>
                    Support Our Work
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/programmes" className={shared.btnOutline}>
                    Explore Programmes
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

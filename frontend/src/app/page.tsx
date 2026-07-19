'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, Users, Target, Globe, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  fetchProgrammes,
  fetchActualites,
  fetchTestimonials,
  fetchImpactStats,
  fetchGalleryImages,
  fetchPartners,
  fetchEvents,
} from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Home.module.css';
import shared from '../styles/shared.module.css';

export default function Home() {
  const { data: programmes = [] } = useQuery({
    queryKey: ['programmes'],
    queryFn: fetchProgrammes,
  });

  const { data: actualites = [] } = useQuery({
    queryKey: ['actualites'],
    queryFn: fetchActualites,
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const { data: stats = [] } = useQuery({
    queryKey: ['impact-stats'],
    queryFn: fetchImpactStats,
  });

  const { data: galleryImages = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryImages,
  });

  const { data: partners = [] } = useQuery({
    queryKey: ['partners'],
    queryFn: fetchPartners,
  });

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(),
  });

  // Événement dont la date de début est la plus proche d'aujourd'hui
  // (à venir en priorité, sinon le plus récent)
  const upcomingEvent = (() => {
    const now = Date.now();
    const dated = events
      .filter((e: any) => e?.date_start)
      .map((e: any) => ({ ...e, ts: new Date(e.date_start).getTime() }))
      .filter((e: any) => !Number.isNaN(e.ts));
    if (dated.length === 0) return null;
    const future = dated.filter((e: any) => e.ts >= now).sort((a: any, b: any) => a.ts - b.ts);
    if (future.length > 0) return future[0];
    return dated.sort((a: any, b: any) => b.ts - a.ts)[0];
  })();

  const getLogoUrl = (logo: any) => {
    if (!logo) return null;
    const url = logo.url || logo.data?.url;
    if (!url) return null;
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };

  const featuredProgrammes = programmes.filter((p: any) => p?.is_featured);
  const featuredNews = actualites.slice(0, 3);

  // --- Animation blobs hero -> About (GSAP ScrollTrigger) ---
  const blobOrangeRef = useRef<HTMLDivElement>(null);
  const blobGreenRef = useRef<HTMLDivElement>(null);
  const aboutBlobTopRef = useRef<HTMLDivElement>(null);
  const aboutBlobBottomRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);

  const blobImgA = galleryImages[3]?.image?.data?.url;
  const blobImgB = galleryImages[4]?.image?.data?.url;

  // Blobs About : filigrane dans le hero au chargement (gauche/droite),
  // convergent vers leur place naturelle dans About au scroll (scrub).
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx: gsap.Context | null = null;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const build = () => {
      ctx?.revert();
      ctx = null;

      if (window.innerWidth < 992) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const blobs = [aboutBlobTopRef.current, aboutBlobBottomRef.current];
      if (blobs.some((b) => !b)) return;

      ctx = gsap.context(() => {
        // La transition CSS de .blob (hover) se bat avec le scrub GSAP
        // (chaque frame ré-interpolée avec 0.35s de retard = mouvement erratique)
        gsap.set(blobs, { transition: 'none', willChange: 'transform' });

        const vh = window.innerHeight;
        const vw = document.documentElement.clientWidth;

        // Position filigrane souhaitée au chargement (coordonnées viewport, scroll = 0)
        const filigrane = [
          (el: HTMLElement) => ({ x: -el.offsetWidth * 0.2, y: vh * 0.16 }), // bord gauche, haut
          (el: HTMLElement) => ({ x: vw - el.offsetWidth, y: vh * 0.5 }),    // bord droit, plus bas
        ];

        // Fin du voyage : quand le haut des blobs approche 40% du viewport
        const firstRect = blobs[0]!.getBoundingClientRect();
        const endScroll = Math.max(firstRect.top + window.scrollY - vh * 0.4, 1);

        blobs.forEach((el, i) => {
          const r = el!.getBoundingClientRect();
          const start = filigrane[i](el!);
          gsap.fromTo(
              el!,
              {
                x: start.x - (r.left + window.scrollX),
                y: start.y - (r.top + window.scrollY),
                opacity: 0.3,
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  start: 0,
                  end: endScroll,
                  scrub: 1,
                },
              }
          );
        });
      });
    };

    build();
    // Recalcule après chargement complet (fonts/images peuvent décaler la mise en page)
    window.addEventListener('load', build);
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('load', build);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      ctx?.revert();
    };
  }, []);

  // État pour les 3 images rotatives
  const [heroImage1, setHeroImage1] = useState(0);
  const [heroImage2, setHeroImage2] = useState(1);
  const [heroImage3, setHeroImage3] = useState(2);

  // Rotation aléatoire des images toutes les 3 secondes (décalées)
  useEffect(() => {
    if (galleryImages.length < 3) return;

    const getRandomIndex = (exclude: number[]) => {
      let index;
      do {
        index = Math.floor(Math.random() * galleryImages.length);
      } while (exclude.includes(index));
      return index;
    };

    // Image 1 change toutes les 3s
    const interval1 = setInterval(() => {
      setHeroImage1((prev) => getRandomIndex([heroImage2, heroImage3]));
    }, 3000);

    // Image 2 change toutes les 3s (décalage de 1s)
    const interval2 = setInterval(() => {
      setHeroImage2((prev) => getRandomIndex([heroImage1, heroImage3]));
    }, 3000);

    // Image 3 change toutes les 3s (décalage de 2s)
    const interval3 = setInterval(() => {
      setHeroImage3((prev) => getRandomIndex([heroImage1, heroImage2]));
    }, 3000);

    // Décalage initial
    setTimeout(() => {}, 1000);
    setTimeout(() => {}, 2000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [galleryImages]);

  return (
      <>
        <Header />

        <main>
          {/* Blobs voyageurs : filigrane fixe sur le hero, puis migrent vers
              la section About au scroll et se muent en images (GSAP) */}
          <div ref={blobOrangeRef} className={`${styles.floatBlob} ${styles.floatBlobOrange}`} aria-hidden="true">
            {blobImgA && (
                <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blobImgA}`} alt="" />
            )}
          </div>
          <div ref={blobGreenRef} className={`${styles.floatBlob} ${styles.floatBlobGreen}`} aria-hidden="true">
            {blobImgB && (
                <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${blobImgB}`} alt="" />
            )}
          </div>

          {/* Hero Section - Grid Layout */}
          <section className={styles.hero}>

            <div className={styles.heroInner}>
              <div className={styles.heroGrid}>
                {/* Left: Text Content */}
                <div className={styles.heroText}>
                  <h1 className={styles.heroTitle}>
                    Empowerment With Purpose.
                    <br />
                    <span className={styles.accent}>Results With Impact.</span>
                  </h1>
                  <p className={styles.heroLead}>
                    Discover talents. Develop skills. Promote peace among Rwandan youth.
                  </p>
                  <div className={styles.heroCtas}>
                    <Link href="/programmes" className={shared.btnPrimary}>
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                    <Link href="/contact" className={shared.btnOutline}>
                      Get In Touch
                    </Link>
                  </div>

                  {/* Prochain événement (date de début la plus proche) */}
                  {upcomingEvent && (
                      <div className={styles.eventCard}>
                        {upcomingEvent.hero_image?.data?.url || upcomingEvent.gallery?.[0]?.data?.url ? (
                            <img
                                className={styles.eventCardThumb}
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${upcomingEvent.hero_image?.data?.url || upcomingEvent.gallery?.[0]?.data?.url}`}
                                alt={upcomingEvent.title}
                            />
                        ) : (
                            <div className={styles.eventCardThumb} />
                        )}
                        <div className={styles.eventCardBody}>
                          <span className={styles.eventCardTitle}>
                            Join our Upcoming Event: {upcomingEvent.title}
                          </span>
                          <span className={styles.eventCardText}>
                            {(upcomingEvent.description || '').replace(/<[^>]*>/g, '').trim().slice(0, 120)}
                          </span>
                          {upcomingEvent.registration_url ? (
                              <a
                                  href={upcomingEvent.registration_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.eventCardBtn}
                              >
                                Register
                                <ArrowRight size={14} />
                              </a>
                          ) : upcomingEvent.type === 'festival' ? (
                              <Link href="/festival" className={styles.eventCardBtn}>
                                Learn More
                                <ArrowRight size={14} />
                              </Link>
                          ) : null}
                        </div>
                      </div>
                  )}
                </div>

                {/* Right: Images Grid (1 grande verticale + 2 horizontales) */}
                <div className={styles.heroGallery}>
                  {galleryImages.length >= 3 ? (
                      <>
                        {/* Image 1 - Grande verticale (occupe 2 lignes, gauche) */}
                        <div className={`${styles.galleryTile} ${styles.gallerySpan2}`}>
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[heroImage1]?.image?.data?.url}`}
                              alt={galleryImages[heroImage1]?.caption || 'Iteka Youth'}
                          />
                        </div>

                        {/* Image 2 - Horizontale en haut (droite) */}
                        <div className={styles.galleryTile}>
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[heroImage2]?.image?.data?.url}`}
                              alt={galleryImages[heroImage2]?.caption || 'Iteka Youth'}
                          />
                        </div>

                        {/* Image 3 - Horizontale en bas (droite) */}
                        <div className={styles.galleryTile}>
                          <img
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[heroImage3]?.image?.data?.url}`}
                              alt={galleryImages[heroImage3]?.caption || 'Iteka Youth'}
                          />
                        </div>
                      </>
                  ) : (
                      // Placeholder si pas assez d'images
                      <>
                        <div className={`${styles.galleryTile} ${styles.gallerySpan2} ${styles.placeholderOrange}`}></div>
                        <div className={`${styles.galleryTile} ${styles.placeholderGreen}`}></div>
                        <div className={`${styles.galleryTile} ${styles.placeholderMix}`}></div>
                      </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Partners Logos */}
          <section className={styles.partners}>
            <div className={styles.partnersContainer}>
              <p className={styles.partnersLabel}>Our Supported Partners</p>
              <div className={styles.partnersRow}>
                {partners.length > 0 ? (
                    partners.slice(0, 8).map((partner: any) => {
                      const logoUrl = getLogoUrl(partner.logo);
                      return (
                          <div key={partner.id} className={styles.partnerLogo}>
                            {logoUrl ? (
                                <img src={logoUrl} alt={partner.name} />
                            ) : (
                                <div className={styles.partnerPlaceholder} />
                            )}
                          </div>
                      );
                    })
                ) : (
                    <>
                      <div className={styles.partnerPlaceholder}></div>
                      <div className={styles.partnerPlaceholder}></div>
                      <div className={styles.partnerPlaceholder}></div>
                      <div className={styles.partnerPlaceholder}></div>
                    </>
                )}
              </div>
            </div>
          </section>

          {/* Who We Are - Alternating Grid */}
          <section className={styles.aboutSection} ref={aboutSectionRef}>
            <div className={styles.aboutContainer}>
              {/* Who We Are — emplacements cibles des blobs voyageurs */}
              <div className={styles.whoAreRow}>
                <div className={styles.whoAreImages}>
                  <div
                      ref={aboutBlobTopRef}
                      className={`${styles.blob} ${styles.blobTop}`}
                      role="img"
                      aria-label="Iteka youth"
                      style={
                        galleryImages[3]?.image?.data?.url
                            ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[3].image.data.url})` }
                            : undefined
                      }
                  />
                  <div
                      ref={aboutBlobBottomRef}
                      className={`${styles.blob} ${styles.blobBottom}`}
                      role="img"
                      aria-label="Iteka community"
                      style={
                        galleryImages[4]?.image?.data?.url
                            ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[4].image.data.url})` }
                            : undefined
                      }
                  />
                </div>
                <div className={styles.whoAreCopy}>
                  <span className={styles.whoAreSubtitle}>About Iteka</span>
                  <h2 className={styles.whoAreTitle}>You're the Hope for others</h2>
                  <p className={styles.whoAreText}>
                    Iteka Youth Organisation is a leading community for youth empowerment in Rwanda, built on the core belief that every young person possesses unique and limitless potential.
                  </p>
                  <p className={styles.whoAreText}>
                    We are dedicated to nurturing the next generation by championing talent discovery, driving sustainable skills development, and fostering initiatives that promote lasting peace and social cohesion.
                  </p>
                  <Link href="/about" className={shared.btnPrimary}>
                    Discover More
                  </Link>
                </div>
              </div>

            </div>
          </section>

          {/* What We Do — section distincte, fond blanc, piliers numérotés */}
          <section className={styles.whatWeDoSection}>
            <div className={styles.aboutContainer}>
              <div className={styles.aboutRow}>
                <div className={styles.aboutCopy}>
                  <span className={styles.whoAreSubtitle}>Our Pillars</span>
                  <h2 className={styles.aboutHeading}>What We Do</h2>
                  <p className={styles.aboutText}>
                    Our evidence-based programmes are designed to transform lives by unlocking the potential of young people and equipping them to shape a brighter future. We deliver impact across three core pillars:
                  </p>
                  <ol className={styles.pillarList}>
                    <li className={styles.pillarItem}>
                      <span className={styles.pillarNum}>01</span>
                      <span className={styles.pillarBody}>
                        <strong>Talent Discovery</strong>
                        Unearthing and nurturing unique abilities in the arts, sports, technology, and entrepreneurship, providing young people with the stage to showcase their potential.
                      </span>
                    </li>
                    <li className={styles.pillarItem}>
                      <span className={styles.pillarNum}>02</span>
                      <span className={styles.pillarBody}>
                        <strong>Skills Development</strong>
                        Equipping the next generation for success through targeted education, vocational training, professional mentorship, and practical capacity building.
                      </span>
                    </li>
                    <li className={styles.pillarItem}>
                      <span className={styles.pillarNum}>03</span>
                      <span className={styles.pillarBody}>
                        <strong>Peacebuilding</strong>
                        Cultivating community harmony, driving conflict resolution, and fostering social cohesion through structured youth-led dialogues and community initiatives.
                      </span>
                    </li>
                  </ol>
                  <Link href="/programmes" className={shared.btnPrimary}>
                    Explore Our Programmes
                    <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={styles.aboutMedia}>
                  <div className={styles.aboutMediaTile}>
                    {galleryImages[5]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[5].image.data.url}`}
                            alt="What We Do"
                        />
                    ) : null}
                  </div>
                  <div className={`${styles.aboutMediaTile} ${styles.aboutMediaTileOffset}`}>
                    {galleryImages[6]?.image?.data?.url ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${galleryImages[6].image.data.url}`}
                            alt="What We Do"
                        />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Our Expertise - Cards with Icons */}
          {featuredProgrammes.length > 0 && (
              <section className={styles.expertiseSection}>
                <div className={shared.container}>
                  <div className={shared.sectionHeaderRow}>
                    <h2 className={shared.sectionTitle}>Our Expertise, Your Impact</h2>
                    <Link href="/programmes" className={`${shared.btnPrimary} ${shared.desktopOnlyFlex}`}>
                      View All Programmes
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className={styles.expertiseGrid}>
                    {featuredProgrammes.slice(0, 6).map((prog: any, idx: number) => {
                      const icons = [Users, Target, Globe, Award, Users, Target];
                      const Icon = icons[idx % icons.length];

                      return (
                          <Link
                              key={prog.id}
                              href={`/programmes/${prog?.slug}`}
                              className={styles.expertiseCard}
                          >
                            <div className={styles.expertiseIconWrap}>
                              <Icon size={24} />
                            </div>
                            <h3 className={styles.expertiseCardTitle}>{prog?.name}</h3>
                            <p className={styles.expertiseCardText}>{prog?.short_description}</p>
                          </Link>
                      );
                    })}
                  </div>

                  <div className={shared.mobileOnlyCenter}>
                    <Link href="/programmes" className={shared.btnPrimary}>
                      View All Programmes
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* Impact Stats — band color, un accent par stat (rainbow contrôlé, cf. brief Impact) */}
          {stats.length > 0 && (
              <section className={styles.statsSection}>
                <div className={shared.container}>
                  <div className={shared.bandBox}>
                    <h2 className={shared.bandTitle}>Our Impact In Numbers</h2>
                    <div className={shared.bandStatsGrid}>
                      {stats.map((stat: any, idx: number) => {
                        const accentColors = ['#E87722', '#00A3A3', '#E91E63', '#3F7A4F'];
                        return (
                            <div key={stat.id}>
                              <div className={shared.statValue} style={{ color: accentColors[idx % accentColors.length] }}>
                                {stat?.value}
                              </div>
                              <p className={shared.statLabel}>{stat?.label}</p>
                            </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
          )}

          {/* Latest News */}
          {featuredNews.length > 0 && (
              <section className={styles.newsSection}>
                <div className={shared.container}>
                  <div className={shared.sectionHeaderRow}>
                    <div>
                      <h2 className={shared.sectionTitle}>Driving Development Through Insight</h2>
                      <p className={shared.sectionSub}>Stay updated with our latest initiatives</p>
                    </div>
                    <Link href="/news" className={`${shared.btnOutline} ${shared.desktopOnlyFlex}`}>
                      View All News
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className={styles.newsGrid}>
                    {featuredNews.map((article: any) => (
                        <Link key={article.id} href={`/news/${article?.slug}`} className={styles.newsCard}>
                          {article?.featured_image?.data && (
                              <div className={styles.newsImageWrap}>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featured_image.data.url}`}
                                    alt={article?.title}
                                />
                              </div>
                          )}
                          <div className={styles.newsBody}>
                            <span className={styles.newsCategory}>{article?.category}</span>
                            <h3 className={styles.newsCardTitle}>{article?.title}</h3>
                            <p className={styles.newsExcerpt}>{article?.excerpt}</p>
                          </div>
                        </Link>
                    ))}
                  </div>

                  <div className={shared.mobileOnlyCenter}>
                    <Link href="/news" className={shared.btnPrimary}>
                      View All News
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* Testimonials */}
          {testimonials.length > 0 && (
              <section className={styles.testimonialsSection}>
                <div className={styles.testimonialsContainer}>
                  <h2 className={styles.testimonialsTitle}>Voices From Our Community</h2>
                  <div className={styles.testimonialsGrid}>
                    {testimonials.slice(0, 2).map((testimonial: any) => (
                        <div key={testimonial.id} className={styles.testimonialCard}>
                          <div className={styles.quoteMark}>&ldquo;</div>
                          <p className={styles.testimonialText}>{testimonial?.quote}</p>
                          <div className={styles.testimonialAuthorRow}>
                            {testimonial?.author_photo?.data && (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${testimonial.author_photo.data.url}`}
                                    alt={testimonial?.author_name}
                                    className={styles.testimonialAvatar}
                                />
                            )}
                            <div>
                              <p className={styles.testimonialName}>{testimonial?.author_name}</p>
                              <p className={styles.testimonialRole}>{testimonial?.author_role}</p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </section>
          )}

          {/* CTA Section */}
          <section className={styles.ctaSection}>
            <div className={shared.container}>
              <div className={shared.bandBox}>
                <h2 className={shared.bandTitle}>Join Us And Let's Make A Better World Today!</h2>
                <p className={shared.bandText}>
                  Your support empowers Rwandan youth to discover their potential and create lasting change in their communities.
                </p>
                <Link href="/donate" className={shared.btnPrimary}>
                  Donate Now
                </Link>
              </div>
            </div>
          </section>

          {/* Impact Gallery */}
          {galleryImages.length > 0 && (
              <section className={styles.gallerySection}>
                <div className={shared.container}>
                  <div className={shared.sectionHeaderRow}>
                    <h2 className={shared.sectionTitle}>Our Impact In Action</h2>
                    <Link href="/gallery" className={`${shared.btnOutline} ${shared.desktopOnlyFlex}`}>
                      View All
                      <ArrowRight size={16} />
                    </Link>
                  </div>

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

                  <div className={shared.mobileOnlyCenter}>
                    <Link href="/gallery" className={shared.btnPrimary}>
                      View All
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </section>
          )}
        </main>

        <Footer />
      </>
  );
}
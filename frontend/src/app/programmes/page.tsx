'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, Users, Target, Award, Globe, BookOpen, Heart } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchProgrammes } from '@/src/lib/api';
import styles from './Programmes.module.css';
import shared from '@/src/styles/shared.module.css';

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
                {/* Hero */}
                <section className={shared.pageHero}>
                    <div className={shared.pageHeroInner}>
                        <h1 className={shared.pageHeroTitle}>
                            Transformative Programmes.
                            <br />
                            <span className={shared.accent}>Real Impact.</span>
                        </h1>
                        <p className={shared.pageHeroText}>
                            Discover our comprehensive suite of programmes designed to empower Rwandan youth
                            through talent discovery, skills development, and peace promotion.
                        </p>
                    </div>
                </section>

                {/* Stats Overview */}
                <section className={styles.statsSection}>
                    <div className={shared.container}>
                        <div className={shared.bandBox}>
                            <div className={shared.bandStatsGrid} style={{ marginTop: 0 }}>
                                <div>
                                    <div className={shared.statValue} style={{ color: '#E87722' }}>{programmes.length}+</div>
                                    <p className={shared.statLabel}>Active Programmes</p>
                                </div>
                                <div>
                                    <div className={shared.statValue} style={{ color: '#00A3A3' }}>2,500+</div>
                                    <p className={shared.statLabel}>Youth Reached</p>
                                </div>
                                <div>
                                    <div className={shared.statValue} style={{ color: '#E91E63' }}>15+</div>
                                    <p className={shared.statLabel}>Partner Organizations</p>
                                </div>
                                <div>
                                    <div className={shared.statValue} style={{ color: '#3F7A4F' }}>12+</div>
                                    <p className={shared.statLabel}>Districts Covered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programme Focus Areas */}
                <section className={styles.focusSection}>
                    <div className={shared.container}>
                        <h2 className={shared.sectionTitleCenter}>Programme Focus Areas</h2>
                        <p className={shared.sectionSubCenter} style={{ marginBottom: 48 }}>
                            Our programmes span three core pillars of youth empowerment
                        </p>

                        <div className={styles.focusGrid}>
                            <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                                <div className={styles.focusIcon}>
                                    <Users size={32} />
                                </div>
                                <h3 className={styles.focusTitle}>Talent Discovery</h3>
                                <p className={styles.focusText}>
                                    Programmes focused on identifying unique abilities in arts, sports, technology,
                                    and entrepreneurship
                                </p>
                            </div>

                            <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                                <div className={styles.focusIcon}>
                                    <Award size={32} />
                                </div>
                                <h3 className={styles.focusTitle}>Skills Development</h3>
                                <p className={styles.focusText}>
                                    Professional training, mentorship, and hands-on learning experiences for career
                                    readiness
                                </p>
                            </div>

                            <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                                <div className={styles.focusIcon}>
                                    <Heart size={32} />
                                </div>
                                <h3 className={styles.focusTitle}>Peace Promotion</h3>
                                <p className={styles.focusText}>
                                    Community dialogue and conflict resolution initiatives fostering unity and
                                    understanding
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programmes Grid */}
                <section className={styles.gridSection}>
                    <div className={shared.container}>
                        <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>
                            All Our Programmes
                        </h2>

                        {isLoading ? (
                            <div className={styles.loadingWrap}>
                                <div className={styles.spinner}></div>
                                <p className={styles.loadingText}>Loading programmes...</p>
                            </div>
                        ) : (
                            <div className={styles.programmesGrid}>
                                {programmes.map((programme: any, idx: number) => {
                                    const Icon = icons[idx % icons.length];

                                    return (
                                        <Link
                                            key={programme.id}
                                            href={`/programmes/${programme.slug || programme.documentId}`}
                                            className={styles.programmeCard}
                                        >
                                            {programme.featured_image?.data?.url && (
                                                <div className={styles.programmeImageWrap}>
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${programme.featured_image.data.url}`}
                                                        alt={programme.name}
                                                    />
                                                </div>
                                            )}

                                            <div className={styles.programmeBody}>
                                                <div className={styles.programmeTopRow}>
                                                    <div className={styles.programmeIconWrap}>
                                                        <Icon size={18} />
                                                    </div>
                                                    {programme.is_featured && (
                                                        <span className={styles.featuredBadge}>Featured</span>
                                                    )}
                                                </div>

                                                <h3 className={styles.programmeTitle}>{programme.name}</h3>

                                                <p className={styles.programmeText}>{programme.short_description}</p>

                                                <div className={styles.programmeLink}>
                                                    Learn More
                                                    <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

                        {!isLoading && programmes.length === 0 && (
                            <div className={styles.emptyWrap}>
                                <p className={styles.emptyText}>No programmes available at the moment.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* How to Join */}
                <section className={styles.joinSection}>
                    <div className={styles.joinInner}>
                        <h2 className={shared.sectionTitleCenter}>How to Join Our Programmes</h2>
                        <p className={shared.sectionSubCenter}>
                            Getting started with Iteka is simple. Follow these steps to begin your journey
                        </p>

                        <div className={styles.stepsGrid}>
                            <div className={styles.stepCard}>
                                <div className={styles.stepCircle}>1</div>
                                <h3 className={styles.stepTitle}>Choose a Programme</h3>
                                <p className={styles.stepText}>
                                    Browse our programmes and select one that matches your interests and goals
                                </p>
                            </div>

                            <div className={styles.stepCard}>
                                <div className={styles.stepCircle}>2</div>
                                <h3 className={styles.stepTitle}>Submit Application</h3>
                                <p className={styles.stepText}>
                                    Complete the online application form with your information and motivation
                                </p>
                            </div>

                            <div className={styles.stepCard}>
                                <div className={styles.stepCircle}>3</div>
                                <h3 className={styles.stepTitle}>Start Learning</h3>
                                <p className={styles.stepText}>
                                    Once accepted, begin your transformative journey with Iteka
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className={shared.container}>
                        <div className={shared.bandBox}>
                            <h2 className={shared.bandTitle}>Ready to Transform Your Future?</h2>
                            <p className={shared.bandText}>
                                Join thousands of young Rwandans who are discovering their potential and creating
                                positive change
                            </p>
                            <div className={styles.ctaButtons}>
                                <Link href="/contact" className={shared.btnPrimary}>
                                    Apply Now
                                    <ArrowRight size={16} />
                                </Link>
                                <Link href="/about" className={shared.btnOutline}>
                                    Learn About Us
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

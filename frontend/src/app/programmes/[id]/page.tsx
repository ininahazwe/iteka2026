'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Users, Calendar, MapPin } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchProgrammeBySlug } from '@/src/lib/api';
import styles from './ProgrammeDetail.module.css';
import shared from '@/src/styles/shared.module.css';

export default function ProgrammeDetailPage() {
    const params = useParams();
    const slug = params.id as string;

    const { data: programme, isLoading } = useQuery({
        queryKey: ['programme', slug],
        queryFn: () => fetchProgrammeBySlug(slug),
    });

    const accentColors = ['#E87722', '#00A3A3', '#E91E63', '#3F7A4F'];

    if (isLoading) {
        return (
            <>
                <Header />
                <div className={shared.fullscreenCenter}>
                    <div className={shared.spinner}></div>
                    <p className={shared.loadingText}>Loading programme...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!programme) {
        return (
            <>
                <Header />
                <div className={shared.fullscreenCenter}>
                    <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 16 }}>Programme Not Found</h2>
                    <p className={shared.sectionSubCenter} style={{ marginBottom: 16 }}>
                        The programme you're looking for doesn't exist.
                    </p>
                    <Link href="/programmes" className={shared.btnPrimary}>
                        <ArrowLeft size={16} />
                        Back to Programmes
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <main>
                {/* Hero */}
                <section className={styles.hero}>
                    {programme.featured_image?.data?.url && (
                        <>
                            <img
                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${programme.featured_image.data.url}`}
                                alt={programme.name}
                            />
                            <div className={styles.heroOverlay}></div>
                        </>
                    )}
                    <div className={styles.heroContent}>
                        <div className={styles.heroInner}>
                            <div className={styles.heroTextWrap}>
                                {programme.is_featured && (
                                    <span className={styles.featuredBadge}>Featured Programme</span>
                                )}
                                <h1 className={styles.heroTitle}>{programme.name}</h1>
                                {programme.short_description && (
                                    <p className={styles.heroLead}>{programme.short_description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Info Bar */}
                <section className={styles.quickInfo}>
                    <div className={shared.container}>
                        <div className={styles.quickInfoRow}>
                            <div className={styles.quickInfoItem}>
                                <div className={styles.quickInfoIcon}>
                                    <Users size={18} />
                                </div>
                                <div>
                                    <p className={styles.quickInfoLabel}>Target Audience</p>
                                    <p className={styles.quickInfoValue}>Youth 18-35</p>
                                </div>
                            </div>
                            <div className={styles.quickInfoItem}>
                                <div className={styles.quickInfoIcon}>
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className={styles.quickInfoLabel}>Duration</p>
                                    <p className={styles.quickInfoValue}>Ongoing</p>
                                </div>
                            </div>
                            <div className={styles.quickInfoItem}>
                                <div className={styles.quickInfoIcon}>
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className={styles.quickInfoLabel}>Location</p>
                                    <p className={styles.quickInfoValue}>Kigali & Nationwide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className={styles.contentSection}>
                    <div className={shared.container}>
                        <div className={styles.contentGrid}>
                            <div className={styles.mainCol}>
                                {programme.description && (
                                    <div>
                                        <h2 className={styles.blockTitle}>About This Programme</h2>
                                        <div
                                            className={shared.richText}
                                            dangerouslySetInnerHTML={{ __html: programme.description }}
                                        />
                                    </div>
                                )}

                                {programme.requirements && (
                                    <div>
                                        <h2 className={styles.blockTitle}>Requirements</h2>
                                        <div
                                            className={shared.richText}
                                            dangerouslySetInnerHTML={{ __html: programme.requirements }}
                                        />
                                    </div>
                                )}

                                {programme.impact_stats && programme.impact_stats.length > 0 && (
                                    <div className={shared.tintCard}>
                                        <h2 className={styles.blockTitle} style={{ marginBottom: 12 }}>Programme Impact</h2>
                                        <div className={styles.impactStatsGrid}>
                                            {programme.impact_stats.map((stat: any, idx: number) => (
                                                <div key={idx} style={{ textAlign: 'center' }}>
                                                    <div
                                                        className={styles.impactStatValue}
                                                        style={{ color: accentColors[idx % accentColors.length] }}
                                                    >
                                                        {stat.value}
                                                    </div>
                                                    <p className={styles.impactStatLabel}>{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className={styles.sidebar}>
                                {programme.application_form_url ? (
                                    <div className={styles.applyCard}>
                                        <h3 className={styles.applyCardTitle}>Ready to Apply?</h3>
                                        <p className={styles.applyCardText}>
                                            Join hundreds of youth transforming their communities
                                        </p>
                                        <a
                                            href={programme.application_form_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.applyButton}
                                        >
                                            Apply Now
                                        </a>
                                    </div>
                                ) : (
                                    <div className={shared.tintCard}>
                                        <h3 className={styles.sidebarCardTitle}>Interested?</h3>
                                        <p className={styles.sidebarCardText}>
                                            Contact us to learn more about this programme and how to get involved
                                        </p>
                                        <Link href="/contact" className={shared.btnPrimary} style={{ width: '100%', justifyContent: 'center' }}>
                                            Get In Touch
                                        </Link>
                                    </div>
                                )}

                                <div className={shared.borderCard}>
                                    <h3 className={styles.sidebarCardTitle}>What You'll Gain</h3>
                                    <ul className={styles.gainsList}>
                                        <li className={styles.gainsItem}>
                                            <CheckCircle size={18} />
                                            <span>Professional skills development</span>
                                        </li>
                                        <li className={styles.gainsItem}>
                                            <CheckCircle size={18} />
                                            <span>Mentorship from experts</span>
                                        </li>
                                        <li className={styles.gainsItem}>
                                            <CheckCircle size={18} />
                                            <span>Networking opportunities</span>
                                        </li>
                                        <li className={styles.gainsItem}>
                                            <CheckCircle size={18} />
                                            <span>Certificates of completion</span>
                                        </li>
                                        <li className={styles.gainsItem}>
                                            <CheckCircle size={18} />
                                            <span>Community impact projects</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className={shared.tintCard}>
                                    <h3 className={styles.sidebarCardTitle}>Need More Info?</h3>
                                    <p className={styles.sidebarCardText}>Our team is here to answer your questions</p>
                                    <Link href="/contact" className={shared.btnPrimary}>
                                        Contact Us
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                {programme.gallery?.data && programme.gallery.data.length > 0 && (
                    <section className={styles.gallerySection}>
                        <div className={shared.container}>
                            <h2 className={styles.blockTitle}>Programme Gallery</h2>
                            <div className={styles.galleryGrid}>
                                {programme.gallery.data.slice(0, 6).map((img: any, idx: number) => (
                                    <div key={idx} className={styles.galleryTile}>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`}
                                            alt={`Gallery ${idx + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related CTA */}
                <section className={styles.ctaSection}>
                    <div className={shared.container}>
                        <div className={shared.bandBox}>
                            <h2 className={shared.bandTitle}>Explore More Programmes</h2>
                            <p className={shared.bandText}>
                                Discover other opportunities to develop your talents and create impact in your
                                community
                            </p>
                            <Link href="/programmes" className={shared.btnPrimary}>
                                <ArrowLeft size={16} />
                                View All Programmes
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

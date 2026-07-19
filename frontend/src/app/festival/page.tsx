'use client';

import { useQuery } from '@tanstack/react-query';
import { Calendar, MapPin, Ticket, Download, Music, Users, Sparkles } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchFestival } from '@/src/lib/api';
import styles from './Festival.module.css';
import shared from '@/src/styles/shared.module.css';

export default function FestivalPage() {
    const { data: festival, isLoading } = useQuery({
        queryKey: ['festival'],
        queryFn: fetchFestival,
    });

    const data = (festival as any)?.data || festival;

    const getUrl = (media: any) => {
        const url = media?.url || media?.data?.url;
        if (!url) return '';
        return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <div className={shared.fullscreenCenter}>
                    <div className={shared.spinner}></div>
                    <p className={shared.loadingText}>Loading festival information...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!data) {
        return (
            <>
                <Header />
                <div className={shared.fullscreenCenter}>
                    <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 12 }}>
                        Festival Information Not Found
                    </h2>
                    <p className={shared.sectionSubCenter}>Check back soon for festival updates.</p>
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
                    {data.hero_image && (
                        <>
                            <img src={getUrl(data.hero_image)} alt={data.title} />
                            <div className={styles.heroOverlay}></div>
                        </>
                    )}
                    <svg className={`${styles.heroBlob} ${styles.blob1}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#F1C40F" d="M45.3,-58.3C58.1,-49.6,67.4,-34.4,70.9,-18.1C74.4,-1.8,72,15.6,63.8,29.7C55.6,43.8,41.5,54.6,25.9,61.2C10.3,67.8,-6.8,70.2,-22.4,66.1C-38,62,-52.1,51.4,-61.1,37.2C-70.1,23,-74,5.2,-70.8,-10.9C-67.6,-27,-57.3,-41.4,-44.1,-50.3C-30.9,-59.2,-15.5,-62.6,1.4,-64.4C18.2,-66.2,32.5,-67,45.3,-58.3Z" transform="translate(100 100)" />
                    </svg>
                    <svg className={`${styles.heroBlob} ${styles.blob2}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#E91E63" d="M39.6,-51.2C50.3,-42.6,57.4,-28.9,60.6,-14.2C63.8,0.5,63.1,16.2,56.4,29.3C49.7,42.4,37,52.9,22.5,58.9C8,64.9,-8.3,66.4,-23.4,62.1C-38.5,57.8,-52.4,47.7,-60.5,33.9C-68.6,20.1,-70.9,2.6,-67.1,-13.1C-63.3,-28.8,-53.4,-42.7,-40.4,-51.2C-27.4,-59.7,-13.7,-62.8,0.8,-64C15.3,-65.2,29,-59.8,39.6,-51.2Z" transform="translate(100 100)" />
                    </svg>

                    <div className={styles.heroContent}>
                        <div className={styles.heroInner}>
                            <span className={styles.eventBadge}>Annual Cultural Festival</span>
                            <h1 className={styles.heroTitle}>{data.title}</h1>
                            {data.edition && <p className={styles.heroEdition}>{data.edition}</p>}
                            {data.registration_url && (
                                <a
                                    href={data.registration_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.registerBtn}
                                >
                                    <Ticket size={20} />
                                    Register Now
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* Quick Info */}
                <section className={styles.quickInfoSection}>
                    <div className={shared.container}>
                        <div className={styles.quickInfoGrid}>
                            {data.date_start && (
                                <div className={styles.quickInfoCard}>
                                    <div className={styles.quickInfoIcon}>
                                        <Calendar size={22} />
                                    </div>
                                    <div>
                                        <p className={styles.quickInfoLabel}>Date</p>
                                        <p className={styles.quickInfoValue}>
                                            {new Date(data.date_start).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                            {data.date_end && data.date_end !== data.date_start && (
                                                <> - {new Date(data.date_end).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}</>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {data.location && (
                                <div className={styles.quickInfoCard}>
                                    <div className={styles.quickInfoIcon}>
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <p className={styles.quickInfoLabel}>Location</p>
                                        <p className={styles.quickInfoValue}>{data.location}</p>
                                    </div>
                                </div>
                            )}

                            <div className={styles.quickInfoCard}>
                                <div className={styles.quickInfoIcon}>
                                    <Users size={22} />
                                </div>
                                <div>
                                    <p className={styles.quickInfoLabel}>Expected</p>
                                    <p className={styles.quickInfoValue}>1,000+ Attendees</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Description */}
                {data.description && (
                    <section className={styles.descSection}>
                        <div className={styles.descInner}>
                            <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 32 }}>
                                About The Festival
                            </h2>
                            <div className={shared.richText} dangerouslySetInnerHTML={{ __html: data.description }} />
                        </div>
                    </section>
                )}

                {/* Highlights */}
                {data.highlights && data.highlights.length > 0 && (
                    <section className={styles.highlightsSection}>
                        <div className={shared.container}>
                            <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>
                                Festival Highlights
                            </h2>
                            <div className={styles.highlightsGrid}>
                                {data.highlights.map((highlight: any, idx: number) => (
                                    <div key={idx} className={styles.highlightCard}>
                                        {highlight.image && (
                                            <div className={styles.highlightImageWrap}>
                                                <img src={getUrl(highlight.image)} alt={highlight.title} />
                                            </div>
                                        )}
                                        <div className={styles.highlightBody}>
                                            <div className={styles.highlightTopRow}>
                                                <Sparkles size={18} />
                                                <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                                            </div>
                                            <p className={styles.highlightText}>{highlight.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery */}
                {data.gallery && data.gallery.length > 0 && (
                    <section className={styles.gallerySection}>
                        <div className={shared.container}>
                            <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>
                                Festival Moments
                            </h2>
                            <div className={styles.galleryGrid}>
                                {data.gallery.map((img: any, idx: number) => (
                                    <div key={idx} className={styles.galleryTile}>
                                        <img src={getUrl(img)} alt={`Festival Moment ${idx + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* What to Expect */}
                <section className={styles.expectSection}>
                    <div className={shared.container}>
                        <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 48 }}>
                            What to Expect
                        </h2>
                        <div className={styles.expectGrid}>
                            <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                                <div className={styles.expectIcon}>
                                    <Music size={28} />
                                </div>
                                <h3 className={styles.expectTitle}>Live Performances</h3>
                                <p className={styles.expectText}>
                                    Experience traditional and contemporary Rwandan music, dance, and cultural
                                    performances
                                </p>
                            </div>

                            <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                                <div className={styles.expectIcon}>
                                    <Users size={28} />
                                </div>
                                <h3 className={styles.expectTitle}>Cultural Exchange</h3>
                                <p className={styles.expectText}>
                                    Connect with youth from across Rwanda and celebrate our diverse cultural
                                    heritage
                                </p>
                            </div>

                            <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                                <div className={styles.expectIcon}>
                                    <Sparkles size={28} />
                                </div>
                                <h3 className={styles.expectTitle}>Talent Showcase</h3>
                                <p className={styles.expectText}>
                                    Watch young artists showcase their talents in arts, music, dance, and
                                    entrepreneurship
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programme PDF */}
                {data.program_pdf && (
                    <section className={styles.pdfSection}>
                        <div className={styles.pdfInner}>
                            <div className={shared.tintCard} style={{ textAlign: 'center' }}>
                                <div className={styles.pdfIcon}>
                                    <Download size={28} />
                                </div>
                                <h2 className={styles.pdfTitle}>Full Festival Programme</h2>
                                <p className={styles.pdfText}>
                                    Download the complete programme to see all performances, activities, and
                                    schedule details
                                </p>
                                <a
                                    href={getUrl(data.program_pdf)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={shared.btnPrimary}
                                >
                                    <Download size={18} />
                                    Download Programme (PDF)
                                </a>
                            </div>
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <section className={styles.finalCta}>
                    <div className={shared.container}>
                        <h2 className={styles.finalCtaTitle}>Don't Miss This Celebration!</h2>
                        <p className={styles.finalCtaText}>
                            Join us for an unforgettable celebration of Rwandan culture, talent, and unity
                        </p>
                        {data.registration_url && (
                            <a
                                href={data.registration_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.finalCtaBtn}
                            >
                                <Ticket size={20} />
                                Register for the Festival
                            </a>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

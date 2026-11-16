import { WP_URL } from '@/src/lib/config';
import { cache } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Users, Calendar, MapPin } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ProgrammeSchema, BreadcrumbSchema } from '@/src/components/StructureData';
import { fetchProgrammeBySlug, fetchProgrammes } from '@/src/lib/api';
import { SITE_URL, pageMetadata, toDescription, mediaAbsoluteUrl } from '@/src/lib/seo';
import styles from './ProgrammeDetail.module.css';
import shared from '@/src/styles/shared.module.css';

// Rendu serveur + ISR : le contenu est dans le HTML initial et régénéré toutes les 5 minutes.
export const revalidate = 300;

// Mémoïse la requête pour qu'elle ne soit faite qu'une fois par rendu
// (generateMetadata et la page l'appellent tous les deux).
const getProgramme = cache((slug: string) => fetchProgrammeBySlug(slug));

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
    try {
        const programmes = await fetchProgrammes();
        return programmes.filter((p: any) => p.slug).map((p: any) => ({ id: p.slug }));
    } catch {
        // WordPress injoignable au build : les pages seront générées à la demande (ISR).
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const programme = await getProgramme(id);
    if (!programme) {
        return { title: 'Programme Not Found', robots: { index: false, follow: false } };
    }
    return pageMetadata({
        title: programme.name,
        description:
            toDescription(programme.short_description) ||
            toDescription(programme.description) ||
            `${programme.name} - a youth programme by Iteka Youth Organization in Rwanda.`,
        path: `/programmes/${programme.slug}`,
        image: mediaAbsoluteUrl(programme.featured_image?.data?.url),
    });
}

export default async function ProgrammeDetailPage({ params }: Props) {
    const { id: slug } = await params;
    const programme = await getProgramme(slug);

    if (!programme) {
        notFound();
    }

    const accentColors = ['#E87722', '#00A3A3', '#E91E63', '#3F7A4F'];
    const url = `${SITE_URL}/programmes/${programme.slug}`;

    return (
        <>
            <ProgrammeSchema
                name={programme.name}
                description={
                    toDescription(programme.short_description) ||
                    toDescription(programme.description) ||
                    programme.name
                }
                url={url}
                image={mediaAbsoluteUrl(programme.featured_image?.data?.url)}
            />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: SITE_URL },
                    { name: 'Programmes', url: `${SITE_URL}/programmes` },
                    { name: programme.name, url },
                ]}
            />
            <Header />

            <main>
                {/* Hero */}
                <section className={styles.hero}>
                    {programme.featured_image?.data?.url && (
                        <>
                            <img
                                src={`${WP_URL}${programme.featured_image.data.url}`}
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
                                            src={`${WP_URL}${img.url}`}
                                            alt={`${programme.name} - photo ${idx + 1}`}
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

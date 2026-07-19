'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, User, ExternalLink, Share2 } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchActualiteBySlug } from '@/src/lib/api';
import styles from './NewsDetail.module.css';
import shared from '@/src/styles/shared.module.css';

export default function NewsDetailPage() {
    const params = useParams();
    const slug = params.id as string;

    const { data: article, isLoading } = useQuery({
        queryKey: ['actualite', slug],
        queryFn: () => fetchActualiteBySlug(slug),
    });

    if (isLoading) {
        return (
            <>
                <Header />
                <div className={shared.fullscreenCenter}>
                    <div className={shared.spinner}></div>
                    <p className={shared.loadingText}>Loading article...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (!article) {
        return (
            <>
                <Header />
                <div className={shared.fullscreenCenter}>
                    <h2 className={shared.sectionTitleCenter} style={{ marginBottom: 16 }}>Article Not Found</h2>
                    <p className={shared.sectionSubCenter} style={{ marginBottom: 16 }}>
                        The article you're looking for doesn't exist.
                    </p>
                    <Link href="/news" className={shared.btnPrimary}>
                        <ArrowLeft size={16} />
                        Back to News
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
                {/* Hero Image */}
                {article.featured_image?.data?.url && (
                    <section className={styles.heroImageSection}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featured_image.data.url}`}
                            alt={article.title}
                        />
                        <div className={styles.heroImageOverlay}></div>
                    </section>
                )}

                {/* Article Content */}
                <section className={styles.contentSection}>
                    <div className={styles.contentInner}>
                        <Link href="/news" className={styles.backLink}>
                            <ArrowLeft size={16} />
                            Back to News
                        </Link>

                        <div className={styles.metaRow}>
                            {article.category && <span className={styles.categoryBadge}>{article.category}</span>}
                            <span className={styles.metaItem}>
                                <Calendar size={16} />
                                {new Date(article.article_date || article.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </span>
                            {article.author && (
                                <span className={styles.metaItem}>
                                    <User size={16} />
                                    {article.author}
                                </span>
                            )}
                        </div>

                        <h1 className={styles.title}>{article.title}</h1>

                        {article.excerpt && <p className={styles.excerpt}>{article.excerpt}</p>}

                        {article.source && (
                            <div className={styles.sourceBlock}>
                                <p className={styles.sourceText}>
                                    Source: <strong>{article.source}</strong>
                                    {article.source_url && (
                                        <a
                                            href={article.source_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.sourceLink}
                                        >
                                            View Original
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </p>
                            </div>
                        )}

                        <div className={styles.richTextWrap}>
                            <div className={shared.richText} dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>

                        {article.tags && article.tags.length > 0 && (
                            <div className={styles.tagsBlock}>
                                <p className={styles.tagsLabel}>Tags:</p>
                                <div className={styles.tagsRow}>
                                    {article.tags.map((tag: any, idx: number) => (
                                        <span key={idx} className={styles.tagChip}>{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.shareBox}>
                            <p className={styles.shareLabel}>Share this article</p>
                            <button className={styles.shareButton}>
                                <Share2 size={18} />
                                Share
                            </button>
                        </div>
                    </div>
                </section>

                {/* Related/CTA */}
                <section className={styles.ctaSection}>
                    <div className={shared.container}>
                        <div className={shared.bandBox}>
                            <h2 className={shared.bandTitle}>Stay Informed</h2>
                            <p className={shared.bandText}>Explore more stories about our impact and initiatives</p>
                            <Link href="/news" className={shared.btnPrimary}>
                                View All News
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

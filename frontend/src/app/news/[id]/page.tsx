import { cache } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, User, ExternalLink, Share2 } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { ArticleSchema, BreadcrumbSchema } from '@/src/components/StructureData';
import { fetchActualiteBySlug, fetchActualites } from '@/src/lib/api';
import { SITE_URL, pageMetadata, toDescription, toIsoDate, mediaAbsoluteUrl } from '@/src/lib/seo';
import styles from './NewsDetail.module.css';
import shared from '@/src/styles/shared.module.css';

// Rendu serveur + ISR : le contenu est dans le HTML initial et régénéré toutes les 5 minutes.
export const revalidate = 300;

const getArticle = cache((slug: string) => fetchActualiteBySlug(slug));

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
    try {
        const articles = await fetchActualites();
        return articles.filter((a: any) => a.slug).map((a: any) => ({ id: a.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const article = await getArticle(id);
    if (!article) {
        return { title: 'Article Not Found', robots: { index: false, follow: false } };
    }
    return pageMetadata({
        title: article.title,
        description: toDescription(article.excerpt || article.content) || article.title,
        path: `/news/${article.slug}`,
        image: mediaAbsoluteUrl(article.featured_image?.data?.url),
        type: 'article',
        publishedTime: toIsoDate(article.article_date || article.publishedAt),
    });
}

export default async function NewsDetailPage({ params }: Props) {
    const { id: slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    const url = `${SITE_URL}/news/${article.slug}`;

    return (
        <>
            <ArticleSchema
                title={article.title}
                description={toDescription(article.excerpt || article.content) || article.title}
                url={url}
                image={mediaAbsoluteUrl(article.featured_image?.data?.url)}
                datePublished={toIsoDate(article.article_date || article.publishedAt)}
                dateModified={toIsoDate(article.publishedAt)}
                author={article.author}
            />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: SITE_URL },
                    { name: 'News', url: `${SITE_URL}/news` },
                    { name: article.title, url },
                ]}
            />
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

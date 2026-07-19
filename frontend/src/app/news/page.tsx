'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchActualites } from '@/src/lib/api';
import styles from './News.module.css';
import shared from '@/src/styles/shared.module.css';

export default function NewsPage() {
    const { data: articles = [], isLoading } = useQuery({
        queryKey: ['actualites'],
        queryFn: fetchActualites,
    });

    const featuredArticle = articles[0];
    const otherArticles = articles.slice(1);

    return (
        <>
            <Header />

            <main>
                {/* Hero */}
                <section className={shared.pageHero}>
                    <div className={shared.pageHeroInner}>
                        <h1 className={shared.pageHeroTitle}>Latest News &amp; Updates</h1>
                        <p className={shared.pageHeroText}>
                            Stay informed about our latest initiatives, achievements, and press coverage
                        </p>
                    </div>
                </section>

                {/* Featured Article */}
                {featuredArticle && (
                    <section className={styles.featuredSection}>
                        <div className={shared.container}>
                            <Link
                                href={`/news/${featuredArticle.slug || featuredArticle.documentId}`}
                                className={styles.featuredCard}
                            >
                                <div className={styles.featuredGrid}>
                                    {featuredArticle.featured_image?.data?.url && (
                                        <div className={styles.featuredImageWrap}>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${featuredArticle.featured_image.data.url}`}
                                                alt={featuredArticle.title}
                                            />
                                            <span className={styles.featuredBadge}>Featured</span>
                                        </div>
                                    )}

                                    <div className={styles.featuredBody}>
                                        <div className={styles.featuredMeta}>
                                            {featuredArticle.category && (
                                                <span className={styles.featuredCategory}>{featuredArticle.category}</span>
                                            )}
                                            <span className={styles.featuredDate}>
                                                <Calendar size={16} />
                                                {new Date(featuredArticle.article_date || featuredArticle.publishedAt).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <h2 className={styles.featuredTitle}>{featuredArticle.title}</h2>
                                        <p className={styles.featuredExcerpt}>{featuredArticle.excerpt}</p>
                                        <div className={styles.featuredLink}>
                                            Read Full Story
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </section>
                )}

                {/* Articles Grid */}
                <section className={styles.gridSection}>
                    <div className={shared.container}>
                        {isLoading ? (
                            <div className={shared.loadingWrap}>
                                <div className={shared.spinner}></div>
                                <p className={shared.loadingText}>Loading news...</p>
                            </div>
                        ) : otherArticles.length > 0 ? (
                            <div className={styles.articlesGrid}>
                                {otherArticles.map((article: any) => (
                                    <Link
                                        key={article.documentId}
                                        href={`/news/${article.slug || article.documentId}`}
                                        className={styles.articleCard}
                                    >
                                        {article.featured_image?.data?.url && (
                                            <div className={styles.articleImageWrap}>
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${article.featured_image.data.url}`}
                                                    alt={article.title}
                                                />
                                            </div>
                                        )}
                                        <div className={styles.articleBody}>
                                            {article.category && (
                                                <span className={styles.articleCategoryBadge}>
                                                    <Tag size={12} />
                                                    {article.category}
                                                </span>
                                            )}
                                            <div className={styles.articleDate}>
                                                <Calendar size={14} />
                                                {new Date(article.article_date || article.publishedAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                            <h3 className={styles.articleTitle}>{article.title}</h3>
                                            <p className={styles.articleExcerpt}>{article.excerpt}</p>
                                            <div className={styles.articleLink}>
                                                Read More
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyText}>No news articles available at the moment.</div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className={shared.container}>
                        <div className={shared.bandBox}>
                            <h2 className={shared.bandTitle}>Stay Connected</h2>
                            <p className={shared.bandText}>
                                Follow us on social media for real-time updates and behind-the-scenes content
                            </p>
                            <Link href="/contact" className={shared.btnPrimary}>
                                Subscribe to Updates
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

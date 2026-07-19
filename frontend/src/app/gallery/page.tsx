'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Filter, Image as ImageIcon } from 'lucide-react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { fetchGalleryImages } from '@/src/lib/api';
import styles from './Gallery.module.css';
import shared from '@/src/styles/shared.module.css';

export default function GalleryPage() {
    const [filter, setFilter] = useState('all');

    const { data: images = [], isLoading } = useQuery({
        queryKey: ['gallery'],
        queryFn: fetchGalleryImages,
    });

    // Filtres dynamiques : uniquement les catégories réellement présentes dans la galerie
    const availableCategories = (Array.from(
        new Set(
            images
                .map((item: any) => (typeof item.category === 'string' ? item.category.trim() : ''))
                .filter((cat: string): cat is string => !!cat)
        )
    ) as string[]).sort((a, b) => a.localeCompare(b));

    const categories = [
        { value: 'all', label: 'All' },
        ...availableCategories.map((cat) => ({
            value: cat.toLowerCase(),
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
        })),
    ];

    const filteredImages = images.filter((item: any) =>
        filter === 'all' || (typeof item.category === 'string' && item.category.toLowerCase() === filter)
    );

    return (
        <>
            <Header />

            <main>
                {/* Hero */}
                <section className={shared.pageHero}>
                    <div className={shared.pageHeroInner}>
                        <div className={styles.heroIcon}>
                            <ImageIcon size={28} />
                        </div>
                        <h1 className={shared.pageHeroTitle}>Our Gallery</h1>
                        <p className={shared.pageHeroText}>
                            Moments that define our journey and celebrate our impact
                        </p>
                    </div>
                </section>

                {/* Filter Tabs — masqué s'il n'y a aucune catégorie à filtrer */}
                {availableCategories.length > 0 && (
                <section className={styles.filterSection}>
                    <div className={shared.container}>
                        <div className={styles.filterLabel}>
                            <Filter size={18} />
                            Filter by:
                        </div>
                        <div className={styles.filterRow}>
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setFilter(cat.value)}
                                    className={`${styles.filterChip} ${filter === cat.value ? styles.filterChipActive : ''}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                )}

                {/* Gallery Grid */}
                <section className={styles.gridSection}>
                    <div className={shared.container}>
                        <p className={styles.resultsCount}>
                            Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
                            {filter !== 'all' && ` in ${categories.find(c => c.value === filter)?.label}`}
                        </p>

                        {isLoading ? (
                            <div className={shared.loadingWrap}>
                                <div className={shared.spinner}></div>
                                <p className={shared.loadingText}>Loading gallery...</p>
                            </div>
                        ) : filteredImages.length > 0 ? (
                            <div className={styles.imagesGrid}>
                                {filteredImages.map((item: any) => (
                                    <div key={item.id} className={styles.imageTile}>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image?.data?.url || item.image?.url}`}
                                            alt={item.caption || 'Gallery image'}
                                        />
                                        <div className={styles.imageGradient}></div>
                                        {item.caption && (
                                            <div className={styles.imageCaption}>
                                                <p>{item.caption}</p>
                                            </div>
                                        )}
                                        {item.category && (
                                            <div className={styles.imageCategoryBadge}>{item.category}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyWrap}>
                                <p className={styles.emptyText}>No images found in this category.</p>
                                <button onClick={() => setFilter('all')} className={styles.resetLink}>
                                    View all images
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className={shared.container}>
                        <div className={shared.bandBox}>
                            <h2 className={shared.bandTitle}>Be Part of Our Story</h2>
                            <p className={shared.bandText}>
                                Join us in creating more moments worth celebrating
                            </p>
                            <div className={styles.ctaButtons}>
                                <a href="/programmes" className={shared.btnPrimary}>
                                    Explore Programmes
                                </a>
                                <a href="/contact" className={shared.btnOutline}>
                                    Get Involved
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

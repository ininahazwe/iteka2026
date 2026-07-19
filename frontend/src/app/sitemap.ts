// app/sitemap.ts
import { MetadataRoute } from 'next';
import { fetchProgrammes, fetchActualites } from '@/src/lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://2026.itekarwanda.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [programmes, news] = await Promise.all([
        fetchProgrammes().catch(() => []),
        fetchActualites().catch(() => []),
    ]);

    const staticPages = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/approach`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/programmes`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/impact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/partners`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/festival`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/news`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/team`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/donate`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.6,
        },
    ];

    const programmeUrls = programmes.map((programme: any) => ({
        url: `${SITE_URL}/programmes/${programme.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const newsUrls = news.map((article: any) => ({
        url: `${SITE_URL}/news/${article.slug}`,
        lastModified: new Date(article.article_date || Date.now()),
        changeFrequency: 'never' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...programmeUrls, ...newsUrls];
}
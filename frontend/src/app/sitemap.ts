// app/sitemap.ts
import { MetadataRoute } from 'next';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://iteka2026.onrender.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iteka-frontend.vercel.app';

async function fetchStrapiData(endpoint: string) {
    try {
        const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
            next: { revalidate: 3600 } // Cache 1h
        });
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [programmes, news, teamMembers] = await Promise.all([
        fetchStrapiData('programmes'),
        fetchStrapiData('news-articles'),
        fetchStrapiData('team-members')
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
        url: `${SITE_URL}/programmes/${programme.documentId}`,
        lastModified: new Date(programme.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const newsUrls = news.map((article: any) => ({
        url: `${SITE_URL}/news/${article.documentId}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'never' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...programmeUrls, ...newsUrls];
}
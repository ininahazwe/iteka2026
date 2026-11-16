import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from '@/src/lib/seo';

// Rendu d'un bloc JSON-LD. On échappe "<" pour éviter toute fermeture de balise <script>.
function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
    );
}

export function OrganizationSchema() {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'NGO',
                name: SITE_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
                description: SITE_DESCRIPTION,
                address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'RW',
                    addressLocality: 'Kigali',
                },
            }}
        />
    );
}

export function WebSiteSchema() {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: SITE_NAME,
                url: SITE_URL,
                inLanguage: 'en',
            }}
        />
    );
}

export function ArticleSchema(props: {
    title: string;
    description: string;
    url: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    author?: string;
}) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'NewsArticle',
                headline: props.title,
                description: props.description,
                mainEntityOfPage: { '@type': 'WebPage', '@id': props.url },
                url: props.url,
                ...(props.image ? { image: [props.image] } : {}),
                ...(props.datePublished ? { datePublished: props.datePublished } : {}),
                ...(props.dateModified || props.datePublished
                    ? { dateModified: props.dateModified || props.datePublished }
                    : {}),
                author: props.author
                    ? { '@type': 'Person', name: props.author }
                    : { '@type': 'Organization', name: SITE_NAME },
                publisher: {
                    '@type': 'Organization',
                    name: SITE_NAME,
                    logo: { '@type': 'ImageObject', url: `${SITE_URL}${DEFAULT_OG_IMAGE}` },
                },
            }}
        />
    );
}

export function ProgrammeSchema(props: { name: string; description: string; url: string; image?: string }) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'Service',
                name: props.name,
                description: props.description,
                url: props.url,
                ...(props.image ? { image: props.image } : {}),
                provider: { '@type': 'NGO', name: SITE_NAME, url: SITE_URL },
                areaServed: { '@type': 'Country', name: 'Rwanda' },
            }}
        />
    );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
    return (
        <JsonLd
            data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items.map((item, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: item.name,
                    item: item.url,
                })),
            }}
        />
    );
}

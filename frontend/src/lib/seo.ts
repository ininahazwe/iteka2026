// src/lib/seo.ts
// Constantes et helpers SEO partagés (metadata, JSON-LD, sitemap, robots).

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://itekarwanda.org').replace(/\/$/, '');

export const SITE_NAME = 'Iteka Youth Organization';

export const SITE_DESCRIPTION =
  "Iteka Youth Organization empowers Rwanda's youth through talent discovery, skills development and peacebuilding.";

// Image par défaut pour les aperçus de partage (idéalement 1200x630, à remplacer plus tard).
export const DEFAULT_OG_IMAGE = '/logo-iteka.png';

const WP_ORIGIN = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.itekarwanda.org').replace(/\/$/, '');

/** Transforme un chemin média WordPress (relatif) en URL absolue. */
export function mediaAbsoluteUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${WP_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Retire le HTML, normalise les espaces et tronque proprement (pour meta description). */
export function toDescription(html?: string | null, max = 160): string {
  const text = (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&quot;|&#8220;|&#8221;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

/** Date en ISO 8601, ou undefined si la valeur n'est pas exploitable. */
export function toIsoDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const raw = /^\d{8}$/.test(value) ? `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}` : value;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

import type { Metadata } from 'next';

/**
 * Metadata complète d'une page : title, description, canonical, Open Graph, Twitter.
 * (Next.js ne fusionne pas openGraph/alternates en profondeur : chaque page doit donc
 * fournir son propre objet, d'où ce helper.)
 */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string; // ex: '/about' ou '/news/mon-article'
  image?: string; // URL absolue ou chemin du site
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
}): Metadata {
  const image = opts.image || DEFAULT_OG_IMAGE;
  const fullTitle = `${opts.title} | ${SITE_NAME}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    ...(opts.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: opts.type || 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: opts.path,
      title: fullTitle,
      description: opts.description,
      images: [{ url: image, alt: opts.title }],
      ...(opts.type === 'article' && opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: opts.description,
      images: [image],
    },
  };
}

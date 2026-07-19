// src/lib/api.ts
// Backend: WordPress + WPGraphQL (remplace Strapi)
//
// IMPORTANT sur les URLs d'images :
// Les composants font tous `${process.env.NEXT_PUBLIC_STRAPI_URL}${x.data.url}`
// (préfixage naïf, sans vérifier si l'URL est déjà absolue). Pour ne pas avoir
// à toucher aux ~14 pages qui consomment l'API, on garde le même nom de
// variable d'env (NEXT_PUBLIC_STRAPI_URL) et on renvoie `data.url` comme un
// chemin RELATIF (origine WordPress retirée), exactement comme le faisait
// Strapi. Il suffit de pointer NEXT_PUBLIC_STRAPI_URL vers
// https://admin.itekarwanda.org dans les env Vercel/serveur.

const WP_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://admin.itekarwanda.org/graphql';

const WP_ORIGIN = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.itekarwanda.org';

async function wpFetch<T = any>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // Les pages qui appellent ces fonctions via React Query gèrent déjà le
    // cache côté client ; pas besoin du cache Next ici.
    cache: 'no-store',
  });

  const json = await res.json();

  if (json.errors) {
    // console.warn (pas console.error) : évite de déclencher l'overlay plein écran
    // de Next.js en dev pour des erreurs de schéma WPGraphQL déjà gérées par l'appelant.
    console.warn('WPGraphQL error:', JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors[0]?.message || 'GraphQL error');
  }

  return json.data as T;
}

// --- Helpers de normalisation (forme identique à ce que renvoyait Strapi) ---

type MediaShape = { url: string; data: { url: string } } | null;

function mediaFromUrl(sourceUrl?: string | null): MediaShape {
  if (!sourceUrl) return null;
  let path = sourceUrl;
  try {
    const u = new URL(sourceUrl);
    // uniquement si l'URL pointe bien vers l'origine WP attendue, sinon on
    // garde l'URL absolue telle quelle (cas d'un média hébergé ailleurs)
    path = u.pathname + u.search;
  } catch {
    // sourceUrl déjà relative, on la garde telle quelle
  }
  return { url: path, data: { url: path } };
}

function mediaFromEdge(edge?: { node?: { sourceUrl?: string | null } } | null): MediaShape {
  return mediaFromUrl(edge?.node?.sourceUrl);
}

// impact_stats : ACF ne propose pas de champ Répéteur en version gratuite.
// Le champ est un Texte brut ; l'éditeur y colle un JSON du type
// `[{"label":"Youth reached","value":"500+"}]`. On le parse ici pour renvoyer
// le même tableau d'objets {label, value} qu'attendent les pages.
function parseImpactStats(raw?: string | null): { label: string; value: string }[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// --- Programmes ---

const PROGRAMME_QUERY_FIELDS = `
  databaseId
  slug
  title
  featuredImage { node { sourceUrl } }
  programmeFields {
    description
    shortDescription
    gallery { node { sourceUrl } }
    impactStats
    requirements
    applicationFormUrl
    isFeatured
    order
  }
`;

// Forme "Strapi v4 multi-media" attendue par les pages : { data: [{url}, ...] }
function mediaListShape(items: MediaShape[]) {
  return { data: items.filter(Boolean).map((m) => ({ url: (m as { url: string }).url })) };
}

function mapProgramme(node: any) {
  const f = node.programmeFields || {};
  const galleryImage = mediaFromEdge(f.gallery);
  return {
    id: node.databaseId,
    slug: node.slug,
    name: node.title,
    description: f.description,
    short_description: f.shortDescription,
    featured_image: mediaFromEdge(node.featuredImage),
    // Un seul champ Image côté ACF gratuit (pas de Galerie/Répéteur) :
    // on renvoie un tableau à 0 ou 1 élément dans la même forme que Strapi.
    gallery: mediaListShape(galleryImage ? [galleryImage] : []),
    impact_stats: parseImpactStats(f.impactStats),
    requirements: f.requirements,
    application_form_url: f.applicationFormUrl,
    is_featured: !!f.isFeatured,
    order: f.order ?? 0,
  };
}

export const fetchProgrammes = async () => {
  const data = await wpFetch(`
    query Programmes {
      programmes(first: 100) {
        nodes { ${PROGRAMME_QUERY_FIELDS} }
      }
    }
  `);
  return (data.programmes?.nodes || []).map(mapProgramme);
};

export const fetchProgrammeBySlug = async (slug: string) => {
  const data = await wpFetch(
    `
    query Programme($slug: ID!) {
      programme(id: $slug, idType: SLUG) { ${PROGRAMME_QUERY_FIELDS} }
    }
  `,
    { slug }
  );
  return data.programme ? mapProgramme(data.programme) : null;
};

// --- Actualites (news) ---

const NEWS_QUERY_FIELDS = `
  databaseId
  slug
  title
  date
  content
  featuredImage { node { sourceUrl } }
  newsFields {
    source
    sourceUrl
    articleDate
    author
    category
    isFeatured
  }
`;

function mapNews(node: any) {
  const f = node.newsFields || {};
  return {
    id: node.databaseId,
    slug: node.slug,
    title: node.title,
    content: node.content,
    // Le CPT News n'a pas le support "excerpt" côté WP : on le dérive du contenu
    excerpt: (node.content || '').replace(/<[^>]*>/g, '').trim().slice(0, 200),
    featured_image: mediaFromEdge(node.featuredImage),
    source: f.source,
    source_url: f.sourceUrl,
    article_date: f.articleDate || node.date,
    // alias attendu par un fallback existant dans news/[id]/page.tsx
    publishedAt: node.date,
    author: f.author,
    // ACF select renvoie un tableau (["Event"]) : on normalise en string
    category: Array.isArray(f.category) ? f.category[0] : f.category,
    is_featured: !!f.isFeatured,
    // Pas de taxonomie "tags" branchée côté WP pour l'instant (ACF gratuit
    // n'a pas de Répéteur). Tableau vide = section Tags masquée proprement.
    tags: [] as { name: string }[],
  };
}

export const fetchActualites = async () => {
  // Le CPT "News" a un nom GraphQL singulier == pluriel ("news"), donc
  // WPGraphQL expose la connection liste sous "allNews" (et "news" reste la
  // query single-item par ID/slug).
  try {
    const data = await wpFetch(`
      query News {
        allNews(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
          nodes { ${NEWS_QUERY_FIELDS} }
        }
      }
    `);
    return (data.allNews?.nodes || []).map(mapNews);
  } catch (err) {
    console.warn('fetchActualites: erreur WPGraphQL "allNews", fallback []', err);
    return [];
  }
};

export const fetchActualiteBySlug = async (slug: string) => {
  try {
    const data = await wpFetch(
      `
      query SingleNews($slug: ID!) {
        news(id: $slug, idType: SLUG) { ${NEWS_QUERY_FIELDS} }
      }
    `,
      { slug }
    );
    return data.news ? mapNews(data.news) : null;
  } catch (err) {
    console.warn('fetchActualiteBySlug: schéma WPGraphQL "news" indisponible, fallback null', err);
    return null;
  }
};

// --- Gallery ---

const GALLERY_QUERY_FIELDS = `
  databaseId
  featuredImage { node { sourceUrl } }
  galleryFields {
    caption
    category
    dateTaken
    photographer
    order
  }
`;

function mapGalleryItem(node: any) {
  const f = node.galleryFields || {};
  return {
    id: node.databaseId,
    image: mediaFromEdge(node.featuredImage),
    caption: f.caption,
    // ACF select renvoie un tableau (["Events"]) : on normalise en string
    category: Array.isArray(f.category) ? f.category[0] : f.category,
    date_taken: f.dateTaken,
    photographer: f.photographer,
    order: f.order ?? 0,
  };
}

export const fetchGalleries = async (category?: string) => {
  const data = await wpFetch(`
    query Galleries {
      galleries(first: 100) {
        nodes { ${GALLERY_QUERY_FIELDS} }
      }
    }
  `);
  let items = (data.galleries?.nodes || []).map(mapGalleryItem);
  if (category) {
    items = items.filter((g: any) => g.category === category);
  }
  return items.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
};

export const fetchGalleryImages = async () => fetchGalleries();

// --- Partners ---

const PARTNER_QUERY_FIELDS = `
  databaseId
  title
  featuredImage { node { sourceUrl } }
  partnerFields {
    description
    website
    partnershipType
    isFeatured
    order
  }
`;

function mapPartner(node: any) {
  const f = node.partnerFields || {};
  return {
    id: node.databaseId,
    name: node.title,
    logo: mediaFromEdge(node.featuredImage),
    description: f.description,
    website: f.website,
    partnership_type: f.partnershipType,
    is_featured: !!f.isFeatured,
    order: f.order ?? 0,
  };
}

export const fetchPartners = async () => {
  const data = await wpFetch(`
    query Partners {
      partners(first: 100) {
        nodes { ${PARTNER_QUERY_FIELDS} }
      }
    }
  `);
  return (data.partners?.nodes || [])
    .map(mapPartner)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
};

// --- Team members ---

const TEAM_MEMBER_QUERY_FIELDS = `
  databaseId
  title
  featuredImage { node { sourceUrl } }
  teamMemberFields {
    role
    bio
    email
    linkedinUrl
    order
    isLeadership
  }
`;

function mapTeamMember(node: any) {
  const f = node.teamMemberFields || {};
  return {
    id: node.databaseId,
    name: node.title,
    role: f.role,
    bio: f.bio,
    photo: mediaFromEdge(node.featuredImage),
    email: f.email,
    linkedin_url: f.linkedinUrl,
    order: f.order ?? 0,
    is_leadership: !!f.isLeadership,
  };
}

export const fetchTeamMembers = async () => {
  const data = await wpFetch(`
    query TeamMembers {
      teamMembers(first: 100) {
        nodes { ${TEAM_MEMBER_QUERY_FIELDS} }
      }
    }
  `);
  return (data.teamMembers?.nodes || [])
    .map(mapTeamMember)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
};

// --- Impact stats ---

const IMPACT_STAT_QUERY_FIELDS = `
  databaseId
  impactStatFields {
    label
    value
    description
    icon
    order
  }
`;

function mapImpactStat(node: any) {
  const f = node.impactStatFields || {};
  return {
    id: node.databaseId,
    label: f.label,
    value: f.value,
    description: f.description,
    icon: f.icon,
    order: f.order ?? 0,
  };
}

export const fetchImpactStats = async () => {
  const data = await wpFetch(`
    query ImpactStats {
      impactStats(first: 100) {
        nodes { ${IMPACT_STAT_QUERY_FIELDS} }
      }
    }
  `);
  return (data.impactStats?.nodes || [])
    .map(mapImpactStat)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
};

// --- Testimonials ---

const TESTIMONIAL_QUERY_FIELDS = `
  databaseId
  testimonialFields {
    quote
    authorName
    authorRole
    authorPhoto { node { sourceUrl } }
    isFeatured
    order
  }
`;

function mapTestimonial(node: any) {
  const f = node.testimonialFields || {};
  return {
    id: node.databaseId,
    quote: f.quote,
    author_name: f.authorName,
    author_role: f.authorRole,
    author_photo: mediaFromEdge(f.authorPhoto),
    is_featured: !!f.isFeatured,
    order: f.order ?? 0,
  };
}

export const fetchTestimonials = async () => {
  const data = await wpFetch(`
    query Testimonials {
      testimonials(first: 100) {
        nodes { ${TESTIMONIAL_QUERY_FIELDS} }
      }
    }
  `);
  return (data.testimonials?.nodes || [])
    .map(mapTestimonial)
    .filter((t: any) => t.is_featured)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
};

// --- Events (ex-CPT Festival, généralisé) ---
// Champ ACF `type` : festival | training | conference | other.
// La page /festival consomme l'event de type "festival" le plus récent.

const EVENT_QUERY_FIELDS = `
  databaseId
  title
  date
  featuredImage { node { sourceUrl } }
  eventFields {
    type
    edition
    description
    dateStart
    dateEnd
    locationName
    galleryImage { node { sourceUrl } }
    programPdf { node { mediaItemUrl } }
    registrationUrl
  }
`;

function mapEvent(node: any) {
  const f = node.eventFields || {};
  return {
    id: node.databaseId,
    title: node.title,
    // select ACF : peut revenir en tableau selon la config, on normalise
    // Valeurs ACF capitalisées ("Festival") : normalisées en minuscules
    type: String(Array.isArray(f.type) ? f.type[0] : f.type || '').toLowerCase(),
    // NB: le champ ACF s'appelle "title" (name) mais WPGraphQL l'expose
    // toujours sous "edition" (GraphQL field name figé)
    edition: f.edition,
    description: f.description,
    date_start: f.dateStart,
    date_end: f.dateEnd,
    location: f.locationName,
    hero_image: mediaFromEdge(node.featuredImage),
    gallery: f.galleryImage ? [mediaFromEdge(f.galleryImage)] : [],
    program_pdf: f.programPdf?.node?.mediaItemUrl || null,
    registration_url: f.registrationUrl,
  };
}

export const fetchEvents = async (type?: string) => {
  const data = await wpFetch(`
    query Events {
      events(first: 100) {
        nodes { ${EVENT_QUERY_FIELDS} }
      }
    }
  `);
  let items = (data.events?.nodes || []).map(mapEvent);
  if (type) items = items.filter((e: any) => e.type === type);
  return items;
};

// Rétro-compatible : la page /festival continue d'appeler fetchFestival()
export const fetchFestival = async () => {
  const events = await fetchEvents('festival');
  return events[0] || null;
};

// --- Contact (inchangé : géré par /api/contact, pas par WordPress) ---

export const submitContactMessage = async (data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

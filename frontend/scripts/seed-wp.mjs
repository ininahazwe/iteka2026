// Seed du contenu CMS Iteka via WP REST API.
// Usage :
//   WP_USER=headless-admin WP_APP_PASS='xxxx xxxx xxxx xxxx xxxx xxxx' node scripts/seed-wp.mjs
//
// Idempotent : recherche par slug avant création, met à jour si l'entrée existe.
// Les champs ACF sont envoyés via la clé `acf` (nécessite "Show in REST API"
// activé sur chaque groupe de champs ACF — le script le vérifie et prévient).

const WP = 'https://admin.itekarwanda.org/wp-json/wp/v2';
const USER = process.env.WP_USER;
const PASS = process.env.WP_APP_PASS;

if (!USER || !PASS) {
  console.error('Manque WP_USER / WP_APP_PASS en variables d\'environnement.');
  process.exit(1);
}

const AUTH = 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64');

async function api(method, path, body) {
  const res = await fetch(`${WP}${path}`, {
    method,
    headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok) {
    throw new Error(`${method} ${path} -> ${res.status}: ${typeof json === 'string' ? json.slice(0, 200) : JSON.stringify(json).slice(0, 300)}`);
  }
  return json;
}

function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function upsert(restBase, entry) {
  const slug = entry.slug || slugify(entry.title);
  const existing = await api('GET', `/${restBase}?slug=${slug}&status=publish,draft`);
  const payload = { ...entry, slug, status: 'publish' };
  let result;
  if (Array.isArray(existing) && existing.length > 0) {
    result = await api('POST', `/${restBase}/${existing[0].id}`, payload);
    console.log(`  ~ mis à jour: [${restBase}] ${entry.title} (#${result.id})`);
  } else {
    result = await api('POST', `/${restBase}`, payload);
    console.log(`  + créé: [${restBase}] ${entry.title} (#${result.id})`);
  }
  // Vérification ACF
  if (entry.acf && result.acf && Object.keys(result.acf).length === 0) {
    console.warn(`  ! ATTENTION: champs ACF non persistés pour "${entry.title}".`);
    console.warn(`    Active "Show in REST API" sur le groupe de champs ACF correspondant (ACF > Field Groups > Settings).`);
  }
  return result;
}

const p = (s) => `<p>${s}</p>`;

// ---------------------------------------------------------------- Programmes
const programmes = [
  {
    title: 'Education and Capacity Building Programme',
    content:
      p('The Iteka Junior Academy is IYO\'s foundational education initiative, based in Bumbogo, Gasabo District, Rwanda. The Academy provides free, high-quality nursery-level education to young children from underserved communities, laying the academic and social groundwork they need to transition into primary school with confidence and success.'),
    acf: {
      description:
        p('The Iteka Junior Academy is IYO\'s foundational education initiative, based in Bumbogo, Gasabo District, Rwanda. The Academy provides free, high-quality nursery-level education to young children from underserved communities, laying the academic and social groundwork they need to transition into primary school with confidence and success.'),
      short_description:
        'Free, high-quality nursery education for children from underserved communities through the Iteka Junior Academy in Bumbogo, Gasabo District.',
      is_featured: true,
      order: 1,
    },
  },
  {
    title: 'Culture and Creative Arts Programme',
    content:
      p('We champion creativity and self-expression across a range of disciplines, including visual arts, handicrafts, music, dance, and performance.') +
      p('Central to this work is our annual Iteka African Cultural Festival (IACF) — a multi-day celebration of African heritage that brings together artists, communities, and institutions from across the region to honour culture, showcase talent, and inspire the next generation.'),
    acf: {
      description:
        p('We champion creativity and self-expression across a range of disciplines, including visual arts, handicrafts, music, dance, and performance.') +
        p('Central to this work is our annual Iteka African Cultural Festival (IACF) — a multi-day celebration of African heritage that brings together artists, communities, and institutions from across the region to honour culture, showcase talent, and inspire the next generation.'),
      short_description:
        'Championing creativity and self-expression across visual arts, handicrafts, music, dance, and performance — including the annual Iteka African Cultural Festival.',
      is_featured: true,
      order: 2,
    },
  },
  {
    title: 'Youth Empowerment and Skills Development Programme',
    content:
      p('Leadership Development: We deliver regular workshops and structured learning experiences to equip young people with practical and sustainable leadership skills, fostering a strong sense of responsibility and accountability within their communities. These workshops are delivered as part of the Art for Youth Resilience and Livelihood Programme, open to all selected participants across the programme\'s cohorts.') +
      p('Entrepreneurship and Business Development: We offer hands-on training and mentorship to help young people launch, manage, and grow their own businesses, promoting financial independence and economic self-sufficiency. This activity forms an integral part of the Art for Youth Resilience and Livelihood Programme, building on participants\' creative skills to equip them with the business competencies needed to turn their artistic practice into a sustainable livelihood.'),
    acf: {
      description:
        p('Leadership Development: We deliver regular workshops and structured learning experiences to equip young people with practical and sustainable leadership skills, fostering a strong sense of responsibility and accountability within their communities.') +
        p('Entrepreneurship and Business Development: We offer hands-on training and mentorship to help young people launch, manage, and grow their own businesses, promoting financial independence and economic self-sufficiency.'),
      short_description:
        'Leadership workshops, entrepreneurship training, and mentorship equipping young people with skills for responsibility, financial independence, and sustainable livelihoods.',
      is_featured: true,
      order: 3,
    },
  },
  {
    title: 'Health & Wellbeing Programme',
    content:
      p('We actively champion health and dignity by tackling period poverty. In observance of International Women\'s Day 2024 in the Muhanga District, we launched an essential outreach campaign: distributing 30 comprehensive sanitary pad kits and providing vital reproductive health education and psychosocial support to young girls and women within the community.'),
    acf: {
      description:
        p('We actively champion health and dignity by tackling period poverty. In observance of International Women\'s Day 2024 in the Muhanga District, we launched an essential outreach campaign: distributing 30 comprehensive sanitary pad kits and providing vital reproductive health education and psychosocial support to young girls and women within the community.'),
      short_description:
        'Championing health and dignity through menstrual hygiene management, reproductive health education, and psychosocial support for young girls and women.',
      is_featured: true,
      order: 4,
    },
  },
  {
    title: 'Children and Youth Rights & Social Development Programme',
    content:
      p('Through dynamic public performances and focused advocacy campaigns, we amplify the voices of the younger generation. Our initiatives focus on raising awareness of children\'s and youth rights, celebrating their cultural and academic achievements, and actively addressing the systemic challenges they face.'),
    acf: {
      description:
        p('Through dynamic public performances and focused advocacy campaigns, we amplify the voices of the younger generation. Our initiatives focus on raising awareness of children\'s and youth rights, celebrating their cultural and academic achievements, and actively addressing the systemic challenges they face.'),
      short_description:
        'Advocacy campaigns and public performances raising awareness of children\'s and youth rights and addressing the systemic challenges they face.',
      is_featured: true,
      order: 5,
    },
  },
];

// ---------------------------------------------------------------- Impact stats
const impactStats = [
  {
    title: 'Youth Reached',
    acf: { label: 'Youth Reached', value: '6,000+', description: 'Total youth reached in the last 5 years (2020–2025)', icon: 'users', order: 1 },
  },
  {
    title: 'Social Media Views',
    acf: { label: 'Social Media Views', value: '31,000+', description: "Views across IYO's platforms: X, Instagram, YouTube, Facebook and LinkedIn", icon: 'eye', order: 2 },
  },
  {
    title: 'Art for Youth Participants',
    acf: { label: 'Art for Youth Participants', value: '93', description: 'Directly engaged across Burundi, DRC, and Rwanda (50 female, 43 male)', icon: 'palette', order: 3 },
  },
  {
    title: 'IACF Festival-Goers',
    acf: { label: 'IACF Festival-Goers', value: '600+', description: 'Attendance at the Iteka African Cultural Festival, with 94% likely to recommend', icon: 'calendar', order: 4 },
  },
];

// ---------------------------------------------------------------- Testimonials
const testimonials = [
  {
    title: 'IACF 2026 Respondent',
    acf: {
      quote: 'The drumming, the dancing, and the energy of the performances were something memorable and uniquely African. A 94% willingness to recommend confirms the festival has found its identity and its audience.',
      author_name: '2026 IACF Respondent',
      author_role: 'Festival Attendee',
      is_featured: true,
      order: 1,
    },
  },
];

// ---------------------------------------------------------------- News
const news = [
  {
    title: 'Iteka Drummers Shine at SICA 2025 in Abidjan',
    date: '2025-07-31T12:00:00',
    content:
      p('In July 2025, Iteka Youth Organisation, in collaboration with Yan Events and Orun Studios, facilitated the participation of the Iteka Drummers at the Salon International du Contenu Audiovisuel (SICA) 2025 in Abidjan, Côte d\'Ivoire.') +
      p('The ensemble, composed of Burundian youth, showcased Burundian traditional drumming before an international audience of about 300 people, highlighting the cultural richness and diversity of the African continent.') +
      p('The initiative aimed to amplify the international visibility of young African artists, foster intercultural dialogue, and expand professional networks across the audiovisual and performing arts sectors.'),
    excerpt: 'The Iteka Drummers showcased Burundian traditional drumming before an international audience of about 300 people at SICA 2025 in Abidjan, Côte d\'Ivoire.',
    acf: { category: 'Event', article_date: '2025-07-31 12:00:00', is_featured: true },
  },
  {
    title: 'IACF 2026: Echoes of Motherland Heritage',
    content:
      p('IYO hosted the Iteka African Cultural Festival 2026 (IACF 2026), a vibrant three-day celebration of African heritage under the theme "Echoes of Motherland Heritage: Tradition, Innovation, and Social Transformation."') +
      p('The festival brought together artists, performers, culinary experts, and community groups — with a total of 1,048 participants — to expand access to cultural experiences, promote regional tourism, and strengthen partnerships with schools and artisan cooperatives.') +
      p('The first two days featured a panel discussion at African Leadership University (ALU), highlighting the importance of valuing African culture and fostering collaboration to position it as a driver of creativity and legacy. The festival concluded with a dynamic finale, where artists showcased their talents and young people actively engaged in celebrating and appreciating their cultural heritage.'),
    excerpt: 'A vibrant three-day celebration of African heritage bringing together 1,048 participants under the theme "Echoes of Motherland Heritage: Tradition, Innovation, and Social Transformation."',
    // Date exacte non fournie — placeholder à corriger dans wp-admin
    acf: { category: 'Event', article_date: '2026-06-01 12:00:00', is_featured: true },
  },
  {
    title: 'Skills to Thrive: Business and Entrepreneurship Training',
    content:
      p('Implemented from June 2025 to February 2027, the IYO Art for Youth Resilience and Livelihood Programme is advancing its mission of strengthening youth skills development, cultural engagement, and social inclusion through a series of targeted initiatives.') +
      p('One of the key milestones has been the organisation of a three-day training — Skills to Thrive: Business and Entrepreneurship — designed to equip young creatives with practical business development competencies. The training guided participants through advanced, hands-on modules covering market identification, brand development, idea refinement, and pitching, providing the skills and confidence needed to pursue sustainable livelihoods in the creative sector.'),
    excerpt: 'A three-day training equipping young creatives with practical business development competencies: market identification, brand development, idea refinement, and pitching.',
    // Date exacte non fournie — placeholder à corriger dans wp-admin
    acf: { category: 'Achievement', article_date: '2025-12-01 12:00:00', is_featured: false },
  },
  {
    title: 'Digital Marketing, Monetisation and Online Branding Training',
    date: '2026-04-25T12:00:00',
    content:
      p('On 24–25 April 2026, Iteka Youth Organisation\'s Art for Youth Resilience and Livelihood Programme marked another key achievement with the successful delivery of its Digital Marketing, Monetisation, and Online Branding Training, designed to equip young creatives with the business acumen, digital literacy, and market knowledge needed to turn their artistic talent into sustainable income.') +
      p('Developed in response to a clear gap — whereby many young artists held social media accounts on platforms such as TikTok, Instagram, and YouTube, yet remained passive users rather than intentional publishers — the training sought to shift participants\' mindsets towards strategic communication, audience engagement, and consistent content creation, directly advancing the programme\'s goal of building economically empowered young artists across Rwanda.') +
      p('Of the 62 young creatives assessed through the pre-training selection survey, the average baseline digital business-readiness score was 70%, pointing to clear gaps in professional practices such as formal client communication, financial record-keeping, and recognising fraudulent "grant" offers — precisely the areas the training was designed to close.') +
      p('Following delivery, 44 participants (24 male, 20 female) completed the post-training evaluation. Understanding of core digital marketing concepts — from audience engagement to what "boosting" a post actually means — improved from an average of 90% correct pre-training to 95% correct post-training, most visible in areas like consistent posting strategy and paid promotion mechanics.') +
      p('Satisfaction levels were consistently strong: 86% of participants rated the training content as "high" or "very high" (average 4.3 out of 5), 91% rated the facilitation and delivery methods as "high" or "very high" (average 4.4 out of 5), and 80% rated the level of hands-on practice as "high" or "very high" (average 4.1 out of 5). As one participant put it, the training helped shift how they see their own platforms — from social spaces to marketplaces.'),
    excerpt: 'Two days of training equipping young creatives with digital marketing, monetisation, and online branding skills — understanding of core concepts rose from 90% to 95%.',
    acf: { category: 'Achievement', article_date: '2026-04-25 12:00:00', is_featured: true },
  },
];

// ---------------------------------------------------------------- Event (ex-festival)
const festival = {
  title: 'Iteka African Cultural Festival',
  content: '',
  acf: {
    type: 'Festival',
    title: '2026 Edition',
    description:
      p('The Iteka African Cultural Festival (IACF) is an annual, multi-day celebration of African heritage that brings together artists, musicians, dancers, performers, culinary experts, schools, and communities from across the region.') +
      p('Through live performances, workshops, intercultural competitions, and exhibitions, the festival creates a vibrant, high-visibility space where culture is both honoured and reimagined, growing in scale, reach, and impact with every edition. At its core, IACF is driven by a commitment to youth empowerment, cultural preservation, and social transformation.') +
      p('It is a place where communities gather in pride, where emerging talent shares the stage with established artists, and where the richness of African identity is celebrated in all its forms. With a strong network of institutional partners and a proven track record of growth, IACF stands as one of the region\'s most meaningful platforms for culture, creativity, and community.') +
      p('<strong>Attendance:</strong> 600+ festival-goers &middot; <strong>Mean experience score:</strong> 7.7/10 &middot; <strong>Would recommend:</strong> 94% likely or very likely &middot; <strong>Rated 8 or above:</strong> 62.5%'),
  },
};

// ---------------------------------------------------------------- Partners
const partners = [
  { title: 'Association des Guides du Rwanda', acf: { order: 1 } },
  { title: 'Safiya Ibn Garba DTRF Remera', acf: { order: 2 } },
  { title: 'African Leadership University', acf: { order: 3 } },
  { title: 'YAN Events', acf: { description: 'Kigali City', order: 4 } },
];

// ---------------------------------------------------------------- Run
async function main() {
  console.log('Programmes…');
  for (const e of programmes) await upsert('programme', e);

  console.log('Impact stats…');
  for (const e of impactStats) await upsert('impact_stat', e);

  console.log('Testimonials…');
  for (const e of testimonials) await upsert('testimonial', e);

  console.log('News…');
  for (const e of news) await upsert('news', e);

  console.log('Event (festival)…');
  await upsert('event', festival);

  console.log('Partners…');
  for (const e of partners) await upsert('partner', e);

  console.log('\nTerminé. À faire manuellement dans wp-admin :');
  console.log('- Images à la une (programmes, news, festival) + logos partenaires');
  console.log('- Supprimer le programme "Test" (#54) s\'il existe encore');
  console.log('- Vérifier les dates : IACF 2026 et Skills to Thrive (dates exactes non fournies)');
  console.log('- Révoquer l\'Application Password "claude-injection"');
}

main().catch((err) => {
  console.error('\nErreur:', err.message);
  process.exit(1);
});

import axios from 'axios';

// Backend Strapi sur Render
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://iteka2026.onrender.com';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
  },
});

// Helper pour extraire les données Strapi v4
const extractData = (response: any) => {
  const data = response.data;

  if (Array.isArray(data)) {
    return data.map((item: any) => ({
      id: item.id,
      documentId: item.documentId,
      slug: item.slug,
      ...item,
    }));
  }

  return {
    id: data.id,
    documentId: data.documentId,
    ...data,
  };
};
export const fetchProgrammes = async () => {
  const response = await strapiClient.get('/programmes?populate=*');
  return response.data.data; // Retourne directement sans extractData
};

export const fetchProgrammeBySlug = async (slug: string) => {
  const response = await strapiClient.get(`/programmes?filters[slug][$eq]=${slug}&populate=*`);
  const data = extractData(response.data);
  return Array.isArray(data) ? data[0] : data;
};

export const fetchActualites = async () => {
  const response = await strapiClient.get('/news?sort=published_at:desc&populate=*');
  return extractData(response.data);
};

export const fetchActualiteBySlug = async (slug: string) => {
  const response = await strapiClient.get(`/news?filters[slug][$eq]=${slug}&populate=*`);
  const data = extractData(response.data);
  return Array.isArray(data) ? data[0] : data;
};

export const fetchGalleries = async (category?: string) => {
  const url = category
      ? `/galleries?filters[category][$eq]=${category}&sort=order&populate=*`
      : '/galleries?sort=order&populate=*';
  const response = await strapiClient.get(url);
  return extractData(response.data);
};

export const fetchGalleryImages = async () => {
  const response = await strapiClient.get('/galleries?sort=order&populate=*');
  return extractData(response.data);
};

export const fetchPartners = async () => {
  const response = await strapiClient.get('/partners?sort=order&populate=*');
  return extractData(response.data);
};

export const fetchTeamMembers = async () => {
  const response = await strapiClient.get('/team-members?sort=order&populate=*');
  return extractData(response.data);
};

export const fetchImpactStats = async () => {
  const response = await strapiClient.get('/impact-stats?sort=order');
  return extractData(response.data);
};

export const fetchTestimonials = async () => {
  const response = await strapiClient.get(
      '/testimonials?filters[is_featured][$eq]=true&sort=order&populate=*'
  );
  return extractData(response.data);
};

export const fetchFestival = async () => {
  const response = await strapiClient.get('/festival?populate=*');
  return response.data.data.attributes;
};

export const submitContactMessage = async (data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}) => {
  const response = await strapiClient.post('/contact-messages', { data });
  return response.data;
};
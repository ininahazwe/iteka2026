import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const strapiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
});

export const fetchProgrammes = async () => {
  const response = await strapiClient.get('/programmes?populate=*');
  return response.data.data;
};

export const fetchProgrammeBySlug = async (slug: string) => {
  const response = await strapiClient.get(
    `/programmes?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data.data[0];
};

export const fetchActualites = async () => {
  const response = await strapiClient.get('/actualites?populate=*&sort=article_date:desc');
  return response.data.data;
};

export const fetchActualiteBySlug = async (slug: string) => {
  const response = await strapiClient.get(
    `/actualites?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data.data[0];
};

export const fetchGalleries = async (category?: string) => {
  const url = category
    ? `/galleries?filters[category][$eq]=${category}&sort=order:asc&populate=*`
    : '/galleries?sort=order:asc&populate=*';
  const response = await strapiClient.get(url);
  return response.data.data;
};

export const fetchPartners = async () => {
  const response = await strapiClient.get('/partners?sort=order:asc&populate=*');
  console.log(fetchPartners);
  return response.data.data;
};

export const fetchTeamMembers = async () => {
  const response = await strapiClient.get('/team-members?sort=order:asc&populate=*');
  return response.data.data;
};

export const fetchImpactStats = async () => {
  const response = await strapiClient.get('/impact-stats?sort=order:asc');
  return response.data.data;
};

export const fetchTestimonials = async () => {
  const response = await strapiClient.get(
    '/testimonials?filters[is_featured][$eq]=true&sort=order:asc&populate=*'
  );
  return response.data.data;
};

export const fetchFestival = async () => {
  const response = await strapiClient.get('/festival?populate=deep');
  return response.data.data;
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
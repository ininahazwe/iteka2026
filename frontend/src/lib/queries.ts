// src/lib/queries.ts
// Définition unique des requêtes React Query : utilisée par les pages (useQuery côté
// client) ET par le préchargement serveur (lib/prefetch.ts), pour que les clés
// correspondent toujours et que les données soient présentes dans le HTML initial.
import {
  fetchProgrammes,
  fetchActualites,
  fetchTestimonials,
  fetchImpactStats,
  fetchGalleryImages,
  fetchPartners,
  fetchTeamMembers,
  fetchFestival,
  fetchEvents,
} from './api';

export const queries = {
  programmes: { queryKey: ['programmes'], queryFn: () => fetchProgrammes() },
  actualites: { queryKey: ['actualites'], queryFn: () => fetchActualites() },
  testimonials: { queryKey: ['testimonials'], queryFn: () => fetchTestimonials() },
  impactStats: { queryKey: ['impact-stats'], queryFn: () => fetchImpactStats() },
  gallery: { queryKey: ['gallery'], queryFn: () => fetchGalleryImages() },
  partners: { queryKey: ['partners'], queryFn: () => fetchPartners() },
  teamMembers: { queryKey: ['team-members'], queryFn: () => fetchTeamMembers() },
  festival: { queryKey: ['festival'], queryFn: () => fetchFestival() },
  events: { queryKey: ['events'], queryFn: () => fetchEvents() },
} as const;

export type QueryName = keyof typeof queries;

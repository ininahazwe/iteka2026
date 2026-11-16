// src/lib/config.ts
// Origine du site WordPress (back-office + médias). Valeur par défaut = production.
export const WP_URL = (process.env.NEXT_PUBLIC_WP_URL || 'https://admin.itekarwanda.org').replace(/\/$/, '');

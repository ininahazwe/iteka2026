# Déploiement frontend — VPS IONOS

VPS AlmaLinux 9, `212.132.85.245`. Test actuel sur `2026.itekarwanda.org`, bascule prévue vers `itekarwanda.org` une fois validé.

## Premier setup (une fois)

1. `ssh root@212.132.85.245`
2. Copier-coller le contenu de `setup-vps.sh` et l'exécuter (installe Node 20, PM2, Nginx, Certbot).
3. DNS IONOS : ajouter un enregistrement `A` — nom d'hôte `2026`, valeur `212.132.85.245`.
4. Copier `nginx-2026.itekarwanda.org.conf` vers `/etc/nginx/conf.d/` sur le VPS, puis `nginx -t && systemctl reload nginx`.
5. Sur le VPS, créer `/var/www/iteka2026/frontend/.env.production.local` avec les variables listées ci-dessous.
6. Depuis ta machine locale : `./deploy.sh` (clone, build, démarre PM2).
7. Une fois le DNS propagé : `ssh root@212.132.85.245` puis `certbot --nginx -d 2026.itekarwanda.org` (ajoute le HTTPS + redirection).
8. Persistance au reboot : sur le VPS, `pm2 startup systemd` puis exécuter la commande qu'il affiche, puis `pm2 save`.

## Variables d'environnement (`frontend/.env.production.local`)

```
# --- Site -----------------------------------------------------------------
# OBLIGATOIRE. Utilisée par src/app/robots.ts, src/app/sitemap.ts et
# src/components/StructureData.tsx. Variable NEXT_PUBLIC_ => figée au moment
# du `npm run build` : la renseigner AVANT de lancer ./deploy.sh.
# Si absente, robots.txt pointe vers iteka-frontend.vercel.app et le sitemap
# liste les URLs en 2026.itekarwanda.org.
NEXT_PUBLIC_SITE_URL=https://itekarwanda.org

# --- Backend WordPress ----------------------------------------------------
NEXT_PUBLIC_WP_GRAPHQL_URL=https://admin.itekarwanda.org/graphql
# Conservé sous ce nom pour des raisons historiques : sert d'origine WordPress
# pour préfixer les URLs d'images (voir le commentaire en tête de src/lib/api.ts).
NEXT_PUBLIC_STRAPI_URL=https://admin.itekarwanda.org
STRAPI_API_TOKEN=

# --- Stripe ---------------------------------------------------------------
# NON UTILISÉ dans le projet. À décommenter si la page /donate est activée.
# Attention : src/app/donate/page.tsx lit NEXT_PUBLIC_STRIPE_PUBLIC_KEY
# (et non ..._PUBLISHABLE_KEY) — harmoniser les deux noms avant activation.
# NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
# STRIPE_SECRET_KEY=

# --- Emails ---------------------------------------------------------------
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=contact@itekarwanda.org
RESEND_API_KEY=

# --- reCAPTCHA v3 ---------------------------------------------------------
# Les clés sont liées à une liste de domaines côté Google : ajouter
# itekarwanda.org et www.itekarwanda.org dans la console reCAPTCHA AVANT la
# bascule, sinon le formulaire de contact casse.
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

## Déploiements suivants

Depuis ta machine locale : `./deploy.sh` — pull, build, redémarre PM2. Idempotent (gère aussi le tout premier déploiement si `/var/www/iteka2026` n'existe pas encore).

Le script ne contient **aucune** référence au nom de domaine (malgré son commentaire d'en-tête qui mentionne une variable `DOMAIN` inexistante) : la bascule ne demande donc aucune modification de `deploy.sh`.

## Bascule vers le domaine officiel (`itekarwanda.org`)

### Avant (à faire en amont)

1. Console Google reCAPTCHA : ajouter `itekarwanda.org` et `www.itekarwanda.org` aux domaines autorisés.
2. DNS IONOS : `A itekarwanda.org` et `A www` -> `212.132.85.245`. **Garder** l'enregistrement `2026` pour la redirection.
3. Attendre la propagation : `dig +short itekarwanda.org www.itekarwanda.org`.

### Build

4. Sur le VPS, mettre `NEXT_PUBLIC_SITE_URL=https://itekarwanda.org` dans `/var/www/iteka2026/frontend/.env.production.local`.
5. Depuis la machine locale : `./deploy.sh` (rebuild obligatoire — la variable est inlinée au build).

### Nginx + SSL

6. Sur le VPS : `rm /etc/nginx/conf.d/2026.itekarwanda.org.conf` (sinon conflit de `server_name`).
7. Installer `nginx-itekarwanda.org-bootstrap.conf` sous `/etc/nginx/conf.d/itekarwanda.org.conf`, puis `nginx -t && systemctl reload nginx`.
8. `mkdir -p /var/www/letsencrypt`
9. `certbot --nginx -d itekarwanda.org -d www.itekarwanda.org -d 2026.itekarwanda.org`
10. Remplacer par `nginx-itekarwanda.org.conf` (version finale : redirections `www` et `2026` vers l'apex, en-têtes de sécurité, gzip, cache des assets), puis `nginx -t && systemctl reload nginx`.

### Vérifications

11. `curl -I https://itekarwanda.org` -> 200 ; `curl -I https://www.itekarwanda.org` et `https://2026.itekarwanda.org` -> 301 vers l'apex.
12. `https://itekarwanda.org/robots.txt` et `/sitemap.xml` -> doivent mentionner `itekarwanda.org`, pas Vercel ni le sous-domaine `2026`.
13. Tester le formulaire de contact (reCAPTCHA).
14. Une fois tout validé : décommenter la ligne HSTS dans `nginx-itekarwanda.org.conf`, et éventuellement installer `nginx-00-default-server.conf`.
15. Search Console : déclarer la nouvelle propriété et soumettre le sitemap.

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
NEXT_PUBLIC_WP_GRAPHQL_URL=https://admin.itekarwanda.org/graphql
NEXT_PUBLIC_STRAPI_URL=https://admin.itekarwanda.org
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=contact@itekarwanda.org
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RESEND_API_KEY=
```

## Déploiements suivants

Depuis ta machine locale : `./deploy.sh` — pull, build, redémarre PM2. Idempotent (gère aussi le tout premier déploiement si `/var/www/iteka2026` n'existe pas encore).

## Bascule vers le domaine officiel (`itekarwanda.org`)

1. DNS IONOS : pointe `itekarwanda.org` (et `www`) vers `212.132.85.245`.
2. Nouveau fichier Nginx `/etc/nginx/conf.d/itekarwanda.org.conf` (copie de celui de `2026.`, `server_name` changé), `nginx -t && systemctl reload nginx`.
3. `certbot --nginx -d itekarwanda.org -d www.itekarwanda.org`.
4. Changer `DOMAIN`/`server_name` n'affecte pas `deploy.sh` — le script déploie la même appli PM2, juste exposée sur un nouveau nom de domaine.
5. Retirer l'ancien enregistrement DNS `2026` si plus besoin.

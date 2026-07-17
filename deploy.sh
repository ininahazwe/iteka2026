#!/bin/bash
# Déploie le frontend Next.js sur le VPS.
# Usage : ./deploy.sh   (lancé depuis ta machine, pas depuis le VPS)
#
# Pour switcher vers le domaine officiel plus tard : change uniquement
# DOMAIN ci-dessous (+ refait DNS/Nginx/certbot pour le nouveau domaine,
# voir deploy/README). Le reste du script ne bouge pas.
set -e

VPS_HOST="root@212.132.85.245"
APP_DIR="/var/www/iteka2026"
REPO_URL="https://github.com/ininahazwe/iteka2026.git"
PM2_NAME="iteka-frontend"
BRANCH="main"

echo "== Déploiement sur $VPS_HOST =="

ssh "$VPS_HOST" bash -s << EOF
  set -e

  if [ ! -d "$APP_DIR" ]; then
    echo "-- Premier déploiement : clonage du repo --"
    mkdir -p "$(dirname "$APP_DIR")"
    git clone "$REPO_URL" "$APP_DIR"
  fi

  cd "$APP_DIR"
  git fetch origin
  git checkout "$BRANCH"
  git pull origin "$BRANCH"

  cd frontend

  if [ ! -f ".env.production.local" ]; then
    echo "!! ATTENTION : .env.production.local absent dans frontend/ sur le serveur."
    echo "!! Crée-le avant de continuer (voir deploy/README pour la liste des variables)."
    exit 1
  fi

  npm ci
  npm run build

  if pm2 describe "$PM2_NAME" > /dev/null 2>&1; then
    pm2 restart "$PM2_NAME"
  else
    pm2 start npm --name "$PM2_NAME" -- start -- -p 3000
    pm2 save
  fi
EOF

echo "== Déploiement terminé =="

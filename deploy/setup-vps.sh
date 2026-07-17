#!/bin/bash
# Setup initial du VPS (AlmaLinux 9) — à lancer UNE SEULE FOIS, en root, via SSH.
# ssh root@212.132.85.245 puis coller/exécuter ce script.
set -e

echo "== Mise à jour système =="
dnf update -y

echo "== Pare-feu : ouverture HTTP/HTTPS =="
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

echo "== Node.js 20 LTS =="
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
dnf install -y nodejs

echo "== PM2 (garde l'app vivante + redémarre au reboot) =="
npm install -g pm2

echo "== Nginx =="
dnf install -y nginx
systemctl enable --now nginx

echo "== Certbot (SSL Let's Encrypt) =="
dnf install -y epel-release
dnf install -y certbot python3-certbot-nginx

echo "== Git =="
dnf install -y git

echo "== fail2ban (bannit les IP après plusieurs échecs SSH) =="
dnf install -y fail2ban
cat > /etc/fail2ban/jail.local << 'EOF'
[sshd]
enabled = true
maxretry = 5
bantime = 1h
findtime = 10m
EOF
systemctl enable --now fail2ban

echo "== Terminé. Prochaines étapes : =="
echo "1. DNS : ajoute un enregistrement A '2026' -> 212.132.85.245 dans IONOS (domaine itekarwanda.org)"
echo "2. Copie deploy/nginx-2026.itekarwanda.org.conf vers /etc/nginx/conf.d/ sur le VPS"
echo "3. nginx -t && systemctl reload nginx"
echo "4. Premier déploiement : voir deploy/README ou lance deploy.sh depuis ta machine"
echo "5. certbot --nginx -d 2026.itekarwanda.org (une fois le DNS propagé)"

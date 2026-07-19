# Brief de refonte design — Iteka Youth Organization

> Prêt à copier-coller dans une conversation Claude (ou à donner à un designer) pour piloter la refonte UI du site `frontend/` (Next.js + Tailwind).

Note honnête avant de commencer : je n'ai pas pu charger visuellement le shot Dribbble "Virtus — Nonprofit Charity Landing Page" (extension Chrome non connectée au moment de la rédaction). Ce brief s'appuie sur les codes visuels caractéristiques de ce style de shot (référence connue dans l'esthétique "charity/nonprofit organique" sur Dribbble/Awwwards) + sur la palette réelle extraite du logo Iteka. Si le rendu final s'écarte du shot exact, envoie une capture d'écran pour ajuster.

---

## 1. Contexte

- Organisation : Iteka Youth Organization, Kigali, Rwanda — empowerment des jeunes (talents, compétences, paix).
- Site actuel : refonte en cours, stack Next.js 16 + Tailwind (App Router), contenu piloté par WordPress/WPGraphQL.
- Inspiration initiale du projet : obama.org (éditorial premium, grandes images, hiérarchie typographique forte).
- Nouvelle direction demandée : style "Virtus" — landing page charity/nonprofit, formes organiques, ambiance chaleureuse et humaine plutôt que corporate.
- Objectif : la meilleure UI/UX possible — confort visuel, lisibilité, hiérarchie claire — pas juste "joli".

## 2. Palette — dérivée du logo

Logo Iteka : mains multicolores (unité/diversité) + "Iteka" en script orange + "Youth Organization" en gris.

**Couleurs extraites du logo :**
- Orange signature (script "Iteka") : `#F5A623` (chaud, amical, énergique)
- Gris texte secondaire : `#4A4A4A`
- Mains (accents, à utiliser avec parcimonie, jamais en fond de section) : bleu `#2E86DE`, rouge/brique `#C0392B`, vert `#27AE60`, jaune `#F1C40F`, rose/magenta `#E91E63`, marron `#8D5A2B`

**Palette proposée pour le site (tokens sémantiques, pas de hex en dur dans les composants) :**

| Token | Valeur | Usage |
|---|---|---|
| `--color-primary` | `#F5A623` (orange logo) | CTA principaux, accents, liens actifs |
| `--color-primary-dark` | `#D9880F` | Hover/pressed sur primary |
| `--color-secondary` | `#2D5F3F` (vert, cohérent avec la palette existante du projet) | Éléments secondaires, badges "impact" |
| `--color-ink` | `#1F2937` | Titres, texte principal (contraste ≥4.5:1 sur fond clair) |
| `--color-muted` | `#6B7280` | Texte secondaire, légendes |
| `--color-background` | `#FDF8F2` (crème chaud, pas blanc pur) | Fond de page — signature du style "Virtus" |
| `--color-surface` | `#FFFFFF` | Cards, éléments surélevés |
| `--color-accent-blue` | `#2E86DE` | Ponctuel : icônes, illustrations, un seul accent par section max |
| `--color-accent-pink` | `#E91E63` | Ponctuel : stats, badges "featured" |
| `--color-accent-yellow` | `#F1C40F` | Ponctuel : highlights, hover states discrets |

Règle : une section = un accent dominant maximum (orange OU vert OU un accent des mains), jamais 3 couleurs vives simultanées dans le même bloc visuel — sinon le rainbow du logo devient criard à l'échelle d'une page entière.

## 3. Direction stylistique ("Virtus" charity style)

- **Formes organiques** : blobs/vagues en arrière-plan de sections (SVG décoratif, pas photo), coins très arrondis sur cards/images (`rounded-2xl` à `rounded-[2rem]`), jamais d'angles durs.
- **Grands visuels humains** : photos de jeunes/programmes en pleine largeur ou en masque organique (pas de rectangles stricts), traitement chaleureux (pas de filtre froid/corporate).
- **Typographie généreuse et arrondie** : gros titres (48–72px desktop), interlignage aéré, une police à personnalité amicale pour les titres (ex. style "Fraunces", "Clash Display" ou "Poppins" en très gras) + une police lisible neutre pour le corps (ex. "Inter" ou "Manrope").
- **Espace blanc généreux** : sections respirées, pas de densité corporate/dashboard.
- **Cards flottantes avec ombre douce** : `shadow-lg` diffuse, jamais de bordures dures noires.
- **Stats/impact chiffrés** : gros chiffres colorés (un accent différent par stat, cohérent avec les couleurs des mains du logo) — section "Our Impact" est l'endroit naturel pour exploiter le rainbow du logo intentionnellement.
- **Layout asymétrique** : alterner texte-gauche/image-droite et inverse selon les sections, éviter le tout-centré.

## 4. Exigences UX/accessibilité (non négociables)

- Contraste texte : ≥4.5:1 pour le texte courant, ≥3:1 pour le grand texte (vérifier `--color-ink` sur `--color-background` et sur `--color-primary`).
- Ne jamais faire porter une information uniquement par la couleur (ex. catégories) — toujours coupler à un texte/icône.
- Cibles tactiles ≥44×44px sur mobile, espacement ≥8px entre éléments cliquables.
- Rythme d'espacement cohérent en 4/8px (padding, gaps, marges de section) — pas de valeurs arbitraires.
- Hiérarchie typographique cohérente sur tout le site (échelle définie une fois : 14/16/18/24/32/48/64px), pas de tailles ad hoc page par page.
- Animations discrètes, 150–300ms, `ease-out` à l'entrée — jamais décoratives sans raison, respecter `prefers-reduced-motion`.
- Mobile-first : la home actuelle a une grille d'images à droite du hero qui doit rester lisible en empilé sur mobile (pas de grille 2 colonnes qui écrase le texte).

## 5. Application page par page (site existant)

- **Home** : hero asymétrique (texte + grille photos organique), bandeau logos partenaires discret, stats d'impact en couleurs du logo, programmes en cards flottantes, témoignages.
- **Programmes / News / Gallery / Team / Partners** : grilles de cards cohérentes avec le nouveau style card (coins arrondis, ombre douce, accent couleur unique par card selon catégorie si pertinent).
- **Impact** : section à fort potentiel visuel — gros chiffres colorés reprenant la palette des mains du logo, un accent par statistique.
- **Donate** : garder la clarté transactionnelle (formulaire Stripe) mais habiller le cadre avec le nouveau style (fond crème, card blanche flottante), sans sacrifier la lisibilité du formulaire de paiement.
- **Festival** : section événementielle, bon candidat pour formes organiques plus prononcées (c'est la page la plus "festive" du site).

## 6. Contraintes techniques

- Stack : Next.js 16 (App Router) + Tailwind CSS 4. Modifications via `tailwind.config.ts` (tokens couleur/typo) + composants existants dans `frontend/src/app` et `frontend/src/components`.
- Ne pas toucher à la couche data (`frontend/src/lib/api.ts`) ni à la logique métier des composants — refonte visuelle uniquement (classes Tailwind, structure JSX, tokens).
- Réutiliser les composants `Header`/`Footer` existants, les adapter au nouveau style plutôt que les réécrire de zéro.
- Livrer si possible un design system minimal réutilisable (tokens couleur/typo/espacement centralisés) plutôt que des styles dispersés page par page.

---

**Instruction finale pour l'agent qui exécute ce brief :** applique cette direction visuelle progressivement, section par section, en commençant par la home (hero + stats d'impact), montre un aperçu avant de généraliser à tout le site.

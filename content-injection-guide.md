# Guide d'injection de contenu — Iteka Youth Organization

> Objectif : mapper ton contenu texte brut (fourni par l'organisation) vers les bons emplacements du site, sans deviner ni improviser. Deux familles de contenu, traitement différent.

---

## Comment utiliser ce guide

1. Parcours les sections ci-dessous, dans l'ordre des pages.
2. Pour chaque bloc, colle ton texte brut correspondant directement sous le repère indiqué (ou dans un doc à part organisé pareil).
3. **Contenu CMS (Partie A)** → toi-même dans wp-admin, aucun code à toucher.
4. **Contenu statique (Partie B)** → colle-moi le texte organisé par repère, je fais les modifs de code directement (pas d'accès wp-admin pour ces textes-là, ils sont en dur dans les composants React).
5. Si un texte brut ne correspond à aucun repère existant, signale-le à part — on décide ensemble où le caser plutôt que de le perdre.

---

## Partie A — Contenu géré dans WordPress (wp-admin)

Va créer/éditer les entrées correspondantes. Rappel des champs exacts par type de publication :

### Programme (répéter par programme)
- Titre (nom du programme)
- `description` — texte long, présentation complète
- `shortDescription` — résumé, 200 caractères max, utilisé dans les listes/cards
- `requirements` — conditions/critères d'éligibilité
- `applicationFormUrl` — lien vers le formulaire d'inscription, si externe
- Image mise en avant

### News / Actualité (répéter par article)
- Titre
- Contenu complet (éditeur natif WordPress)
- `source` / `sourceUrl` — si repris d'un média externe (ex. "The New Times Rwanda")
- `author` — si applicable
- `category` — Press / Event / Achievement / Announcement
- Image mise en avant

### Team Member (répéter par membre)
- Nom (titre)
- `role` — poste/fonction
- `bio` — biographie courte
- `email`, `linkedinUrl` — si fournis
- Photo (image mise en avant)

### Partner (répéter par partenaire)
- Nom (titre)
- `description` — courte présentation du partenariat
- `website`
- `partnershipType` — Financial / Technical / Strategic
- Logo (image mise en avant)

### Testimonial (répéter par témoignage)
- `quote` — citation
- `authorName`, `authorRole`
- Photo de l'auteur si fournie

### Impact Stat (répéter par statistique — ex. "2,500+ Youth Empowered")
- `label` — ex. "Youth Empowered"
- `value` — ex. "2,500+"
- `description` — phrase de contexte courte
- `icon` — nom d'icône Lucide si pertinent (optionnel)

### Festival (une seule entrée)
- `edition` — ex. "2026 Edition"
- `description` — présentation complète
- `dateStart` / `dateEnd`, `locationName`
- `registrationUrl`

### Gallery (répéter par image)
- `caption`, `category` (Events/Programmes/Festival/Team/Community)

---

## Partie B — Contenu statique (texte en dur dans le code)

Ces sections n'ont pas d'équivalent wp-admin — colle-moi le texte brut correspondant à chaque repère, je fais l'édit dans le fichier indiqué.

### Home (`frontend/src/app/page.tsx`)
- Titre hero ("Empowerment With Purpose. Results With Impact.") + sous-titre
- Bloc "What We Do"
- Bloc "Our Expertise, Your Impact"
- Bloc "Our Impact In Numbers" (texte d'intro, pas les chiffres eux-mêmes — ça vient d'Impact Stat)
- Bloc "Voices From Our Community" (texte d'intro, pas les témoignages eux-mêmes — ça vient de Testimonial)
- Bloc CTA final ("Join Us And Let's Make A Better World Today!")

### About (`frontend/src/app/about/page.tsx`)
- Hero (titre + accroche de la page)
- Section Mission/Vision/Valeurs
- Section "Our Story" — récit de l'organisation
- Bande "Our Impact By The Numbers" (titre de section uniquement)
- Section "Our Core Pillars" — description des piliers (si différente de celle d'Approach)
- Section "Meet Our Leadership" (titre — les bios viennent de Team Member)
- Bande CTA "Ready to Get Involved?"

### Approach (`frontend/src/app/approach/page.tsx`)
- Section "Our Four Pillars" — description de chaque pilier
- Section "A Holistic Framework"
- Section "Our Methodology" — détail de la méthodologie
- Section "Partnership-Driven Approach"
- Section "Measured For Impact"
- Bande CTA "Experience Our Approach"

### Impact (`frontend/src/app/impact/page.tsx`)
- Texte d'intro de la page (les chiffres viennent d'Impact Stat, les témoignages de Testimonial)

### Partners (`frontend/src/app/partners/page.tsx`)
- Hero ("Partnering For Impact. Together We Achieve More.")
- Section "Building a Powerful Ecosystem" — texte de présentation
- Descriptions des 3 types de partenariat (Financial/Technical/Strategic) si à personnaliser au-delà du texte générique actuel

### Team (`frontend/src/app/team/page.tsx`)
- Texte d'intro de la page (les fiches individuelles viennent de Team Member)

### Festival (`frontend/src/app/festival/page.tsx`)
- Texte hors CMS éventuel (le contenu principal vient du CPT Festival, Partie A)

### Donate (`frontend/src/app/donate/page.tsx`)
- Texte "Make a Difference" (accroche)
- FAQ dons (questions/réponses) — actuellement en dur, à remplacer par le vrai contenu de l'organisation
- Mentions légales/fiscales sur les dons si l'organisation a un statut particulier (déductibilité, reçu fiscal)

### Contact (`frontend/src/app/contact/page.tsx`)
- Coordonnées réelles (déjà en partie corrigées : téléphone, réseaux sociaux) — vérifier adresse postale, horaires si pertinent

### Footer (`frontend/src/components/Footer.tsx`)
- Description courte de l'organisation (actuellement : "Empowering young people in Rwanda through talent discovery, skills development, and peace promotion.")

---

## Format recommandé pour me transmettre le contenu

Pour chaque bloc de la Partie B, colle sous ce format :

```
PAGE: About
SECTION: Our Story
TEXTE: [contenu brut de l'organisation]
```

Je m'occupe du reste — recherche du bon fichier, remplacement précis, vérification que rien d'autre ne casse.

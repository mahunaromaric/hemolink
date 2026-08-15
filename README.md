# HemoLink — Le don de sang au Bénin

Landing page d'information sur le don de sang, pensée pour les **futurs donneurs novices** qui ont besoin d'être rassurés et guidés. Une page 100 % informative : pas d'inscription, pas de transaction — trois certitudes à l'arrivée : **mon éligibilité, où donner, comment ça se passe**.

> Projet réalisé pour le **Figma to Code Challenge — Édition 4** (« Un sujet, une IA, votre instinct »).

---

## Stack technique

| Techno | Rôle |
|---|---|
| **React 19 + Vite 8** | Interface, build ultra-rapide |
| **TypeScript** | Typage strict des données et de l'algorithme |
| **Tailwind CSS 4** | Design system custom (thème 100 % maison) |
| **Vitest** | Tests unitaires de l'algorithme d'éligibilité |
| **Oxlint** | Lint |

Aucun backend : toutes les données (centres, réserves, FAQ, chiffres) sont des **fichiers statiques locaux** typés.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production
npm run test     # tests de l'algorithme
npm run lint     # lint
```

## Sections de la page

| Réf. | Section | Implémentation |
|---|---|---|
| C1 | Pourquoi donner | `ImpactSection` — 3 cartes chiffrées (3 vies, solidarité, urgence) |
| C2 | Qui peut donner | `CriteriaSection` — 3 critères synthétiques → renvoie au simulateur |
| C3 | Test d'éligibilité | `EligibilitySection` — simulateur conforme, entrées durcies |
| C4 | Déroulement du don | `ProcessSection` — 4 étapes + durée totale |
| C5 | Préparation au don | fusionnée dans `ProcessSection` — avant / pendant / après |
| C6 | Où donner | `CentersSection` — **8 structures réelles ANTS** (siège + STS/PTS), recherche + filtres |
| C7 | État des réserves | `StockSection` — 8 groupes sanguins avec statuts indicatifs |
| C8 | FAQ | `FaqSection` (accordéon) en 2 colonnes |
| — | En chiffres | `TestimonialsSection` — statistiques réelles ANTS 2025 |

## Algorithme d'éligibilité

`src/lib/eligibility.ts` — fonction pure `checkEligibility` testée unitairement :

- **Âge** : 18 – 65 ans révolus ;
- **Poids** : ≥ 50 kg ;
- **Délai post-don** : 3 mois (homme), 4 mois (femme) ;
- **Cas gérés** : aucun don antérieur → condition remplie ; délai non écoulé → affichage de la **date exacte** de prochaine éligibilité ; âge ou poids hors critères → **critère bloquant explicitement nommé** ;
- **Durcissement anti-entrées adverses** : rejet de `NaN` / `±Infinity` / valeurs ≤ 0, whitelist du sexe (`M`/`F`), rejet des dates invalides, futures ou calendaires impossibles (« 2023-02-30 »). **23 tests** couvrent la nominale et les cas adverses.

La mention *« Seul un entretien médical professionnel peut confirmer l'aptitude au don »* figure sous le simulateur.

## Fonctionnalités & états

- **Simulateur** : validation en temps réel (âge 1–120, poids ≤ 300 kg, date future interdite), résultats éligible / non éligible / différé avec `aria-live`.
- **Répertoire** : recherche texte + filtres (ville, type de don, **ouvert maintenant** calculé en direct selon les horaires du jour). État géré : **aucun résultat** (avec bouton « Tout réinitialiser »).
- **Accessibilité** : navigation clavier fluide, focus visible explicite (`:focus-visible`), accordéon FAQ en boutons avec `aria-expanded` / `aria-controls`, labels associés aux champs, `lang="fr"`.

## Données & honnêteté

- **Centres** : 8 structures publiques réelles issues de l'annuaire de l'ANTS (source `ants.bj`) — Siège central (Cotonou), STS Littoral (CNHU-HKM), PTS CHU-MEL, STS Ouémé, STS Borgou, STS Atlantique, STS Atacora, STS Mono. Infoline `+229 21 32 04 35`, horaires Lun–Ven 08h00–17h30, RDV avec ou sans rendez-vous.
- **Réserves** : chiffres **indicatifs** avec disclaimer explicite (l'ANTS ne publie pas de données en temps réel) et lien vers la source.
- **En chiffres** : statistiques officielles ANTS 2025 (118 010 poches prélevées, 1 don toutes les 3 min, 51 % vers des enfants, 97 % de satisfaction) sourcées.

## Responsive

Conçu mobile-first de **390 px à 1440 px** : nav + menu mobile plein écran, grilles fluides, cartes réactives, aucun débordement horizontal.

## Préparation au lancement — audit

La page a été passée au crible par l'auditeur **https://isreadyforlaunch.com/**, qui détecte les anomalies avant mise en ligne. Le prompt d'analyse de l'outil a été transmis à l'agent de code pour corriger chaque anomalie :

- **En-têtes de sécurité** : CSP (`default-src 'self'` …), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` (HSTS géré par Vercel).
- **SEO & partage social** : lien `canonical`, `og:image` 1200×630 (capture réelle du hero, polices de marque), `og:url` même origin, `robots.txt` + `sitemap.xml` générés à la build.
- **Accessibilité** : cible tactile ≥ 48 px sur les CTA, focus visible, accordéon FAQ accessible (`aria-expanded`, `aria-controls`, `inert`).
- **Vitalité visuelle** : hero animé (gouttes, compteurs), graphe des réserves animé, FAQ en accordéon animé — le tout coupé par `prefers-reduced-motion`.
- **Faux positifs documentés** : `ants.bj` (403 anti-bot côté tiers), HTTPS/TLS (infra Vercel).

## Partis pris de conception

1. **Rassurer avant de convaincre** : le hero attaque les deux plus grandes peurs dès le premier écran (durée « 10 min », impact « 3 vies »).
2. **Le simulateur au cœur** : placé haut, il transforme le doute (« suis-je concerné ? ») en certitude, puis pousse vers les centres.
3. **Répertoire = fonctionnalité centrale** : 8 vraies structures ANTS pour que la recherche et les filtres soient réellement évaluables.
4. **Identité chaleureuse, pas clinique** : rouge `#C8102E` en accent, fonds crème doux, typographies Fraunces (titres) + Plus Jakarta Sans (texte et logo) + IBM Plex Mono (données). Un don de sang, ça reste humain.
5. **Illustration maison** : le hero est illustré en SVG (scène de don flottante) plutôt qu'une photo, indépendant et léger.
6. **Localisation assumée** : ancrage **Bénin / ANTS** — un parti pris éditorial fort qui échappe au générique.

## Processus de conception

Le processus complet (brief, conception initiale, portage React, relectures produit et durcissement) est documenté dans **[`PROMPTS.md`](./PROMPTS.md)**, maintenu à jour au fil des évolutions.
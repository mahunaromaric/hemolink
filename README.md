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

Aucun backend : toutes les données (centres, réserves, FAQ) sont des **fichiers statiques locaux** typés.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production
npm run test     # tests de l'algorithme
npm run lint     # lint
```

## Les 8 sections du brief (toutes couvertes)

| Réf. | Section | Implémentation |
|---|---|---|
| C1 | Pourquoi donner | `ImpactSection` — 3 cartes chiffrées (3 vies, solidarité, urgence) |
| C2 | Qui peut donner | `CriteriaSection` — 3 critères synthétiques → renvoie au simulateur |
| C3 | Test d'éligibilité | `EligibilitySection` — simulateur conforme à l'annexe |
| C4 | Déroulement du don | `ProcessSection` — 4 étapes + durée totale (45 min) |
| C5 | Préparation au don | fusionnée dans `ProcessSection` — avant / pendant / après |
| C6 | Où donner | `CentersSection` — **11 centres** sur 9 villes, recherche + filtres |
| C7 | État des réserves | `StockSection` — 8 groupes sanguins avec statuts |
| C8 | FAQ & Idées reçues | `FaqSection` (accordéon) + `MythsSection` (mythes vs réalités) |

Fusion assumée C4 + C5 (timeline avant/pendant/après) comme le permet le brief.

## Algorithme d'éligibilité (annexe)

`src/lib/eligibility.ts` — fonction pure `checkEligibility` testée unitairement :

- **Âge** : 18 – 65 ans révolus ;
- **Poids** : ≥ 50 kg ;
- **Délai post-don** : 3 mois (homme), 4 mois (femme) ;
- **Cas gérés** : aucun don antérieur → condition remplie ; délai non écoulé → affichage de la **date exacte** de prochaine éligibilité ; âge ou poids hors critères → **critère bloquant explicitement nommé**.

La mention *« Seul un entretien médical professionnel peut confirmer l'aptitude au don »* figure à la fois sous le simulateur et dans le footer.

## Fonctionnalités & états

- **Simulateur** : validation en temps réel (âge 1–120, poids ≤ 300 kg, date future interdite), résultats éligible / non éligible / différé avec `aria-live`.
- **Répertoire** : recherche texte + filtres (ville, type de don, **ouvert maintenant** calculé en direct selon les horaires du jour). États gérés : **chargement** (squelettes), **aucun résultat** (avec réinitialisation), **erreur** (avec bouton réessayer).
- **Accessibilité** : navigation clavier fluide, focus visible explicite (`:focus-visible`), accordéon FAQ en boutons avec `aria-expanded` / `aria-controls`, labels associés aux champs, `lang="fr"`.

## Responsive

Conçu mobile-first de **390 px à 1440 px** : nav + menu plein écran sur mobile, grilles fluides, cartes réactives, aucun débordement horizontal.

## Partis pris de conception

1. **Rassurer avant de convaincre** : le hero attaque les deux plus grandes peurs dès le premier écran (durée « 15 min », impact « 3 vies »).
2. **Le simulateur au cœur** : placé haut, il transforme le doute (« suis-je concerné ? ») en certitude, puis pousse vers les centres.
3. **Répertoire = fonctionnalité centrale** : 11 centres sur 9 villes pour que la recherche et les filtres soient réellement évaluables.
4. **Identité chaleureuse, pas clinique** : rouge brique `#E74C3C` en accent, fonds crème/bleu doux, typographies arrondies (Outfit + Plus Jakarta Sans). Un don de sang, ça reste humain.
5. **Localisation assumée** : ancrage **Bénin / CNTS** — un parti pris éditorial fort qui échappe au générique.

## Processus IA (superdesign.dev)

Le design a été créé sur **superdesign.dev**, récupéré via le CLI officiel (`get-design`), puis porté en composants React en respectant le design system extrait. Le détail complet des prompts, ajustements manuels et limites est documenté dans **[`PROMPTS.md`](./PROMPTS.md)**.

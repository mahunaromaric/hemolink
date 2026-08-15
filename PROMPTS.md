# PROMPTS.md — Processus de conception assistée par IA

Ce document retrace honnêtement le processus de conception et de développement de HemoLink : outils sollicités, séquence des prompts, ajustements manuels et limites rencontrées. Il est **maintenu à jour au fil des évolutions** du projet.

---

## 1. Outils d'IA sollicités

| Outil | Usage |
|---|---|
| **superdesign.dev** (web + CLI `@superdesign/cli`) | Conception visuelle initiale : design de la landing page sur canvas infini, export du HTML |
| **Agent de code (opencode)** | Analyse du brief, audit du design exporté, portage React, algorithme d'éligibilité, tests, accessibilité, relectures produit |

---

## 2. Séquence des prompts significatifs (phase initiale)

### Étape 1 — Stratégie produit (avant tout design)
> *Prompt initial à l'agent : « Analyse le brief du challenge HemoLink : donne une stratégie produit, l'arc narratif des 8 sections, l'identité visuelle recommandée (rassurante, non clinique), les spécifications du simulateur et du répertoire de centres, les pièges à éviter. »*

Résultat : cadrage complet utilisé comme brief pour superdesign (hiérarchie narrative « accroche → rassurer → convaincre → démontrer → orienter », fusion C4+C5 autorisée, placement stratégique du simulateur et des réserves).

### Étape 2 — Conception sur superdesign.dev
> *Prompt superdesign : « Landing page HemoLink, don de sang au Bénin. Sections : hero, pourquoi donner, état des réserves par groupe sanguin, qui peut donner, test d'éligibilité interactif, répertoire de 8 centres avec filtres, guide pratique avant/pendant/après, témoignages, FAQ accordéon, mythes vs réalités, footer. Ton chaleureux et rassurant, rouge brique en accent, fonds crème/bleu doux, typographies arrondies. Responsive mobile-first 390–1440 px. »*

Itérations sur le canvas : « Landing Page Mobile Refined » (v3 retenue) — affinages du hero, des cartes réserves et du formulaire.

### Étape 3 — Récupération du design
> *Prompt : « Récupère le design HemoLink depuis superdesign et analyse-le. »*

Exécuté via le CLI officiel : `list-design-systems` → identification du projet, `fetch-design-nodes` → draft `f80e845b…` (v3), `get-design` → export HTML/Tailwind du template.

### Étape 4 — Audit et portage React
> *Prompt : « Audite le template exporté : extrais le design system (couleurs, typographies, rayons), inventorie les sections, détecte les écarts avec le brief. Puis porte-le en React/Vite/TypeScript en corrigeant les écarts. »*

### Étape 5 — Algorithme et tests
> *Prompt : « Implémente l'algorithme d'éligibilité conforme à l'annexe (18–65 ans, ≥50 kg, délai 3/4 mois, cas aucun don, date de prochaine éligibilité, message du critère bloquant) en fonction pure testable. »*

### Étape 6 — Relecture produit & durcissement (cette itération)
> Direction validée par le pilote, hors prompts : passage aux **vraies données** (répertoire ANTS, chiffres officiels), allègement du design (fonds clairs, moins de décor), unification de la voix des libellés, durcissement de l'algorithme et nettoyage du projet.

---

## 3. Ajustements manuels (quoi et pourquoi)

### Phase 1 — Portage du template

| # | Ajustement | Pourquoi |
|---|---|---|
| 1 | **Champ « dernier don » transformé en date** | Le template utilisait « dernier don il y a (mois) ». Le brief exige la **date du dernier don** et l'affichage de la **date exacte** de prochaine éligibilité → champ `date` + calcul `dernierDon + 3/4 mois`. |
| 2 | **Ajout du sexe biologique** | Indispensable : le délai post-don diffère entre hommes (3 mois) et femmes (4 mois) — absent de l'algorithme du template. |
| 3 | **Statut ouvert/fermé calculé en direct** | Le brief exige le statut actuel de chaque centre. Le template n'affichait que des horaires statiques → utilitaire `getOpenStatus()` + badge « Ouvert maintenant ». |
| 4 | **Filtre « Ouverts maintenant »** | Le brief demande des filtres par disponibilité → ajout d'un filtre calculé sur les horaires du jour. |
| 5 | **Types de dons réels (vraies structures)** | La répartition par site n'est pas publiée officiellement → estimée sur les capacités connues : Siège ANTS (sang total + plasma + plaquettes), STS Littoral CNHU-HKM (sang total + plaquettes), autres STS/PTS (sang total). |
| 6 | **États du répertoire simplifiés** | Au passage aux vraies données statiques, seuls l'état **aucun résultat** (+ bouton « Tout réinitialiser ») et le décompte sont conservés ; les états « chargement » et « erreur » simulés sont retirés. |
| 7 | **Accessibilité complète** | FAQ en boutons accessibles (`aria-expanded`, `aria-controls`), focus visible global, `aria-live` sur les résultats, labels sur les filtres. |
| 8 | **Validation des champs en temps réel** | Âge 1–120, poids ≤ 300 kg, date future interdite — avec messages d'erreur sous chaque champ (`role="alert"`). |
| 9 | **Héro sans image distante** | Remplacement par une composition décorative CSS premièrement, puis illustration SVG maison (voir Phase 2). |
| 10 | **Répertoire réel : 11 centres fictifs → 8 structures ANTS** | Au-delà d'un inventaire simulé pour l'évaluation, le répertoire repose désormais sur **8 structures publiques réelles** de l'annuaire ANTS (source `ants.bj`) : siège central, STS Littoral (CNHU-HKM), PTS CHU-MEL, STS Ouémé, STS Borgou, STS Atlantique, STS Atacora, STS Mono — avec coordonnées GPS officielles et infoline unique `+229 21 32 04 35`. |

### Phase 2 — Relecture produit & cohérence

| # | Ajustement | Pourquoi |
|---|---|---|
| 11 | **Carte Leaflet ajoutée puis supprimée** | `react-leaflet` testé pour le répertoire, puis retiré au profit de la fiche + lien **Itinéraire Google Maps** (`lat`/`lng` conservés) : simplicité et poids. |
| 12 | **recharts testé puis retiré** | Le graphe des réserves fut d'abord construit avec recharts v3.10.1 (build OK) mais **page blanche au runtime** → retiré, barres verticales en CSS pur. |
| 13 | **« L'impact de votre geste » → « En chiffres »** | Témoignages inventés retirés (aucune source vérifiable) ; remplacés par les **statistiques officielles ANTS 2025** en cartes : 118 010 poches prélevées, 1 don toutes les 3 min, 51 % vers des enfants, 97 % de satisfaction — sourcées vers `ants.bj`. |
| 14 | **Section « Mythes & réalités » supprimée** | `MythsSection` retirée (contenu redondant avec la FAQ) ; la FAQ réajustée en **2 colonnes** sur fond clair avec signature de marque + filigrane. |
| 15 | **Fonds clairs** | Les blocs sombres (teal) de l'impact et de la FAQ remplacés par des fonds **blanc / cream** cohérents avec le reste de la page ; décor abstrait minimisé. |
| 16 | **Footer distingué et « réel »** | Bascule clair → **sombre** (`secondary`) pour se lire comme un footer ; suppression de la mention « challenge » et du disclaimer superposé ; barre © « Tous droits réservés ». |
| 17 | **Voix des libellés unifiée** | CTA unifiés sur « **Tester mon éligibilité** » (Hero, header desktop/mobile), « État des réserves » dans le header ; le footer garde volontairement « Suis-je éligible » (voix rassurante de niveau de zone). |
| 18 | **Rayons des boutons** | CTA passés de `rounded-full` à **`rounded-xl` (12 px)** — plus fiable / moins « consumer » ; pilules conservées pour switch, badges et pastilles de filtres. |
| 19 | **Typographie des marques** | Logo (Navbar, Footer) et filigrane FAQ passés de **Fraunces → Plus Jakarta Sans** (serif éditoriale jugée inadaptée à une plateforme santé) ; Fraunces reste pour les titres. |
| 20 | **Durcissement de l'algorithme d'éligibilité** | Rejet de `NaN`/`±Infinity`/valeurs ≤ 0, whitelist du sexe, rejet des dates invalides/futures/calendaires impossibles (« 2023-02-30 ») → **23 tests** (11 cas adverses supplémentaires). |
| 21 | **Illustration SVG du hero** | Photo `donneur.png` remplacée par une **illustration SVG maison** (scène de don flottante, gouttes « 3 vies ») ; les stats du hero sont pilotées par les données (`centres.length`). |

---

## 4. Limites rencontrées avec l'outil

| Limite | Contournement |
|---|---|
| **Le canvas superdesign n'a pas d'accès public** | Impossible d'accéder au design sans authentification. Le CLI nécessite un `superdesign login` via navigateur — étape manuelle obligatoire côté utilisateur. |
| **`login --no-browser` ne retourne rien sans l'ouverture du navigateur** | L'exécution de la commande dans un shell non interactif timeout ; résolu en lançant le login en arrière-plan et en laissant l'utilisateur finaliser l'autorisation dans son navigateur. |
| **Pas de commande CLI directe « lister mes projets »** | Détour via `list-design-systems` qui expose les projets de l'utilisateur, puis `fetch-design-nodes` pour identifier le draft. |
| **Le HTML exporté n'est pas 100 % intégrable** | Icônes via `iconify-icon` CDN (remplacées par un set d'icônes SVG maison), `onclick` inline (remplacés par du React), tailwind CDN (remplacé par Tailwind buildé). |
| **Fichiers exportés en une seule ligne** | Lignes tronquées à 2000 caractères à la lecture → extraction via scripts Python pour analyser sections et logique JS. |
| **Algorithme du template incomplet** | Le template calculait l'éligibilité sur « mois depuis le dernier don » sans date exacte et sans critère poids explicite en priorité → réimplémentation conforme à l'annexe, avec tests. |
| **recharts compatible au build mais page blanche au runtime** | Vérifié sur recharts v3.10.1 + React 19 → graphe retiré, reconstruction en CSS pur. |
| **ANTS : pas de données publiques exhaustives** | L'annuaire JSON `ants.bj` liste 39 structures mais : pas de répartition officielle des types de dons par site (estimée), pas d'API temps réel pour les réserves → chiffres **indicatifs** avec disclaimer, et pas de témoignages vérifiables → remplacés par des statistiques officielles. |
| **Réseau très lent pour npm / téléchargements** | Installation en arrière-plan, tests de miroirs de registre, temps de construction allongés. |

---

## 5. Ce que l'IA a produit et ce qui restait humain

- **IA (superdesign)** : la direction visuelle initiale, la structure des sections, la palette, la hiérarchie éditoriale.
- **IA (agent de code)** : le portage en composants, l'algorithme conforme au brief, les tests, l'accessibilité, puis l'exécution des relectures produit (vraies données, design, voix, durcissement) de la phase 2.
- **Humain (le pilote)** : le choix du brief d'orientation à superdesign, les décisions de fusion de sections, la localisation Bénin, la priorisation des états d'interface, et la validation de chaque ajustement (phase 1 et phase 2).

*Honnêteté intellectuelle : le rôle de l'IA a été celui d'un générateur de première passe et d'un outil d'exécution. Toute la conformité au brief (annexe, accessibilité, états, responsive) ainsi que l'exactitude des contenus publics (centres, réserves, chiffres) ont été vérifiées et corrigées manuellement.*
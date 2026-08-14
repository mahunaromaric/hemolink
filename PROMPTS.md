# PROMPTS.md — Processus de conception assistée par IA

Ce document retrace honnêtement le processus de conception et de développement de HemoLink : outils sollicités, séquence des prompts, ajustements manuels et limites rencontrées.

---

## 1. Outils d'IA sollicités

| Outil | Usage |
|---|---|
| **superdesign.dev** (web + CLI `@superdesign/cli`) | Conception visuelle : design de la landing page sur canvas infini, export du HTML |
| **Agent de code (opencode)** | Analyse du brief, audit du design exporté, portage React, algorithme d'éligibilité, tests, accessibilité |

---

## 2. Séquence des prompts significatifs

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

---

## 3. Ajustements manuels (quoi et pourquoi)

| # | Ajustement | Pourquoi |
|---|---|---|
| 1 | **Champ « dernier don » transformé en date** | Le template utilisait « dernier don il y a (mois) ». Le brief exige la **date du dernier don** et l'affichage de la **date exacte** de prochaine éligibilité → champ `date` + calcul `dernierDon + 3/4 mois`. |
| 2 | **Ajout du sexe biologique** | Indispensable : le délai post-don diffère entre hommes (3 mois) et femmes (4 mois) — absent de l'algorithme du template. |
| 3 | **Statut ouvert/fermé calculé en direct** | Le brief exige le statut actuel de chaque centre. Le template n'affichait que des horaires statiques → utilitaire `getOpenStatus()` + badge « Ouvert maintenant ». |
| 4 | **Filtre « Ouverts maintenant »** | Le brief demande des filtres par disponibilité → ajout d'un filtre checkbox calculé sur les horaires du jour. |
| 5 | **Types de dons enrichis** | Le template limitait les types à « sang total ». Les critères du brief incluent plasma et plaquettes → répartition variée (CNTS Cotonou, CHU-MEL, HOMEL…). |
| 6 | **États de chargement et d'erreur** | Le template n'avait que l'état « aucun résultat » → ajout de squelettes de chargement et d'un état d'erreur avec bouton réessayer. |
| 7 | **Accessibilité complète** | FAQ avec `onclick` inline → boutons accessibles (`aria-expanded`, `aria-controls`), focus visible global, `aria-live` sur les résultats, labels sur les filtres. |
| 8 | **Validation des champs en temps réel** | Âge 1–120, poids ≤ 300 kg, date future interdite — avec messages d'erreur sous chaque champ (`role="alert"`). |
| 9 | **Héro sans image stock distante** | Remplacement de l'image Unsplash par une composition décorative en CSS/SVG (indépendance visuelle + performance). |
| 10 | **10 centres → 11 centres / 9 villes** | Au-delà du minimum de 8, pour une évaluation plus riche des recherches et filtres. |

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
| **Réseau très lent pour npm / téléchargements** | Installation en arrière-plan, tests de miroirs de registre, temps de construction allongés. |

---

## 5. Ce que l'IA a produit et ce qui restait humain

- **IA (superdesign)** : la direction visuelle, la structure des sections, la palette, la hiérarchie éditoriale.
- **IA (agent de code)** : le portage en composants, l'algorithme conforme au brief, les tests, l'accessibilité.
- **Humain (le pilote)** : le choix du brief d'orientation à superdesign, les décisions de fusion de sections, la localisation Bénin, la priorisation des états d'interface, et la validation des ajustements ci-dessus.

*Honnêteté intellectuelle : le rôle de l'IA a été celui d'un générateur de première passe et d'un outil d'exécution. Toute la conformité au brief (annexe, accessibilité, états, responsive) a été vérifiée et corrigée manuellement.*

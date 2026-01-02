# Tech Notes - Quirks & Decisions

**Pourquoi certains trucs sont comme ça + comment ça impacte le dev.**

---

## 🏗️ Providers in `src/utils/contexts/` (not `src/context/`)

**Décision:** Structures les providers dans un dossier "utils".

**Pourquoi:** C'était la première app. Pas eu un expert React à côté. Structuré logiquement au moment, pas optimal maintenant.

**Impact:**
- Moins classique (plus souvent on voit `src/context/`)
- Pas grave du tout, juste "non-standard"
- Si refactoring future: déplacer vers `src/context/`

**Fichiers affectés:**
```
src/utils/contexts/
├─ UserProvider.jsx
├─ FirestoreProvider.jsx
└─ ThemeProvider.jsx
```

---

## 🔒 localStorage Isolation per User

**Décision:** Chaque clé localStorage préfixée avec `${userName}_`.

**Pourquoi:** 2 users (Eric & Jezabel) vivent dans le même navigateur. Sans isolation, ils écraseraient leurs datas.

**Exemples:**
```javascript
localStorage.setItem('Eric_currentLevel', 5)
localStorage.setItem('Jezabel_currentLevel', 2)
localStorage.setItem('Eric_completedObjectives', [...])
localStorage.setItem('Eric_firstLoad', 'true')  // Premier chargement
```

**Impact:**
- Toute localStorage key DOIT être préfixée!
- Si tu oublies le préfixe, ça casse la multi-user
- useLeveling.js + UserProvider: patterns à respecter

**À monitor:** Cherche `localStorage.` dans le code, assure que tout a le préfixe.

---

## 🔗 HashRouter avec URLs `#`

**Décision:** Utilise React Router `HashRouter` au lieu de `BrowserRouter`.

**Pourquoi:**
- Aucune config serveur requise
- PWA déployée sur Vercel (static hosting)
- Simplifie le déploiement

**Impact:**
- URLs look like: `/#/dashboard`, `/#/objectifs`
- Pas idéal pour SEO (Google pas content du `#`)
- Pas de real routing côté serveur

**À migrer future:**
- Changerà `BrowserRouter`
- Pas de config serveur spéciale requise (Vercel gère)
- Juste importer/changer une ligne

**Liens affectés:**
- `src/index.jsx`: `HashRouter` import
- `src/App.jsx`: Routes définies

---

## 🔥 Firebase Config Hardcoded

**Décision:** Credentials Firebase en dur dans `src/utils/firebase/firebaseConfig.js`.

**Pourquoi:**
- C'est une PWA publique (pas de secrets)
- Credentials Firebase sont publiques par design
- Pas de backend, tout côté client

**Exemple:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  projectId: "echodesreves-...",
  // etc.
}
```

**Impact:**
- Secrets sont SAFE (Firebase design)
- C'est OK pour une app publique
- Si tu ajoutes un secret (API keys privés), PASSE À .env

**À migrer future:**
```javascript
// .env
VITE_FIREBASE_API_KEY=...

// firebaseConfig.js
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
```

---

## 🎨 No TailwindCSS, Only styled-components

**Décision:** Utilise `styled-components` pour CSS-in-JS.

**Pourquoi:**
- Intégration propre avec React + ThemeProvider
- Theme switching dynamique
- Pas de classe utility hell

**Impact:**
- Tous les styles sont en JS
- Theme variable accessible dans composant: `${props => props.theme.colors.primary}`
- `generateTheme()` gère la génération automatique

**Exemple:**
```javascript
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textPrimary};
`
```

**Si tu ajoutes TailwindCSS:** Conflits potentiels. Mieux de rester en styled-components pour cohérence.

---

## 📡 Real-Time Listeners (pas de fetch cyclique)

**Décision:** `onSnapshot()` listeners au lieu de polling.

**Pourquoi:**
- Écoute Firestore en temps réel
- Aucun polling/fetch cyclique
- Auto cleanup au unmount

**Impact:**
- Quand autre user fait un changement → tu vois immédiatement
- Écoute permanente = gestion mémoire à surveiller
- Cleanup critique: `unsubscribe()` au unmount

**À watchout:**
- Listeners oubliés = memory leaks
- Voir `useFirestoreData.js` cleanup logic

---

## 🚫 No Error Boundary Initialement (Fixed Phase 4)

**Décision:** Ajout ErrorBoundary que récemment.

**Pourquoi:**
- Première app, pas pensé aux crash graceful
- Errors causaient écran blanc

**Current State:**
- `src/components/ErrorBoundary/ErrorBoundary.jsx` wrap tout
- Affiche page d'erreur friendly au lieu d'écran blanc
- Development mode: montre stack trace

**Impact:**
- Errors attrapées + loggées
- User voit message au lieu de blank page
- Crash handling amélioration majeure

---

## 📚 No Tests

**Décision:** Aucun test unitaire.

**Pourquoi:**
- Première app, priorités = features
- Manuel testing suffisant pour taille app

**Impact:**
- Pas de CI/CD testing
- Refactoring plus risqué (pas de filet)
- Correctness dépend du manual QA

**À implémenter future:**
- Vitest pour tests unitaires
- React Testing Library pour composants
- E2E tests (Playwright/Cypress)

**Refactoring sans tests:** Plus lent, plus risqué, make sure tu tests manuellement.

---

## 💾 localStorage + Firestore = Dual Source of Truth?

**Décision:** Utilise BOTH localStorage (levels) ET Firestore (objectifs/sessions).

**Pourquoi:**
- Firestore = single source pour objectifs/sessions
- localStorage = cache local pour gamification (fast access)
- Sync via useLeveling hook

**Impact:**
- localStorage pas en sync avec Firestore = bug risk
- Correction Phase 4: Suppression toasts au first install (localStorage vide)
- Si tu changes gamification logic: update localStorage paths

**À attention:**
```javascript
// localStorage keys doivent ALL être préfixées:
${userName}_currentLevel
${userName}_completedObjectives
${userName}_firstLoad

// Si tu ajoutes un nouveau localStorage key:
// TOUJOURS: ${userName}_newKey
```

---

## 🎬 Frame + PageTitle Layout Pattern

**Décision:** Composants pages utilisent `<Frame>` + `<PageTitle>`.

**Pourquoi:**
- Wrapper cohérent pour spacing/styling
- PageTitle affiche titre de page

**Impact:**
- Toute page nouvelle: envelopper contenu dans `<Frame>`
- Ajouter `<PageTitle title="Mon Titre" />` au top

**Exemple:**
```javascript
<>
  <PageTitle title="Créer un objectif" />
  <Frame>
    {/* Contenu */}
  </Frame>
</>
```

---

## 🎯 Gamification: Stars = Difficulty, Level = Progress

**Décision:**
- **Étoiles (1-3):** Difficulté d'un objectif (user choisis)
- **Niveau:** Progression globale (4 étoiles = 1 niveau)

**Pourquoi:**
- Étoiles = indicateur de effort/reward
- Niveaux = progression long-terme

**Impact:**
- Objectif de 3 étoiles = plus de progression
- Complétez 4 objectifs différents = passez de niveau
- localStorage isolation importante (chaque user son niveau)

---

## 🔄 User Switch Flow (Critical)

**Décision:** Au changement d'user → tout refetch.

**Pourquoi:**
- Complètement différent contenu (objectifs, sessions, thème)
- Mieux de tout recharger que de syncer partial

**Impact:**
- Loading screen pendant switch
- Listeners anciens fermés, nouveaux créés
- isMounted flag empêche "memory leak" setState
- localStorage keys per-user critiques

**Si tu changes ça:** Super attention, c'est un flow complexe.

---

## 📝 Toast Suppression au First Install

**Décision:** Flag `${userName}_firstLoad` supprime toasts à l'init.

**Pourquoi:**
- Au premier install, tous les objectifs "complets" → tsunami de toasts
- UX terrible
- Toasts juste pour les NEW completions après

**Impact:**
- useLeveling.js: check `isFirstLoad = !localStorage.getItem(...)`
- Quand checked, enveloppe les toast.success() dans `if (!isFirstLoad)`
- Après logic run: `localStorage.setItem(`${userName}_firstLoad`, 'true')`

**À tester:** Réinstall app sur iPhone → pas de toast spam.

---

## 🚀 Vercel Auto-Deploy + Git Webhook

**Décision:** Vercel configuré pour auto-deploy sur master push.

**Pourquoi:**
- GitOps: source of truth = GitHub
- No manual deploy needed
- Vercel webhook watches master branch

**Impact:**
- `git push origin master` → auto-deploy
- Ou `vercel --prod` pour instant deploy
- Redeploy dropdown dans Vercel dashboard si webhook fail

**À monitor:** Si webhook fail → use `vercel --prod` cli au lieu de git push.

---

## 📊 No Analytics

**Décision:** Aucun analytics tracking.

**Pourquoi:**
- App personnelle (pas besoin de metrics)
- Pas de commercial tracking

**Si tu ajoutes:**
- GA4 vs Plausible vs custom?
- Privacy-first (respects user data)
- Ajoute .env variables pour API keys

---

## 🎓 Summary: What NOT to Do

1. ❌ Forget `${userName}_` prefix on localStorage
2. ❌ Add listeners sans cleanup
3. ❌ Use BrowserRouter (stick to HashRouter until refactor)
4. ❌ Add secrets to hardcoded config (use .env)
5. ❌ Change multi-user flow without testing
6. ❌ Break Theme system (respect generateTheme)
7. ❌ Ignore isMounted flags (leads to crashes)

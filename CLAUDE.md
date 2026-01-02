# CLAUDE.md - Echo Des Reves

**Une PWA de coaching personnel** créée par Eric et sa femme (sept 2024 - avril 2025).

---

## 📖 C'est Quoi?

Echo Des Rêves est une app pour tracker les objectifs et les sessions de coaching entre deux personnes. Chacun gère ses propres objectifs, reçoit des niveaux/étoiles, et peut créer des thèmes personnalisés.

**Contexte émotionnel important:** Cette app supporte des moments de coaching réels et profonds. C'est pas juste un POC - c'est un outil de vie pour Eric & sa femme.

---

## 🎯 Tech Stack

| Outil | Version | Note |
|-------|---------|------|
| React | 18.3.1 | Hooks + Context API |
| Vite | 6.0.7 | Build tool moderne |
| Styled-Components | 6.1.14 | CSS-in-JS (ThemeProvider) |
| Firebase | 11.2.0 | Firestore (collections) + RT listeners |
| React Router | 7.1.1 | HashRouter (URLs avec `#`) |
| Framer Motion | 12.0.6 | Animations (loading, transitions) |
| React Toastify | 11.0.3 | Toast notifications |

---

## 🏗️ Architecture - Les 3 Providers (Context API)

### 1. **UserProvider** (`src/utils/contexts/UserProvider.jsx`)
**Qui suis-je?** Gère l'utilisateur actif (Eric ou Jezabel).
```
Responsabilités:
- activeUser: objet utilisateur courant
- changeUser(name): switch entre users
- localStorage sync: persist la sélection
```

### 2. **FirestoreProvider** (`src/utils/contexts/FirestoreProvider.jsx`)
**Mes données?** Charge tout depuis Firestore en temps réel.
```
Responsabilités:
- objectifs[]: liste des objectifs (listeners)
- sessions[]: dernières sessions (listeners + orderBy date)
- themes{}: objets thème dispo
- preferences{}: user prefs (favorite theme)
- isLoading: état du chargement
- currentLevel, currentStars: gamification (useLeveling hook)
```

### 3. **ThemeProvider** (`src/utils/contexts/ThemeProvider.jsx`)
**Comment ça look?** Gère palette couleurs + polices + darkMode.
```
Responsabilités:
- draftTheme: thème courant (avant save)
- handleColorChange, handleFontChange: édition live
- updatePreferences: sauvegarde thème favoris
- isAuthor: vérifie si user peut éditer ce thème
```

**Data Flow:**
```
Firestore → FirestoreProvider (listeners) → useFirestore() dans composants
```

---

## 🎨 Points Fiers

### 1. **ThemeManager.jsx** (🔥 Composant Favoris)
Système de customization complèt:
- **ColorPicker**: 6 couleurs (primary, secondary, accent, etc.)
- **FontSelector**: 4 familles de polices + tailles ajustables (H1, H2, H3, Body)
- **DarkMode Toggle**: Invert automatique des couleurs
- **Create/Save/Delete**: Créer thèmes, modifier, supprimer (si author)
- **Live Preview**: Vois les changements en temps réel

**Tech Used:**
- `generateTheme()`: Fonction qui construit objet thème complet
- `extractPalette()`: Extrait 6 couleurs pour save Firestore
- `polished` (darken, lighten): Calcul auto de couleurs dérivées

### 2. **TabBar + MenuPlus** (Navigation style YouTube)
Barre de navigation fixe en bas + bouton + flottant:
- 4 icônes principales (Dashboard, Objectifs, History, Settings)
- Bouton "+" qui ouvre menu flottant (Nouvel Objectif, Nouvelle Session, Thème)
- MenuPlus anime et ferme en-dehors click
- Active state sur icônes selon route actuelle

---

## 📊 Collections Firestore

```
├── Objectifs
│   ├── id: uuid
│   ├── titre, description, deadline
│   ├── etoiles (1-3), progression (0-100)
│   ├── participant: "Eric" | "Jezabel"
│
├── Sessions
│   ├── id: uuid
│   ├── date, notes, vigilance
│   ├── participant: "Eric" | "Jezabel"
│
├── themes
│   ├── id: "theme-name"
│   ├── name, author, darkMode
│   ├── colors: { primary, secondary, accent, backgroundBase, backgroundSurface, textPrimary }
│   ├── typography: { fontFamily*, fontSize* }
│
└── preferences
    ├── user: "Eric" | "Jezabel"
    ├── favoriteTheme: "theme-id"
```

---

## 🔄 Patterns Courants

### Créer un Objectif (ObjectifForm.jsx)
1. User clique "+" → MenuPlus → "Nouvel Objectif"
2. Route vers `/objectif` (nouveau) ou `/objectif/:id` (edit)
3. Form remplie + clique "Sauvegarder"
4. `saveObjectif(objectif, userName, id)` → Firestore
5. Listener dans FirestoreProvider détecte le changement
6. Composants se re-render automatiquement

### Switch Utilisateur
1. Header affiche ProfilCards (Eric + Jezabel)
2. Click ProfilCard → `changeUser(name)`
3. UserProvider met à jour activeUser + localStorage
4. FirestoreProvider: `userName` change → useEffect refetch
5. Loading screen affiche le temps du refetch
6. Nouvelles données chargées via listeners Firestore

### Gamification (Niveaux/Étoiles)
- `useLeveling.js` hook: Calcule niveau (4 étoiles = 1 niveau)
- localStorage: `${userName}_currentLevel`, `${userName}_completedObjectives`
- Toasts suppressés au premier install (flag `${userName}_firstLoad`)
- Header affiche niveau + étoiles de l'user actif

---

## ⚡ Quirks (Pourquoi Comme Ça?)

### Providers dans `src/utils/contexts/` (pas src/context/)
C'était le premier projet - pas une structure idéale mais ça marche bien. Changé pas.

### localStorage Isolation
Chaque key prefixée avec `${userName}_` (ex: `Eric_currentLevel`, `Jezabel_currentLevel`).
Permet à 2 users d'avoir leurs propres données locales.

### HashRouter avec `#` URLs
Déploiement Vercel sans config côté serveur. URLs look like: `/#/dashboard`
À migrer vers BrowserRouter en futur.

### Firebase Config Hardcoded
`src/utils/firebase/firebaseConfig.js` contient credentials en dur.
À migrer vers `.env` pour sécurité (non-secret actuellement car c'est une PWA publique).

### No Tests
Première app, pas de tests. À considérer pour futur.

---

## 🚀 Workflow Dev Courant

```bash
# Dev local
npm run dev

# Tester build production
npm run build && npm run preview

# Déployer
vercel --prod
# OU
git push origin master  # Auto-deploy via webhook
```

---

## 📝 Known Issues / Tech Debt

1. **Toasts sur reload**: Au premier install, tous les toasts affichent (fixé phase 4)
2. **BrowserRouter migration**: HashRouter pas idéal pour SEO/UX
3. **Firebase credentials**: À mettre en `.env`
4. **Tests unitaires**: Aucun test
5. **Error handling**: Basique, pas de retry logic
6. **Performance**: Pas d'optimisation bundle/lazy loading yet

---

## 🎓 Pour New Developers (y compris IAs)

### Avant de coder:
1. Lire `.claude/context.md` (3 chemins de bootstrap)
2. Lire `.claude/architecture.md` (data flows)
3. Comprendre les 3 Providers
4. Comprendre Firestore collections

### Patterns à respecter:
- `useFirestore()` pour récupérer données
- `useUser()` pour activeUser
- `useTheme()` pour thème + handlers
- Toujours passer `activeUser?.name` à Firebase actions
- User-isolate localStorage keys

### Commiter:
```bash
git add .
git commit -m "description courte"
git push origin master
```

---

## 🔗 Ressources

- **Vercel Deploy**: `devlogs/DEPLOYMENT_GUIDE.md`
- **Changelog**: `devlogs/CHANGELOG.md`
- **Plan Reprise**: `devlogs/PLAN_REPRISE.md`
- **Firebase Docs**: https://firebase.google.com/docs/firestore
- **React Docs**: https://react.dev

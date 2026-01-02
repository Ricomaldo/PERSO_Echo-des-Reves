# Architecture Deep Dive - Echo Des Reves

---

## 🔄 Data Flow Complet

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERACTION                         │
│  (Click créer objectif, switch utilisateur, change couleur) │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
       ┌───────────────────────────────────┐
       │    LOCAL STATE (Pages/Components) │
       │  (objectif form, draft theme)     │
       └───────────┬───────────────────────┘
                   │
                   ▼
       ┌──────────────────────────────────────┐
       │   FIRESTORE ACTIONS (Write)          │
       │  saveObjectif(), saveTheme(), etc    │
       └───────────┬────────────────────────┘
                   │
                   ▼
           ┌───────────────────┐
           │     FIRESTORE     │
           │    (Collections)  │
           └───────┬───────────┘
                   │
                   ▼
    ┌──────────────────────────────────────┐
    │  FIRESTORE LISTENERS (Real-time)     │
    │  onSnapshot() in FirestoreProvider   │
    └────────┬─────────────────────────────┘
             │
             ▼
    ┌─────────────────────────────────────┐
    │  3 PROVIDERS (Context API)          │
    │  ├─ UserProvider (activeUser)       │
    │  ├─ FirestoreProvider (data)        │
    │  └─ ThemeProvider (theming)         │
    └────────┬────────────────────────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │  COMPONENTS (React Hooks)      │
    │  useFirestore()                │
    │  useUser()                     │
    │  useTheme()                    │
    └────────┬───────────────────────┘
             │
             ▼
         ┌────────┐
         │  DOM   │
         └────────┘
```

---

## 📦 Les 3 Providers - Zoom

### UserProvider
```javascript
// Responsabilité: Qui suis-je?
activeUser: { name: "Eric" | "Jezabel", ... }

// Changement: Quand user click ProfilCard
changeUser(name) → setActiveUser → localStorage.setItem()

// Usage dans composants:
const { activeUser, changeUser } = useUser()
```

### FirestoreProvider
```javascript
// Responsabilité: Mes données?
{
  objectifs: [...],        // Listeners: where participant == activeUser
  sessions: [...],         // Listeners: where participant == activeUser
  themes: {...},           // Fetch une fois (static)
  preferences: {...},      // Fetch pour l'user
  isLoading: true/false,   // Vrai pendant le load initial
  currentLevel: 5,         // Calculé par useLeveling
  currentStars: 2          // Calculé par useLeveling
}

// Au changement d'user:
1. FirestoreProvider détecte activeUser change
2. Reset isLoading = true
3. Kill anciens listeners
4. Créer nouveaux listeners avec nouveau userName
5. isLoading = false quand tout chargé
6. Composants re-render automatiquement
```

### ThemeProvider
```javascript
// Responsabilité: Comment ça look?
{
  draftTheme: {...},        // Thème EN ÉDITION (pas savé)
  themes: {...},            // Tous les thèmes dispo
  handleColorChange,        // Live edit (pas de save auto)
  handleFontChange,         // Live edit
  handleSizeChange,         // Live edit
  handleDarkModeChange,     // Live edit
  updatePreferences,        // Save favoriteTheme à Firestore
  isAuthor: true/false      // User peut éditer ce thème?
}

// Wraps avec styled-components ThemeProvider:
<StyledThemeProvider theme={draftTheme}>
  {children}
</StyledThemeProvider>
```

---

## 🔌 Firestore Collections Schema

### Objectifs Collection
```javascript
{
  id: "uuid",
  titre: "Apprendre React",
  description: "Maîtriser les hooks et Context",
  etoiles: 3,              // 1-3 (difficulté)
  progression: 0,          // 0-100 (%)
  deadline: Timestamp,     // Firebase Timestamp
  participant: "Eric",     // Qui l'a créé
  createdAt: Timestamp     // Optional
}

// Query: where('participant', '==', 'Eric')
// Listener dans useFirestoreData.js
```

### Sessions Collection
```javascript
{
  id: "uuid",
  date: Timestamp,
  notes: "Discussion sur les blocages...",
  vigilance: "Attention à X",
  participant: "Eric"
}

// Query: where('participant', '==', 'Eric'), orderBy('date', 'desc')
// Listener dans useFirestoreData.js
```

### Themes Collection
```javascript
{
  id: "theme-id",
  name: "Ocean Dream",
  author: "Eric",
  darkMode: true,
  colors: {
    primary: "#0ba4b3",
    secondary: "#617bbe",
    accent: "#eca72c",
    backgroundBase: "#111111",
    backgroundSurface: "#1e1e1e",
    textPrimary: "#ededed"
  },
  typography: {
    fontFamilyH1: "'Pacifico', sans-serif",
    fontFamilyH2: "'Caveat', sans-serif",
    fontFamilyH3: "'Caveat', sans-serif",
    fontFamilyBody: "'Caveat', sans-serif",
    fontSizeH1: "24px",
    fontSizeH2: "24px",
    fontSizeH3: "22px",
    fontSizeBody: "20px"
  }
}

// Fetch: getDocs(collection(db, 'themes'))
// Static (pas de listener pour themes, charge 1x)
```

### Preferences Collection
```javascript
{
  user: "Eric",
  favoriteTheme: "ocean-dream"
}

// Fetch: getDoc(doc(db, 'preferences', userName))
// Update: savePreferences(userId, preferences)
```

---

## 🎨 Theme System - Comment Ça Marche

### generateTheme() Function
```javascript
// INPUT: themeData (du Firestore ou brouillon)
// OUTPUT: objet thème complet (colors + typography calculées)

// Exemple:
const themeData = {
  colors: { primary: "#0ba4b3", ... },
  darkMode: true,
  typography: { fontFamilyH1: "...", ... }
}

const generatedTheme = generateTheme(themeData)
// Ajoute automatiquement:
// - backgroundHighlight (darken secondary)
// - textSecondary, linkPrimary, linkHover, etc.
// - Ajuste couleurs si darkMode

// Utilisé dans:
// 1. ThemeProvider (wraps app avec StyledThemeProvider)
// 2. ThemeManager (live edit)
```

### Color Normalization
```javascript
// Supporte #rgb ou #rrggbb
// #abc → #aabbcc (expand)
// #aabbcc → #aabbcc (déjà bon)
```

### DarkMode Magic
```javascript
// Si darkMode = true:
// darken(0.15, secondary) pour backgroundHighlight
// lighten(0.1, backgroundBase) pour borders

// Si darkMode = false:
// lighten(0.15, secondary) pour backgroundHighlight
// darken(0.1, backgroundBase) pour borders
```

---

## 🎮 Gamification: Niveaux & Étoiles

### useLeveling Hook
```javascript
// INPUT: objectifs[], userName
// OUTPUT: { currentLevel, currentStars }

// Logic:
1. Boucle tous les objectifs du user
2. Pour chaque objectif avec progression==100:
   - Ajoute ses étoiles au compteur
3. Niveau = Math.floor(totalEtoiles / 4) + 1
4. Étoiles = totalEtoiles % 4
5. localStorage: ${userName}_currentLevel, ${userName}_completedObjectives

// localStorage Isolation:
// Eric:    Eric_currentLevel = 5, Eric_completedObjectives = [...]
// Jezabel: Jezabel_currentLevel = 2, Jezabel_completedObjectives = [...]

// Premier chargement: isFirstLoad flag, toasts supprimés
```

---

## 🧵 Listeners Lifecycle

### Au Mount (Quand composant apparaît)
```javascript
// FirestoreProvider useEffect avec [userName] dependency

useEffect(() => {
  if (!userName) return

  // Reset loading
  setIsLoading(true)

  // Créer listeners
  const unsubscribeObjectifs = onSnapshot(
    query(collection(db, 'Objectifs'), where('participant', '==', userName)),
    (snapshot) => {
      setObjectifs(snapshot.docs.map(...))
      decrementLoading()  // Loading fini quand listener reçoit une fois
    }
  )

  // Pareil pour sessions

  // Pareil pour preferences et themes (mais async fetch)

  return () => {
    unsubscribeObjectifs()  // Cleanup
    unsubscribeSessions()
  }
}, [userName])
```

### À l'Update Firestore
```javascript
// Quelqu'un change un objectif dans Firestore
// → Listener se déclenche automatiquement
// → setObjectifs() avec nouvelles données
// → Composant re-render
// → UI à jour en temps réel
```

### À l'Unmount
```javascript
// Quand composant meurt ou userName change:
// → cleanup() fonction exécutée
// → unsubscribeObjectifs() + unsubscribeSessions()
// → Listeners fermés
// → Plus de listeners "fantômes"
```

---

## 📍 Key Files Map

```
┌─ Core Logic
│  ├─ src/utils/contexts/UserProvider.jsx        (activeUser)
│  ├─ src/utils/contexts/FirestoreProvider.jsx   (data + loading)
│  ├─ src/utils/contexts/ThemeProvider.jsx       (theming)
│  └─ src/utils/firebase/firestoreActions.js     (write operations)
│
├─ Hooks
│  ├─ src/utils/firebase/useFirestoreData.js     (listeners)
│  └─ src/utils/firebase/useLeveling.js          (gamification)
│
├─ UI Components (Fiers!)
│  ├─ src/components/ThemeManager/              (éditeur thème)
│  └─ src/components/TabBar/                    (navigation + MenuPlus)
│
├─ Pages
│  ├─ src/pages/Dashboard/                      (home)
│  ├─ src/pages/ObjectifForm/                   (create/edit)
│  └─ src/pages/SessionForm/                    (create/edit)
│
└─ Theme System
   └─ src/styles/theme/generateTheme.js         (générateur thème)
```

---

## 🔀 Cas Courants

### Cas 1: User Crée un Objectif
```
1. ObjectifForm: handleSave()
2. saveObjectif(objectif, "Eric", null)  // null = new
3. setDoc() écrit à Firestore
4. FirestoreProvider listener Objectifs se déclenche
5. setObjectifs() update state
6. Dashboard re-render avec nouvel objectif
```

### Cas 2: User Switch
```
1. Header ProfilCard click
2. changeUser("Jezabel")
3. UserProvider: setActiveUser("Jezabel") + localStorage
4. FirestoreProvider: userName change → useEffect
5. isLoading = true
6. Kill listeners "Eric", créer listeners "Jezabel"
7. Nouvelles données chargées
8. isLoading = false
9. App re-render avec données Jezabel
```

### Cas 3: Edit Thème Live
```
1. ThemeManager: ColorPicker change
2. handleColorChange(key, value)
3. ThemeProvider: setDraftTheme() update
4. generateTheme() recalcule couleurs dérivées
5. StyledThemeProvider theme prop update
6. App re-render avec nouvelles couleurs
7. User clique "Sauvegarder"
8. saveTheme() → Firestore
9. ThemeProvider updatePreferences()
```

---

## ⚠️ Edge Cases

### Q: Que se passe si listener échoue?
A: Error handler dans `onSnapshot()` deuxième callback. Log + decrementLoading().

### Q: Que se passe si user disparaît pendant load?
A: Flag `isMounted` empêche setState sur composant démonté.

### Q: Que se passe si localStorage corrompu?
A: Try/catch dans UserProvider init.

### Q: Que se passe si thème ne load pas?
A: generateTheme() a des defaults, toujours OK.

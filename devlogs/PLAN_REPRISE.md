# Plan de Reprise en Main - Echo Des Reves

**Date:** 9 novembre 2025
**Contexte:** Reprise du projet après évolution des pratiques de développement

---

## 📊 État des Lieux

### Tech Stack
- **Framework:** React 18.3.1 avec Vite 6.0.7
- **Router:** react-router-dom v7.1.1 (HashRouter)
- **Styling:** styled-components v6.1.14
- **Backend:** Firebase Firestore v11.2.0
- **State:** React Context API
- **Animations:** framer-motion v12.0.6

### Architecture
```
src/
├── App.jsx                 # Routes principales
├── components/             # Composants réutilisables
├── layout/                 # Composants de layout
├── pages/                  # Pages de l'application
└── utils/
    ├── contexts/           # Providers (User, Firestore, Theme)
    ├── firebase/           # Hooks et actions Firebase
    └── dateUtils.js
```

### Utilisateurs
- Eric (utilisateur par défaut)
- Jezabel (utilisateur secondaire)

---

## 🐛 Bug Critique Identifié

**Problème:** L'application crash lors du cycle suivant :
1. Sélection d'un utilisateur
2. Navigation dans l'app
3. Changement d'utilisateur via le header

**Cause racine:**
- Les listeners Firebase ne sont pas correctement nettoyés lors du changement d'utilisateur
- Des mises à jour d'état sont tentées sur des composants démontés
- Le localStorage n'isole pas les données par utilisateur

**Fichiers concernés:**
- `src/utils/firebase/useFirestoreData.js` - Cleanup insuffisant des listeners
- `src/utils/contexts/FirestoreProvider.jsx` - Loading state qui démonte brutalement tous les enfants
- `src/utils/firebase/useLeveling.js` - localStorage partagé entre utilisateurs
- `src/App.jsx` - Absence d'Error Boundary

---

## 🎯 Plan d'Action

### Phase 1: Documentation ✅
- [x] Créer dossier `devlogs/`
- [x] Initialiser `CHANGELOG.md` avec historique
- [x] Créer ce fichier de plan de reprise
- [x] Mettre à jour `README.md` avec infos de déploiement

### Phase 2: Fix du Bug de Changement d'Utilisateur
**Estimation:** 15-20 minutes

1. **`useFirestoreData.js`**
   - Ajouter flag `isMounted` dans le useEffect
   - Empêcher `setIsLoading` après unmount
   - Assurer cleanup propre des listeners Firebase

2. **`FirestoreProvider.jsx`**
   - Améliorer gestion du loading lors du switch
   - Éviter démontage brutal des enfants
   - Ajouter gestion d'erreur

3. **`useLeveling.js`**
   - Préfixer clés localStorage avec `${userName}_`
   - Isoler les données par utilisateur

4. **`App.jsx`**
   - Créer et ajouter Error Boundary
   - Capturer et logger les erreurs

### Phase 3: Configuration Déploiement ✅
**Estimation:** 5 minutes

- [x] Créer `vercel.json` pour gérer HashRouter
- [x] Documenter process de déploiement
- [x] Configurer headers cache pour optimisation

### Phase 4: Tests ✅
- [x] Tester cycle complet : Login → Navigation → Switch
- [x] Vérifier isolation des données par utilisateur
- [x] Confirmer absence d'erreurs console
- [x] Tester sur mobile (responsive)

**Résultat:** All tests passed! App stable en production.

---

## 📝 Recommandations Futures

### Court terme
- Ajouter tests unitaires (Vitest)
- Implémenter Error Boundary global
- Améliorer feedback UI lors du switch utilisateur

### Moyen terme
- Migrer de HashRouter vers BrowserRouter
- Ajouter mode hors-ligne (PWA)
- Implémenter système d'authentification réel

### Long terme
- Multi-utilisateurs avec authentification Firebase
- Export/Import des données
- Statistiques avancées et graphiques
- Mode sombre persistant

---

## 🔗 Ressources

- **Repo:** https://github.com/[username]/EchoDesReves
- **Déploiement:** Vercel (auto-deploy depuis main)
- **Firebase Console:** [Lien vers projet Firebase]
- **Documentation React:** https://react.dev
- **Documentation Vite:** https://vitejs.dev

---

**Prochaine session:** Commencer par Phase 2 - Fix du bug de changement d'utilisateur

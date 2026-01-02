# Session Bootstrap - Echo Des Reves

**Approche Progressive Disclosure** pour IAs et humans.

Choisis ton chemin selon le temps/familiarité:

---

## ⚡ Chemin Rapide (5 min) - Déjà Familier?

Tu connais déjà le projet et veux vite démarrer.

**Lis:**
1. `CLAUDE.md` → Sections: Tech Stack + Les 3 Providers
2. `.claude/architecture.md` → Data flow diagram

**Puis:** Veux faire quoi? File à la section correspondante.

**Key Shortcuts:**
- Page = composant dans `src/pages/`
- Provider = contexte dans `src/utils/contexts/`
- Hook = `use*` dans `src/utils/firebase/`
- Firestore actions = `src/utils/firebase/firestoreActions.js`

---

## 📖 Chemin Standard (15 min) - Session Typique

T'arrives frais sur le projet. Besoin d'une compréhension solide.

**Lire en Ordre:**
1. `CLAUDE.md` → Section "C'est Quoi?" + Tech Stack
2. `.claude/architecture.md` → Lire complètement
3. `CLAUDE.md` → Les 3 Providers (détails)
4. `CLAUDE.md` → Points Fiers (ThemeManager, TabBar)

**Comprendre le Data Flow:**
- Comment les données vont de Firestore → Composants?
- Pourquoi 3 providers?
- Comment switch utilisateur affecte tout?

**Puis:** Lire la page pertinente dans `src/pages/` ou composant.

---

## 🎓 Chemin Deep (30+ min) - Refactor/Feature Complex

Tu vas faire du vrai travail: refactoring, new feature, debug subtil.

**Lire Complètement:**
1. `CLAUDE.md` → Tout
2. `.claude/architecture.md` → Tout
3. `.claude/tech-notes.md` → Tous les quirks
4. Code Files:
   - `src/utils/contexts/*` → Les 3 Providers
   - `src/utils/firebase/firestoreActions.js`
   - `src/utils/firebase/useLeveling.js`
   - `src/styles/theme/generateTheme.js`

**Profond Dive:**
- Comment `generateTheme()` fonctionne?
- Comment listeners Firestore fonctionnent?
- Comment localStorage isolation pour 2 users?
- Error paths dans FirestoreProvider

**Puis:** Attaque ton refactor/feature.

---

## 🎯 Tâches Communes

### Je veux ajouter une page
1. Créer fichier dans `src/pages/MonPage/`
2. Importer `useFirestore()` + `useUser()` au besoin
3. Utiliser les données du contexte
4. Ajouter route dans `src/App.jsx`

### Je veux modifier un thème
1. Comprendre `generateTheme()` dans `src/styles/theme/generateTheme.js`
2. Modifier ThemeManager ou ThemeProvider
3. Tester avec les color/font pickers du ThemeManager

### Je veux débugger un crash
1. Vérifier console (DevTools)
2. Vérifier ErrorBoundary en production
3. Regarder FirestoreProvider loading logic
4. Vérifier listeners Firestore cleanup

### Je veux déployer
1. Test: `npm run build && npm run preview`
2. Deploy: `vercel --prod` ou `git push origin master`
3. Check: Vercel dashboard pour logs

---

## 📚 Structure Fichiers Quick Ref

```
src/
├── pages/              # Pages (Dashboard, ObjectifForm, etc.)
├── components/         # Composants UI réutilisables
├── layout/             # Layout (Header, Footer, Frame)
├── utils/
│   ├── contexts/       # 3 Providers (User, Firestore, Theme)
│   └── firebase/       # Hooks + actions Firestore
├── styles/             # Styled-components + theme generator
└── mocks/              # Mock data, unused features

devlogs/
├── CHANGELOG.md        # Historique versions
├── PLAN_REPRISE.md     # Plan de reprise (phases 1-4)
└── DEPLOYMENT_GUIDE.md # Comment déployer
```

---

## 💬 Questions Fréquentes

**Q: Pourquoi 3 Providers et pas 1?**
A: Chacun a une responsabilité: User (qui), Firestore (quoi), Theme (comment ça look). Séparation propre.

**Q: Comment les listeners Firestore fonctionnent?**
A: FirestoreProvider crée des `onSnapshot()` listeners qui restent actifs. Quand Firestore change, les listeners notifient et les composants se re-render.

**Q: Pourquoi localStorage isolé par userName?**
A: Chaque user a son propre niveau/étoiles. Sans isolation, Eric changerait le niveau de Jezabel.

**Q: Qui crée les thèmes?**
A: N'importe quel user peut créer un thème depuis ThemeManager. Devient l'author.

**Q: Qu'est-ce qui est "legacy"?**
A: Providers dans `src/utils/contexts/` au lieu de `src/context/`. Fonctionne bien, changé pas.

---

## 🚀 Next Steps

**Si tu lis la section 1** (rapide): Vais-je dans ton task directement.

**Si tu lis la section 2** (standard): Tu peux commencer une tâche de modification simple.

**Si tu lis la section 3** (deep): Tu es prêt pour du vrai refactoring/architecture.

---

## 📖 Fichiers de Référence

- `CLAUDE.md` → Contexte complet + Patterns
- `.claude/architecture.md` → Diagrammes + Data flows
- `.claude/tech-notes.md` → Quirks et décisions
- `devlogs/PLAN_REPRISE.md` → Histoire (sept 2024 - avril 2025)

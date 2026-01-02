# Guide de Déploiement - Echo Des Reves

**Date:** Janvier 2026
**Framework:** Vite + React 18
**Plateforme:** Vercel

---

## 📋 Prérequis

- Repository GitHub synchronisé
- Compte Vercel connecté au repo
- Node.js 18+ sur la machine locale

---

## 🚀 Processus de Déploiement

### 1. Déploiement Automatique (Recommandé)

**Vercel est configuré pour deployer automatiquement sur:**
- **Branche `main`**: Déploiement en production
- **Autres branches**: Déploiements de preview

**Flux:**
```bash
git add .
git commit -m "description du changement"
git push origin main
```

Vercel détecte automatiquement le push et lance le build.

---

### 2. Configuration Vercel (`vercel.json`)

Le fichier `vercel.json` à la racine du projet contient:

- **buildCommand**: `npm run build` (compile Vite)
- **devCommand**: `npm run dev` (dev local)
- **outputDirectory**: `dist/` (dossier de sortie Vite)
- **framework**: `vite` (détection auto)
- **headers**: Cache policies
  - HTML: `no-cache` (toujours récupérer la dernière version)
  - Assets: `3600s` (1h de cache pour les fichiers statiques)

---

### 3. Déploiement Local (Tests)

Avant de pusher en prod, tester localement:

```bash
# Build production
npm run build

# Prévisualiser le build
npm run preview
```

Ouvre `http://localhost:4173/` pour tester la version de production.

---

### 4. Variables d'Environnement

**Pour Firebase (si besoin de config dynamique):**

1. Sur Vercel Dashboard → Project Settings → Environment Variables
2. Ajouter:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
   - (etc., selon ton `.env.example`)

3. Référencer dans le code:
```javascript
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
```

**Note:** Firebase est actuellement en hardcoded (`firebaseConfig.js`). À migrer vers `.env` si besoin de secrets.

---

## 📊 Statut du Déploiement

**Dernier déploiement:**
- Date: [À remplir après premier deploy]
- Status: [Production URL]
- Branch: main

---

## 🔍 Troubleshooting

### Build échoue sur Vercel

**Cause commune:** Erreurs TypeScript ou imports manquants

**Solution:**
```bash
# Vérifier localement
npm run build

# Vérifier les logs
npm run dev
```

### HashRouter: URLs avec `#`

**Configuration actuelle:** HashRouter (URLs comme `/#/dashboard`)

- **Avantage:** Aucune config serveur nécessaire
- **Inconvénient:** URLs non-SEO friendly

**Pour migrer vers BrowserRouter** (recommandé long-terme):
- Vercel gère automatiquement (pas de config spéciale)
- À implémenter en Phase ultérieure

### Performance

**Optimisations appliquées:**
- Vite build (production optimisé)
- Code splitting automatique
- Cache headers configurés

**À monitorer:**
- Lighthouse score
- Temps de load initial
- Bundle size

---

## 📝 Checklist Pre-Deploy

- [ ] Tester en local: `npm run dev`
- [ ] Build en prod: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Pas d'erreurs console
- [ ] Tester cycle complet (Login → Switch → Navigation)
- [ ] Commit + Push vers `main`
- [ ] Vérifier déploiement sur Vercel Dashboard

---

## 🔗 Ressources

- **Vercel + Vite**: https://vercel.com/guides/how-to-deploy-vite
- **React Router + Deployment**: https://reactrouter.com/start/library/start-data-browser
- **Firebase Hosting**: Alternative à Vercel (non utilisée pour le moment)

---

## Voir Aussi

- `CHANGELOG.md` - Historique des versions
- `PLAN_REPRISE.md` - Plan de reprise général

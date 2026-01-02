# Déploiement - Echo Des Reves

**Plateforme:** Vercel
**Production:** https://echodesreves.vercel.app
**Framework:** Vite + React 18

---

## 🚀 Déployer

### Option 1: Git Push (Auto)
```bash
git add .
git commit -m "description"
git push origin master
```
Vercel déploie automatiquement via webhook GitHub.

### Option 2: CLI (Rapide)
```bash
vercel --prod
```
Déploie directement depuis ton terminal.

### Option 3: Dashboard Vercel
Clic **"Redeploy"** sur le dernier build.

---

## 🧪 Avant de Déployer

```bash
npm run build      # Vérifier le build
npm run preview    # Tester en local (http://localhost:4173)
```

---

## ⚙️ Configuration

- **vercel.json**: Build config + cache headers
- **Firebase**: Hardcoded (à migrer vers `.env` si besoin)
- **Router**: HashRouter (URLs avec `#`)

---

## 🐛 Troubleshooting

**Build échoue?** Vérifier localement:
```bash
npm run build
npm run dev  # Check console
```

**Variables manquantes?** Vercel Dashboard → Project Settings → Environment Variables

---

## Voir Aussi

- `PLAN_REPRISE.md` - Plan général
- `CHANGELOG.md` - Historique

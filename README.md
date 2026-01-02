# Echo Des Reves

PWA de suivi d'objectifs et sessions de coaching personnel. Créée par Eric et sa femme (sept 2024 - avril 2025).

**Live:** https://echodesreves.vercel.app

---

## 📖 C'est Quoi?

Echo Des Rêves supporte des moments de coaching réels. 1h pour l'un, 30 min pour l'autre en alternance. Chacun crée ses objectifs, reçoit des niveaux/étoiles, et peut customiser la UI avec des thèmes personnalisés.

**Caractéristiques:**
- 🧑‍🤝‍🧑 Multi-utilisateur (Eric & Jezabel)
- 🎨 Système de thème complet (couleurs, polices, dark mode)
- 🏆 Gamification (niveaux + étoiles)
- ⚡ Temps réel (Firestore listeners)
- 📱 Mobile-friendly (PWA)

---

## 🛠️ Tech Stack

| Outil | Version | Rôle |
|-------|---------|------|
| React | 18.3.1 | UI Framework |
| Vite | 6.0.7 | Build tool |
| Styled-Components | 6.1.14 | CSS-in-JS + Theming |
| Firebase Firestore | 11.2.0 | Base de données temps-réel |
| React Router | 7.1.1 | Navigation (HashRouter) |
| Framer Motion | 12.0.6 | Animations |

---

## 📦 Démarrer

```bash
npm install
npm run dev       # Dev local (http://localhost:5173)
npm run build     # Build prod
npm run preview   # Tester build localement
```

---

## 📚 Documentation

**Pour les développeurs (humans & IAs):**

| Fichier | Contenu | Durée |
|---------|---------|-------|
| `CLAUDE.md` | Architecture, tech stack, patterns | Complet |
| `.claude/context.md` | 3 chemins de bootstrap | 5/15/30 min |
| `.claude/architecture.md` | Data flows, diagrammes | Profond |
| `.claude/tech-notes.md` | Quirks & décisions | Référence |
| `devlogs/PLAN_REPRISE.md` | Historique de reprise | Timeline |
| `devlogs/CHANGELOG.md` | Versions | Historique |
| `devlogs/DEPLOYMENT_GUIDE.md` | Comment déployer | How-to |

**Start here:** `.claude/context.md` → Choisir ton chemin!

---

## 🚀 Déploiement

Vercel + auto-deploy sur master push.

```bash
# Option 1: CLI direct
vercel --prod

# Option 2: Git push (auto-deploy)
git push origin master

# Check status
# https://vercel.com/dashboard/projects
```

---

## 🎨 Points Fiers

### ThemeManager Component
Système de customization interactif:
- 6 couleurs éditables (primaire, secondaire, accent, etc.)
- 4 familles de polices + tailles
- Toggle dark mode (invert auto des couleurs)
- Créer/modifier/supprimer thèmes
- Live preview des changements

### TabBar + MenuPlus
Navigation style YouTube:
- 4 icônes principales (Dashboard, Objectifs, History, Settings)
- Bouton "+" qui ouvre menu flottant
- Active state sur icône courante

---

## 📖 Version History

| Version | Date | Status |
|---------|------|--------|
| 1.2.2 | Jan 2025 | **Current** - Phase 2-4 (user switch fix, deployment) |
| 1.0 | Sept 2024 | Initial release |

---

## 🤝 Contributing

Repo privé personnel. Issues/PRs welcome!

---

**Créé avec ❤️ pour des moments de coaching authentiques.**

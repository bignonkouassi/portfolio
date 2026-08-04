# Portfolio — KOUASSI BIGNON

Portfolio personnel moderne et responsive : présentation, compétences, réalisations visualisables (lightbox + filtres), parcours et contact.

## 🚀 Démarrage rapide

```bash
# Option 1 — serveur statique simple
python3 -m http.server 8080
# puis ouvrez http://localhost:8080

# Option 2 — avec npx
npx serve .
```

Aucune dépendance ni build nécessaire : HTML, CSS et JavaScript purs.

## 🗂️ Structure

```
├── index.html            → Structure de la page (toutes les sections)
├── assets/
│   ├── css/style.css     → Styles (thème, responsive, animations)
│   ├── js/main.js        → Interactions (lightbox, filtres, animations)
│   └── img/
│       ├── photo.png     → ⚠️ REMPLACER par votre vraie photo (carrée, 1:1)
│       └── projects/     → Captures d'écran de vos réalisations (remplaçables)
└── README.md
```

## ✏️ Personnalisation

### 1. Vos informations
Ouvrez `index.html` et remplacez :
- **Nom / titres / description** → section `hero` et `a-propos`
- **Email, téléphone, localisation** → section `a-propos` (carte "Informations") et `contact`
- **Liens GitHub / LinkedIn** → balises `hero-socials` et `footer-socials`

### 2. Votre photo
Placez votre photo dans `assets/img/photo.png` (format carré idéalement).
Tant qu'elle est absente, un avatar "KB" s'affiche automatiquement.

### 3. Vos réalisations
Dans `assets/js/main.js`, le tableau `PROJECTS` en haut du fichier contient chaque projet :
- `title`, `category` (`web` / `mobile` / `design`), `description`, `tags`
- `liveUrl` (lien vers le site en ligne) et `codeUrl` (lien GitHub du code)
- `image` → pointez vers votre capture dans `assets/img/projects/`

Ajoutez ou supprimez des projets à volonté : la grille, les filtres et la
lightbox (navigation ← →, fermeture Échap) s'adaptent automatiquement.

### 4. Votre CV
Placez votre CV au format PDF dans `assets/cv.pdf` — le bouton
« Télécharger mon CV » fonctionnera immédiatement.

## 📤 Déploiement (GitHub Pages)

```bash
git add .
git commit -m "Portfolio v1"
git push origin arena/019fcd19-portfolio
```

Puis dans les réglages du dépôt : **Settings → Pages → Source : branche `main`** (ou le dossier `/docs`).
Le site sera en ligne à `https://<votre-utilisateur>.github.io/<nom-du-repo>/`.

## 🎨 Thème

Modifiez les variables CSS en haut de `assets/css/style.css` (`:root`) pour changer
les couleurs, polices, arrondis et ombres en un seul endroit.

---

*Images de démonstration générées (projets et fonds) : remplacez-les par vos vraies
captures d'écran dès que possible.*

# Nice Ville de Demain - Quartier de l'Ariane

Application web complète pour améliorer l'inclusivité, la durabilité et la connectivité du quartier de l'Ariane à Nice.

## 🎯 Objectifs du projet

- **Inclusif** : Créer un espace numérique accessible à tous les citoyens
- **Durable** : Intégrer l'éco-conception et encourager les comportements durables  
- **Connecté** : Faciliter la communication entre citoyens et services municipaux

## 🚀 Fonctionnalités

### Landing Page Interactive
- Section hero avec vision du projet
- Présentation des projets citoyens
- Carte interactive avec OpenStreetMap
- Formulaire d'inscription aux actualités

### Application de Signalement Citoyen
- Authentification sécurisée (Firebase Auth)
- Création de signalements avec photo et géolocalisation
- Système de catégorisation (7 catégories)
- Suivi en temps réel des signalements
- Timeline de traitement (ouvert/en cours/résolu)

### Carte Interactive Avancée
- Affichage des points d'intérêt du quartier
- Visualisation des projets de rénovation
- Marqueurs des signalements citoyens
- Interface responsive et intuitive

## 🛠️ Technologies utilisées

### Frontend
- **React 19.1.0** - Framework JavaScript moderne
- **Vite 6.0.7** - Bundler performant et éco-responsable
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Composants UI accessibles
- **Framer Motion** - Animations fluides
- **Leaflet** - Cartographie interactive

### Backend
- **Firebase Firestore** - Base de données NoSQL temps réel
- **Firebase Authentication** - Gestion sécurisée des utilisateurs
- **Firebase Storage** - Stockage des images
- **Firebase Hosting** - Hébergement optimisé

### Cartographie
- **OpenStreetMap** - Données cartographiques ouvertes
- **Leaflet** - Bibliothèque de cartes interactives

## 📁 Structure du projet

```
nice-ville-demain/
├── src/
│   ├── components/          # Composants React
│   │   ├── AuthComponent.jsx
│   │   ├── SignalementApp.jsx
│   │   └── InteractiveMap.jsx
│   ├── lib/                 # Configuration et utilitaires
│   │   └── firebase.js
│   ├── assets/              # Images et ressources
│   ├── App.jsx              # Composant principal
│   └── main.jsx             # Point d'entrée
├── public/                  # Fichiers statiques
├── documentation-technique.md
├── guide-utilisateur.md
└── README.md
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ 
- PNPM (recommandé)
- Compte Firebase

### Installation
```bash
# Cloner le repository
git clone [URL_DU_REPOSITORY]
cd nice-ville-demain

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Firebase
```

### Configuration Firebase
1. Créer un projet Firebase
2. Activer Firestore Database
3. Configurer Firebase Authentication (email/password)
4. Activer Firebase Storage
5. Copier la configuration dans .env.local

### Démarrage
```bash
# Mode développement
pnpm run dev

# Build de production
pnpm run build

# Prévisualisation du build
pnpm run preview
```

## 🌱 Éco-conception

L'application intègre les principes d'éco-conception numérique :

- **Code optimisé** : Minification, tree-shaking, lazy loading
- **Images compressées** : Formats modernes (WebP) et compression automatique
- **Requêtes optimisées** : Limitation des appels API et mise en cache
- **Technologies durables** : Choix de solutions performantes et économes

**Objectif** : Score A sur Website Carbon Calculator (< 0.5g CO2/visite)

## 🔒 Sécurité

- **Authentification robuste** : Firebase Auth avec tokens JWT
- **Règles de sécurité** : Firestore Security Rules granulaires
- **Protection des données** : Conformité RGPD
- **Chiffrement** : TLS 1.3 en transit, chiffrement au repos
- **Validation** : Côté client et serveur

## 📱 Responsive Design

L'application s'adapte à tous les écrans :
- **Mobile** : Interface tactile optimisée
- **Tablette** : Layout adaptatif
- **Desktop** : Expérience complète

## 🗺️ Données cartographiques

- **Quartier de l'Ariane** : Coordonnées 43.7102, 7.2620
- **Points d'intérêt** : 5 lieux importants du quartier
- **Projets** : 3 projets de rénovation urbaine
- **Signalements** : Affichage temps réel des signalements citoyens

## 📊 Métriques de performance

- **Lighthouse Score** : Objectif > 90
- **Core Web Vitals** : LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Poids des pages** : < 1MB pour la page d'accueil
- **Temps de chargement** : < 3s sur 3G

## 🤝 Contribution

Pour contribuer au projet :
1. Fork le repository
2. Créer une branche feature
3. Respecter les conventions de code (ESLint + Prettier)
4. Tester les modifications
5. Soumettre une Pull Request

## 📄 Documentation

- **Documentation technique** : `documentation-technique.pdf`
- **Guide utilisateur** : `guide-utilisateur.pdf`
- **Configuration Firebase** : Voir section installation

## 🆘 Support

- **Email** : contact@nice-ville-demain.fr
- **Issues** : Utiliser le système d'issues GitHub
- **Documentation** : Consulter les guides PDF

## 📜 Licence

Ce projet est développé dans le cadre d'une initiative publique pour la ville de Nice.

---

**Version** : 1.0  
**Date** : Juin 2025  
**Statut** : Production Ready ✅


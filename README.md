# AMMA — Application de Gestion Scolaire

Application mobile pour professeurs permettant de gérer les notes et le suivi des élèves par classe.

---

## Aperçu

| Fonctionnalité | Statut |
|---|---|
| Inscription professeur | ✅ |
| Connexion par matricule | ✅ |
| Sélection de classe | ✅ |
| Liste des élèves | ✅ |
| Ajout de notes | ✅ |
| Calcul de moyenne | ✅ |
| Cahier de texte | 🔜 Prochainement |

---

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [Expo Go](https://expo.dev/client) **SDK 54** installé sur votre téléphone Android
- npm

---

## Installation et lancement

```bash
# 1. Cloner le projet
git clone https://github.com/Sake4/AMMA.git
cd AMMA

# 2. Installer les dépendances
npm install --legacy-peer-deps

# 3. Lancer l'application
npx expo start
```

Scannez le QR code affiché dans le terminal avec **Expo Go**.

> Le backend est déjà déployé en ligne — aucune configuration supplémentaire n'est nécessaire.

---

## Structure du projet

```
AMMA/
├── assets/
│   └── logo.png
├── services/
│   └── api.js              # Appels vers l'API backend
├── src/
│   └── pages/
│       ├── SplashScreen.js # Page 1 — Écran de démarrage
│       ├── Connexion.js    # Page 2 — Connexion
│       ├── Inscription.js  # Page 3 — Formulaire d'inscription
│       ├── Bienvenue.js    # Page 4 — Sélection de classe
│       ├── Accueil.js      # Page 5 — Tableau de bord
│       └── Notes.js        # Page 6 — Gestion des notes
├── App.js                  # Navigation principale
├── index.js                # Point d'entrée
└── package.json
```

---

## Architecture

```
Téléphone (Expo Go)
       ↕
React Native (Frontend)
       ↕  HTTPS
API REST (Node.js + Express) — Render
       ↕
MongoDB Atlas (Base de données)
```

---

## Backend

Le backend est déployé sur Render et accessible publiquement.

| Route | Méthode | Description |
|---|---|---|
| /api/auth/inscription | POST | Créer un compte professeur |
| /api/auth/connexion | POST | Se connecter |
| /api/eleves/:classe_id | GET | Récupérer les élèves d'une classe |
| /api/eleves | POST | Ajouter un élève |
| /api/eleves/:id/notes | POST | Ajouter une note à un élève |

> Le code source du backend est disponible ici : https://github.com/Sake4/Amma-backend

---

## Technologies utilisées

**Frontend**
- React Native (Expo SDK 54)
- React Navigation v6
- AsyncStorage (gestion de session)

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JSON Web Token (JWT)
- bcryptjs (hashage des mots de passe)

---

## Compte de test

Pour tester rapidement sans créer de compte :

| Champ | Valeur |
|---|---|
| Matricule | PROF-001 |
| Mot de passe | test123 |

---

## Note importante

Sur le plan gratuit de Render, le serveur se met en veille après 15 minutes d'inactivité. La première requête après une période d'inactivité peut prendre **30 à 50 secondes**. C'est normal, l'app reprend ensuite normalement.
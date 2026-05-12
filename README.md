# AMMA — Application de Gestion Scolaire

Application mobile pour professeurs permettant de gérer les notes et le suivi des élèves.

---

## Prérequis

- [Node.js] v18 ou supérieur
- [Expo Go] SDK 54 installé sur votre téléphone
- npm

---

## Installation

```bash
# 1. Cloner le projet
git clone https://github.com/Sake4/AMMA.git
cd AMMA

# 2. Installer les dépendances
npm install --legacy-peer-deps

# 3. Lancer l'application
npx expo start
```

Scannez ensuite le QR code affiché dans le terminal avec **Expo Go**.

---

## Structure du projet

```
AMMA/
├── assets/
│   └── logo.png
├── src/
│   └── pages/
│       ├── SplashScreen.js     # Page 1 — Écran de démarrage
│       ├── Connexion.js        # Page 2 — Connexion
│       ├── Inscription.js      # Page 3 — Formulaire d'inscription
│       ├── Bienvenue.js        # Page 4 — Sélection de classe
│       ├── Accueil.js          # Page 5 — Tableau de bord
│       └── Notes.js            # Page 6 — Gestion des notes
├── App.js                      # Navigation principale
├── index.js                    # Point d'entrée
└── package.json
```

---

## Navigation

| Page | Description |
|---|---|
| SplashScreen | Logo affiché 2.5s puis redirection automatique |
| Connexion | Authentification par matricule et mot de passe |
| Inscription | Formulaire prof (nom, prénom, matricule, classe, matière, mdp) |
| Bienvenue | Liste des classes du professeur connecté |
| Accueil | Tableau de bord avec accès aux notes |
| Notes | Liste des élèves et ajout de notes par matière |

---

## État actuel

Le frontend est entièrement fonctionnel avec des données de test.
Le backend (API + base de données) est en cours de développement et sera connecté prochainement.

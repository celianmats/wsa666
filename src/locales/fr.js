export default {
  translation: {
    // Navigation
    nav: {
      home: "Accueil",
      reports: "Signalements", 
      projects: "Projets",
      map: "Carte",
      contact: "Contact",
      login: "Se connecter",
      logout: "Se déconnecter",
      profile: "Profil"
    },

    // Page d'accueil
    home: {
      title: "L'Ariane de Demain",
      subtitle: "Ensemble, construisons un quartier inclusif, durable et connecté",
      hero: {
        discover: "Découvrir les projets",
        report: "Signaler un problème"
      },
      vision: {
        title: "Notre Vision",
        subtitle: "Transformer le quartier de l'Ariane en un modèle de ville durable",
        inclusive: {
          title: "Inclusif",
          description: "Un quartier accessible à tous, où chaque citoyen peut participer à la vie communautaire"
        },
        sustainable: {
          title: "Durable", 
          description: "Des solutions écologiques pour préserver l'environnement et améliorer la qualité de vie"
        },
        connected: {
          title: "Connecté",
          description: "Une infrastructure numérique moderne pour faciliter les échanges et services"
        }
      },
      projects: {
        title: "Projets Citoyens",
        subtitle: "Découvrez les initiatives qui transforment notre quartier",
        viewAll: "Voir tous les projets"
      },
      map: {
        title: "Carte Interactive",
        subtitle: "Explorez le quartier et ses projets en temps réel"
      },
      participate: {
        title: "Participez au Projet",
        subtitle: "Votre voix compte dans la transformation du quartier",
        form: {
          name: "Nom complet",
          email: "Adresse email",
          phone: "Téléphone (optionnel)",
          message: "Votre message ou suggestion",
          newsletter: "Je souhaite recevoir la newsletter du projet",
          submit: "S'inscrire au projet",
          success: "Merci ! Votre inscription a été prise en compte."
        }
      }
    },

    // Authentification
    auth: {
      title: "Authentification",
      login: {
        title: "Connexion",
        email: "Adresse email",
        password: "Mot de passe",
        submit: "Se connecter",
        switchToRegister: "Pas de compte ? Créer un compte"
      },
      register: {
        title: "Inscription", 
        displayName: "Nom d'affichage",
        email: "Adresse email",
        password: "Mot de passe",
        submit: "Créer un compte",
        switchToLogin: "Déjà un compte ? Se connecter"
      },
      errors: {
        invalidEmail: "Adresse email invalide",
        weakPassword: "Le mot de passe doit contenir au moins 6 caractères",
        userNotFound: "Aucun utilisateur trouvé avec cette adresse email",
        wrongPassword: "Mot de passe incorrect",
        emailInUse: "Cette adresse email est déjà utilisée"
      }
    },

    // Signalements
    reports: {
      title: "Signalements Citoyens",
      subtitle: "Découvrez tous les signalements du quartier et suivez leur résolution",
      search: "Rechercher un signalement...",
      filters: {
        allStatuses: "Tous les statuts",
        allCategories: "Toutes les catégories",
        grid: "Grille",
        timeline: "Timeline"
      },
      statuses: {
        open: "Ouvert",
        inProgress: "En cours", 
        resolved: "Résolu"
      },
      categories: {
        degradation: "Dégradation",
        nuisance: "Nuisance",
        road: "Voirie",
        lighting: "Éclairage",
        cleanliness: "Propreté",
        vegetation: "Végétation",
        other: "Autre"
      },
      noResults: "Aucun signalement trouvé",
      noResultsDesc: "Essayez de modifier vos filtres de recherche.",
      createReport: "Créer un signalement",
      myReports: "Mes signalements",
      notConnected: {
        title: "Participez à l'amélioration du quartier",
        description: "Connectez-vous pour signaler des problèmes et suivre leur résolution.",
        login: "Se connecter"
      }
    },

    // Projets
    projects: {
      title: "Projets Citoyens",
      subtitle: "Découvrez tous les projets qui transforment le quartier de l'Ariane. Suivez leur avancement et participez à leur réalisation.",
      search: "Rechercher un projet...",
      filters: {
        allStatuses: "Tous les statuts",
        allCategories: "Toutes les catégories",
        grid: "Grille",
        timeline: "Timeline"
      },
      statuses: {
        inProgress: "En cours",
        planned: "Planifié",
        upcoming: "À venir",
        preparation: "En préparation",
        completed: "Terminé"
      },
      categories: {
        environment: "Environnement",
        technology: "Technologie", 
        security: "Sécurité",
        social: "Social",
        transport: "Transport"
      },
      details: {
        budget: "Budget",
        participants: "Participants",
        progress: "Avancement",
        location: "Localisation",
        nextMilestone: "Prochaine étape",
        expectedBenefits: "Bénéfices attendus",
        timeline: "Timeline du projet"
      },
      noResults: "Aucun projet trouvé",
      noResultsDesc: "Essayez de modifier vos filtres de recherche."
    },

    // Application de signalement
    reportApp: {
      title: "Application de Signalement",
      tabs: {
        create: "Créer un signalement",
        myReports: "Mes signalements"
      },
      form: {
        category: "Catégorie du problème",
        selectCategory: "Sélectionnez une catégorie",
        description: "Description du problème",
        descriptionPlaceholder: "Décrivez le problème en détail...",
        location: "Localisation",
        getCurrentLocation: "Obtenir ma position actuelle",
        latitude: "Latitude",
        longitude: "Longitude", 
        photo: "Photo (optionnelle)",
        selectPhoto: "Sélectionner une photo",
        submit: "Créer le signalement",
        success: "Signalement créé avec succès !",
        locationError: "Impossible d'obtenir votre position. Veuillez saisir les coordonnées manuellement."
      },
      list: {
        noReports: "Aucun signalement trouvé",
        createdAt: "Créé le",
        status: "Statut"
      }
    },

    // Statuts généraux
    status: {
      open: "Ouvert",
      inProgress: "En cours",
      resolved: "Résolu",
      planned: "Planifié",
      upcoming: "À venir",
      preparation: "En préparation",
      completed: "Terminé"
    },

    // Messages généraux
    common: {
      loading: "Chargement...",
      error: "Une erreur est survenue",
      retry: "Réessayer",
      cancel: "Annuler",
      save: "Enregistrer",
      delete: "Supprimer",
      edit: "Modifier",
      view: "Voir",
      back: "Retour",
      next: "Suivant",
      previous: "Précédent",
      close: "Fermer",
      search: "Rechercher",
      filter: "Filtrer",
      sort: "Trier",
      date: "Date",
      time: "Heure",
      location: "Localisation",
      description: "Description",
      category: "Catégorie",
      status: "Statut",
      actions: "Actions"
    },

    // Footer
    footer: {
      contact: {
        title: "Contact",
        address: "Quartier de l'Ariane, Nice",
        phone: "04 XX XX XX XX",
        email: "contact@nice-ville-demain.fr"
      },
      links: {
        title: "Liens Utiles",
        municipality: "Mairie de Nice",
        metropolis: "Métropole Nice Côte d'Azur",
        anru: "ANRU",
        accessibility: "Accessibilité"
      },
      legal: {
        title: "Informations Légales",
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
        cookies: "Gestion des cookies"
      },
      copyright: "© 2025 Nice Ville de Demain. Tous droits réservés."
    }
  }
}


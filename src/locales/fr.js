export default {
  translation: {
    // Navigation
    nav: {
      home: "Accueil",
      reports: "Conseils & Infos",
      projects: "Projets",
      map: "Carte",
      contact: "Contact",
      login: "Se connecter",
      logout: "Se déconnecter",
      profile: "Profil"
    },

    // Page d'accueil
    home: {
      title: "Nice Ville de Demain",
      subtitle: "Ensemble, construisons une ville inclusive, durable et connectée",
      valueA: "Inclusif",
      valueB: "Durable",
      valueC: "Connecté",
      hero: {
        discover: "Découvrir les projets",
        report: "Partager un conseil",
        viewMap: "Voir sur OpenStreetMap"
      },
      vision: {
        title: "Notre Vision",
        subtitle: "La ville de Nice est en train de se transformer en un modèle de ville durable et connectée. Notre mission est de créer un environnement urbain qui favorise l'inclusion sociale, la durabilité environnementale et l'innovation technologique au service des citoyens.",
        inclusive: {
          title: "Inclusif",
          description: "Une ville accessible à tous, où chaque citoyen peut participer à la vie communautaire"
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
        subtitle: "Découvrez les initiatives qui transforment notre ville",
        viewAll: "Voir tous les projets"
      },
      map: {
        title: "Carte Interactive",
        subtitle: "Explorez la ville et ses projets en temps réel",
        interet: "Points d'intérêt",
        inprogress: "Projets en cours",
        tips: "conseils & infos",
      },
      participate: {
        title: "Participez au Projet",
        subtitle: "Votre voix compte dans la transformation de la ville",
        form: {
          title: "Formulaire d'inscription",
          subtitle: "Rejoignez la communauté des citoyens engagés pour le Nice de demain.",
          name: "Nom complet",
          email: "Adresse email",
          phone: "Téléphone (optionnel)",
          message: "Votre message ou suggestion",
          placeholder: "Partagez vos idées pour améliorer la ville...",
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

    // Signalements (maintenant Conseils & Infos)
    signalement: {
      title: "Conseils & Infos Citoyens",
      subtitle: "Partagez vos astuces, initiatives et informations utiles pour la ville.",
      search: "Rechercher un conseil ou une info...",
      filters: {
        allStatuses: "Tous les statuts",
        allCategories: "Toutes les catégories",
        grid: "Grille",
        timeline: "Timeline"
      },
      statuses: {
        published: "Publié",
        pending: "En attente",
        archived: "Archivé"
      },
      categories: {
        itinerary: "Itinéraires pratiques",
        event: "Événements & Initiatives",
        green_hub: "Hubs verts",
        accessibility: "Accessibilité",
        local_tip: "Astuce locale",
        other: "Autre"
      },
      noResults: "Aucun conseil ou info trouvé",
      noResultsDesc: "Essayez de modifier vos filtres de recherche.",
      createReport: "Partager un conseil ou une info",
      myReports: "Mes contributions",
      notConnected: {
        title: "Participez à l'amélioration de la ville",
        description: "Connectez-vous pour partager vos conseils et initiatives.",
        login: "Se connecter"
      },
      new_report: {
        title: "Partager un nouveau conseil ou une info",
        description: "Remplissez le formulaire ci-dessous pour partager votre contribution avec la communauté."
      },
      form: {
        category_label: "Catégorie",
        category_placeholder: "Sélectionnez une catégorie",
        description_label: "Description",
        description_placeholder: "Décrivez votre conseil ou information en détail...",
        latitude_label: "Latitude",
        longitude_label: "Longitude",
        location_name_label: "Nom du lieu (optionnel)",
        location_name_placeholder: "Ex: Parc de l'Ariane, Arrêt de bus X",
        get_location_button: "Obtenir ma position actuelle",
        image_label: "Photo (optionnel)",
        image_formats: "Formats acceptés : JPG, PNG, GIF. Max 5MB.",
        submitting_button: "Envoi en cours...",
        submit_button: "Partager le conseil"
      },
      list: {
        no_reports_title: "Aucune contribution trouvée",
        no_reports_description: "Vous n'avez pas encore partagé de conseils ou d'informations."
      },
      image_alt: "Image du conseil ou de l'information",
      timeline: {
        title: "Historique"
      }
    },

    // Projets
    projects: {
      title: "Projets Citoyens",
      subtitle: "Découvrez tous les projets qui transforment la ville de Nice. Suivez leur avancement et participez à leur réalisation.",
      search: "Rechercher un projet...",
      filters: {
        allStatuses: "Tous les statuts",
        allCategories: "Toutes les catégories",
        grid_view: "Grille",
        timeline_view: "Timeline",
        search_placeholder: "Rechercher un projet..."
      },
      statuses: {
        inProgress: "En cours",
        planned: "Planifié",
        upcoming: "À venir",
        inPreparation: "En préparation",
        completed: "Terminé"
      },
      categories: {
        environment: "Environnement",
        social: "Social",
        transport: "Transport"
      },
      card: {
        progress: "Avancement",
        participants: "{{count}} participants",
        next_step: "Prochaine étape"
      },
      timeline: {
        budget: "Budget",
        participants: "Participants",
        progress: "Avancement",
        follow_up: "Suivi du projet",
        benefits: "Bénéfices attendus"
      },
      no_projects: {
        title: "Aucun projet trouvé",
        description: "Essayez de modifier vos filtres de recherche."
      },
      items: {
        panneaux_solaires: {
          title: "Installation de Panneaux Solaires Communautaires",
          description: "Projet visant à équiper les toits des bâtiments publics et résidentiels de panneaux solaires pour une énergie locale et durable.",
          descriptionComplete: "Ce projet majeur prévoit l'installation de 500m² de panneaux solaires sur les toits des écoles, gymnases et résidences sociales. L'énergie produite sera réinjectée dans le réseau local, réduisant ainsi la facture énergétique du quartier et son empreinte carbone. Des ateliers de sensibilisation seront organisés pour les habitants.",
          responsable: "Collectif Énergie Nice",
          localisation: "Toits des bâtiments publics et résidentiels",
          prochaineMilestone: "Validation des sites d'installation - Septembre 2025",
          benefices: [
            "Réduction de 20% de la consommation électrique du quartier",
            "Création d'emplois locaux dans l'installation et la maintenance",
            "Sensibilisation des habitants aux énergies renouvelables"
          ],
          timeline: [
            { title: "Étude de faisabilité", statut: "complete" },
            { title: "Concertation citoyenne", statut: "complete" },
            { title: "Sélection des sites", statut: "complete" },
            { title: "Installation des panneaux", statut: "en_cours" },
            { title: "Mise en service", statut: "a_venir" },
            { title: "Suivi et maintenance", statut: "a_venir" }
          ]
        },
        compost_quartier: {
          title: "Mise en place de Composteurs de Quartier",
          description: "Création de points de compostage collectifs pour réduire les déchets organiques et produire un amendement naturel pour les espaces verts.",
          descriptionComplete: "Ce projet vise à installer 10 composteurs de quartier dans des lieux stratégiques (parcs, résidences, marchés). Des formations seront proposées aux habitants pour apprendre les bonnes pratiques du compostage. Le compost produit sera utilisé pour enrichir les sols des jardins partagés et des parcs du quartier.",
          responsable: "Association Compost'Ariane",
          localisation: "10 sites désignés dans le quartier",
          prochaineMilestone: "Inauguration des premiers composteurs - Juillet 2025",
          benefices: [
            "Réduction de 30% des déchets ménagers",
            "Production d'engrais naturel pour les espaces verts",
            "Renforcement du lien social autour d'une pratique écologique"
          ],
          timeline: [
            { title: "Identification des sites", statut: "complete" },
            { title: "Acquisition des composteurs", statut: "complete" },
            { title: "Formation des référents", statut: "a_venir" },
            { title: "Installation et inauguration", statut: "a_venir" },
            { title: "Suivi et animation", statut: "a_venir" }
          ]
        },
        jardins_partages: {
          title: "Développement de Jardins Partagés Inclusifs",
          description: "Extension des jardins partagés existants et création de nouveaux espaces pour favoriser la biodiversité et l'échange intergénérationnel.",
          descriptionComplete: "Ce projet prévoit l'aménagement de 3 nouveaux jardins partagés accessibles à tous, y compris aux personnes à mobilité réduite. Des parcelles seront dédiées aux écoles et aux associations. L'objectif est de créer des lieux de rencontre, de partage de savoir-faire et de production de légumes et de fleurs locales.",
          responsable: "Collectif Jardins Solidaires",
          localisation: "Divers terrains non utilisés",
          prochaineMilestone: "Lancement des appels à projets pour les parcelles - Octobre 2025",
          benefices: [
            "Augmentation de la biodiversité urbaine",
            "Amélioration de l'alimentation locale et saine",
            "Création de liens sociaux et intergénérationnels"
          ],
          timeline: [
            { title: "Identification des terrains", statut: "complete" },
            { title: "Conception des aménagements", statut: "a_venir" },
            { title: "Travaux d'aménagement", statut: "a_venir" },
            { title: "Attribution des parcelles", statut: "a_venir" },
            { title: "Premières récoltes", statut: "a_venir" }
          ]
        },
        ateliers_reparation: {
          title: "Ateliers de Réparation et Recyclage",
          description: "Mise en place d'ateliers réguliers pour apprendre à réparer objets, vêtements et appareils électroniques, et promouvoir le recyclage.",
          descriptionComplete: "Ces ateliers seront organisés une fois par mois dans un lieu dédié du quartier. Des bénévoles experts accompagneront les participants dans la réparation de leurs objets, réduisant ainsi les déchets et favorisant l'économie circulaire. Des collectes de matériaux recyclables spécifiques seront également mises en place.",
          responsable: "Repair Café Ariane",
          localisation: "Centre Social et Culturel de l'Ariane",
          prochaineMilestone: "Première session de l'atelier - Novembre 2025",
          benefices: [
            "Réduction des déchets envoyés à l'incinération",
            "Acquisition de compétences en réparation pour les habitants",
            "Promotion d'une consommation plus responsable"
          ],
          timeline: [
            { title: "Recherche de bénévoles", statut: "complete" },
            { title: "Aménagement de l'espace", statut: "en_cours" },
            { title: "Communication et inscription", statut: "a_venir" },
            { title: "Lancement des ateliers", statut: "a_venir" },
            { title: "Évaluation et ajustement", statut: "a_venir" }
          ]
        },
        reseau_entraide: {
          title: "Réseau d'Entraide et de Services Locaux",
          description: "Création d'une plateforme et d'événements pour faciliter l'échange de services, de compétences et de biens entre habitants.",
          descriptionComplete: "Ce projet vise à renforcer la solidarité au sein de la ville en créant un réseau où chacun peut proposer ou demander de l'aide (garde d'enfants, courses, bricolage, soutien scolaire, etc.). Une plateforme en ligne sera développée, complétée par des rencontres régulières pour favoriser les échanges et créer du lien social.",
          responsable: "Association Voisins Solidaires Ariane",
          localisation: "Plateforme en ligne et lieux de rencontre à Nice",
          prochaineMilestone: "Lancement de la plateforme en ligne - Décembre 2025",
          benefices: [
            "Renforcement de la cohésion sociale",
            "Accès facilité à des services de proximité",
            "Valorisation des compétences de chacun"
          ],
          timeline: [
            { title: "Étude des besoins et des offres", statut: "complete" },
            { title: "Développement de la plateforme", statut: "complete" },
            { title: "Recrutement des premiers membres", statut: "a_venir" },
            { title: "Lancement officiel", statut: "a_venir" },
            { title: "Organisation des événements de rencontre", statut: "a_venir" }
          ]
        },
        mobilite_douce: {
          title: "Développement des Itinéraires de Mobilité Douce",
          description: "Amélioration et extension des pistes cyclables et piétonnes, avec signalétique adaptée et points de repos.",
          descriptionComplete: "Ce projet vise à encourager les déplacements doux en rendant les itinéraires plus sûrs et agréables. Il inclut la création de 5 km de nouvelles pistes cyclables, l'élargissement des trottoirs, l'installation de bancs et de fontaines, et une signalétique claire pour les piétons et cyclistes. Une attention particulière sera portée à l'accessibilité pour les personnes à mobilité réduite.",
          responsable: "Ville de Nice - Service Mobilité",
          localisation: "Principaux axes du quartier de la vieille ville",
          prochaineMilestone: "Début des travaux d'aménagement - Mars 2025",
          benefices: [
            "Réduction de la pollution atmosphérique et sonore",
            "Amélioration de la sécurité des piétons et cyclistes",
            "Promotion d'un mode de vie sain et actif"
          ],
          timeline: [
            { title: "Diagnostic des infrastructures existantes", statut: "complete" },
            { title: "Conception des nouveaux itinéraires", statut: "complete" },
            { title: "Concertation avec les habitants", statut: "complete" },
            { title: "Début des travaux", statut: "en_cours" },
            { title: "Inauguration des itinéraires", statut: "a_venir" }
          ]
        }
      }
    },

    // Statuts généraux
    status: {
      published: "Publié",
      pending: "En attente",
      archived: "Archivé",
      inProgress: "En cours",
      planned: "Planifié",
      upcoming: "À venir",
      inPreparation: "En préparation",
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
      subtitle: "Transformons ensemble la ville de nice en un modèle de ville durable et connectée.",
      contact: {
        title: "Contact",
        address: "Ville de Nice",
        phone: "04 12 31 22 64",
        email: "contact@nice-ville-demain.fr"
      },
      links: {
        title: "Liens Utiles",
        municipality: "Mairie de Nice",
        metropolis: "Métropole Nice Côte d'Azur",
        anru: "ANRU",
        legals: "Mentions légales",
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
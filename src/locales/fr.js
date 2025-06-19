export default {
    translation: {
        // Navigation
        nav: {
            home: "Accueil",
            reports: "Vos safe places",
            projects: "Projets",
            map: "Carte",
            tips: "Ajouter une safe place",
            contact: "Contact",
            login: "Se connecter",
            logout: "Se déconnecter",
            profile: "Profil"
        },

        // Page d'accueil
        home: {
            title: "NICE SAFE PLACE",
            title1: "NICE",
            title2: "LA VILLE DE DEMAIN",
            subtitle: "Ensemble, construisons notre SAFE PLACE",
            valueA: "Inclusif",
            valueB: "Durable",
            valueC: "Connecté",
            back: "Retour à l'accueil",
            hero: {
                discover: "Découvrir les projets",
                report: "Partager une safe place",
                viewMap: "Voir sur OpenStreetMap"
            },
            vision: {
                title: "Notre Vision",
                subtitle: "Nice Safe Place est un projet citoyen imaginé pour rendre la ville de Nice plus inclusive, plus accueillante, et plus à l’écoute de celles et ceux qui y vivent.\n" +
                    "Ce dispositif a été conçu pour valoriser les lieux où l’on se sent bien.",
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
                interet: "Lieux certifiés",
                inprogress: "Lieux conseillés",
                tips: "conseils & infos",
            },
            collaborators: {
                title: "Ils nous font confiance",
                subtitle: "Nos partenaires et clients qui croient en notre expertise.",
            },
            participate: {
                title: "Rejoignez notre newsletter",
                subtitle: "Pour ne pas louper les nouveautés de safe places  ",
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
            },
            safeplace:{
                title:"Nous rejoindre",
                subtitle:"Vous souhaitez devenir un lieu Safe Place ? Contactez nous pour avoir plus d’information ",
                cta:"Contactez-Nous"
            }
        },

        // Authentification
        auth: {
            title: "Authentification",
            description: "Connectez-vous ou créez un compte pour signaler des problèmes",
            profile: {
                save: "Enregistrer les modifications",
                cancel: "Annuler",
                updating: "Mise à jour en cours...",
                updateSuccess: "Profil mis à jour avec succès !",
            },
            login: {
                title: "Connexion",
                email: "Adresse email",
                password: "Mot de passe",
                submit: "Se connecter",
                loading: "Connexion...",
                switchToRegister: "Pas de compte ? Créer un compte",
                success: "Connexion réussie !"
            },
            register: {
                title: "Inscription",
                displayName: "Nom d'affichage",
                noDisplayName: "Non défini",
                email: "Adresse email",
                password: "Mot de passe",
                submit: "Créer un compte",
                loading: "Création...",
                switchToLogin: "Déjà un compte ? Se connecter",
                success: "Compte créé avec succès !"
            },
            logout: {
                button: "Se déconnecter",
                success: "Déconnexion réussie"
            },
            errors: {
                invalidEmail: "Adresse email invalide",
                weakPassword: "Le mot de passe doit contenir au moins 6 caractères",
                userNotFound: "Aucun utilisateur trouvé avec cette adresse email",
                wrongPassword: "Mot de passe incorrect",
                emailInUse: "Cette adresse email est déjà utilisée",
                generic: "Une erreur est survenue. Veuillez réessayer."
            },
            tabs: {
                profile: "Mon profil",
                tips: {
                    title: "Mes conseils",
                    subtitle: "Vos conseils façonnent la ville",
                },
            }
        },

        // Signalements (maintenant Conseils & Infos)
        signalements: {
            title: "Vos safe places",
            subtitle: "Partagez les endroits que vous trouvez, inclusifs, accessibles et respectueux.",
            search_placeholder: "Rechercher un conseil ou une info...",
            filters: {
                allStatuses: "Tous les statuts",
                allCategories: "Toutes les catégories"
            },
            statistics: {
                title: "Statistiques des conseils et infos",
                total_reports: "Total des conseils et infos",
                green_tips: "Conseils verts",
                contributors: "Contributeurs"
            },
            statuses: {
                published: "Publié",
                pending: "En attente",
                archived: "Archivé",
                planned: "Planifié",
                incoming: "À venir",
                inprogress: "En cours",
            },
            categories: {
                practical_itinerary: "Itinéraires pratiques",
                local_event: "Événements locaux",
                green_hub: "Hubs verts",
                accessibility: "Accessibilité",
                general_advice: "Conseil général",
                environnement: "Environnement",
                technologie: "Technologie",
                securite: "Sécurité",
                social: "Social",
                transport: "Transport",
            },
            view_mode: {
                grid: "Grille",
                timeline: "Chronologie"
            },
            no_signalements_found: "Aucun conseil ou info trouvé",
            try_adjusting_filters: "Essayez de modifier vos filtres de recherche.",
            not_logged_in: {
                title: "Participez à l'amélioration de la ville",
                description: "Connectez-vous pour partager vos conseils et initiatives.",
                login_button: "Se connecter"
            },
            timeline: {
                follow_up_title: "Suivi",
                location: "Lieu",
                date: "Date",
                published: "Publié",
            },
            locale: "fr-FR", // utilisé dans les appels à `toLocaleDateString`
        },

        // Projets
        projects: {
            title: "Projets Citoyens",
            subtitle: "Découvrez tous les projets qui transforment la ville de Nice.",
            subtitle2: "Suivez leur avancement et participez à leur réalisation.",
            search: "Rechercher un projet...",
            allCategories: "Toutes les catégories",
            allStatuses: "Tous les statuts",
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
            completed: "Terminé",
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
                engage: "Nous rejoindre"
            },
            legal: {
                title: "Informations Légales",
                privacy: "Politique de confidentialité",
                terms: "Conditions d'utilisation",
                cookies: "Gestion des cookies"
            },
            copyright: "© 2025 Nice Ville de Demain. Tous droits réservés."
        },
        // SignalementApp
        signalement: {
            timeline: {
                title: "Historique du signalement",
                created: "Créé",
                validated: "Validé",
                archived: "Archivé",
            },
            archive: {
                success: "Signalement archivé avec succès !",
            },
            validation: {
                success: "Signalement validé avec succès !",
            },
            create_tab: "Nouveau conseil",
            my_reports_tab: "Mes conseils ({{count}})",
            success_message: "Votre conseil a été soumis avec succès !",
            geolocation_success: "Votre position a été détectée avec succès.",
            geolocation_error: "Impossible d'obtenir votre position. Veuillez vérifier vos paramètres pour autoriser la localisation ou entrer les coordonnées manuellement.",
            new_report: {
                title: "Créer un conseil",
                description: "Veuillez fournir les détails du conseil que vous souhaitez ajouter.",
            },
            form: {
                category_label: "Catégorie",
                category_placeholder: "Choisissez une catégorie",
                description_label: "Description",
                space_name: "Nom de l'espace public (optionnel)",
                description_placeholder: "Renseignez une description détaillée du conseil ou de l'info",
                latitude_label: "Latitude",
                longitude_label: "Longitude",
                location_name_label: "Nom du lieu (optionnel)",
                location_name_placeholder: "Ex : Parc Masséna, rue des Lilas...",
                get_location_button: "Utiliser ma position actuelle",
                image_label: "Image (optionnel)",
                image_formats: "Formats acceptés : JPG, PNG, GIF. Taille max : 5 Mo.",
                submitting_button: "Envoi en cours...",
                submit_button: "Soumettre le signalement",
            },
            list: {
                no_reports_title: "Aucun conseil",
                no_reports_description: "Vous n’avez pas encore effectué de conseil.",
            },
            status: {
                pending: "En attente",
                in_progress: "En cours",
                resolved: "Résolu",
                rejected: "Rejeté",
                validated: "Validé",
                archived: "Archivé",
                published: "Publié",
                pendingMessage: "💡 Validez votre tip pour le rendre visible dans la page publique Signalements Citoyens",
                publishedMessage: "✅ Ce tip est visible par tous les utilisateurs dans Signalements Citoyens",
                archivedMessage: "📁 Ce tip est archivé et n'est plus visible publiquement",
                validationpublish: "Valider et publier",
                validation: "Validation...",
                archiver: "Archiver",
                archiveloading: "Archivage...",
                visible: "Visible publiquement",
                restore: "Restauration...",
                republish: "Republier"

            },
            categories: {
                road_damage: "Dommage sur la route",
                street_light: "Éclairage public",
                trash: "Déchets",
                vandalism: "Vandalisme",
                other: "Autre",
                itinerary: "Itinéraires pratiques",
                event: "Événements locaux",
                green_hub: "Hubs verts",
                accessibility: "Accessibilité",
                local_tip: "Conseil général"
            },
            restricted_access: {
                title: "Accès restreint",
                description: "Cette fonctionnalité est uniquement accessible aux utilisateurs connectés. Veuillez vous connecter pour continuer.",
                login_button: "Se connecter",
            },
            image_alt: "Image du signalement",
        }
    }
}
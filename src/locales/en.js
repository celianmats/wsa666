export default {
    translation: {
        // Navigation
        nav: {
            home: "Home",
            reports: "Tips & Info",
            projects: "Projects",
            map: "Map",
            tips: "Add new tip",
            contact: "Contact",
            login: "Sign In",
            logout: "Sign Out",
            profile: "Profile"
        },

        // Homepage
        home: {
            title: "NICE SAFE PLACE",
            title1: "NICE",
            title2: "CITY OF TOMORROW",
            subtitle: "Together, let's build our safe place",
            valueA: "Inclusive",
            valueB: "Sustainable",
            valueC: "Connected",
            back: "Back to home page",
            hero: {
                discover: "Discover projects",
                report: "Share a Safe Place",
                viewMap: "View on OpenStreetMap"
            },
            vision: {
                title: "Our Vision",
                subtitle: "Nice Safe Place is a community-led project designed to make the city of Nice more inclusive, welcoming, and responsive to those who live there.\n" +
                    "This initiative was designed to promote places where people feel good.",
                inclusive: {
                    title: "Inclusive",
                    description: "A neighborhood accessible to all, where every citizen can participate in community life"
                },
                sustainable: {
                    title: "Sustainable",
                    description: "Ecological solutions to preserve the environment and improve quality of life"
                },
                connected: {
                    title: "Connected",
                    description: "Modern digital infrastructure to facilitate exchanges and services"
                }
            },
            projects: {
                title: "Citizen Projects",
                subtitle: "Discover the initiatives that are transforming our city",
                viewAll: "View all projects"
            },
            map: {
                title: "Interactive Map",
                subtitle: "Explore the city and its projects in real time",
                interet: "Points of interest",
                inprogress: "Projects in progress",
                tips: "tips & info",
            },
            participate: {
                title: "Participate to the Project",
                subtitle: "Your voice matters in the city transformation",
                form: {
                    title: "Registration form",
                    subtitle: "Join the community of citizens committed to the Nice of tomorrow.",
                    name: "Full name",
                    email: "Email address",
                    phone: "Phone (optional)",
                    message: "Your message or suggestion",
                    placeholder: "Share your ideas for improving the city...",
                    newsletter: "I want to receive the project newsletter",
                    submit: "Join the project",
                    success: "Thank you! Your registration has been recorded."
                }
            }
        },

        // Authentication
        auth: {
            title: "Authentication",
            description: "Sign in or create an account to report issues",
            profile: {
                save: "Save Changes",
                cancel: "Cancel",
                updating: "Updating profile...",
                updateSuccess: "Profile updated successfully!",
            },
            login: {
                title: "Sign In",
                email: "Email address",
                password: "Password",
                submit: "Sign In",
                loading: "Signing in...",
                switchToRegister: "No account? Create an account",
                success: "Successfully signed in!"
            },
            register: {
                title: "Sign Up",
                displayName: "Display name",
                noDisplayName: "Not set",
                email: "Email address",
                password: "Password",
                submit: "Create account",
                loading: "Creating...",
                switchToLogin: "Already have an account? Sign In",
                success: "Account successfully created!"
            },
            logout: {
                button: "Sign Out",
                success: "Successfully signed out"
            },
            errors: {
                invalidEmail: "Invalid email address",
                weakPassword: "Password must contain at least 6 characters",
                userNotFound: "No user found with this email address",
                wrongPassword: "Incorrect password",
                emailInUse: "This email address is already in use",
                generic: "An error occurred. Please try again."
            },
            tabs:{
                profile:"Profile",
                tips: {
                    title: "My tips",
                    subtitle: "Your tips shapes the city",
                },
            }
        },

        // Signalements (now Tips & Info)
        signalements: {
            title: "Citizen Tips & Information",
            subtitle: "Share your tips, initiatives, and useful information for the city.",
            search_placeholder: "Search tips or info...",
            filters: {
                allStatuses: "All statuses",
                allCategories: "All categories",
                grid: "Grid",
                timeline: "Timeline"
            },
            statistics: {
                title: "Tips & Information Statistics",
                total_reports: "Total reports ",
                green_tips: "Green tips",
                contributors: "Contributors"
            },
            statuses: {
                published: "Published",
                pending: "Pending",
                archived: "Archived",
                planned: "Planned",
                incoming: "Upcoming",
                inprogress: "In Progress",
            },
            categories: {
                practical_itinerary: "Practical itineraries",
                local_event: "Events & Initiatives",
                green_hub: "Green hubs",
                accessibility: "Accessibility",
                general_advice: "Local tip",
                environnement: "Environment",
                technologie: "Technology",
                securite: "Safety",
                social: "Social",
                transport: "Transport",
            },
            noResults: "No tips or information found",
            noResultsDesc: "Try adjusting your search filters.",
            createReport: "Share a tip or info",
            myReports: "My contributions",
            notConnected: {
                title: "Contribute to improving the city",
                description: "Log in to share your tips and initiatives.",
                login: "Log in"
            },
            new_report: {
                title: "Share a new tip or information",
                description: "Fill out the form below to share your contribution with the community."
            },
            form: {
                category_label: "Category",
                category_placeholder: "Select a category",
                description_label: "Description",
                description_placeholder: "Describe your tip or information in detail...",
                latitude_label: "Latitude",
                longitude_label: "Longitude",
            },
            timeline: {
                location: "Location",
                date: "Date",
                follow_up_title: "Follow-up",
                published: "Published",
            },
            view_mode: {
                grid: "Grid",
                timeline: "Timeline"
            },
            not_logged_in: {
                title: "Participate in the city’s improvement",
                description: "Log in to share your tips and initiatives.",
                login_button: "Log in"
            },
            no_signalements_found: "No tips or information found",
            try_adjusting_filters: "Try adjusting your filters"
        },

        // Projects
        projects: {
            title: "Citizen Projects",
            subtitle: "Discover all projects transforming the Ariane district.",
            subtitle2: "Follow their progress and participate in their realization.",
            search: "Search for a project...",
            allCategories: "All categories",
            allStatuses: "All statuses",
            filters: {
                allStatuses: "All statuses",
                allCategories: "All categories",
                grid_view: "Grid",
                timeline_view: "Timeline",
                search_placeholder: "Search for a project..."
            },
            statuses: {
                inProgress: "In Progress",
                planned: "Planned",
                upcoming: "Upcoming",
                inPreparation: "In Preparation",
                completed: "Completed"
            },
            categories: {
                environment: "Environment",
                social: "Social",
                transport: "Transport"
            },
            card: {
                progress: "Progress",
                participants: "{{count}} participants",
                next_step: "Next step"
            },
            timeline: {
                budget: "Budget",
                participants: "Participants",
                progress: "Progress",
                follow_up: "Project follow-up",
                benefits: "Expected benefits"
            },
            no_projects: {
                title: "No projects found",
                description: "Try modifying your search filters."
            },
        },

        // General statuses
        status: {
            published: "Published",
            pending: "Pending",
            archived: "Archived",
            inProgress: "In Progress",
            planned: "Planned",
            upcoming: "Upcoming",
            inPreparation: "In Preparation",
            completed: "Completed"
        },

        // Common messages
        common: {
            loading: "Loading...",
            error: "An error occurred",
            retry: "Retry",
            cancel: "Cancel",
            save: "Save",
            delete: "Delete",
            edit: "Edit",
            view: "View",
            back: "Back",
            next: "Next",
            previous: "Previous",
            close: "Close",
            search: "Search",
            filter: "Filter",
            sort: "Sort",
            date: "Date",
            time: "Time",
            location: "Location",
            description: "Description",
            category: "Category",
            status: "Status",
            actions: "Actions"
        },

        // Footer
        footer: {
            subtitle: "Let's work together to transform nice into a model sustainable and connected city.",
            contact: {
                title: "Contact",
                address: "City of Nice",
                phone: "04 12 31 22 64",
                email: "contact@nice-ville-demain.fr"
            },
            links: {
                title: "Useful Links",
                municipality: "City of Nice",
                metropolis: "Nice Côte d'Azur Metropolis",
                anru: "ANRU",
                legals: "Terms of use",
            },
            legal: {
                title: "Legal Information",
                privacy: "Privacy Policy",
                terms: "Terms of Use",
                cookies: "Cookie Management"
            },
            copyright: "© 2025 Nice Ville de Demain. All rights reserved."
        },
        // SignalementApp
        signalement: {
            create_tab: "New Tip",
            my_reports_tab: "My Tips ({{count}})",
            success_message: "Your tip has been successfully submitted!",
            geolocation_error: "Unable to obtain your location. Please check your settings to enable location or enter the coordinates manually.",
            new_report: {
                title: "Create a Tip",
                description: "Please provide details about the tip you'd like to share.",
            },

            form: {
                category_label: "Category",
                category_placeholder: "Choose a category",
                description_label: "Description",
                space_name: "Name of public space (optional)",
                description_placeholder: "Provide a detailed description of the tip or information",
                latitude_label: "Latitude",
                longitude_label: "Longitude",
                location_name_label: "Place Name (optional)",
                location_name_placeholder: "e.g., Masséna Park, Rue des Lilas...",
                get_location_button: "Use My Current Location",
                image_label: "Image (optional)",
                image_formats: "Accepted formats: JPG, PNG, GIF. Max size: 5MB.",
                submitting_button: "Submitting...",
                submit_button: "Submit Tip",
            },

            list: {
                no_reports_title: "No Tips Yet",
                no_reports_description: "You haven't shared any tips yet.",
            },
            status: {
                pending: "Pending",
                in_progress: "In Progress",
                resolved: "Resolved",
                rejected: "Rejected",
                validated: "Validated",
                archived: "Archived",
                published: "Published",
                pendingMessage: "💡 Validate your tip to make it visible to all users in Citizen Reports",
                publishedMessage: "✅ This tip is now visible to all users",
                archivedMessage: "📁 This tip is archived and no longer visible to users",
                validationpublish: "Validate and publish",
                validation: "Validating...",
                archiver: "Archive",
                archiveloading: "Archiving...",
                visible: "Visible publicly",
                restore: "Catering...",
                republish: "Republish"
            },

            timeline: {
                title: "Tip History",
                created: "Created",
                validated: "Validated",
                archived: "Archived",
            },

            categories: {
                road_damage: "Road Damage",
                street_light: "Street Lighting",
                trash: "Trash",
                vandalism: "Vandalism",
                other: "Other",
                itinerary: "Practical Routes",
                event: "Local Events",
                green_hub: "Green Hubs",
                accessibility: "Accessibility",
                local_tip: "General Tip",
            },
            restricted_access: {
                title: "Restricted Access",
                description: "This feature is only available for registered users. Please sign in to continue.",
                login_button: "Sign in",
            },
            image_alt: "Tip image",
        }
    }
}



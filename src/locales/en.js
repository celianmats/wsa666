export default {
  translation: {
    // Navigation
    nav: {
      home: "Home",
      reports: "Tips & Info",
      projects: "Projects",
      map: "Map",
      contact: "Contact",
      login: "Sign In",
      logout: "Sign Out",
      profile: "Profile"
    },

    // Homepage
    home: {
      title: "Nice City of Tomorrow",
      subtitle: "Together, let's build an inclusive, sustainable and connected city",
      valueA: "Inclusive",
      valueB: "Sustainable",
      valueC: "Connected",
      back: "Back to home page",
      hero: {
        discover: "Discover projects",
        report: "Share a tip",
        viewMap: "View on OpenStreetMap"
      },
      vision: {
        title: "Our Vision",
        subtitle: "The city of Nice is transforming itself into a model sustainable and connected city. Our mission is to create an urban environment that fosters social inclusion, environmental sustainability and technological innovation at the service of citizens.",
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
      statuses: {
        published: "Published",
        pending: "Pending",
        archived: "Archived"
      },
      categories: {
        practical_itinerary: "Practical itineraries",
        local_event: "Events & Initiatives",
        green_hub: "Green hubs",
        accessibility: "Accessibility",
        general_advice: "Local tip",
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
        // Ajoute d'autres champs ici si besoin
      },
      timeline: {
        location: "Location",
        date: "Date",
        follow_up_title: "Follow-up",
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
      subtitle: "Discover all projects transforming the Ariane district. Follow their progress and participate in their realization.",
      search: "Search for a project...",
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
      items: {
        panneaux_solaires: {
          title: "Installation of Community Solar Panels",
          description: "Project aiming to equip public and residential building roofs with solar panels for local and sustainable energy.",
          descriptionComplete: "This major project plans the installation of 500m² of solar panels on the roofs of schools, gyms, and social housing. The energy produced will be reinjected into the local grid, reducing the neighborhood's energy bill and carbon footprint. Awareness workshops will be organized for residents.",
          responsable: "Ariane Energy Collective",
          localisation: "Roofs of public and residential buildings",
          prochaineMilestone: "Validation of installation sites - September 2025",
          benefices: [
            "20% reduction in the neighborhood's electricity consumption",
            "Creation of local jobs in installation and maintenance",
            "Awareness of residents about renewable energies"
          ],
          timeline: [
            { title: "Feasibility study", statut: "complete" },
            { title: "Citizen consultation", statut: "complete" },
            { title: "Site selection", statut: "complete" },
            { title: "Panel installation", statut: "en_cours" },
            { title: "Commissioning", statut: "a_venir" },
            { title: "Monitoring and maintenance", statut: "a_venir" }
          ]
        },
        compost_quartier: {
          title: "Implementation of Neighborhood Composting Bins",
          description: "Creation of collective composting points to reduce organic waste and produce natural amendment for green spaces.",
          descriptionComplete: "This project aims to install 10 neighborhood composting bins in strategic locations (parks, residences, markets). Training will be offered to residents to learn good composting practices. The compost produced will be used to enrich the soil of shared gardens and parks in the neighborhood.",
          responsable: "Compost'Ariane Association",
          localisation: "10 designated sites in the neighborhood",
          prochaineMilestone: "Inauguration of the first composting bins - July 2025",
          benefices: [
            "30% reduction in household waste",
            "Production of natural fertilizer for green spaces",
            "Strengthening social ties around an ecological practice"
          ],
          timeline: [
            { title: "Site identification", statut: "complete" },
            { title: "Composter acquisition", statut: "complete" },
            { title: "Referent training", statut: "a_venir" },
            { title: "Installation and inauguration", statut: "a_venir" },
            { title: "Monitoring and animation", statut: "a_venir" }
          ]
        },
        jardins_partages: {
          title: "Development of Inclusive Shared Gardens",
          description: "Extension of existing shared gardens and creation of new spaces to promote biodiversity and intergenerational exchange.",
          descriptionComplete: "This project plans the development of 3 new shared gardens accessible to all, including people with reduced mobility. Plots will be dedicated to schools and associations. The objective is to create places for meeting, sharing knowledge, and producing local vegetables and flowers.",
          responsable: "Solidarity Gardens Collective",
          localisation: "Various unused lands",
          prochaineMilestone: "Launch of calls for projects for plots - October 2025",
          benefices: [
            "Increase in urban biodiversity",
            "Improvement of local and healthy food",
            "Creation of social and intergenerational ties"
          ],
          timeline: [
            { title: "Land identification", statut: "complete" },
            { title: "Design of developments", statut: "a_venir" },
            { title: "Development work", statut: "a_venir" },
            { title: "Plot allocation", statut: "a_venir" },
            { title: "First harvests", statut: "a_venir" }
          ]
        },
        ateliers_reparation: {
          title: "Repair and Recycling Workshops",
          description: "Establishment of regular workshops to learn how to repair objects, clothes, and electronic devices, and promote recycling.",
          descriptionComplete: "These workshops will be held once a month in a dedicated neighborhood location. Expert volunteers will assist participants in repairing their items, thus reducing waste and promoting the circular economy. Specific recyclable material collections will also be set up.",
          responsable: "Ariane Repair Café",
          localisation: "Ariane Social and Cultural Center",
          prochaineMilestone: "First workshop session - November 2025",
          benefices: [
            "Reduction of waste sent to incineration",
            "Acquisition of repair skills for residents",
            "Promotion of more responsible consumption"
          ],
          timeline: [
            { title: "Volunteer search", statut: "complete" },
            { title: "Space development", statut: "en_cours" },
            { title: "Communication and registration", statut: "a_venir" },
            { title: "Workshop launch", statut: "a_venir" },
            { title: "Evaluation and adjustment", statut: "a_venir" }
          ]
        },
        reseau_entraide: {
          title: "Mutual Aid and Local Services Network",
          description: "Creation of a platform and events to facilitate the exchange of services, skills, and goods among neighborhood residents.",
          descriptionComplete: "This project aims to strengthen solidarity within the neighborhood by creating a network where everyone can offer or ask for help (childcare, errands, DIY, tutoring, etc.). An online platform will be developed, complemented by regular meetings to foster exchanges and create social ties.",
          responsable: "Ariane Solidarity Neighbors Association",
          localisation: "Online platform and neighborhood meeting places",
          prochaineMilestone: "Launch of the online platform - December 2025",
          benefices: [
            "Strengthening social cohesion",
            "Easier access to local services",
            "Valuing everyone's skills"
          ],
          timeline: [
            { title: "Needs and offers study", statut: "complete" },
            { title: "Platform development", statut: "complete" },
            { title: "Recruitment of first members", statut: "a_venir" },
            { title: "Official launch", statut: "a_venir" },
            { title: "Organization of meeting events", statut: "a_venir" }
          ]
        },
        mobilite_douce: {
          title: "Development of Soft Mobility Itineraries",
          description: "Improvement and extension of cycle and pedestrian paths, with adapted signage and rest areas.",
          descriptionComplete: "This project aims to encourage soft mobility by making itineraries safer and more pleasant. It includes the creation of 5 km of new cycle paths, widening of sidewalks, installation of benches and fountains, and clear signage for pedestrians and cyclists. Special attention will be paid to accessibility for people with reduced mobility.",
          responsable: "City of Nice - Mobility Department",
          localisation: "Main axes of the neighborhood",
          prochaineMilestone: "Start of development work - March 2025",
          benefices: [
            "Reduction of air and noise pollution",
            "Improvement of pedestrian and cyclist safety",
            "Promotion of a healthy and active lifestyle"
          ],
          timeline: [
            { title: "Diagnosis of existing infrastructures", statut: "complete" },
            { title: "Design of new itineraries", statut: "complete" },
            { title: "Consultation with residents", statut: "complete" },
            { title: "Start of work", statut: "en_cours" },
            { title: "Inauguration of itineraries", statut: "a_venir" }
          ]
        }
      }
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
    }
  }
}



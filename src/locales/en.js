export default {
  translation: {
    // Navigation
    nav: {
      home: "Home",
      reports: "Reports", 
      projects: "Projects",
      map: "Map",
      contact: "Contact",
      login: "Sign In",
      logout: "Sign Out",
      profile: "Profile"
    },

    // Homepage
    home: {
      title: "Ariane of Tomorrow",
      subtitle: "Together, let's build an inclusive, sustainable and connected neighborhood",
      hero: {
        discover: "Discover projects",
        report: "Report an issue"
      },
      vision: {
        title: "Our Vision",
        subtitle: "Transform the Ariane district into a model of sustainable city",
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
        subtitle: "Discover the initiatives transforming our neighborhood",
        viewAll: "View all projects"
      },
      map: {
        title: "Interactive Map",
        subtitle: "Explore the neighborhood and its projects in real time"
      },
      participate: {
        title: "Participate in the Project",
        subtitle: "Your voice matters in the neighborhood transformation",
        form: {
          name: "Full name",
          email: "Email address",
          phone: "Phone (optional)",
          message: "Your message or suggestion",
          newsletter: "I want to receive the project newsletter",
          submit: "Join the project",
          success: "Thank you! Your registration has been recorded."
        }
      }
    },

    // Authentication
    auth: {
      title: "Authentication",
      login: {
        title: "Sign In",
        email: "Email address",
        password: "Password",
        submit: "Sign In",
        switchToRegister: "No account? Create an account"
      },
      register: {
        title: "Sign Up", 
        displayName: "Display name",
        email: "Email address",
        password: "Password",
        submit: "Create account",
        switchToLogin: "Already have an account? Sign In"
      },
      errors: {
        invalidEmail: "Invalid email address",
        weakPassword: "Password must contain at least 6 characters",
        userNotFound: "No user found with this email address",
        wrongPassword: "Incorrect password",
        emailInUse: "This email address is already in use"
      }
    },

    // Reports
    reports: {
      title: "Citizen Reports",
      subtitle: "Discover all neighborhood reports and track their resolution",
      search: "Search for a report...",
      filters: {
        allStatuses: "All statuses",
        allCategories: "All categories",
        grid: "Grid",
        timeline: "Timeline"
      },
      statuses: {
        open: "Open",
        inProgress: "In Progress", 
        resolved: "Resolved"
      },
      categories: {
        degradation: "Degradation",
        nuisance: "Nuisance",
        road: "Road",
        lighting: "Lighting",
        cleanliness: "Cleanliness",
        vegetation: "Vegetation",
        other: "Other"
      },
      noResults: "No reports found",
      noResultsDesc: "Try modifying your search filters.",
      createReport: "Create a report",
      myReports: "My reports",
      notConnected: {
        title: "Participate in neighborhood improvement",
        description: "Sign in to report issues and track their resolution.",
        login: "Sign In"
      }
    },

    // Projects
    projects: {
      title: "Citizen Projects",
      subtitle: "Discover all projects transforming the Ariane district. Follow their progress and participate in their realization.",
      search: "Search for a project...",
      filters: {
        allStatuses: "All statuses",
        allCategories: "All categories",
        grid: "Grid",
        timeline: "Timeline"
      },
      statuses: {
        inProgress: "In Progress",
        planned: "Planned",
        upcoming: "Upcoming",
        preparation: "In Preparation",
        completed: "Completed"
      },
      categories: {
        environment: "Environment",
        technology: "Technology", 
        security: "Security",
        social: "Social",
        transport: "Transport"
      },
      details: {
        budget: "Budget",
        participants: "Participants",
        progress: "Progress",
        location: "Location",
        nextMilestone: "Next milestone",
        expectedBenefits: "Expected benefits",
        timeline: "Project timeline"
      },
      noResults: "No projects found",
      noResultsDesc: "Try modifying your search filters."
    },

    // Report application
    reportApp: {
      title: "Report Application",
      tabs: {
        create: "Create a report",
        myReports: "My reports"
      },
      form: {
        category: "Issue category",
        selectCategory: "Select a category",
        description: "Issue description",
        descriptionPlaceholder: "Describe the issue in detail...",
        location: "Location",
        getCurrentLocation: "Get my current location",
        latitude: "Latitude",
        longitude: "Longitude", 
        photo: "Photo (optional)",
        selectPhoto: "Select a photo",
        submit: "Create report",
        success: "Report created successfully!",
        locationError: "Unable to get your location. Please enter coordinates manually."
      },
      list: {
        noReports: "No reports found",
        createdAt: "Created on",
        status: "Status"
      }
    },

    // General statuses
    status: {
      open: "Open",
      inProgress: "In Progress",
      resolved: "Resolved",
      planned: "Planned",
      upcoming: "Upcoming",
      preparation: "In Preparation",
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
      contact: {
        title: "Contact",
        address: "Ariane District, Nice",
        phone: "04 XX XX XX XX",
        email: "contact@nice-ville-demain.fr"
      },
      links: {
        title: "Useful Links",
        municipality: "City of Nice",
        metropolis: "Nice Côte d'Azur Metropolis",
        anru: "ANRU",
        accessibility: "Accessibility"
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


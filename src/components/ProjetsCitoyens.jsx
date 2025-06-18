import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Calendar, Grid, Users, MapPin, Clock, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const ProjetsCitoyens = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('tous')
  const [categoryFilter, setCategoryFilter] = useState('toutes')
  const [viewMode, setViewMode] = useState('grille')

  // Données des projets citoyens étendues
  const projets = [
    {
      id: 1,
      titre: "Rénovation Urbaine Durable",
      description: "Transformation écologique du quartier avec création d'espaces verts, rénovation énergétique des bâtiments et installation de panneaux solaires.",
      descriptionComplete: "Ce projet ambitieux vise à transformer le quartier de Saint Augustin à Nice en un modèle de développement durable. Il comprend la rénovation énergétique de 500 logements, la création de 3 nouveaux parcs urbains, l'installation de 200 panneaux solaires et la mise en place d'un système de récupération des eaux de pluie.",
      statut: "en_cours",
      categorie: "environnement",
      dateDebut: "2024-01-15",
      dateFin: "2026-12-31",
      budget: "15M€",
      avancement: 35,
      responsable: "Métropole Nice Côte d'Azur",
      participants: 1250,
      localisation: "Ensemble du quartier",
      prochaineMilestone: "Inauguration du premier parc - Mars 2025",
      benefices: ["Réduction de 40% des émissions CO2", "Création de 150 emplois verts", "Amélioration de la qualité de l'air"],
      images: ["/api/placeholder/400/300"],
      timeline: [
        { date: "2024-01-15", titre: "Lancement du projet", statut: "complete" },
        { date: "2024-06-01", titre: "Début des travaux de rénovation", statut: "complete" },
        { date: "2024-12-15", titre: "Installation des panneaux solaires", statut: "complete" },
        { date: "2025-03-01", titre: "Ouverture du premier parc", statut: "en_cours" },
        { date: "2025-09-01", titre: "Finalisation des rénovations", statut: "a_venir" },
        { date: "2026-12-31", titre: "Achèvement du projet", statut: "a_venir" }
      ]
    },
    {
      id: 2,
      titre: "Infrastructure Numérique",
      description: "Déploiement de la fibre optique et création d'un réseau WiFi public gratuit pour réduire la fracture numérique.",
      descriptionComplete: "Initiative majeure pour connecter tous les habitants du quartier avec un accès internet haut débit. Le projet inclut l'installation de 50 bornes WiFi publiques, la couverture fibre de 100% des logements et la création d'un espace numérique partagé.",
      statut: "planifie",
      categorie: "technologie",
      dateDebut: "2025-03-01",
      dateFin: "2025-11-30",
      budget: "3.2M€",
      avancement: 15,
      responsable: "Orange & Ville de Nice",
      participants: 890,
      localisation: "Zones résidentielles et commerciales",
      prochaineMilestone: "Début des travaux de câblage - Mars 2025",
      benefices: ["Accès internet pour 100% des foyers", "Réduction de la fracture numérique", "Télétravail facilité"],
      images: ["/api/placeholder/400/300"],
      timeline: [
        { date: "2024-10-01", titre: "Étude de faisabilité", statut: "complete" },
        { date: "2025-01-15", titre: "Validation du projet", statut: "complete" },
        { date: "2025-03-01", titre: "Début des travaux", statut: "a_venir" },
        { date: "2025-07-01", titre: "Installation des bornes WiFi", statut: "a_venir" },
        { date: "2025-11-30", titre: "Mise en service complète", statut: "a_venir" }
      ]
    },
    {
      id: 3,
      titre: "Sécurité Connectée",
      description: "Installation de systèmes de vidéosurveillance intelligente et d'éclairage adaptatif pour améliorer la sécurité.",
      descriptionComplete: "Projet innovant combinant sécurité et technologie avec l'installation de 80 caméras intelligentes, 200 lampadaires connectés et un centre de supervision moderne. Le système utilise l'IA pour détecter automatiquement les situations à risque.",
      statut: "a_venir",
      categorie: "securite",
      dateDebut: "2025-06-01",
      dateFin: "2026-03-31",
      budget: "2.8M€",
      avancement: 5,
      responsable: "Police Municipale & Ville de Nice",
      participants: 650,
      localisation: "Espaces publics et axes principaux",
      prochaineMilestone: "Consultation publique - Avril 2025",
      benefices: ["Réduction de 30% de la délinquance", "Éclairage intelligent économe", "Intervention rapide des secours"],
      images: ["/api/placeholder/400/300"],
      timeline: [
        { date: "2024-12-01", titre: "Conception du projet", statut: "complete" },
        { date: "2025-04-01", titre: "Consultation publique", statut: "a_venir" },
        { date: "2025-06-01", titre: "Installation des équipements", statut: "a_venir" },
        { date: "2025-12-01", titre: "Tests et calibrage", statut: "a_venir" },
        { date: "2026-03-31", titre: "Mise en service", statut: "a_venir" }
      ]
    },
    {
      id: 4,
      titre: "Espaces Collaboratifs",
      description: "Création de lieux de co-working, d'espaces communautaires et d'ateliers partagés pour renforcer le lien social.",
      descriptionComplete: "Transformation de 3 bâtiments en espaces collaboratifs modernes incluant un fab lab, des salles de co-working, une médiathèque numérique et des espaces de formation. Ces lieux favoriseront l'entrepreneuriat local et le lien intergénérationnel.",
      statut: "en_preparation",
      categorie: "social",
      dateDebut: "2025-09-01",
      dateFin: "2026-06-30",
      budget: "1.5M€",
      avancement: 10,
      responsable: "Association Quartier Nice",
      participants: 420,
      localisation: "3 bâtiments rénovés",
      prochaineMilestone: "Finalisation des plans - Juin 2025",
      benefices: ["50 nouveaux emplois créés", "Formation de 200 personnes/an", "Renforcement du lien social"],
      images: ["/api/placeholder/400/300"],
      timeline: [
        { date: "2024-11-01", titre: "Étude des besoins", statut: "complete" },
        { date: "2025-02-01", titre: "Conception architecturale", statut: "en_cours" },
        { date: "2025-06-01", titre: "Validation des plans", statut: "a_venir" },
        { date: "2025-09-01", titre: "Début des travaux", statut: "a_venir" },
        { date: "2026-06-30", titre: "Ouverture au public", statut: "a_venir" }
      ]
    },
    {
      id: 5,
      titre: "Mobilité Douce",
      description: "Développement d'un réseau de pistes cyclables et installation de bornes de vélos électriques partagés.",
      descriptionComplete: "Création d'un réseau de 15 km de pistes cyclables sécurisées, installation de 20 stations de vélos électriques partagés et aménagement de parkings vélos sécurisés. Ce projet s'inscrit dans la stratégie de mobilité durable de la métropole.",
      statut: "planifie",
      categorie: "transport",
      dateDebut: "2025-04-01",
      dateFin: "2026-10-31",
      budget: "4.1M€",
      avancement: 20,
      responsable: "Métropole Nice Côte d'Azur",
      participants: 980,
      localisation: "Axes de circulation principaux",
      prochaineMilestone: "Début des aménagements - Avril 2025",
      benefices: ["Réduction de 25% du trafic automobile", "Amélioration de la qualité de l'air", "Promotion de l'activité physique"],
      images: ["/api/placeholder/400/300"],
      timeline: [
        { date: "2024-09-01", titre: "Étude de circulation", statut: "complete" },
        { date: "2024-12-01", titre: "Concertation citoyenne", statut: "complete" },
        { date: "2025-04-01", titre: "Début des aménagements", statut: "a_venir" },
        { date: "2025-09-01", titre: "Installation des stations vélos", statut: "a_venir" },
        { date: "2026-10-31", titre: "Inauguration du réseau", statut: "a_venir" }
      ]
    },
    {
      id: 6,
      titre: "Agriculture Urbaine",
      description: "Création de jardins partagés et d'une ferme urbaine pour promouvoir l'alimentation locale et durable.",
      descriptionComplete: "Développement de 5 jardins partagés, création d'une ferme urbaine de 2000m² avec serres connectées et mise en place d'un marché de producteurs locaux hebdomadaire. Ce projet vise l'autonomie alimentaire partielle du quartier.",
      statut: "en_cours",
      categorie: "environnement",
      dateDebut: "2024-03-01",
      dateFin: "2025-08-31",
      budget: "800K€",
      avancement: 60,
      responsable: "Association Les Jardins de l'Ariane",
      participants: 320,
      localisation: "Espaces verts et toitures",
      prochaineMilestone: "Ouverture de la ferme urbaine - Mai 2025",
      benefices: ["Production de 5 tonnes de légumes/an", "Formation de 100 jardiniers", "Réduction des déchets organiques"],
      images: ["/api/placeholder/400/300"],
      timeline: [
        { date: "2024-03-01", titre: "Préparation des terrains", statut: "complete" },
        { date: "2024-06-01", titre: "Plantation des premiers jardins", statut: "complete" },
        { date: "2024-10-01", titre: "Construction de la ferme urbaine", statut: "complete" },
        { date: "2025-05-01", titre: "Ouverture de la ferme", statut: "en_cours" },
        { date: "2025-08-31", titre: "Finalisation du projet", statut: "a_venir" }
      ]
    }
  ]

  const categories = [
    { value: 'toutes', label: 'Toutes les catégories' },
    { value: 'environnement', label: 'Environnement' },
    { value: 'technologie', label: 'Technologie' },
    { value: 'securite', label: 'Sécurité' },
    { value: 'social', label: 'Social' },
    { value: 'transport', label: 'Transport' }
  ]

  const statuts = [
    { value: 'tous', label: 'Tous les statuts' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'planifie', label: 'Planifié' },
    { value: 'a_venir', label: 'À venir' },
    { value: 'en_preparation', label: 'En préparation' }
  ]

  const getStatusBadge = (statut) => {
    const statusConfig = {
      'en_cours': { label: 'En cours', variant: 'default', icon: PlayCircle },
      'planifie': { label: 'Planifié', variant: 'secondary', icon: Calendar },
      'a_venir': { label: 'À venir', variant: 'outline', icon: Clock },
      'en_preparation': { label: 'En préparation', variant: 'destructive', icon: AlertCircle }
    }
    
    const config = statusConfig[statut] || statusConfig['a_venir']
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getCategoryIcon = (categorie) => {
    const icons = {
      'environnement': '🌱',
      'technologie': '💻',
      'securite': '🛡️',
      'social': '👥',
      'transport': '🚴'
    }
    return icons[categorie] || '📋'
  }

  const projetsFiltered = useMemo(() => {
    return projets.filter(projet => {
      const matchSearch = projet.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         projet.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchStatus = statusFilter === 'tous' || projet.statut === statusFilter
      const matchCategory = categoryFilter === 'toutes' || projet.categorie === categoryFilter
      
      return matchSearch && matchStatus && matchCategory
    })
  }, [searchTerm, statusFilter, categoryFilter])

  const ProjetCard = ({ projet }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getCategoryIcon(projet.categorie)}</span>
              <div>
                <CardTitle className="text-lg">{projet.titre}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {projet.responsable}
                </CardDescription>
              </div>
            </div>
            {getStatusBadge(projet.statut)}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">
            {projet.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avancement</span>
              <span className="font-medium">{projet.avancement}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${projet.avancement}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{projet.participants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="truncate">{projet.localisation}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-600 mb-1">Prochaine étape :</p>
              <p className="text-sm font-medium">{projet.prochaineMilestone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const TimelineView = () => (
    <div className="space-y-6">
      {projetsFiltered.map((projet, index) => (
        <motion.div
          key={projet.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">{getCategoryIcon(projet.categorie)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{projet.titre}</CardTitle>
                    {getStatusBadge(projet.statut)}
                  </div>
                  <CardDescription>{projet.responsable}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{projet.descriptionComplete}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-semibold">{projet.budget}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Participants</p>
                      <p className="font-semibold">{projet.participants}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Avancement</p>
                      <p className="font-semibold">{projet.avancement}%</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Bénéfices attendus :</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {projet.benefices.map((benefice, idx) => (
                        <li key={idx}>{benefice}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Timeline du projet :</h4>
                    <div className="space-y-2">
                      {projet.timeline.map((etape, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            etape.statut === 'complete' ? 'bg-green-500' :
                            etape.statut === 'en_cours' ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`} />
                          <span className="text-sm text-gray-600">{etape.date}</span>
                          <span className="text-sm">{etape.titre}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {index < projetsFiltered.length - 1 && (
            <div className="absolute left-6 top-16 w-px h-8 bg-gray-300" />
          )}
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Projets citoyens
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez tous les projets qui transforment la ville de Nice ! <br />
              Suivez leur avancement et participez à leur réalisation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  {statuts.map(statut => (
                    <SelectItem key={statut.value} value={statut.value}>
                      {statut.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grille' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grille')}
                  className="flex items-center gap-2"
                >
                  <Grid className="w-4 h-4" />
                  Grille
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Timeline
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Résultats */}
        {projetsFiltered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos filtres de recherche.
            </p>
          </motion.div>
        ) : (
          <div>
            {viewMode === 'grille' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projetsFiltered.map(projet => (
                  <ProjetCard key={projet.id} projet={projet} />
                ))}
              </div>
            ) : (
              <TimelineView />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjetsCitoyens


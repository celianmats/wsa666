import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Calendar, Grid, Users, MapPin, Clock, CheckCircle, AlertCircle, PlayCircle, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

const SignalementsCitoyens = ({ user, onNavigate }) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('tous')
  const [categoryFilter, setCategoryFilter] = useState('toutes')
  const [viewMode, setViewMode] = useState('grille')

  // Données des signalements (simulées - en production, elles viendraient de Firebase)
  const signalements = [
    {
      id: 1,
      titre: "Éclairage public défaillant",
      description: "Plusieurs lampadaires ne fonctionnent plus sur l'avenue principale, créant une zone d'ombre dangereuse le soir.",
      categorie: "eclairage",
      statut: "ouvert",
      dateCreation: "2025-06-10",
      dateMiseAJour: "2025-06-10",
      localisation: "Avenue de l'Ariane",
      latitude: 43.7102,
      longitude: 7.2620,
      auteur: "Marie D.",
      imageUrl: null,
      priorite: "haute",
      timeline: [
        { date: "2025-06-10", titre: "Signalement créé", statut: "complete" },
        { date: "2025-06-12", titre: "Prise en charge par les services", statut: "a_venir" },
        { date: "2025-06-15", titre: "Intervention prévue", statut: "a_venir" }
      ]
    },
    {
      id: 2,
      titre: "Dégradation du mobilier urbain",
      description: "Bancs cassés et graffitis sur l'aire de jeux. Les enfants ne peuvent plus utiliser l'espace en sécurité.",
      categorie: "degradation",
      statut: "en_cours",
      dateCreation: "2025-06-08",
      dateMiseAJour: "2025-06-14",
      localisation: "Parc des Oliviers",
      latitude: 43.7105,
      longitude: 7.2625,
      auteur: "Jean-Pierre M.",
      imageUrl: "/api/placeholder/300/200",
      priorite: "moyenne",
      timeline: [
        { date: "2025-06-08", titre: "Signalement créé", statut: "complete" },
        { date: "2025-06-10", titre: "Évaluation sur site", statut: "complete" },
        { date: "2025-06-14", titre: "Commande du matériel", statut: "complete" },
        { date: "2025-06-18", titre: "Réparation prévue", statut: "en_cours" }
      ]
    },
    {
      id: 3,
      titre: "Problème de propreté",
      description: "Accumulation de déchets près des conteneurs. Besoin d'un nettoyage et d'une collecte plus fréquente.",
      categorie: "proprete",
      statut: "resolu",
      dateCreation: "2025-06-05",
      dateMiseAJour: "2025-06-12",
      localisation: "Rue des Mimosas",
      latitude: 43.7098,
      longitude: 7.2615,
      auteur: "Sophie L.",
      imageUrl: "/api/placeholder/300/200",
      priorite: "moyenne",
      timeline: [
        { date: "2025-06-05", titre: "Signalement créé", statut: "complete" },
        { date: "2025-06-06", titre: "Nettoyage d'urgence", statut: "complete" },
        { date: "2025-06-12", titre: "Mise en place collecte renforcée", statut: "complete" }
      ]
    },
    {
      id: 4,
      titre: "Nid-de-poule sur la chaussée",
      description: "Gros trou dans la chaussée qui endommage les véhicules et présente un danger pour les cyclistes.",
      categorie: "voirie",
      statut: "en_cours",
      dateCreation: "2025-06-12",
      dateMiseAJour: "2025-06-15",
      localisation: "Boulevard de l'Ariane",
      latitude: 43.7110,
      longitude: 7.2630,
      auteur: "Ahmed K.",
      imageUrl: "/api/placeholder/300/200",
      priorite: "haute",
      timeline: [
        { date: "2025-06-12", titre: "Signalement créé", statut: "complete" },
        { date: "2025-06-13", titre: "Signalisation temporaire", statut: "complete" },
        { date: "2025-06-15", titre: "Planification des travaux", statut: "en_cours" },
        { date: "2025-06-20", titre: "Réparation prévue", statut: "a_venir" }
      ]
    },
    {
      id: 5,
      titre: "Nuisances sonores nocturnes",
      description: "Bruits répétés en soirée près de la place centrale. Gêne importante pour les riverains.",
      categorie: "nuisance",
      statut: "ouvert",
      dateCreation: "2025-06-14",
      dateMiseAJour: "2025-06-14",
      localisation: "Place de l'Ariane",
      latitude: 43.7100,
      longitude: 7.2618,
      auteur: "Anonyme",
      imageUrl: null,
      priorite: "moyenne",
      timeline: [
        { date: "2025-06-14", titre: "Signalement créé", statut: "complete" },
        { date: "2025-06-16", titre: "Enquête de voisinage", statut: "a_venir" }
      ]
    },
    {
      id: 6,
      titre: "Végétation envahissante",
      description: "Haies non taillées qui bloquent la visibilité au carrefour. Risque d'accident.",
      categorie: "vegetation",
      statut: "resolu",
      dateCreation: "2025-06-01",
      dateMiseAJour: "2025-06-08",
      localisation: "Carrefour des Pins",
      latitude: 43.7095,
      longitude: 7.2610,
      auteur: "Michel R.",
      imageUrl: "/api/placeholder/300/200",
      priorite: "haute",
      timeline: [
        { date: "2025-06-01", titre: "Signalement créé", statut: "complete" },
        { date: "2025-06-03", titre: "Évaluation par les services", statut: "complete" },
        { date: "2025-06-08", titre: "Élagage effectué", statut: "complete" }
      ]
    }
  ]

  const categories = [
    { value: 'toutes', label: t('reports.filters.allCategories') },
    { value: 'degradation', label: t('reports.categories.degradation') },
    { value: 'nuisance', label: t('reports.categories.nuisance') },
    { value: 'voirie', label: t('reports.categories.road') },
    { value: 'eclairage', label: t('reports.categories.lighting') },
    { value: 'proprete', label: t('reports.categories.cleanliness') },
    { value: 'vegetation', label: t('reports.categories.vegetation') },
    { value: 'autre', label: t('reports.categories.other') }
  ]

  const statuts = [
    { value: 'tous', label: t('reports.filters.allStatuses') },
    { value: 'ouvert', label: t('reports.statuses.open') },
    { value: 'en_cours', label: t('reports.statuses.inProgress') },
    { value: 'resolu', label: t('reports.statuses.resolved') }
  ]

  const getStatusBadge = (statut) => {
    const statusConfig = {
      'ouvert': { label: t('reports.statuses.open'), variant: 'destructive', icon: AlertCircle },
      'en_cours': { label: t('reports.statuses.inProgress'), variant: 'default', icon: PlayCircle },
      'resolu': { label: t('reports.statuses.resolved'), variant: 'secondary', icon: CheckCircle }
    }
    
    const config = statusConfig[statut] || statusConfig['ouvert']
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
      'degradation': '🔨',
      'nuisance': '🔊',
      'voirie': '🛣️',
      'eclairage': '💡',
      'proprete': '🧹',
      'vegetation': '🌿',
      'autre': '📋'
    }
    return icons[categorie] || '📋'
  }

  const getPriorityColor = (priorite) => {
    const colors = {
      'haute': 'border-l-red-500',
      'moyenne': 'border-l-yellow-500',
      'basse': 'border-l-green-500'
    }
    return colors[priorite] || 'border-l-gray-500'
  }

  const signalementsFiltered = useMemo(() => {
    return signalements.filter(signalement => {
      const matchSearch = signalement.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         signalement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         signalement.localisation.toLowerCase().includes(searchTerm.toLowerCase())
      const matchStatus = statusFilter === 'tous' || signalement.statut === statusFilter
      const matchCategory = categoryFilter === 'toutes' || signalement.categorie === categoryFilter
      
      return matchSearch && matchStatus && matchCategory
    })
  }, [searchTerm, statusFilter, categoryFilter])

  const SignalementCard = ({ signalement }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`h-full hover:shadow-lg transition-shadow border-l-4 ${getPriorityColor(signalement.priorite)}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getCategoryIcon(signalement.categorie)}</span>
              <div>
                <CardTitle className="text-lg">{signalement.titre}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {signalement.auteur} • {signalement.localisation}
                </CardDescription>
              </div>
            </div>
            {getStatusBadge(signalement.statut)}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">
            {signalement.description}
          </p>
          
          {signalement.imageUrl && (
            <div className="mb-4">
              <img 
                src={signalement.imageUrl} 
                alt="Signalement" 
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{new Date(signalement.dateCreation).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="truncate">{signalement.localisation}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-600 mb-1">Dernière mise à jour :</p>
              <p className="text-sm font-medium">
                {new Date(signalement.dateMiseAJour).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const TimelineView = () => (
    <div className="space-y-6">
      {signalementsFiltered.map((signalement, index) => (
        <motion.div
          key={signalement.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">{getCategoryIcon(signalement.categorie)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <Card className={`border-l-4 ${getPriorityColor(signalement.priorite)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{signalement.titre}</CardTitle>
                    {getStatusBadge(signalement.statut)}
                  </div>
                  <CardDescription>
                    {signalement.auteur} • {signalement.localisation} • {new Date(signalement.dateCreation).toLocaleDateString('fr-FR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{signalement.description}</p>
                  
                  {signalement.imageUrl && (
                    <div className="mb-4">
                      <img 
                        src={signalement.imageUrl} 
                        alt="Signalement" 
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Catégorie</p>
                      <p className="font-semibold">{categories.find(c => c.value === signalement.categorie)?.label}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Priorité</p>
                      <p className="font-semibold capitalize">{signalement.priorite}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Localisation</p>
                      <p className="font-semibold">{signalement.localisation}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Suivi du signalement :</h4>
                    <div className="space-y-2">
                      {signalement.timeline.map((etape, idx) => (
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
          {index < signalementsFiltered.length - 1 && (
            <div className="absolute left-6 top-16 w-px h-8 bg-gray-300" />
          )}
        </motion.div>
      ))}
    </div>
  )

  // Section pour utilisateurs non connectés
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('reports.title')}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('reports.subtitle')}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center bg-white rounded-lg shadow-sm p-12"
          >
            <AlertCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('reports.notConnected.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('reports.notConnected.description')}
            </p>
            <Button 
              onClick={() => onNavigate('auth')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Users className="w-5 h-5 mr-2" />
              {t('reports.notConnected.login')}
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

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
              {t('reports.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('reports.subtitle')}
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
                placeholder={t('reports.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t('reports.filters.allStatuses')} />
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
                  <SelectValue placeholder={t('reports.filters.allCategories')} />
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
                  {t('reports.filters.grid')}
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  {t('reports.filters.timeline')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bouton créer un signalement */}
        <div className="mb-6">
          <Button 
            onClick={() => onNavigate('signalement')}
            className="bg-red-600 hover:bg-red-700"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            {t('reports.createReport')}
          </Button>
        </div>

        {/* Résultats */}
        {signalementsFiltered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {t('reports.noResults')}
            </h3>
            <p className="text-gray-600">
              {t('reports.noResultsDesc')}
            </p>
          </motion.div>
        ) : (
          <div>
            {viewMode === 'grille' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {signalementsFiltered.map(signalement => (
                  <SignalementCard key={signalement.id} signalement={signalement} />
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

export default SignalementsCitoyens


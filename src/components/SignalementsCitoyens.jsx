import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Calendar, Grid, Users, MapPin, Clock, CheckCircle, AlertCircle, Lightbulb, Heart, Bike, Bus, Accessibility, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const SignalementsCitoyens = ({ user, onNavigate }) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('tous')
  const [categoryFilter, setCategoryFilter] = useState('toutes')
  const [viewMode, setViewMode] = useState('grille')

  // Données des signalements citoyens (maintenant des conseils/infos)
  const signalements = [
    {
      id: "itineraire_pratique_01",
      titre: t("signalements.items.itineraire_pratique_01.title"),
      description: t("signalements.items.itineraire_pratique_01.description"),
      descriptionComplete: t("signalements.items.itineraire_pratique_01.descriptionComplete"),
      statut: "publie",
      categorie: "itineraire_pratique",
      dateCreation: "2025-06-10",
      auteur: t("signalements.items.itineraire_pratique_01.author"),
      localisation: t("signalements.items.itineraire_pratique_01.location"),
      photoUrl: "/api/placeholder/400/300",
      timeline: [
        { date: "2025-06-10", titre: t("signalements.items.itineraire_pratique_01.timeline.0.title"), statut: "publie" }
      ]
    },
    {
      id: "evenement_local_01",
      titre: t("signalements.items.evenement_local_01.title"),
      description: t("signalements.items.evenement_local_01.description"),
      descriptionComplete: t("signalements.items.evenement_local_01.descriptionComplete"),
      statut: "publie",
      categorie: "evenement_local",
      dateCreation: "2025-06-12",
      auteur: t("signalements.items.evenement_local_01.author"),
      localisation: t("signalements.items.evenement_local_01.location"),
      photoUrl: "/api/placeholder/400/300",
      timeline: [
        { date: "2025-06-12", titre: t("signalements.items.evenement_local_01.timeline.0.title"), statut: "publie" }
      ]
    },
    {
      id: "hub_vert_01",
      titre: t("signalements.items.hub_vert_01.title"),
      description: t("signalements.items.hub_vert_01.description"),
      descriptionComplete: t("signalements.items.hub_vert_01.descriptionComplete"),
      statut: "publie",
      categorie: "hub_vert",
      dateCreation: "2025-06-14",
      auteur: t("signalements.items.hub_vert_01.author"),
      localisation: t("signalements.items.hub_vert_01.location"),
      photoUrl: "/api/placeholder/400/300",
      timeline: [
        { date: "2025-06-14", titre: t("signalements.items.hub_vert_01.timeline.0.title"), statut: "publie" }
      ]
    },
    {
      id: "accessibilite_01",
      titre: t("signalements.items.accessibilite_01.title"),
      description: t("signalements.items.accessibilite_01.description"),
      descriptionComplete: t("signalements.items.accessibilite_01.descriptionComplete"),
      statut: "publie",
      categorie: "accessibilite",
      dateCreation: "2025-06-15",
      auteur: t("signalements.items.accessibilite_01.author"),
      localisation: t("signalements.items.accessibilite_01.location"),
      photoUrl: "/api/placeholder/400/300",
      timeline: [
        { date: "2025-06-15", titre: t("signalements.items.accessibilite_01.timeline.0.title"), statut: "publie" }
      ]
    },
    {
      id: "conseil_general_01",
      titre: t("signalements.items.conseil_general_01.title"),
      description: t("signalements.items.conseil_general_01.description"),
      descriptionComplete: t("signalements.items.conseil_general_01.descriptionComplete"),
      statut: "publie",
      categorie: "conseil_general",
      dateCreation: "2025-06-16",
      auteur: t("signalements.items.conseil_general_01.author"),
      localisation: t("signalements.items.conseil_general_01.location"),
      photoUrl: "/api/placeholder/400/300",
      timeline: [
        { date: "2025-06-16", titre: t("signalements.items.conseil_general_01.timeline.0.title"), statut: "publie" }
      ]
    }
  ]

  const categories = [
    { value: "toutes", label: t("signalements.filters.allCategories") },
    { value: "itineraire_pratique", label: t("signalements.categories.practical_itinerary") },
    { value: "evenement_local", label: t("signalements.categories.local_event") },
    { value: "hub_vert", label: t("signalements.categories.green_hub") },
    { value: "accessibilite", label: t("signalements.categories.accessibility") },
    { value: "conseil_general", label: t("signalements.categories.general_advice") }
  ]

  const statuts = [
    { value: "tous", label: t("signalements.filters.allStatuses") },
    { value: "publie", label: t("signalements.statuses.published") }
  ]

  const getStatusBadge = (statut) => {
    const statusConfig = {
      "publie": { label: t("signalements.statuses.published"), variant: "default", icon: CheckCircle }
    }

    const config = statusConfig[statut] || statusConfig["publie"]
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
      "itineraire_pratique": Lightbulb,
      "evenement_local": Calendar,
      "hub_vert": Heart,
      "accessibilite": Accessibility,
      "conseil_general": Info
    }
    const Icon = icons[categorie] || Info
    return <Icon className="w-6 h-6" />
  }

  const signalementsFiltered = useMemo(() => {
    return signalements.filter(signalement => {
      const matchSearch = signalement.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          signalement.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchStatus = statusFilter === "tous" || signalement.statut === statusFilter
      const matchCategory = categoryFilter === "toutes" || signalement.categorie === categoryFilter

      return matchSearch && matchStatus && matchCategory
    })
  }, [searchTerm, statusFilter, categoryFilter, signalements])

  const SignalementCard = ({ signalement }) => (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
      >
        <Card className="h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {getCategoryIcon(signalement.categorie)}
                <div>
                  <CardTitle className="text-lg">{signalement.titre}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {signalement.auteur}
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

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="truncate">{signalement.localisation}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{new Date(signalement.dateCreation).toLocaleDateString(t('locale'))}</span>
                </div>
              </div>

              {signalement.photoUrl && (
                  <div className="pt-2 border-t">
                    <img src={signalement.photoUrl} alt={signalement.titre} className="w-full h-32 object-cover rounded-md" />
                  </div>
              )}
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
                  {getCategoryIcon(signalement.categorie)}
                </div>
                <div className="flex-1 min-w-0">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{signalement.titre}</CardTitle>
                        {getStatusBadge(signalement.statut)}
                      </div>
                      <CardDescription>{signalement.auteur}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{signalement.descriptionComplete}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">{t("signalements.timeline.location")}</p>
                          <p className="font-semibold">{signalement.localisation}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">{t("signalements.timeline.date")}</p>
                          <p className="font-semibold">{new Date(signalement.dateCreation).toLocaleDateString(t('locale'))}</p>
                        </div>
                      </div>

                      {signalement.photoUrl && (
                          <div className="mb-4">
                            <img src={signalement.photoUrl} alt={signalement.titre} className="w-full h-48 object-cover rounded-md" />
                          </div>
                      )}

                      <h3 className="text-lg font-semibold mb-2">{t("signalements.timeline.follow_up_title")}</h3>
                      <ol className="relative border-l border-gray-200 ml-4">
                        {signalement.timeline.map((item, i) => (
                            <li key={i} className="mb-4 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                          {item.statut === "publie" && <CheckCircle className="w-4 h-4 text-blue-800" />}
                        </span>
                              <h4 className="flex items-center mb-1 text-md font-semibold text-gray-900">
                                {item.titre}
                              </h4>
                              <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
                                {new Date(item.date).toLocaleDateString(t('locale'), { year: 'numeric', month: 'long', day: 'numeric' })}
                              </time>
                            </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
        ))}
      </div>
  )

  return (
      <div className="container mx-auto px-4 py-8">
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-4"
        >
          {t("signalements.title")}
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-center text-gray-600 mb-8"
        >
          {t("signalements.subtitle")}
        </motion.p>

        {!user && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-blue-50 p-6 rounded-lg text-center mb-8"
            >
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">{t("signalements.not_logged_in.title")}</h2>
              <p className="text-blue-700 mb-4">{t("signalements.not_logged_in.description")}</p>
              <Button onClick={() => onNavigate("auth")} className="bg-blue-600 hover:bg-blue-700 text-white">
                {t("signalements.not_logged_in.login_button")}
              </Button>
            </motion.div>
        )}

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
                type="text"
                placeholder={t("signalements.search_placeholder")}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t("signalements.filters.allStatuses")} />
            </SelectTrigger>
            <SelectContent>
              {statuts.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t("signalements.filters.allCategories")} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full md:w-[180px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grille">
                <Grid className="w-4 h-4 mr-2" /> {t("signalements.view_mode.grid")}
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Clock className="w-4 h-4 mr-2" /> {t("signalements.view_mode.timeline")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {signalementsFiltered.length === 0 ? (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12 text-gray-500"
            >
              <Users className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg mb-2">{t("signalements.no_signalements_found")}</p>
              <p className="text-sm">{t("signalements.try_adjusting_filters")}</p>
            </motion.div>
        ) : (
            viewMode === "grille" ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {signalementsFiltered.map((signalement) => (
                      <SignalementCard key={signalement.id} signalement={signalement} />
                  ))}
                </motion.div>
            ) : (
                <TimelineView />
            )
        )}
      </div>
  )
}

export default SignalementsCitoyens


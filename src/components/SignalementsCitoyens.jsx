import {useState, useEffect, useMemo} from 'react'
import {motion} from 'framer-motion'
import {collection, query, where, orderBy, onSnapshot} from 'firebase/firestore'
import {db} from '../lib/firebase'
import {
    Search,
    Filter,
    Calendar,
    Grid,
    Users,
    MapPin,
    Clock,
    CheckCircle,
    AlertCircle,
    Lightbulb,
    Heart,
    Bike,
    Bus,
    Accessibility,
    Info
} from 'lucide-react'
import {useTranslation} from 'react-i18next'
import {Button} from './ui/button'
import {Input} from './ui/input'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card'
import {Badge} from './ui/badge'
import {Tabs, TabsContent, TabsList, TabsTrigger} from './ui/tabs'

const SignalementsCitoyens = ({user, onNavigate}) => {
    const {t, i18n} = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('tous')
    const [categoryFilter, setCategoryFilter] = useState('toutes')
    const [viewMode, setViewMode] = useState('grille')
    const [signalements, setSignalements] = useState([])
    const [loading, setLoading] = useState(true)

    // Charger tous les signalements validés depuis Firestore
    useEffect(() => {
        const q = query(
            collection(db, 'signalements'),
            where('status', '==', 'valide'), // Afficher seulement les signalements validés
            orderBy('createdAt', 'desc')
        )

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const signalementsList = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                signalementsList.push({
                    id: doc.id,
                    ...data,
                    // Adapter les noms de champs pour correspondre à l'interface existante
                    titre: data.category, // Utiliser la description comme titre
                    auteur: data.userEmail || 'Utilisateur anonyme',
                    localisation: data.nomLieu || `${data.latitude?.toFixed(4)}, ${data.longitude?.toFixed(4)}`,
                    dateCreation: data.createdAt,
                    statut: data.status === 'valide' ? 'publie' : data.status,
                    categorie: mapFirebaseCategory(data.category),
                    descriptionComplete: data.description,
                    photoUrl: data.imageUrl || null
                })
            })
            setSignalements(signalementsList)
            setLoading(false)
        }, (error) => {
            console.error("Erreur lors du chargement des signalements:", error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    // Mapper les catégories Firebase vers les catégories de l'interface
    const mapFirebaseCategory = (firebaseCategory) => {
        const categoryMapping = {
            'itinerary': 'itineraire_pratique',
            'event': 'evenement_local',
            'green_hub': 'hub_vert',
            'accessibility': 'accessibilite',
            'local_tip': 'conseil_general',
            'other': 'conseil_general'
        }
        return categoryMapping[firebaseCategory] || 'conseil_general'
    }

    const categories = [
        {value: "toutes", label: t("signalements.filters.allCategories")},
        {value: "itineraire_pratique", label: t("signalements.categories.practical_itinerary")},
        {value: "evenement_local", label: t("signalements.categories.local_event")},
        {value: "hub_vert", label: t("signalements.categories.green_hub")},
        {value: "accessibilite", label: t("signalements.categories.accessibility")},
        {value: "conseil_general", label: t("signalements.categories.general_advice")}
    ]

    const statuts = [
        {value: "tous", label: t("signalements.filters.allStatuses")},
        {value: "publie", label: t("signalements.statuses.published")}
    ]

    const getStatusBadge = (statut) => {
        const statusConfig = {
            "publie": {label: t("signalements.statuses.published"), variant: "default", icon: CheckCircle}
        }

        const config = statusConfig[statut] || statusConfig["publie"]
        const Icon = config.icon

        return (
            <Badge variant={config.variant} className="flex items-center gap-1">
                <Icon className="w-3 h-3"/>
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
        return <Icon className="w-6 h-6"/>
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return t("signalement.date_unknown")
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        return date.toLocaleDateString(i18n.language === "fr" ? "fr-FR" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
    }

    const signalementsFiltered = useMemo(() => {
        return signalements.filter(signalement => {
            const matchSearch = signalement.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                signalement.descriptionComplete.toLowerCase().includes(searchTerm.toLowerCase())
            const matchStatus = statusFilter === "tous" || signalement.statut === statusFilter
            const matchCategory = categoryFilter === "toutes" || signalement.categorie === categoryFilter

            return matchSearch && matchStatus && matchCategory
        })
    }, [searchTerm, statusFilter, categoryFilter, signalements])

    const SignalementCard = ({signalement}) => (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
        >
            <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            {getCategoryIcon(signalement.categorie)}
                            <div>
                                <CardTitle className="text-lg line-clamp-2">
                                    {(() => {
                                        switch (signalement.titre) {
                                            case "itinerary":
                                                return t("signalement.categories.itinerary");
                                            case "event":
                                                return t("signalement.categories.event");
                                            case "green_hub":
                                                return t("signalement.categories.green_hub");
                                            case "accessibility":
                                                return t("signalement.categories.accessibility");
                                            case "local_tip":
                                                return t("signalement.categories.local_tip");
                                            case "other":
                                                return t("signalement.categories.other");
                                            default:
                                                return signalement.titre;
                                        }
                                    })()}
                                </CardTitle>

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
                        {signalement.descriptionComplete}
                    </p>

                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-gray-500"/>
                                <span className="truncate">{signalement.localisation}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gray-500"/>
                                <span>{formatDate(signalement.dateCreation)}</span>
                            </div>
                        </div>

                        {signalement.photoUrl && (
                            <div className="pt-2 border-t">
                                <img
                                    src={signalement.photoUrl}
                                    alt={signalement.titre}
                                    className="w-full h-32 object-cover rounded-md"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                    }}
                                />
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
                    initial={{opacity: 0, x: -20}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.3, delay: index * 0.1}}
                    className="relative"
                >
                    <div className="flex items-start gap-4">
                        <div
                            className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
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
                                            <p className="font-semibold">{formatDate(signalement.dateCreation)}</p>
                                        </div>
                                    </div>

                                    {signalement.photoUrl && (
                                        <div className="mb-4">
                                            <img
                                                src={signalement.photoUrl}
                                                alt={signalement.titre}
                                                className="w-full h-48 object-cover rounded-md"
                                                onError={(e) => {
                                                    e.target.style.display = 'none'
                                                }}
                                            />
                                        </div>
                                    )}

                                    <h3 className="text-lg font-semibold mb-2">{t("signalements.timeline.follow_up_title")}</h3>
                                    <ol className="relative border-l border-gray-200 ml-4">
                                        {signalement.timeline && signalement.timeline.map((item, i) => (
                                            <li key={i} className="mb-4 ml-6">
                              <span
                                  className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                                <CheckCircle className="w-4 h-4 text-blue-800"/>
                              </span>
                                                <h4 className="flex items-center mb-1 text-md font-semibold text-gray-900">
                                                    {item.comment || t("signalements.timeline.published")}
                                                </h4>
                                                <time
                                                    className="block mb-2 text-sm font-normal leading-none text-gray-500">
                                                    {formatDate(item.timestamp)}
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

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-lg text-gray-600">{t("signalements.loading")}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                    <motion.h1
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="text-4xl font-bold text-center mb-4"
                    >
                        {t("signalements.title")}
                    </motion.h1>
                    <motion.p
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.1}}
                        className="text-xl text-center text-gray-600"
                    >
                        {t("signalements.subtitle")}
                    </motion.p>
                </div>
            </div>

            {!user && (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                    className="bg-blue-50 p-6 rounded-lg text-center my-8"
                >
                    <h2 className="text-2xl font-semibold text-blue-800 mb-3">{t("signalements.not_logged_in.title")}</h2>
                    <p className="text-blue-700 mb-4">{t("signalements.not_logged_in.description")}</p>
                    <Button onClick={() => onNavigate("auth")} className="bg-blue-600 hover:bg-blue-700 text-white">
                        {t("signalements.not_logged_in.login_button")}
                    </Button>
                </motion.div>
            )}

            {/* Filtres et recherche */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {user && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                        className="flex flex-row-reverse gap-4 mb-8"
                    >
                        <Button
                            size="lg"
                            className="bg-[#2E599A] hover:bg-[#223552]"
                            onClick={() => onNavigate('signalement')}
                        >
                            <AlertCircle className="w-4 h-4"/>
                            {t("home.hero.report")}
                        </Button>
                    </motion.div>
                )}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                    className="flex flex-col md:flex-row gap-4 mb-8"
                >
                    <div className="relative flex-grow bg-white">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                        <Input
                            type="text"
                            placeholder={t("signalements.search_placeholder")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full"
                        />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px] bg-white">
                            <SelectValue placeholder={t("signalements.filters.allStatuses")}/>
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
                        <SelectTrigger className="w-full md:w-[180px] bg-white">
                            <SelectValue placeholder={t("signalements.filters.allCategories")}/>
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Tabs value={viewMode} onValueChange={setViewMode} className="w-full md:w-[220px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="grille">
                                <Grid className="w-4 h-4"/> {t("signalements.view_mode.grid")}
                            </TabsTrigger>
                            <TabsTrigger value="timeline" className="text-xs">
                                <Clock className="w-4 h-4"/> Timeline
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </motion.div>

                {signalementsFiltered.length === 0 ? (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3}}
                        className="text-center py-12 text-gray-500"
                    >
                        <Users className="w-16 h-16 mx-auto mb-4"/>
                        <p className="text-lg mb-2">{t("signalements.no_signalements_found")}</p>
                        <p className="text-sm">{t("signalements.try_adjusting_filters")}</p>
                    </motion.div>
                ) : (
                    viewMode === "grille" ? (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5}}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {signalementsFiltered.map((signalement) => (
                                <SignalementCard key={signalement.id} signalement={signalement}/>
                            ))}
                        </motion.div>
                    ) : (
                        <TimelineView/>
                    )
                )}
            </div>
            {/* Statistiques en bas de page */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.3}}
                className="bg-white py-12 p-6 rounded-lg"
            >
                <h3 className="text-lg font-semibold text-center mb-4">{t("signalements.statistics.title")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-blue-600">{signalements.length}</p>
                        <p className="text-sm text-gray-600">{t("signalements.statistics.total_reports")}</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">
                            {signalements.filter(s => s.categorie === 'hub_vert').length}
                        </p>
                        <p className="text-sm text-gray-600">{t("signalements.statistics.green_tips")}</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-600">
                            {new Set(signalements.map(s => s.auteur)).size}
                        </p>
                        <p className="text-sm text-gray-600">{t("signalements.statistics.contributors")}</p>
                    </div>
                </div>
            </motion.div>
        </div>

    )
}

export default SignalementsCitoyens


import {useState, useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {collection, query, orderBy, onSnapshot} from 'firebase/firestore'
import {auth, db} from './lib/firebase'
import {Button} from '@/components/ui/button.jsx'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card.jsx'
import {Input} from '@/components/ui/input.jsx'
import {Label} from '@/components/ui/label.jsx'
import {Textarea} from '@/components/ui/textarea.jsx'
import {Badge} from '@/components/ui/badge.jsx'
import {
    MapPin,
    Calendar,
    Users,
    Leaf,
    Wifi,
    Shield,
    Mail,
    Phone,
    User,
    Home,
    UsersRound,
    Lightbulb,
    AlertCircle, Briefcase, BadgePlus,
} from 'lucide-react'
import {motion} from 'framer-motion'
import {useTranslation} from 'react-i18next'
import AuthComponent from './components/AuthComponent'
import SignalementApp from './components/SignalementApp'
import InteractiveMap from './components/InteractiveMap'
import ProjetsCitoyens from './components/ProjetsCitoyens'
import SignalementsCitoyens from './components/SignalementsCitoyens'
import './App.css'
import './i18n'

// Import des images
import arianeQuartier from './assets/ariane-quartier.jpg'
import arianeRenovation from './assets/ariane-renovation.jpg'
import plage from './assets/plage.png'
import logo from './assets/logo.svg'

function App() {
    const {t, i18n} = useTranslation()
    const [user, setUser] = useState(null)
    const [currentPage, setCurrentPage] = useState('home') // 'home', 'auth', 'signalement', 'projets', 'signalements'
    const [loading, setLoading] = useState(true)
    const [signalements, setSignalements] = useState([])
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        telephone: '',
        message: '',
        newsletter: false
    })

    const switchLang = () => {
        i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
    }

    // Écouter les changements d'authentification
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    // Charger tous les signalements publics pour la carte
    useEffect(() => {
        const q = query(
            collection(db, 'signalements'),
            orderBy('createdAt', 'desc')
        )

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const signalementsList = []
            querySnapshot.forEach((doc) => {
                signalementsList.push({id: doc.id, ...doc.data()})
            })
            setSignalements(signalementsList)
        }, (error) => {
            console.log('Erreur lors du chargement des signalements:', error)
            // En cas d'erreur (par exemple, Firebase non configuré), on continue sans signalements
        })

        return () => unsubscribe()
    }, [])

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Formulaire soumis:', formData)
        alert('Merci pour votre inscription ! Nous vous contacterons bientôt.')
        // Ici, on intégrerait Firebase pour sauvegarder les données
    }

    const projets = [
        {
            id: 1,
            titre: "Rénovation urbaine durable",
            description: "Transformation écologique du quartier avec espaces verts et bâtiments à énergie positive",
            date: "2024-2025",
            statut: "En cours",
            icone: <Leaf className="w-6 h-6"/>
        },
        {
            id: 2,
            titre: "Infrastructure numérique",
            description: "Déploiement de la fibre optique et création d'un réseau WiFi public gratuit",
            date: "2024-2026",
            statut: "Planifié",
            icone: <Wifi className="w-6 h-6"/>
        },
        {
            id: 3,
            titre: "Sécurité connectée",
            description: "Installation de systèmes de vidéosurveillance intelligente et éclairage adaptatif",
            date: "2025-2026",
            statut: "À venir",
            icone: <Shield className="w-6 h-6"/>
        },
        {
            id: 4,
            titre: "Espaces collaboratifs",
            description: "Création de lieux de co-working et d'espaces communautaires pour favoriser le lien social",
            date: "2025",
            statut: "En préparation",
            icone: <Users className="w-6 h-6"/>
        }
    ]

    const Header = () => (
        <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setCurrentPage('home')}
                                className="cursor-pointer flex flex-row items-center gap-4">
                            <div
                                className="flex w-10 h-10 items-center justify-center">
                                <img
                                    src={logo}
                                    alt="Ville connectée"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hidden md:flex">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-[#40A461] to-[#3DC8E4] hover:from-[#59E286] hover:to-[#258295] transition-colors duration-300
 inline-block text-transparent bg-clip-text">{t('home.title')}</h1>
                            </div>
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <nav className="flex space-x-6">
                            {/* Desktop only */}
                            <button
                                onClick={() => setCurrentPage('signalements')}
                                variant="ghost"
                                className="flex items-center gap-2 md:flex hidden cursor-pointer hover:text-gray-600">
                                <Briefcase className="w-4 h-4 mr-1"/>
                                <p>{t('nav.reports')}</p>
                            </button>

                            <button onClick={() => setCurrentPage('projets')}
                                    className="flex items-center gap-2 md:flex hidden cursor-pointer hover:text-gray-600">
                                <Lightbulb className="w-4 h-4 md:mr-1"/>
                                <p className="hidden md:flex">{t('nav.projects')}</p>
                            </button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Mobile only */}
                        <Button
                            onClick={() => setCurrentPage('signalements')}
                            variant="outline"
                            className="md:hidden cursor-pointer"
                        >
                            <Briefcase className="w-4 h-4"/>
                        </Button>
                        <Button onClick={() => setCurrentPage('projets')} variant="outline"
                                className="md:hidden cursor-pointer">
                            <Lightbulb className="w-4 h-4 md:mr-1"/>
                        </Button>

                        {/* User only */}
                        {user && (
                            <Button onClick={() => setCurrentPage('signalement')} variant="outline">
                                <BadgePlus className="w-4 h-4 lg:mr-2"/>
                                <p className="hidden lg:flex">{t('nav.tips')}</p>
                            </Button>
                        )}

                        {/* Every time */}
                        <Button onClick={() => setCurrentPage('auth')} variant="outline">
                            <User className="w-4 h-4 lg:mr-2"/>
                            <p className="hidden lg:flex">{user ? user.displayName : t('nav.login')}</p>
                        </Button>
                        <Button onClick={switchLang} variant="outline"
                                className="w-15">🌐 {i18n.language === 'fr' ? 'FR' : 'EN'}</Button>
                    </div>
                </div>
            </div>
        </header>
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement...</p>
                </div>
            </div>
        )
    }

    // Page d'authentification
    if (currentPage === 'auth') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                {/* Header */}
                <Header/>

                <div className="container mx-auto px-4 py-12">
                    <AuthComponent user={user} onAuthChange={setUser}/>
                </div>
            </div>
        )
    }

    // Page de l'application de signalement
    if (currentPage === 'signalement') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                {/* Header */}
                <Header/>
                <div className="container mx-auto px-4 py-12">
                    <SignalementApp user={user} onNavigate={setCurrentPage}/>
                </div>
            </div>
        )
    }

    // Page des signalements citoyens
    if (currentPage === 'signalements') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                {/* Header */}
                <Header/>

                <SignalementsCitoyens user={user} onNavigate={setCurrentPage}/>
            </div>
        )
    }

    // Page des projets citoyens
    if (currentPage === 'projets') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
                {/* Header */}
                <Header/>

                <ProjetsCitoyens/>
            </div>
        )
    }

    // Page d'accueil (landing page)
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            {/* Header */}
            <Header/>

            {/* Section Hero */}
            <section id="accueil" className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={plage}
                        alt="Ville connectée"
                        className="w-full h-full object-cover brightness-30"
                    />
                    <div className="absolute inset-0 "></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center text-white">
                        <motion.h1
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            className="text-5xl md:text-[156px] font-bold mb-2"
                        >
                            {t('home.title1')}
                        </motion.h1>
                        <motion.h2
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            className="text-3xl mb-6"
                        >
                            {t('home.title2')}
                        </motion.h2>
                        <motion.p
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto"
                        >
                            {t('home.subtitle')}
                        </motion.p>
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.4}}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-gray-100"
                                onClick={() => setCurrentPage('projets')}
                            >
                                <Lightbulb className="w-4 h-4 mr-2"/>
                                {t("home.hero.discover")}
                            </Button>
                            <Button
                                size="lg"
                                className="bg-[#2E599A] hover:bg-[#223552]"
                                onClick={() => setCurrentPage('signalement')}
                            >
                                <AlertCircle className="w-4 h-4 mr-2"/>
                                {t("home.hero.report")}
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section Vision */}
            <section className="py-16 md:py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:mx-24">
                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#40A461] to-[#3DC8E4] inline-block text-transparent bg-clip-text">{t("home.vision.title")}</h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                {t("home.vision.subtitle")}
                            </p>
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 bg-blue-100 rounded-md flex items-center justify-center mx-auto mb-3">
                                        <Users className="w-8 h-8 text-blue-600"/>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{t("home.valueA")}</h3>
                                </div>
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 bg-green-100 rounded-md flex items-center justify-center mx-auto mb-3">
                                        <Leaf className="w-8 h-8 text-green-600"/>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{t("home.valueB")}</h3>
                                </div>
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 bg-purple-100 rounded-md flex items-center justify-center mx-auto mb-3">
                                        <Wifi className="w-8 h-8 text-purple-600"/>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{t("home.valueC")}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:grid grid-cols-2 gap-4">
                            <img
                                src={arianeQuartier}
                                alt="Quartier de l'Ariane"
                                className="rounded-lg shadow-lg"
                            />
                            <img
                                src={arianeRenovation}
                                alt="Rénovation urbaine"
                                className="rounded-lg shadow-lg mt-8"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Projets */}
            <section id="projets" className="py-16 md:py-32 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#40A461] to-[#3DC8E4] inline-block text-transparent bg-clip-text">{t("home.projects.title")}</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t("home.projects.subtitle")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {projets.map((projet, index) => (
                            <motion.div
                                key={projet.id}
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: index * 0.1}}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                {projet.icone}
                                            </div>
                                            <Badge variant={projet.statut === 'En cours' ? 'default' : 'secondary'}>
                                                {projet.statut}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-lg">{projet.titre}</CardTitle>
                                        <CardDescription className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-1"/>
                                            {projet.date}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{projet.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Carte Interactive */}
            <section id="carte" className="py-16 md:py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#40A461] to-[#3DC8E4] inline-block text-transparent bg-clip-text">{t('home.map.title')}</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            {t('home.map.subtitle')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">{t("home.map.interet")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">{t("home.map.inprogress")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">{t("home.map.tips")}</span>
                            </div>
                        </div>
                    </div>

                    <InteractiveMap
                        signalements={signalements}
                        height="500px"
                        onSignalementClick={(signalement) => {
                            console.log('Signalement cliqué:', signalement)
                            // Optionnel: ouvrir un modal avec les détails
                        }}
                    />

                    <div className="text-center mt-8">
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.4}}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button
                                className="bg-[#2E599A] hover:bg-[#223552]"
                                onClick={() => setCurrentPage('signalement')}
                            >
                                <AlertCircle className="w-4 h-4 mr-2"/>
                                {t("home.hero.report")}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.open('https://www.openstreetmap.org/search?query=Nice%20Ariane', '_blank')}
                            >
                                <MapPin className="w-4 h-4 mr-2"/>
                                {t("home.hero.viewMap")}
                            </Button>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Section Formulaire */}
            <section id="contact" className="py-16 md:py-32 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#40A461] to-[#3DC8E4] inline-block text-transparent bg-clip-text">{t('home.participate.title')}</h2>
                            <p className="text-lg text-gray-600">
                                {t('home.participate.subtitle')}
                            </p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('home.participate.form.title')}</CardTitle>
                                <CardDescription>
                                    {t('home.participate.form.subtitle')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="nom">{t('home.participate.form.name')}</Label>
                                            <Input
                                                id="nom"
                                                name="nom"
                                                type="text"
                                                value={formData.nom}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">{t('home.participate.form.email')}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="telephone">{t('home.participate.form.phone')}</Label>
                                        <Input
                                            id="telephone"
                                            name="telephone"
                                            type="tel"
                                            value={formData.telephone}
                                            onChange={handleInputChange}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="message">{t('home.participate.form.message')}</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="mt-1"
                                            placeholder={t('home.participate.form.placeholder')}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            id="newsletter"
                                            name="newsletter"
                                            type="checkbox"
                                            checked={formData.newsletter}
                                            onChange={handleInputChange}
                                            className="rounded"
                                        />
                                        <Label htmlFor="newsletter" className="text-sm">
                                            {t('home.participate.form.newsletter')}
                                        </Label>
                                    </div>

                                    <Button type="submit" className="w-full bg-[#2E599A] hover:bg-[#223552]">
                                        {t('home.participate.form.submit')}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div
                                    className="w-8 h-8 flex items-center justify-center">
                                    <img
                                        src={logo}
                                        alt="Ville connectée"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold bg-gradient-to-r from-[#40A461] to-[#3DC8E4] hover:from-[#59E286] hover:to-[#258295] transition-colors duration-300
 inline-block text-transparent bg-clip-text">{t('home.title')}</h3>
                            </div>
                            <p className="text-gray-400 mb-4">
                                {t('footer.subtitle')}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h4>
                            <div className="space-y-2 text-gray-400">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2"/>
                                    <span>{t('footer.contact.email')}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2"/>
                                    <span>{t('footer.contact.phone')}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2"/>
                                    <span>{t('footer.contact.address')}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t('footer.links.title')}</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#"
                                       className="hover:text-white transition-colors">{t('footer.links.municipality')}</a>
                                </li>
                                <li><a href="#"
                                       className="hover:text-white transition-colors">{t('footer.links.metropolis')}</a>
                                </li>
                                <li><a href="#"
                                       className="hover:text-white transition-colors">{t('footer.links.anru')}</a></li>
                                <li><a href="#"
                                       className="hover:text-white transition-colors">{t('footer.links.legals')}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>{t('footer.copyright')}</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App


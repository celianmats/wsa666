import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { auth, db } from './lib/firebase'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
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
  AlertTriangle,
  Home,
  UsersRound,
  Lightbulb,
  Globe,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
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
import smartCityHero from './assets/smart-city-hero.jpeg'
import smartCityConcept from './assets/smart-city-concept.png'

function App() {
  const { t, i18n } = useTranslation()
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
        signalementsList.push({ id: doc.id, ...doc.data() })
      })
      setSignalements(signalementsList)
    }, (error) => {
      console.log('Erreur lors du chargement des signalements:', error)
      // En cas d'erreur (par exemple, Firebase non configuré), on continue sans signalements
    })

    return () => unsubscribe()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
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
      icone: <Leaf className="w-6 h-6" />
    },
    {
      id: 2,
      titre: "Infrastructure numérique",
      description: "Déploiement de la fibre optique et création d'un réseau WiFi public gratuit",
      date: "2024-2026",
      statut: "Planifié",
      icone: <Wifi className="w-6 h-6" />
    },
    {
      id: 3,
      titre: "Sécurité connectée",
      description: "Installation de systèmes de vidéosurveillance intelligente et éclairage adaptatif",
      date: "2025-2026",
      statut: "À venir",
      icone: <Shield className="w-6 h-6" />
    },
    {
      id: 4,
      titre: "Espaces collaboratifs",
      description: "Création de lieux de co-working et d'espaces communautaires pour favoriser le lien social",
      date: "2025",
      statut: "En préparation",
      icone: <Users className="w-6 h-6" />
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
        <header className="bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Nice Ville de Demain</h1>
                  <p className="text-sm text-gray-600">Quartier de l'Ariane</p>
                </div>
              </div>
              <Button onClick={() => setCurrentPage('home')} variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <AuthComponent user={user} onAuthChange={setUser} />
        </div>
      </div>
    )
  }

  // Page de l'application de signalement
  if (currentPage === 'signalement') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Application de Signalement</h1>
                  <p className="text-sm text-gray-600">Quartier de l'Ariane</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {user && (
                  <span className="text-sm text-gray-600">
                    Connecté en tant que {user.email}
                  </span>
                )}
                <Button onClick={() => setCurrentPage('projets')} variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Projets
                </Button>
                <Button onClick={() => setCurrentPage('auth')} variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  {user ? 'Profil' : 'Se connecter'}
                </Button>
                <Button onClick={() => setCurrentPage('home')} variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  Accueil
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <SignalementApp user={user} />
        </div>
      </div>
    )
  }

  // Page des signalements citoyens
  if (currentPage === 'signalements') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{t('reports.title')}</h1>
                  <p className="text-sm text-gray-600">Quartier de l'Ariane</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={() => setCurrentPage('projets')} variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('nav.projects')}
                </Button>
                <Button onClick={() => setCurrentPage('auth')} variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  {user ? t('nav.profile') : t('nav.login')}
                </Button>
                <Button onClick={() => setCurrentPage('home')} variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  {t('nav.home')}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <SignalementsCitoyens user={user} onNavigate={setCurrentPage} />
      </div>
    )
  }

  // Page des projets citoyens
  if (currentPage === 'projets') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{t('projects.title')}</h1>
                  <p className="text-sm text-gray-600">Quartier de l'Ariane</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={() => setCurrentPage('signalements')} variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {t('nav.reports')}
                </Button>
                <Button onClick={() => setCurrentPage('auth')} variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  {user ? t('nav.profile') : t('nav.login')}
                </Button>
                <Button onClick={() => setCurrentPage('home')} variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  {t('nav.home')}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <ProjetsCitoyens />
      </div>
    )
  }

  // Page d'accueil (landing page)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Nice Ville de Demain</h1>
                <p className="text-sm text-gray-600">Quartier de l'Ariane</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex space-x-6">
                <a href="#accueil" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"><Home className="w-4 h-4 mr-1" />{t('nav.home')}</a>
                <button onClick={() => setCurrentPage('signalements')} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors flex items-center"><UsersRound className="w-4 h-4 mr-1" />{t('nav.reports')}</button>
                <button onClick={() => setCurrentPage('projets')} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors flex items-center"><Lightbulb className="w-4 h-4 mr-1" />{t('nav.projects')}</button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => setCurrentPage('auth')} variant="outline">
                <User className="w-4 h-4 mr-2" />
                {user ? user.email.split('@')[0] : t('nav.login')}
              </Button>
              <Button onClick={switchLang} variant="outline" className="w-15">🌐 {i18n.language === 'fr' ? 'FR' : 'EN'}</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Section Hero */}
      <section id="accueil" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={smartCityHero} 
            alt="Ville connectée" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-green-600/80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
             <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              {t('home.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto"
            >
              {t('home.subtitle')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => document.getElementById('projets').scrollIntoView({ behavior: 'smooth' })}
              >
                Découvrir les projets
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-red-600 hover:bg-gray-100 hover:text-red-600"
                onClick={() => setCurrentPage('signalement')}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Signaler un problème
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Notre Vision</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Le quartier de l'Ariane se transforme pour devenir un modèle de ville durable et connectée. 
                Notre mission est de créer un environnement urbain qui favorise l'inclusion sociale, 
                la durabilité environnementale et l'innovation technologique au service des citoyens.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Inclusif</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Durable</h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wifi className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Connecté</h3>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
      <section id="projets" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Projets Citoyens</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les initiatives qui transforment notre quartier en un espace de vie moderne et durable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projets.map((projet, index) => (
              <motion.div
                key={projet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      <Calendar className="w-4 h-4 mr-1" />
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
      <section id="carte" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Carte Interactive</h2>
            <p className="text-lg text-gray-600 mb-6">
              Explorez les différents points d'intérêt, projets et signalements du quartier de l'Ariane
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Points d'intérêt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Projets en cours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Signalements</span>
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
            <Button 
              className="mr-4" 
              onClick={() => setCurrentPage('signalement')}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Signaler un problème
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://www.openstreetmap.org/search?query=Nice%20Ariane', '_blank')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Voir sur OpenStreetMap
            </Button>
          </div>
        </div>
      </section>

      {/* Section Formulaire */}
      <section id="contact" className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Participez au Projet</h2>
              <p className="text-lg text-gray-600">
                Inscrivez-vous pour recevoir les actualités et participer aux initiatives citoyennes
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Formulaire d'inscription</CardTitle>
                <CardDescription>
                  Rejoignez la communauté des citoyens engagés pour l'Ariane de demain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom complet</Label>
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
                      <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="telephone">Téléphone (optionnel)</Label>
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
                    <Label htmlFor="message">Message / Suggestions</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1"
                      placeholder="Partagez vos idées pour améliorer le quartier..."
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
                      Je souhaite recevoir la newsletter du projet
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    S'inscrire au projet
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
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Nice Ville de Demain</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Transformons ensemble le quartier de l'Ariane en un modèle de ville durable et connectée.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>contact@nice-ville-demain.fr</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>04 XX XX XX XX</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Quartier de l'Ariane, Nice</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Ville de Nice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Métropole Nice Côte d'Azur</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ANRU</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nice Ville de Demain - Quartier de l'Ariane. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


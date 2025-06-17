import { useState, useEffect } from 'react'
import { collection, addDoc, query, where, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../lib/firebase'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { MapPin, Camera, Clock, AlertTriangle, CheckCircle, XCircle, Upload } from 'lucide-react'

const categories = [
  { value: 'degradation', label: 'Dégradation', icon: '🏗️' },
  { value: 'nuisance', label: 'Nuisance', icon: '🔊' },
  { value: 'voirie', label: 'Voirie', icon: '🛣️' },
  { value: 'eclairage', label: 'Éclairage', icon: '💡' },
  { value: 'proprete', label: 'Propreté', icon: '🧹' },
  { value: 'vegetation', label: 'Végétation', icon: '🌳' },
  { value: 'autre', label: 'Autre', icon: '❓' }
]

const statusConfig = {
  'ouvert': { label: 'Ouvert', color: 'bg-red-100 text-red-800', icon: XCircle },
  'en_cours': { label: 'En cours', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  'resolu': { label: 'Résolu', color: 'bg-green-100 text-green-800', icon: CheckCircle }
}

export default function SignalementApp({ user }) {
  const [signalements, setSignalements] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    latitude: '',
    longitude: '',
    image: null
  })

  // Charger les signalements de l'utilisateur
  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'signalements'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const signalementsList = []
      querySnapshot.forEach((doc) => {
        signalementsList.push({ id: doc.id, ...doc.data() })
      })
      setSignalements(signalementsList)
    })

    return () => unsubscribe()
  }, [user])

  // Obtenir la géolocalisation
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }))
          alert('Géolocalisation obtenue avec succès !')
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error)
          alert('Impossible d\'obtenir la géolocalisation. Veuillez saisir manuellement.')
        }
      )
    } else {
      alert('La géolocalisation n\'est pas supportée par ce navigateur.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Vous devez être connecté pour créer un signalement')
      return
    }

    setLoading(true)

    try {
      let imageUrl = null

      // Upload de l'image si présente
      if (formData.image) {
        const imageRef = ref(storage, `signalements/${user.uid}/${Date.now()}_${formData.image.name}`)
        const snapshot = await uploadBytes(imageRef, formData.image)
        imageUrl = await getDownloadURL(snapshot.ref)
      }

      // Créer le signalement
      const signalementData = {
        userId: user.uid,
        userEmail: user.email,
        category: formData.category,
        description: formData.description,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        imageUrl,
        status: 'ouvert',
        createdAt: new Date(),
        updatedAt: new Date(),
        timeline: [{
          timestamp: new Date(),
          status: 'ouvert',
          comment: 'Signalement créé'
        }]
      }

      await addDoc(collection(db, 'signalements'), signalementData)

      // Réinitialiser le formulaire
      setFormData({
        category: '',
        description: '',
        latitude: '',
        longitude: '',
        image: null
      })

      alert('Signalement créé avec succès !')
    } catch (error) {
      console.error('Erreur lors de la création du signalement:', error)
      alert('Erreur lors de la création du signalement: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Date inconnue'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryLabel = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category ? `${category.icon} ${category.label}` : categoryValue
  }

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Accès restreint
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Vous devez être connecté pour accéder à l'application de signalement.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Créer un signalement</TabsTrigger>
          <TabsTrigger value="list">Mes signalements ({signalements.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Nouveau signalement
              </CardTitle>
              <CardDescription>
                Signalez un problème dans l'espace public du quartier de l'Ariane
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="category">Catégorie du problème</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description du problème</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Décrivez le problème en détail..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      placeholder="43.7102"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      placeholder="7.2620"
                      required
                    />
                  </div>
                </div>

                <Button type="button" onClick={getCurrentLocation} variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Obtenir ma position actuelle
                </Button>

                <div>
                  <Label htmlFor="image">Photo du problème (optionnel)</Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Formats acceptés: JPG, PNG, WebP (max 5MB)
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Créer le signalement
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-4">
            {signalements.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-gray-500">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Aucun signalement pour le moment</p>
                    <p className="text-sm">Créez votre premier signalement pour commencer</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              signalements.map((signalement) => {
                const StatusIcon = statusConfig[signalement.status]?.icon || AlertTriangle
                return (
                  <Card key={signalement.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {getCategoryLabel(signalement.category)}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4" />
                            {formatDate(signalement.createdAt)}
                          </CardDescription>
                        </div>
                        <Badge className={statusConfig[signalement.status]?.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[signalement.status]?.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">{signalement.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {signalement.latitude?.toFixed(4)}, {signalement.longitude?.toFixed(4)}
                        </div>
                      </div>

                      {signalement.imageUrl && (
                        <div className="mb-3">
                          <img
                            src={signalement.imageUrl}
                            alt="Photo du signalement"
                            className="max-w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {signalement.timeline && signalement.timeline.length > 1 && (
                        <div className="border-t pt-3">
                          <h4 className="font-semibold text-sm mb-2">Historique</h4>
                          <div className="space-y-2">
                            {signalement.timeline.map((entry, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <Badge variant="outline" className="text-xs">
                                  {statusConfig[entry.status]?.label}
                                </Badge>
                                <span className="text-gray-500">
                                  {formatDate(entry.timestamp)}
                                </span>
                                {entry.comment && (
                                  <span className="text-gray-700">- {entry.comment}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


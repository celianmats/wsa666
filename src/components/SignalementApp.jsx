import { useState, useEffect } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore'
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
import { MapPin, Camera, Clock, AlertTriangle, CheckCircle, XCircle, Upload, Eye, Archive, Trash2 } from 'lucide-react'
import { Timestamp } from 'firebase/firestore'

import { useTranslation } from 'react-i18next'

const categories = [
  { value: 'itinerary', label: 'itinerary', icon: '🗺️' },
  { value: 'event', label: 'event', icon: '📣' },
  { value: 'green_hub', label: 'green_hub', icon: '🌳' },
  { value: 'accessibility', label: 'accessibility', icon: '♿' },
  { value: 'local_tip', label: 'local_tip', icon: '💡' },
  { value: 'other', label: 'other', icon: '✨' }
]

const statusConfig = {
  'suggere': { label: 'pending', color: 'bg-blue-100 text-blue-800', icon: Clock },
  'valide': { label: 'published', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  'archive': { label: 'archived', color: 'bg-gray-100 text-gray-800', icon: XCircle }
}

export default function SignalementApp({ user, onNavigate }) {
  const { t, i18n } = useTranslation()
  const [signalements, setSignalements] = useState([])
  const [loading, setLoading] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState({})
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    nomLieu: '',
    latitude: '',
    longitude: '',
    image: null
  })

  // Charger les signalements de l'utilisateur (version sans index composite)
  useEffect(() => {
    if (!user) return

    // Utiliser une requête simple pour éviter l'erreur d'index
    const q = query(
        collection(db, 'signalements'),
        orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const signalementsList = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // Filtrer côté client pour ne garder que les signalements de l'utilisateur
        if (data.userId === user.uid) {
          signalementsList.push({ id: doc.id, ...data })
        }
      })
      setSignalements(signalementsList)
    }, (error) => {
      console.error("Erreur lors du chargement des signalements:", error)
    })

    return () => unsubscribe()
  }, [user])

  // Fonction pour valider un signalement
  const validateSignalement = async (signalementId) => {
    setUpdatingStatus(prev => ({ ...prev, [signalementId]: 'validating' }))

    try {
      const signalementRef = doc(db, 'signalements', signalementId)
      const now = Timestamp.now()

      // Récupérer le signalement actuel pour conserver la timeline
      const currentSignalement = signalements.find(s => s.id === signalementId)
      const currentTimeline = currentSignalement?.timeline || []

      await updateDoc(signalementRef, {
        status: 'valide',
        updatedAt: now,
        timeline: [
          ...currentTimeline,
          {
            timestamp: now,
            status: 'valide',
          }
        ]
      })

      alert(t("signalement.validation.success"))
    } catch (error) {
      console.error("Erreur lors de la validation:", error)
      alert(t("signalement.validation.error") + error.message)
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [signalementId]: null }))
    }
  }

  // Fonction pour archiver un signalement
  const archiveSignalement = async (signalementId) => {
    setUpdatingStatus(prev => ({ ...prev, [signalementId]: 'archiving' }))

    try {
      const signalementRef = doc(db, 'signalements', signalementId)
      const now = Timestamp.now()

      // Récupérer le signalement actuel pour conserver la timeline
      const currentSignalement = signalements.find(s => s.id === signalementId)
      const currentTimeline = currentSignalement?.timeline || []

      await updateDoc(signalementRef, {
        status: 'archive',
        updatedAt: now,
        timeline: [
          ...currentTimeline,
          {
            timestamp: now,
            status: 'archive',
          }
        ]
      })

      alert(t("signalement.archive.success"))
    } catch (error) {
      console.error("Erreur lors de l'archivage:", error)
      alert(t("signalement.archive.error") + error.message)
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [signalementId]: null }))
    }
  }

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
            alert(t("signalement.geolocation_success"))
          },
          (error) => {
            console.error("Erreur de géolocalisation:", error)
            alert(t("signalement.geolocation_error"))
          }
      )
    } else {
      alert(t("signalement.geolocation_not_supported"))
    }
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
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
      alert(t("signalement.login_required"))
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

      const now = Timestamp.now()

      // Créer le signalement
      const signalementData = {
        userId: user.uid,
        userEmail: user.email,
        category: formData.category,
        description: formData.description,
        nomLieu: formData.nomLieu || "",
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        imageUrl,
        status: "suggere", // Nouveau statut par défaut
        createdAt: now,
        updatedAt: now,
        timeline: [{
          timestamp: now,
          status: "suggere",
        }]
      }

      await addDoc(collection(db, "signalements"), signalementData)

      // Réinitialiser le formulaire
      setFormData({
        category: "",
        description: "",
        nomLieu: "",
        latitude: "",
        longitude: "",
        image: null
      })

      alert(t("signalement.success_message"))
    } catch (error) {
      console.error("Erreur lors de la création du signalement:", error)
      alert(t("signalement.error_message") + error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return t("signalement.date_unknown")
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString(i18n.language === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getCategoryLabel = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue)
    return category ? `${category.icon} ${t(`signalement.categories.${category.label}`)}` : categoryValue
  }

  if (!user) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {t("signalement.restricted_access.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {t("signalement.restricted_access.description")}
            </p>
            <Button onClick={() => onNavigate("auth")} className="mt-4 w-full">
              {t("signalement.restricted_access.login_button")}
            </Button>
          </CardContent>
        </Card>
    )
  }

  return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">{t("signalement.create_tab")}</TabsTrigger>
            <TabsTrigger value="list">{t("signalement.my_reports_tab", { count: signalements.length })}</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {t("signalement.new_report.title")}
                </CardTitle>
                <CardDescription>
                  {t("signalement.new_report.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Label>{t("signalement.form.category_label")}</Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("signalement.form.category_placeholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.icon} {t(`signalement.categories.${category.label}`)}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Label htmlFor="description">{t("signalement.form.description_label")}</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder={t("signalement.form.description_placeholder")}
                        required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="latitude">{t("signalement.form.latitude_label")}</Label>
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
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="longitude">{t("signalement.form.longitude_label")}</Label>
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

                  <div className="flex flex-col gap-4">
                    <Label htmlFor="locationName">{t("signalement.form.location_name_label")}</Label>
                    <Input
                        id="locationName"
                        name="nomLieu"
                        type="text"
                        value={formData.nomLieu}
                        onChange={handleInputChange}
                        placeholder={t("signalement.form.location_name_placeholder")}
                    />
                  </div>

                  <Button type="button" onClick={getCurrentLocation} variant="outline" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    {t("signalement.form.get_location_button")}
                  </Button>

                  <div className="flex flex-col gap-4">
                    <Label htmlFor="image">{t("signalement.form.image_label")}</Label>
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                        className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {t("signalement.form.image_formats")}
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                        <>
                          <Upload className="w-4 h-4 mr-2 animate-spin" />
                          {t("signalement.form.submitting_button")}
                        </>
                    ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          {t("signalement.form.submit_button")}
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
                        <p>{t("signalement.list.no_reports_title")}</p>
                        <p className="text-sm">{t("signalement.list.no_reports_description")}</p>
                      </div>
                    </CardContent>
                  </Card>
              ) : (
                  signalements.map((signalement) => {
                    const StatusIcon = statusConfig[signalement.status]?.icon || AlertTriangle
                    const isUpdating = updatingStatus[signalement.id]

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
                                {t(`signalement.status.${statusConfig[signalement.status]?.label}`)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-3">{signalement.description}</p>
                            {signalement.nomLieu && (
                                <p className="text-black font-bold mb-1">{signalement.nomLieu}</p>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {signalement.nomLieu || `${signalement.latitude?.toFixed(4)}, ${signalement.longitude?.toFixed(4)}`}
                              </div>
                            </div>

                            {signalement.imageUrl && (
                                <div className="mb-3">
                                  <img
                                      src={signalement.imageUrl}
                                      alt={t("signalement.image_alt")}
                                      className="max-w-full h-48 object-cover rounded-lg"
                                      onError={(e) => {
                                        e.target.style.display = 'none'
                                      }}
                                  />
                                </div>
                            )}

                            {signalement.timeline && signalement.timeline.length > 0 && (
                                <div className="border-t pt-3 mb-4">
                                  <h4 className="font-semibold text-sm mb-2">{t("signalement.timeline.title")}</h4>
                                  <div className="space-y-2">
                                    {signalement.timeline.map((entry, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                          <Badge variant="outline" className="text-xs">
                                            {t(`signalement.status.${statusConfig[entry.status]?.label}`)}
                                          </Badge>
                                          <span className="text-gray-500">
                                            {formatDate(entry.timestamp)}
                                          </span>
                                        </div>
                                    ))}
                                  </div>
                                </div>
                            )}

                            {/* Boutons d'action selon le statut */}
                            <div className="border-t pt-3">
                              <div className="flex gap-2 flex-wrap">
                                {signalement.status === 'suggere' && (
                                    <>
                                      <Button
                                          onClick={() => validateSignalement(signalement.id)}
                                          disabled={isUpdating}
                                          size="sm"
                                          className="bg-green-600 hover:bg-green-700 text-white"
                                      >
                                        {isUpdating === 'validating' ? (
                                            <>
                                              <Upload className="w-4 h-4 mr-2 animate-spin" />
                                              {t("signalement.timeline.validation")}
                                            </>
                                        ) : (
                                            <>
                                              <CheckCircle className="w-4 h-4 mr-2" />
                                              {t("signalement.status.validationpublish")}
                                            </>
                                        )}
                                      </Button>
                                      <Button
                                          onClick={() => archiveSignalement(signalement.id)}
                                          disabled={isUpdating}
                                          size="sm"
                                          variant="outline"
                                      >
                                        {isUpdating === 'archiving' ? (
                                            <>
                                              <Upload className="w-4 h-4 mr-2 animate-spin" />
                                              {t("signalement.status.archiveloading")}
                                            </>
                                        ) : (
                                            <>
                                              <Archive className="w-4 h-4 mr-2" />
                                              {t("signalement.status.archiver")}
                                            </>
                                        )}
                                      </Button>
                                    </>
                                )}

                                {signalement.status === 'valide' && (
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="text-green-700 border-green-300">
                                        <Eye className="w-3 h-3 mr-1" />
                                        {t("signalement.status.visible")}
                                      </Badge>
                                      <Button
                                          onClick={() => archiveSignalement(signalement.id)}
                                          disabled={isUpdating}
                                          size="sm"
                                          variant="outline"
                                      >
                                        {isUpdating === 'archiving' ? (
                                            <>
                                              <Upload className="w-4 h-4 mr-2 animate-spin" />
                                              {t("signalement.status.archiveloading")}
                                            </>
                                        ) : (
                                            <>
                                              <Archive className="w-4 h-4 mr-2" />
                                              {t("signalement.status.archiver")}
                                            </>
                                        )}
                                      </Button>
                                    </div>
                                )}

                                {signalement.status === 'archive' && (
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="text-gray-600 border-gray-300">
                                        <Archive className="w-3 h-3 mr-1" />
                                        {t("status.archived")}
                                      </Badge>
                                      <Button
                                          onClick={() => validateSignalement(signalement.id)}
                                          disabled={isUpdating}
                                          size="sm"
                                          variant="outline"
                                      >
                                        {isUpdating === 'validating' ? (
                                            <>
                                              <Upload className="w-4 h-4 mr-2 animate-spin" />
                                              {t("signalement.status.restore")}
                                            </>
                                        ) : (
                                            <>
                                              <CheckCircle className="w-4 h-4 mr-2" />
                                              {t("signalement.status.republish")}
                                            </>
                                        )}
                                      </Button>
                                    </div>
                                )}
                              </div>

                              {/* Message d'aide selon le statut */}
                              <div className="mt-2 text-xs text-gray-500">
                                {signalement.status === 'suggere' && (
                                    <p>{t("signalement.status.pendingMessage")}</p>
                                )}
                                {signalement.status === 'valide' && (
                                    <p>{t("signalement.status.publishedMessage")}</p>
                                )}
                                {signalement.status === 'archive' && (
                                    <p>{t("signalement.status.archivedMessage")}</p>
                                )}
                              </div>
                            </div>
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


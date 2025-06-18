import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { User, Mail, Lock, LogOut, Edit } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AuthComponent({ user, onAuthChange }) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [editingProfile, setEditingProfile] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  })
  const [profileData, setProfileData] = useState({
    displayName: ''
  })

  // Charger le profil utilisateur depuis Firestore
  useEffect(() => {
    const loadUserProfile = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setUserProfile(userData)
            setProfileData({
              displayName: userData.displayName || ''
            })
          } else {
            // Si le document n'existe pas, le créer avec les données de base
            const defaultProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.email.split('@')[0],
              createdAt: new Date(),
            }
            await setDoc(doc(db, 'users', user.uid), defaultProfile)
            setUserProfile(defaultProfile)
            setProfileData({
              displayName: defaultProfile.displayName
            })
          }
        } catch (error) {
          console.error('Erreur lors du chargement du profil:', error)
        }
      } else {
        setUserProfile(null)
        setProfileData({ displayName: '' })
      }
    }

    loadUserProfile()
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      const displayName = formData.displayName || user.email.split('@')[0]

      // Mettre à jour le profil Firebase Auth
      await updateProfile(user, {
        displayName: displayName
      })

      // Créer le document utilisateur dans Firestore
      const userProfile = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await setDoc(doc(db, 'users', user.uid), userProfile)

      // Recharger l'utilisateur pour obtenir les données mises à jour
      await user.reload()

      onAuthChange(user)
      alert(t('auth.register.success'))
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      const errorMsg = mapAuthError(error.code)
      alert(t(errorMsg))
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      onAuthChange(userCredential.user)
      alert(t('auth.login.success'))
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      const errorMsg = mapAuthError(error.code)
      alert(t(errorMsg))
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mettre à jour le profil Firebase Auth
      await updateProfile(user, {
        displayName: profileData.displayName
      })

      // Mettre à jour le document Firestore
      await setDoc(doc(db, 'users', user.uid), {
        ...userProfile,
        displayName: profileData.displayName,
        updatedAt: new Date()
      }, { merge: true })

      // Recharger l'utilisateur et le profil
      await user.reload()
      setUserProfile(prev => ({
        ...prev,
        displayName: profileData.displayName
      }))

      setEditingProfile(false)
      alert(t('auth.profile.updateSuccess'))
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      alert(t('auth.profile.updateError'))
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      onAuthChange(null)
      alert(t('auth.logout.success'))
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      alert(error.message)
    }
  }

  const mapAuthError = (code) => {
    switch (code) {
      case 'auth/invalid-email':
        return 'auth.errors.invalidEmail'
      case 'auth/weak-password':
        return 'auth.errors.weakPassword'
      case 'auth/user-not-found':
        return 'auth.errors.userNotFound'
      case 'auth/wrong-password':
        return 'auth.errors.wrongPassword'
      case 'auth/email-already-in-use':
        return 'auth.errors.emailInUse'
      default:
        return 'auth.errors.generic'
    }
  }

  // Fonction utilitaire pour obtenir le nom d'affichage
  const getDisplayName = () => {
    return userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || t('auth.register.noDisplayName')
  }

  if (user) {
    return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {t('auth.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{t('auth.login.email')}</Label>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            {editingProfile ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="edit-displayName">{t('auth.register.displayName')}</Label>
                    <Input
                        id="edit-displayName"
                        name="displayName"
                        type="text"
                        value={profileData.displayName}
                        onChange={handleProfileChange}
                        placeholder={t('auth.register.displayName')}
                        required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? t('auth.profile.updating') : t('auth.profile.save')}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingProfile(false)
                          setProfileData({
                            displayName: userProfile?.displayName || ''
                          })
                        }}
                        className="flex-1"
                    >
                      {t('auth.profile.cancel')}
                    </Button>
                  </div>
                </form>
            ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <Label>{t('auth.register.displayName')}</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProfile(true)}
                        className="h-auto p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{getDisplayName()}</p>
                </div>
            )}

            <Button onClick={handleSignOut} variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              {t('auth.logout.button')}
            </Button>
          </CardContent>
        </Card>
    )
  }

  return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{t('auth.title')}</CardTitle>
          <CardDescription>{t('auth.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">{t('auth.login.title')}</TabsTrigger>
              <TabsTrigger value="signup">{t('auth.register.title')}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="signin-email">{t('auth.login.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="signin-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="email@example.com"
                        required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="signin-password">{t('auth.login.password')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="signin-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="••••••••"
                        required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? `${t('auth.login.loading')}` : t('auth.login.submit')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="signup-name">{t('auth.register.displayName')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="signup-name"
                        name="displayName"
                        type="text"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder={t('auth.register.displayName')}
                        required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="signup-email">{t('auth.register.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="email@example.com"
                        required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="signup-password">{t('auth.register.password')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="••••••••"
                        required
                        minLength={6}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? `${t('auth.register.loading')}` : t('auth.register.submit')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  )
}
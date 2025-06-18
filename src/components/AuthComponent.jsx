import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { User, Mail, Lock, LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AuthComponent({ user, onAuthChange }) {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
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

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: formData.displayName || user.email.split('@')[0],
        createdAt: new Date(),
        role: 'citoyen'
      })

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
            <div>
              <Label>{t('auth.register.displayName')}</Label>
              <p className="text-sm text-gray-600">{user.displayName || t('auth.register.noDisplayName')}</p>
            </div>
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

import {useState, useEffect} from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import {
    doc,
    setDoc,
    getDoc,
    collection,
    query,
    orderBy,
    onSnapshot,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore'
import {auth, db} from '../lib/firebase'
import {motion} from 'framer-motion'
import {Button} from '@/components/ui/button.jsx'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card.jsx'
import {Input} from '@/components/ui/input.jsx'
import {Label} from '@/components/ui/label.jsx'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs.jsx'
import {
    User, Mail, Lock, LogOut, Edit, AlertTriangle, Trophy, Clock, CheckCircle, XCircle, MapPin, Upload, Archive, Eye
} from 'lucide-react'
import {useTranslation} from 'react-i18next'
import {Badge} from "@/components/ui/badge.jsx";

const categories = [
    {value: 'itinerary', label: 'itinerary', icon: '🗺️'},
    {value: 'event', label: 'event', icon: '📣'},
    {value: 'green_hub', label: 'green_hub', icon: '🌳'},
    {value: 'accessibility', label: 'accessibility', icon: '♿'},
    {value: 'local_tip', label: 'local_tip', icon: '💡'},
    {value: 'other', label: 'other', icon: '✨'}
]

const statusConfig = {
    'suggere': {label: 'pending', color: 'bg-blue-100 text-blue-800', icon: Clock},
    'valide': {label: 'published', color: 'bg-green-100 text-green-800', icon: CheckCircle},
    'archive': {label: 'archived', color: 'bg-gray-100 text-gray-800', icon: XCircle}
}
export default function AuthComponent({user, onAuthChange}) {
    const {t, i18n} = useTranslation()
    const [userProfile, setUserProfile] = useState(null)
    const [signalements, setSignalements] = useState([])
    const [loading, setLoading] = useState(false)
    const [updatingStatus, setUpdatingStatus] = useState({})
    const [editingProfile, setEditingProfile] = useState(false)
    const [setUserTips] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        displayName: ''
    })
    const [profileData, setProfileData] = useState({
        displayName: ''
    })

    useEffect(() => {
        const loadUserTips = async () => {
            if (user) {
                try {
                    // Créer une requête qui filtre par userId et ordonne par date
                    const q = query(
                        collection(db, 'signalements'),
                        where('userId', '==', user.uid),
                        orderBy('createdAt', 'desc')
                    );

                    const unsubscribe = onSnapshot(q, (querySnapshot) => {
                        const tipsList = [];
                        querySnapshot.forEach((doc) => {
                            tipsList.push({id: doc.id, ...doc.data()});
                        });
                        setUserTips(tipsList);
                    });

                    return () => unsubscribe();
                } catch (error) {
                    console.error('Erreur lors du chargement des tips:', error);
                }
            } else {
                setUserTips([]);
            }
        };

        loadUserTips();
    }, [user]);

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
                setProfileData({displayName: ''})
            }
        }

        loadUserProfile()
    }, [user])

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleProfileChange = (e) => {
        const {name, value} = e.target
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
            }, {merge: true})

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
                    signalementsList.push({id: doc.id, ...data})
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
        setUpdatingStatus(prev => ({...prev, [signalementId]: 'validating'}))

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
            setUpdatingStatus(prev => ({...prev, [signalementId]: null}))
        }
    }

    // Fonction pour archiver un signalement
    const archiveSignalement = async (signalementId) => {
        setUpdatingStatus(prev => ({...prev, [signalementId]: 'archiving'}))

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
            setUpdatingStatus(prev => ({...prev, [signalementId]: null}))
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

    if (user) {
        return (
            <div className="w-full max-w-4xl mx-auto space-y-6">
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">{t("auth.tabs.profile")}</TabsTrigger>
                        <TabsTrigger
                            value="list">{t("signalement.my_reports_tab", {count: signalements.length})}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <motion.div initial={{opacity: 0, y: 30}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, delay: 0.4}}
                                    className="flex flex-col gap-4 justify-center">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5"/>
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
                                            <div className="flex flex-col gap-4">
                                                <Label
                                                    htmlFor="edit-displayName">{t('auth.register.displayName')}</Label>
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
                                            <div className="flex gap-4">
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
                                                    <Edit className="w-4 h-4"/>
                                                </Button>
                                            </div>
                                            <p className="text-sm text-gray-600">{getDisplayName()}</p>
                                        </div>
                                    )}

                                    <Button onClick={handleSignOut} variant="outline" className="w-full">
                                        <LogOut className="w-4 h-4 mr-2"/>
                                        {t('auth.logout.button')}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>


                    <TabsContent value="list">
                        <motion.div initial={{opacity: 0, y: 30}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, delay: 0.4}}
                                    className="flex flex-col gap-4 justify-center">
                            <div className="space-y-4">
                                <Card>
                                    <CardContent>
                                        <div
                                            className="text-center text-gray-500 flex flex-row items-center gap-2 justify-center">
                                            <Trophy className="w-12 h-12 text-gray-300"/>
                                            <p>{t("auth.tabs.tips.subtitle")}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="space-y-4">
                                {signalements.length === 0 ? (
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="text-center text-gray-500">
                                                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300"/>
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
                                                                <Clock className="w-4 h-4"/>
                                                                {formatDate(signalement.createdAt)}
                                                            </CardDescription>
                                                        </div>
                                                        <Badge className={statusConfig[signalement.status]?.color}>
                                                            <StatusIcon className="w-3 h-3 mr-1"/>
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
                                                            <MapPin className="w-4 h-4"/>
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
                                                                    <div key={index}
                                                                         className="flex items-center gap-2 text-sm">
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
                                                                                <Upload
                                                                                    className="w-4 h-4 mr-2 animate-spin"/>
                                                                                {t("signalement.timeline.validation")}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <CheckCircle className="w-4 h-4 mr-2"/>
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
                                                                                <Upload
                                                                                    className="w-4 h-4 mr-2 animate-spin"/>
                                                                                {t("signalement.status.archiveloading")}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Archive className="w-4 h-4 mr-2"/>
                                                                                {t("signalement.status.archiver")}
                                                                            </>
                                                                        )}
                                                                    </Button>
                                                                </>
                                                            )}

                                                            {signalement.status === 'valide' && (
                                                                <div className="flex items-center gap-2">
                                                                    <Badge variant="outline"
                                                                           className="text-green-700 border-green-300">
                                                                        <Eye className="w-3 h-3 mr-1"/>
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
                                                                                <Upload
                                                                                    className="w-4 h-4 mr-2 animate-spin"/>
                                                                                {t("signalement.status.archiveloading")}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Archive className="w-4 h-4 mr-2"/>
                                                                                {t("signalement.status.archiver")}
                                                                            </>
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            )}

                                                            {signalement.status === 'archive' && (
                                                                <div className="flex items-center gap-2">
                                                                    <Badge variant="outline"
                                                                           className="text-gray-600 border-gray-300">
                                                                        <Archive className="w-3 h-3 mr-1"/>
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
                                                                                <Upload
                                                                                    className="w-4 h-4 mr-2 animate-spin"/>
                                                                                {t("signalement.status.restore")}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <CheckCircle className="w-4 h-4 mr-2"/>
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
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{t('auth.title')}</CardTitle>
                <CardDescription>{t('auth.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="signin" className="w-full gap-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">{t('auth.login.title')}</TabsTrigger>
                        <TabsTrigger value="signup">{t('auth.register.title')}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="signin-email">{t('auth.login.email')}</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
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

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="signin-password">{t('auth.login.password')}</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
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

                            <Button type="submit" className="w-full bg-[#2E599A] hover:bg-[#223552]"
                                    disabled={loading}>
                                {loading ? `${t('auth.login.loading')}` : t('auth.login.submit')}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="signup-name">{t('auth.register.displayName')}</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
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

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="signup-email">{t('auth.register.email')}</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
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

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="signup-password">{t('auth.register.password')}</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
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

                            <Button type="submit" className="w-full bg-[#2E599A] hover:bg-[#223552]"
                                    disabled={loading}>
                                {loading ? `${t('auth.register.loading')}` : t('auth.register.submit')}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
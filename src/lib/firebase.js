// Configuration Firebase
// IMPORTANT: Remplacez ces valeurs par votre configuration Firebase réelle
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDPV8DNla7Ak_6KsXaSIzp7ixABUfDfbxQ",
  authDomain: "ariane-nice.firebaseapp.com",
  projectId: "ariane-nice",
  storageBucket: "ariane-nice.firebasestorage.app",
  messagingSenderId: "150094670748",
  appId: "1:150094670748:web:8f4e2911518c140b90f659"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig)

// Initialiser les services Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app


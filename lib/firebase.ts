import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyBA2ALGzEAlxE6U2vEY6SFlkpI0iQL38KU",
  authDomain: "skillsync-80788.firebaseapp.com",
  projectId: "skillsync-80788",
  storageBucket: "skillsync-80788.firebasestorage.app",
  messagingSenderId: "780270388123",
  appId: "1:780270388123:web:329d3f43e2b1315fe7973e",
  measurementId: "G-N6VKDF67P0"
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

// Initialize Analytics and handle server-side rendering
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null)

export { app, db, analytics } 
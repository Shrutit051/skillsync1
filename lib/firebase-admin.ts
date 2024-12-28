import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, getApps, cert } from 'firebase-admin/app'

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  })
}

const adminDb = getFirestore()

// Create indexes for efficient querying
async function createIndexes() {
  try {
    await adminDb.collection('companies').doc('--indexes--').set({
      // Index for searching companies
      searchIndex: {
        fields: ['searchableFields', 'status', 'isActive', 'createdAt'],
        queryScope: 'COLLECTION'
      },
      // Index for active companies
      activeCompaniesIndex: {
        fields: ['isActive', 'status', 'createdAt'],
        queryScope: 'COLLECTION'
      }
    })
  } catch (error) {
    console.error('Error creating indexes:', error)
  }
}

createIndexes()

export { adminDb } 
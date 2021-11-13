import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
//firebaseConfig object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSANGING_SENDING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}
//To Initialize firebase
initializeApp(firebaseConfig);

//To initialize firestore
const db = getFirestore();

//To initialize firebase auth
const auth = getAuth();

export { db, auth }


import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

let firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check for missing API key and use placeholder values if needed
if (!firebaseConfig.apiKey) {
  console.warn(
    `
    ****************************************************************************************
    *                                                                                      *
    *    WARNING: Firebase API key is missing. The app will use placeholder credentials.   *
    *    Firebase features like login, database, and storage will not work correctly.      *
    *                                                                                      *
    *    Please add your Firebase project credentials to the .env file to enable them.     *
    *                                                                                      *
    ****************************************************************************************
    `
  );
  // Use placeholder values to prevent the app from crashing on initialization
  firebaseConfig = {
    apiKey: "placeholder-api-key",
    authDomain: "placeholder.firebaseapp.com",
    projectId: "placeholder-project-id",
    storageBucket: "placeholder.appspot.com",
    messagingSenderId: "placeholder-sender-id",
    appId: "placeholder-app-id",
  };
}


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, db, storage };

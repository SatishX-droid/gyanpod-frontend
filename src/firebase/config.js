import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2dDh3fJ24O2lbGO6ig0aPSzbl4Z7Jb4s",
  authDomain: "gyanpod-app.firebaseapp.com",
  projectId: "gyanpod-app",
  storageBucket: "gyanpod-app.firebasestorage.app",
  messagingSenderId: "719334867830",
  appId: "1:719334867830:web:52894c4963a35872aeb057",
  measurementId: "G-0S2K7H5EXQ"
};

const app = initializeApp(firebaseConfig);

// Export all Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

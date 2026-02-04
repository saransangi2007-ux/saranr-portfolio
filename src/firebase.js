import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCDnrHUZ0CUG5XbjcBGRf4HxCyHWeFcJ0A",
    authDomain: "saran-r-portfolio.firebaseapp.com",
    projectId: "saran-r-portfolio",
    storageBucket: "saran-r-portfolio.firebasestorage.app",
    messagingSenderId: "466560084583",
    appId: "1:466560084583:web:7125d0987f0ff0a79042c2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

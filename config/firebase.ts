// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzStEyBlZ_wI8ghDIHilGBfBllQj2vXJ8",
  authDomain: "fitness-app-fc785.firebaseapp.com",
  projectId: "fitness-app-fc785",
  storageBucket: "fitness-app-fc785.firebasestorage.app",
  messagingSenderId: "722834246854",
  appId: "1:722834246854:web:101fefbeff9f1b43659bc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const fireStore = getFirestore(app);
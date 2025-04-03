// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { get, getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyCrvbsuxnc0zy8bqHXDhrWYeOwteb5c2lc",
  authDomain: "grabb-2997c.firebaseapp.com",
  databaseURL: "https://grabb-2997c-default-rtdb.firebaseio.com",
  projectId: "grabb-2997c",
  storageBucket: "grabb-2997c.firebasestorage.app",
  messagingSenderId: "195597560804",
  appId: "1:195597560804:web:5ddcb473fdeec70b14f5f1",
  measurementId: "G-WMLQJ1PWXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});



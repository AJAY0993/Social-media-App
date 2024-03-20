import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyAfq8d6jSDZWf6mGwT9eHf8JK-ECQWM1rc",
  authDomain: "social-media-app-22f7c.firebaseapp.com",
  projectId: "social-media-app-22f7c",
  storageBucket: "social-media-app-22f7c.appspot.com",
  messagingSenderId: "765218809281",
  appId: "1:765218809281:web:ece1fbea2de250d8f2fb40",
  measurementId: "G-G5HXQ05DXE"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const messaging = getMessaging(app)

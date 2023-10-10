// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBJ5EzdEDIMDplmmyK7gNAwOuuy8JpzlYA",
    authDomain: "tell-me-b538b.firebaseapp.com",
    projectId: "tell-me-b538b",
    storageBucket: "tell-me-b538b.appspot.com",
    messagingSenderId: "702112593656",
    appId: "1:702112593656:web:e5af203d71762b7c822d0d",
    measurementId: "G-0V2J94X9F7",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);

  // const analytics = getAnalytics(app);
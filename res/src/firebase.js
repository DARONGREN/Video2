// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-p0izua_4dZK8FmvSpKylHGZk_IFjF70",
  authDomain: "video-e6be0.firebaseapp.com",
  projectId: "video-e6be0",
  storageBucket: "video-e6be0.appspot.com",
  messagingSenderId: "560806594691",
  appId: "1:560806594691:web:b45b84e54d4107769233b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
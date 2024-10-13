// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOPbvhKDMtleaTO_DWuJtlyXFbDkDHme4",
    authDomain: "talent-harbour.firebaseapp.com",
    projectId: "talent-harbour",
    storageBucket: "talent-harbour.appspot.com",
    messagingSenderId: "963579457682",
    appId: "1:963579457682:web:efae5baac4773713b2364b",
    measurementId: "G-90D3LKK313"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
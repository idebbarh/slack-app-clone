import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLvw7lVZMUj6ZBDt0y_SvivuJlMIdWUQM",
  authDomain: "slack-app-clone-r.firebaseapp.com",
  projectId: "slack-app-clone-r",
  storageBucket: "slack-app-clone-r.appspot.com",
  messagingSenderId: "862995554263",
  appId: "1:862995554263:web:6bb281abeb5cd3c6d8f592",
  measurementId: "G-ETH3EGYZ9V"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
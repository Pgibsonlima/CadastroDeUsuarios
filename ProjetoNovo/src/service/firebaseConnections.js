import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1ro10zFLCE_Oz426sAsLbDfKD0yVT9LI",
  authDomain: "cadastrodepessoas-394fa.firebaseapp.com",
  projectId: "cadastrodepessoas-394fa",
  storageBucket: "cadastrodepessoas-394fa.firebasestorage.app",
  messagingSenderId: "89277804061",
  appId: "1:89277804061:web:4bd104d9c593525a2e20f4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usuariosCollection = collection(db, "usuarios");

export {
  db,
  usuariosCollection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp
};

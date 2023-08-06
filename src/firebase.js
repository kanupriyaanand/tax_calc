import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  getFirestore,
} from "firebase/firestore";
import "@firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXeYRoy5VOnMR-h3pgcGzSI8ieykl98Gg",
  authDomain: "taxwebsite-af182.firebaseapp.com",
  projectId: "taxwebsite-af182",
  storageBucket: "taxwebsite-af182.appspot.com",
  messagingSenderId: "303852599306",
  appId: "1:303852599306:web:67247de4d1a4359eff47f3",
  measurementId: "G-G2J71TT3M2"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
//const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { auth , signInWithGoogle };
export default db;


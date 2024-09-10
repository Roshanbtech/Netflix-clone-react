import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBuiiADcRApLGGNLpyg4mziQkJqk71sXIc",
  authDomain: "netflix-clone-d1906.firebaseapp.com",
  projectId: "netflix-clone-d1906",
  storageBucket: "netflix-clone-d1906.appspot.com",
  messagingSenderId: "209368309947",
  appId: "1:209368309947:web:54f58f5c603239a82f099e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Signup Successful");
  } catch (e) {
    console.log(e);
    toast.error(e.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login Successful");
  } catch (e) {
    console.log(e);
    toast.error(e.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
  toast.success("Logout Successful");
};

export { auth, db, signup, login, logout };

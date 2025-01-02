import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAfUpi-wcaFKO8yXMPBKwnWE-6XMJDEyVM",
  authDomain: "netflix-clone-e3265.firebaseapp.com",
  projectId: "netflix-clone-e3265",
  storageBucket: "netflix-clone-e3265.firebasestorage.app",
  messagingSenderId: "553959746124",
  appId: "1:553959746124:web:d70386e5f9182b92c9a2e9"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async(name,email,password)=>{
    try {
        //create user
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user=res.user;
       //store user
       await addDoc(collection(db,"users"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};
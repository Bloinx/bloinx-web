import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase from "./config.firebase";

firebase();
const auth = getAuth();
const db = getFirestore();

const signUp = ({ user, password, onSuccess, onFailure }) => {
  createUserWithEmailAndPassword(auth, user, password)
    .then(async (userCredential) => {
      const frankDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(frankDocRef, {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        phoneNumber: userCredential.user.phoneNumber,
      });
      onSuccess(userCredential);
    })
    .catch((error) => {
      onFailure(error);
    });
};

export default signUp;

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "./config.firebase";

firebase();
const auth = getAuth();

const login = ({ user, password, onSuccess, onFailure }) =>
  signInWithEmailAndPassword(auth, user, password)
    .then((userCredential) => {
      onSuccess(userCredential);
    })
    .catch((error) => {
      onFailure(error);
    });

export default login;

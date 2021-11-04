import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "./config.firebase";

firebase();
const auth = getAuth();

const signUp = ({ user, password, onSuccess, onFailure }) => {
  createUserWithEmailAndPassword(auth, user, password)
    .then((userCredential) => {
      onSuccess(userCredential);
    })
    .catch((error) => {
      onFailure(error);
    });
};

export default signUp;

import firebase from "./config.firebase";

const signUp = ({ user, password, onSuccess, onFailure }) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(user, password)
    .then((userCredential) => {
      onSuccess(userCredential);
    })
    .catch((error) => {
      onFailure(error);
    });
};

export default signUp;

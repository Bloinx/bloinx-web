import firebase from "./config.firebase";

const login = ({ user, password, onSuccess, onFailure }) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(user, password)
    .then((userCredential) => {
      onSuccess(userCredential);
    })
    .catch((error) => {
      onFailure(error);
    });
};

export default login;

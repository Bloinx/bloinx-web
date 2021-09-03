import firebase from "./config.firebase";

const signUp = ({ user, password }) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(user, password)
    .then((userCredential) => {
      console.log(userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default signUp;

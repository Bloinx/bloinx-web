import { initializeApp } from "firebase/app";

const firebase = () =>
  initializeApp({
    apiKey: "AIzaSyBlSRkzY-9Xs0qWzagY0iUYAscZrX-jKZQ",
    authDomain: "bloinx-web.firebaseapp.com",
    projectId: "bloinx-web",
    storageBucket: "bloinx-web.appspot.com",
    messagingSenderId: "391807023044",
    appId: "1:391807023044:web:76def315f2363f64739691",
    measurementId: "G-NPZ6RM07QV",
  });

export default firebase;

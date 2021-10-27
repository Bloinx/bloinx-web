import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

const auth = getAuth();

const logout = () =>
  signOut(auth)
    .then(() => {
      useHistory("/login");
    })
    .catch((error) => {
      console.log(error);
    });

export default logout;

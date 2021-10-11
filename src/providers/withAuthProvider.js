/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "../api/config.firebase";

function WithAuthProvider(WrappedComponent) {
  const Auth = (props) => {
    const history = useHistory();

    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("SESION:::", user);
        } else {
          history.push("/logout");
        }
      });
    } catch (e) {
      history.push("/logout");
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
}

export default WithAuthProvider;

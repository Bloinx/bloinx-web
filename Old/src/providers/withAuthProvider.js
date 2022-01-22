import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import supabase from "../suprabase";

function WithAuthProvider(WrappedComponent) {
  const Auth = () => {
    const history = useHistory();

    useEffect(() => {
      const session = supabase.auth.session();
      if (!session || !session.access_token) {
        history.push("/logout");
      }
    }, []);

    return <WrappedComponent />;
  };

  return Auth;
}

export default WithAuthProvider;

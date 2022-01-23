import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

function WithAuthProvider(WrappedComponent) {
  const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const session = supabase.auth.session();
      if (!session || !session.access_token) {
        navigate("/logout");
      }
    }, []);

    return <WrappedComponent />;
  };

  return Auth;
}

export default WithAuthProvider;

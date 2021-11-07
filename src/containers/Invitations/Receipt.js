import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Receipt = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/dashboard");
    }, 3000);
  }, []);

  return <div>Ok</div>;
};

export default Receipt;

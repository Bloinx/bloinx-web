import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "./index.module.scss";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/login");
    }, 3000);
  });

  return <div className={styles.Logout}>Saliendo</div>;
};

export default Logout;

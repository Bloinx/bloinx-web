import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Status.module.scss";

const Status = () => {
  const navigate = useNavigate();
  const { status } = useParams();

  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  }, []);

  return (
    <div className={styles.Status}>
      {status === "success" && <p>Todo OK</p>}
      {status === "error" && <p>Error al registrar la ronda</p>}
    </div>
  );
};

export default Status;

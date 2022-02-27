import React, { useEffect } from "react";
// import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Status.module.scss";

const Status = () => {
  // const { t } = useTranslation();
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
      {status === "error" && <p>Error al generar la ronda</p>}
    </div>
  );
};

export default Status;

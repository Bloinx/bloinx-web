import { Button } from "@mui/material";
import React, { useEffect } from "react";
// import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Status.module.scss";

const Status = ({ handleNext, activeStep, steps }) => {
  // const { t } = useTranslation();
  /*   const navigate = useNavigate();
  const { status } = useParams(); */

  /*   useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  }, []); */

  return (
    <div className={styles.Status}>
      {/*  {status === "success" && <p>Todo OK</p>}
      {status === "error" && <p>Error al generar la ronda</p>} */}
      <h1>"Aqui va el Status"</h1>
      <Button variant="contained" color="primary" onClick={handleNext}>
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  );
};

export default Status;

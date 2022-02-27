import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Form from "./Form";
import styles from "./index.module.scss";
import logo from "../../assets/bloinxLogo.png";

function SignUp() {
  return (
    <div className={styles.SignUp}>
      <div className={styles.SignUpTitle}>
        <img src={logo} alt="Logo de bloinx" />
      </div>
      <div className={styles.SignUpCard}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          className={styles.SignUpText}
        >
          Registro
        </Typography>
        <div className={styles.SignUpContent}>
          <Form />
          <div className={styles.SignUpOptions}>
            <Typography
              variant="caption"
              component="p"
              className={styles.SignUpText}
            >
              También puedes
            </Typography>
            <Button variant="outlined" href="/login">
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SignUp);

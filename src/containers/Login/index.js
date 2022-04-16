import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Form from "./Form";
import styles from "./index.module.scss";
import logo from "../../assets/bloinxLogo.png";

function Login() {
  return (
    <div className={styles.Login}>
      <div className={styles.LoginTitle}>
        <img src={logo} alt="Logo de bloinx" />
      </div>
      <div className={styles.LoginCard}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          className={styles.LoginText}
        >
          Iniciar sesión
        </Typography>
        <div className={styles.LoginContent}>
          <Form />
          <div className={styles.LoginOptions}>
          
            <Typography
              variant="caption"
              component="p"
              className={styles.LoginText}
            >
              También puedes
            </Typography>
            <Button variant="outlined" href="/signup">
              Registrarme
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login);

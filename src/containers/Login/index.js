/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import apiLogin from "../../api/setLogin";

import logo from "../../assets/bloinxLogo.png";
import { validateEmail, validatePassword } from "./vlidators";
import styles from "./index.module.scss";
import saveUserAction from "./actions";

const errors = {
  "auth/user-not-found": "El usuario no existe.",
};

function Login({ saveUser }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    setLoading(true);
    apiLogin({
      user: email,
      password,
      onSuccess: (data) => {
        saveUser(data);
        setLoading(false);
        history.push("/dashboard");
      },
      onFailure: (er) => {
        console.log(er);
        setLoading(false);
        setError(true);
        setErrorMessage("El usuario o contraseña es incorrecto");
      },
    });
  };

  const handlePasswordChange = (e) => {
    const {
      target: { value },
    } = e;
    const validationpasswordError = validatePassword(value);
    setPasswordError(validationpasswordError !== null);
    setIsDisabled(validationpasswordError !== null);
    if (validationpasswordError) {
      setPasswordErrorMessage(validationpasswordError);
    }
    setPassword(value);
  };

  const handleEmailChange = (e) => {
    const {
      target: { value },
    } = e;
    const validationError = validateEmail(value);
    setEmailError(validationError !== null);
    setIsDisabled(validationError !== null);
    if (validationError) {
      setEmailErrorMessage(validationError);
    }
    setEmail(value);
  };

  useEffect(() => {
    if (email.length !== 0 && password.length !== 0) {
      isDisabled(true);
    }
  }, []);

  return (
    <div className={styles.Login}>
      <div className={styles.Login_Card}>
        <div className={styles.Login_Card_Content}>
          <div className={styles.Login_Card_Content_Header}>
            <img src={logo} alt="logo" className={styles.Login_Icon} />
            <span className={styles.Login_Title}>Iniciar sesión</span>
          </div>
          <div className={styles.Login_Card_Content_Form}>
            <span>Usuario</span>
            <input
              className={styles.Login_Input}
              name="user"
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
            />
            <span className={styles.error}>
              {emailError ? emailErrorMessage : ""}
            </span>
            <span>Contraseña</span>
            <input
              className={styles.Login_Input}
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            <span className={styles.error}>
              {passwordError ? passwordErrorMessage : ""}
            </span>
          </div>
          <div className={styles.Login_Card_Content_Actions}>
            <span className={styles.error}>{error ? errorMessage : ""}</span>
            <Button
              loading={loading}
              disabled={isDisabled}
              type="primary"
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </div>
        </div>
        <div className={styles.Login_Card_Options}>
          <div>Tambien puedes</div>
          <div>
            <Link to="/signup">Registrarme</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.defaultProps = {
  saveUser: () => {},
};

Login.propTypes = {
  saveUser: PropTypes.func,
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

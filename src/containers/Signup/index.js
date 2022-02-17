/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import apiSignUp from "../../api/setSignUp";

import logo from "../../assets/bloinxLogo.png";
import { validateEmail } from "../../utils/format";
import styles from "./index.module.scss";
import saveUserAction from "./actions";

function SignUp({ saveUser }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: null,
    password: null,
    repeatPassword: null,
  });

  const handleSignUp = () => {
    setLoading(true);
    apiSignUp({
      user: form.email,
      password: form.password,
      onSuccess: (data) => {
        saveUser(data);
        setLoading(false);
        history.push("/dashboard");
      },
      onFailure: (err) => {
        setLoading(false);
      },
    });
  };

  const handleOnChange = ({ target }) => {
    switch (target.name) {
      case "email":
        if (!validateEmail(target.value)) {
          setError({
            ...error,
            email: "Por favor ingresa un email valido",
          });
        } else {
          setError({
            ...error,
            email: null,
          });
        }
        break;
      case "password":
        if (target.value.length < 6) {
          setError({
            ...error,
            password: "Ingrese contraseña",
          });
        } else {
          setError({
            ...error,
            password: null,
          });
        }
        break;
      case "repeatPassword":
        if (form.password !== target.value) {
          setError({
            ...error,
            repeatPassword: "Las contraseñas no coinciden",
          });
        } else {
          setError({
            ...error,
            repeatPassword: null,
          });
        }
        break;
      default:
        break;
    }
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  return (
    <div className={styles.SignUp}>
      <div className={styles.SignUp_Card}>
        <div className={styles.SignUp_Card_Content}>
          <div className={styles.SignUp_Card_Content_Header}>
            <img src={logo} alt="logo" className={styles.SignUp_Icon} />
            <span className={styles.SignUp_Title}>Registro</span>
          </div>
          <div className={styles.SignUp_Card_Content_Form}>
            <span>Usuario</span>
            <input
              className={styles.SignUp_Input}
              name="email"
              type="email"
              onChange={handleOnChange}
              disabled={loading}
            />
            <span className={styles.error}>{error?.email}</span>

            <span>Contraseña</span>
            <input
              className={styles.SignUp_Input}
              name="password"
              type="password"
              onChange={handleOnChange}
              disabled={loading}
            />
            <span className={styles.error}>{error?.password}</span>

            <span>Repetir contraseña</span>
            <input
              className={styles.SignUp_Input}
              name="repeatPassword"
              type="password"
              onChange={handleOnChange}
              disabled={loading}
            />
            <span className={styles.error}>{error?.repeatPassword}</span>
          </div>
          <div className={styles.SignUp_Card_Content_Actions}>
            <span className={styles.error}>{error?.session}</span>
            <Button
              type="primary"
              loading={loading}
              disabled={
                loading ||
                !form.email ||
                !form.password ||
                !form.repeatPassword ||
                error.email ||
                error.password ||
                error.repeatPassword
              }
              onClick={handleSignUp}
            >
              Registrarme
            </Button>
          </div>
        </div>
        <div className={styles.SignUp_Card_Options}>
          <div>Tambien puedes</div>
          <div>
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

SignUp.defaultProps = {
  saveUser: () => {},
};

SignUp.propTypes = {
  saveUser: PropTypes.func,
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

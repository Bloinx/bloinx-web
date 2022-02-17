/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import apiLogin from "../../api/setLogin";

import logo from "../../assets/bloinxLogo.png";
import { validateEmail } from "../../utils/format";
import styles from "./index.module.scss";
import saveUserAction from "./actions";

const errors = {
  "auth/user-not-found": "El usuario no existe.",
};

function Login({ saveUser }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    user: null,
    password: null,
  });

  const handleLogin = () => {
    setLoading(true);
    apiLogin({
      user: form.user,
      password: form.password,
      onSuccess: (data) => {
        saveUser(data);
        setLoading(false);
        history.push("/dashboard");
      },
      onFailure: (er) => {
        console.log(er);
        setLoading(false);
        setError({ session: errors[er?.code] || null });
      },
    });
  };

  const handleOnChange = ({ target }) => {
    if (target.type === "email" && !validateEmail(target.value)) {
      setError({ ...error, email: "Por favor ingresa un email valido" });
    } else {
      setError({ ...error, email: null });
    }
    if (target.type === "password" && target.value.length < 6) {
      setError({ ...error, password: "Ingrese contraseña" });
    } else {
      setError({ ...error, password: null });
    }
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  console.log(!form.user, !form.password, error);

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
              onChange={handleOnChange}
              disabled={loading}
            />
            <span className={styles.error}>{error?.email}</span>
            <span>Contraseña</span>
            <input
              className={styles.Login_Input}
              name="password"
              type="password"
              onChange={handleOnChange}
              disabled={loading}
            />
            <span className={styles.error}>{error?.password}</span>
          </div>
          <div className={styles.Login_Card_Content_Actions}>
            <span className={styles.error}>{error?.session}</span>
            <Button
              loading={loading}
              disabled={
                !form.user ||
                !form.password ||
                error.email ||
                error.password ||
                error.session
              }
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

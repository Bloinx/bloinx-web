/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import apiLogin from "../../api/setLogin";

import logo from "../../assets/bloinxLogo.png";
import styles from "./index.module.scss";
import saveUserAction from "./actions";

function Login({ saveUser }) {
  const history = useHistory();
  const [login, setLoading] = useState(false);
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
      onFailure: () => {},
    });
  };

  const handleOnChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

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
            />
            <span>Contraseña</span>
            <input
              className={styles.Login_Input}
              name="password"
              type="password"
              onChange={handleOnChange}
            />
            {login && "Espere"}
          </div>
          <div className={styles.Login_Card_Content_Actions}>
            <Button type="primary" onClick={handleLogin}>
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

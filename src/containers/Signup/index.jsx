import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import apiSignUp from "../../api/setSignUp";

import logo from "../../assets/bloinxLogo.png";
import styles from "./index.module.scss";
import saveUserAction from "./actions";

function SignUp({ saveUser }) {
  const history = useHistory();
  const [signup, setLoading] = useState(false);
  const [form, setForm] = useState({
    user: null,
    password: null,
  });

  const handleSignUp = () => {
    setLoading(true);
    apiSignUp({
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
              name="user"
              type="email"
              onChange={handleOnChange}
            />
            <span>Contraseña</span>
            <input
              className={styles.SignUp_Input}
              name="password"
              type="password"
              onChange={handleOnChange}
            />
            <span>Repetir contraseña</span>
            <input
              className={styles.SignUp_Input}
              name="password"
              type="password"
              onChange={handleOnChange}
            />
            {signup && "Espere"}
          </div>
          <div className={styles.SignUp_Card_Content_Actions}>
            <Button type="primary" onClick={handleSignUp}>
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

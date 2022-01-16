/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Loader from "../../components/Loader";
import validations from "./validations";
import supabase from "../../suprabase";
import styles from "./Form.module.scss";

function Form() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSignUp = async ({ email, password }) => {
    setLoading(true);
    const data = await supabase.auth.signUp({
      email,
      password,
    });
    if (data.user) {
      history.push("/dashboard");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{ email: "", password: "", repeatPassword: "" }}
      validate={validations}
      onSubmit={handleSignUp}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            name="email"
            label="Correo electrónico"
            variant="outlined"
            value={values.email}
            error={errors.email && touched.email}
            onChange={handleChange}
            helperText={touched.email && errors.email}
            disabled={isSubmitting}
            margin="normal"
            className={styles.SignUpInput}
          />
          <TextField
            type="password"
            name="password"
            label="Contraseña"
            variant="outlined"
            value={values.password}
            error={errors.password && touched.password}
            onChange={handleChange}
            helperText={touched.password && errors.password}
            disabled={isSubmitting}
            margin="normal"
            className={styles.SignUpInput}
          />
          <TextField
            type="password"
            name="repeatPassword"
            label="Repetir contraseña"
            variant="outlined"
            value={values.repeatPassword}
            error={errors.repeatPassword && touched.repeatPassword}
            onChange={handleChange}
            helperText={touched.repeatPassword && errors.repeatPassword}
            disabled={isSubmitting}
            margin="normal"
            className={styles.SignUpInput}
          />
          <Button
            type="submit"
            variant="contained"
            className={styles.SignUpButton}
          >
            Registrarme
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default React.memo(Form);

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";

import Loader from "../../components/Loader";
import validations from "./validations";
import supabase from "../../supabase";
import styles from "./Form.module.scss";

function Form() {
  const [errorData, setErrorData] = useState({ status: false, data: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setErrorData({ status: false, data: null });

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (user) {
      navigate("/dashboard");
      setLoading(false);
    }
    if (error) {
      setErrorData({ status: true, data: error.message });
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Snackbar
        open={errorData.status}
        autoHideDuration={5000}
        onClose={handleClose}
        action={handleClose}
        severity="error"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert elevation={6} variant="filled" severity="error">
          {errorData.data}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validations}
        onSubmit={handleLogin}
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
              className={styles.LoginInput}
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
              className={styles.LoginInput}
            />
            <Button
              type="submit"
              variant="contained"
              className={styles.LoginInput}
            >
              Iniciar sesión
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default React.memo(Form);

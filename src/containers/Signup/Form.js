import React, { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Loader from "../../components/Loader";
import validations from "./validations";
import supabase from "../../supabase";
import styles from "./Form.module.scss";

function Form() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async ({ email, password, firstName, lastName }) => {
    setLoading(true);
    const data = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: {
          firstName,
          lastName,
        },
      }
    );
    if (data.user) {
      navigate("/dashboard");
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
            type="name"
            name="name"
            label="Nombre"
            variant="outlined"
            value={values.name}
            error={errors.name && touched.name}
            onChange={handleChange}
            helperText={touched.name && errors.name}
            disabled={isSubmitting}
            margin="normal"
            className={styles.SignUpInput}
          />
          <TextField
            type="lastName"
            name="lastName"
            label="Apellidos"
            variant="outlined"
            value={values.lastName}
            error={errors.lastName && touched.lastName}
            onChange={handleChange}
            helperText={touched.lastName && errors.lastName}
            disabled={isSubmitting}
            margin="normal"
            className={styles.SignUpInput}
          />
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

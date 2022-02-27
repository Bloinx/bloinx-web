import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Loader from '../../components/Loader';
import validations from './validations';
import supabase from '../../supabase';
import styles from './Form.module.scss';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

function Form() {
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSignUp = async ({
    email,
    password,
    firstName,
    lastName,
    birthDate,
    gender,
  }) => {
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
          birthDate,
          gender,
        },
      }
    );
    if (data.user) {
      navigate('/dashboard');
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
      initialValues={{
        email: '',
        password: '',
        repeatPassword: '',
      }}
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              sx={{ mb: 3 }}
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
            <DatePicker
              openTo="year"
              views={['year', 'month', 'day']}
              label="Fecha de nacimiento"
              value={birthDate}
              margin="normal"
              onChange={(newDate) => {
                setBirthDate(newDate);
              }}
              type="birthDate"
              name="birthDate"
              variant="outlined"
              error={errors.birthDate && touched.birthDate}
              disabled={isSubmitting}
              className={styles.SignUpInput}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  className={styles.SignUpInput}
                  helperText={touched.birthDate && errors.birthDate}
                />
              )}
            />
            <FormControl sx={{ mt: 3 }}>
              <InputLabel id="gender-label">Genero</InputLabel>
              <Select
                id="gender-select"
                type="gender"
                name="gender"
                label="Genero"
                variant="outlined"
                value={values.gender}
                error={errors.gender && touched.gender}
                onChange={handleChange}
                helperText={touched.gender && errors.gender}
                disabled={isSubmitting}
                className={styles.SignUpInput}
              >
                <MenuItem value={'female'}>Mujer</MenuItem>
                <MenuItem value={'male'}>Hombre</MenuItem>
                <MenuItem value={'other'}>Prefiero no decir</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              className={styles.SignUpButton}
            >
              Registrarme
            </Button>
          </LocalizationProvider>
        </form>
      )}
    </Formik>
  );
}

export default React.memo(Form);

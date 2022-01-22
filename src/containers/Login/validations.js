function validations(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Ingrese un email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El email ingresado no es valido.";
  }
  if (!values.password) {
    errors.password = "Ingrese una contraseña.";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i.test(
      values.password
    )
  ) {
    errors.password =
      "La contraseña debe tener una minuscula, una mayuscula y un caracter especial.";
  }
  return errors;
}

export default validations;

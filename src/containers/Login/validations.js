function validations(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Ingrese un email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El email ingresado no es valido.";
  }
 
}

export default validations;

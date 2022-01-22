export const confirmValidation = () => {
  return {};
};

export const receiptValidation = (values) => {
  const errors = {};
  if (!values.termsAndConditions) {
    errors.termsAndConditions = "Acepte los terminos y condiciones";
  }
  return errors;
};

/* eslint-disable import/prefer-default-export */

export const confirmForm = () => {
  const errors = {};
  return errors;
};

export const confirmValidation = (values) => {
  const errors = {};
  if (!values.name || values.name === "") {
    errors.name = "Ingresa un nombre para indentificar la ronda";
  }
  return errors;
};

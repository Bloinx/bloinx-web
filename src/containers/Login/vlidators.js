const isLength =
  (length) =>
  ({ value }) =>
    value && value.length !== length
      ? `Debe ser de ${length} caracteres`
      : null;
export const isLength5 = isLength(5);
export const isLength10 = isLength(10);
export const isLength15 = isLength(15);
export const isLength20 = isLength(20);

const maxLength =
  (max) =>
  ({ value }) =>
    value && value.length > max
      ? `Debe ser de ${max} caracteres o menos`
      : null;
export const maxLength6 = maxLength(5);
export const maxLength10 = maxLength(10);
export const maxLength15 = maxLength(15);
export const maxLength20 = maxLength(20);

const minLength =
  (min) =>
  ({ value }) =>
    value && value.length < min ? `Debe ser de ${min} caracteres o más` : null;
export const minLength5 = minLength(5);
export const minLength10 = minLength(10);

export const validatePassword = (value) =>
  value && value.length < 6 ? "Contraseña Incorrecta" : null;

export const number = (value) =>
  value && Number(value).isNaN ? "Debe ser un número" : null;

export const required = (value) => (value ? undefined : "Requerido");

export const alphanumeric = (value) =>
  /[^a-zA-Z0-9]/.test(value) ? "Debe ser alfanumérico" : null;

export const validateEmail = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Formato de correo invalido"
    : null;

export const decimal = (value) =>
  !/^\d*\.?\d*$/.test(value) ? "Debe ser una cantidad" : null;

export const greaterThanZero = (value) =>
  value <= 0 ? "Debe ser mayor a 0" : null;

export const noSpecialChars = (value) =>
  !/^[ 0-9A-Za-z._-]+$/.test(value)
    ? "No se permiten caracteres especiales"
    : null;

export const userNameEmail = (value) =>
  !/^[a-zA-Z0-9]+\.{0,1}[a-zA-Z0-9]+$/.test(value)
    ? "Formato de user name inválido"
    : null;

export const isDefaultImage = (url) => url.includes("wikipedia");

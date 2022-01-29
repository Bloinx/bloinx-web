export function validations(values) {
  const errors = {};
  if (!values.name || values.name === "") {
    errors.name = "Ingresa un nombre para indentificar la ronda";
  }
  if (!values.motive || values.motive === "") {
    errors.motive = "Ingresa un motivo para tu ronda";
  }
  return errors;
}

export function validationsApprove(values) {
  const errors = {};
  if (!values.approve) {
    errors.approve = "Acepta la verificación para continuar";
  }
  return errors;
}

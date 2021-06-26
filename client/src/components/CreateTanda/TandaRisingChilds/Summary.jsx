import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Summary = (props) => {
  const [isValidTurn, setValidTurn] = useState(false);
  if (props.currentStep !== 3) {
    return null;
  }
  const handlePass = (event) => {
    if (event.target.name === 'adminposition' && (event.target.value >= 1 && event.target.value <= props.data.participant)) {
      setValidTurn(true);
    } else {
      setValidTurn(false);
    }
    props.handleChange(event.target);
  };

  const handleNextStep = () => {
    let step = props.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    step += 1;
    props.stepMove(step);
  };

  const handlePrevStep = () => {
    let step = props.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    step = step <= 1 ? 1 : step - 1;
    props.stepMove(step);
  };
  return (
    <div className="GeneralData-container">
      <h4 className="GeneralData-title">Resumen</h4>
      <span className="GeneralData-subtitle">
        Por último, confirma que toda la información esté correcta y elige en que ronda recibirás tu tanda.
      </span>
      <Grid container>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">Administrador(a)</Grid>
        <Grid item xs={12} sm={6} className="Summary-Data">USERR</Grid>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">Nombre de tanda:</Grid>
        <Grid item xs={12} sm={6} className="Summary-Data">{props.data.name}</Grid>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">Estilo de tanda:</Grid>
        <Grid item xs={12} sm={6} className="Summary-Data">{props.data.type}</Grid>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">No. de Participantes</Grid>
        <Grid item xs={12} sm={6} className="Summary-Data">{props.data.participant}</Grid>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">Periodicidad</Grid>
        <Grid item xs={12} sm={6} className="Summary-Data">{props.data.longevity}</Grid>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">Monto por ronda:</Grid>
        <Grid item xs={12} sm={6} className="Summary-Data">{props.data.amount}</Grid>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">Fecha de inicio:</Grid>
        <Grid item xs={12} sm={6} className="Summary-Data">{props.data.date.toUTCString()}</Grid>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">Elige tu posición:</Grid>
        <Grid item xs={12} sm={6} className="Summary-Datalabel">
          <TextField
            style={{ width: '30%', height: 'auto' }}
            error={(props.data.adminposition <= 0 || props.data.adminposition > props.data.participant) && props.data.adminposition !== ''}
            helperText={
              (props.data.adminposition < 0 || props.data.adminposition > props.data.participant)
              && props.data.adminposition !== '' ? `Tu posición debe ser entre 1 y ${props.data.participant}`
                : ''
            }
            className="figmaInputStyles"
            id="outlined-error-helper-text"
            name="adminposition"
            variant="outlined"
            value={props.data.adminposition}
            onChange={handlePass}
            placeholder="Ej.1"
            type="number"
            min={1}
            max={props.data.participant}
            size="small"
          />
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        color="primary"
        disabled={
          !props.data.name
          || !props.data.date
          || !props.data.type
          || !props.data.participant
          || !props.data.longevity
          || !props.data.amount
          || !props.data.adminposition
          || !isValidTurn
        }
        onClick={handleNextStep}
      >
        Crear Tanda
      </Button>
      <Button
        color="secondary"
        onClick={handlePrevStep}
        style={{ margin: '2% 0' }}
        size="small"
      >
        Ve a Configuración
      </Button>
    </div>
  );
};
export default Summary;

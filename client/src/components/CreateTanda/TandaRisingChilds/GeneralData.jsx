import React from 'react';
import 'date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const GeneralData = (props) => {
  if (props.currentStep !== 1) {
    return null;
  }
  const handlePass = (event) => {
    if (event?.target) {
      props.handleChange(event.target);
    }
  };
  const handleDate = (value) => {
    const date = {
      name: 'date',
      value,
    };
    props.handleChange(date);
  };
  const handleNextStep = () => {
    if (props.data.name && props.data.date && props.data.type) {
      let step = props.currentStep;
      // eslint-disable-next-line no-plusplus
      step++;
      props.stepMove(step);
    }
  };
  const border = {
    border: 'solid 3px #17b65a',
  };

  return (
    <div className="GeneralData-container">
      <h4 className="GeneralData-title">Datos Generales</h4>
      <span className="GeneralData-subtitle">Son los datos que identificarán a tu tanda y le harán saber a los demás cuando empieza y si será con amigos o desconocidos</span>
      <label htmlFor="name" className="GeneralData-label">Nombre de Tanda*</label>
      <TextField
        className="figmaInputStyles"
        style={{ paddingLeft: '5%' }}
        name="name"
        value={props.data.name}
        onChange={handlePass}
        size="medium"
      />
      <label htmlFor="date" className="GeneralData-label">Fecha de Inicio*</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date"
          name="date"
          variant="outlined"
          disablePast
          label="Introduce la fecha"
          format="MM/dd/yyyy"
          value={props.data.date}
          onChange={handleDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <label htmlFor="type" className="GeneralData-label">Estilo de Tanda*</label>
      <div className="GeneralData-buttons">
        <Button
          variant="contained"
          id="private"
          name="type"
          value="Privada"
          size="small"
          style={props.data.type === 'Privada' ? border : null}
          onClick={handlePass}
        >
          Privada
        </Button>
        <Button
          variant="contained"
          id="public"
          name="type"
          value="Pública"
          style={props.data.type === 'Pública' ? border : null}
          size="small"
          onClick={handlePass}
        >
          Pública
        </Button>
      </div>
      <Button
        variant="outlined"
        color="primary"
        disabled={!props.data.name || !props.data.date || !props.data.type}
        onClick={handleNextStep}
      >
        Siguiente
      </Button>
    </div>
  );
};
export default GeneralData;

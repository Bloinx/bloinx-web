import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import EmojiPeople from '@material-ui/icons/EmojiPeople';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Configuration = (props) => {
  const [isValidAmount, setValidAmount] = useState(false);
  if (props.currentStep !== 2) {
    return null;
  }
  const periodicyList = [
    'Semanal',
    'Quincenal',
    'Mensual',
    'Bimestral',
  ];

  const handlePass = (event) => {
    if (event.target.name === 'amount' && event.target.value >= 100) {
      setValidAmount(true);
    } else {
      setValidAmount(false);
    }
    props.handleChange(event.target);
  };

  const handleSlider = (event, value) => {
    const participant = {
      name: 'participant',
      value,
    };
    props.handleChange(participant);
  };

  const handleNextStep = () => {
    let step = props.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    step = step >= 2 ? 3 : step + 1;
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
      <h4 className="GeneralData-title">Configuración</h4>
      <span className="GeneralData-subtitle">
        Personaliza tu tanda y piensa en las características que tu grupo de amigos tiene y el monto que quieren ahorrar por periodo.
      </span>
      <div className="GeneralData-group">
        <label htmlFor="participant" className="GeneralData-label">No. de Participantes*</label>
        <Grid container alignItems="center">
          <Grid item>
            <EmojiPeople />
          </Grid>
          <Grid item xs alignItems="center" style={{ display: 'flex', justifyContent: 'center' }}>
            <Slider
              id="participant"
              style={{ width: '75%' }}
              name="participant"
              defaultValue={3}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
              value={props.data.participant}
              onChange={handleSlider}
            />
          </Grid>
        </Grid>
        <label htmlFor="periodicy" className="GeneralData-label">Periodicidad*</label>
        <FormControl variant="outlined" size="small" className="figmaInputStyles">
          <Select
            native
            name="longevity"
            value={props.data.longevity}
            onChange={handlePass}
          >
            {
                periodicyList.map((period) => (
                  <option
                    value={period}
                    name="longevity"
                    key={period}
                  >
                    {period}
                  </option>
                ))
              }
          </Select>
        </FormControl>
        <label htmlFor="amount" className="GeneralData-label">Monto por periodo*</label>
        <TextField
          error={props.data.amount < 100 && props.data.amount !== ''}
          helperText={props.data.amount < 100 && props.data.amount !== '' ? 'Min 100 MXN' : ''}
          className="figmaInputStyles"
          id="outlined-error-helper-text"
          name="amount"
          variant="outlined"
          value={props.data.amount}
          onChange={handlePass}
          placeholder="$"
          label="$  MXN"
          type="number"
          min={100}
          size="small"
        />
      </div>
      <Button
        color="secondary"
        onClick={handlePrevStep}
        style={{ marginBottom: '2%' }}
        size="small"
      >
        Ve a Datos Generales
      </Button>
      <Button
        variant="outlined"
        color="primary"
        disabled={
          !props.data.participant
          || !props.data.longevity
          || !props.data.amount
          || !isValidAmount
        }
        onClick={handleNextStep}
      >
        Siguiente
      </Button>
    </div>
  );
};
export default Configuration;

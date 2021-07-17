import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function InputDatePicker({
  label, value, onChange, name,
}) {
  const prepareData = (arg) => onChange({
    target: {
      value: new Date(arg),
      name,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date"
        name={name}
        variant="outlined"
        orientation="landscape"
        disablePast
        label={label}
        format="dd MMMM yyyy"
        value={value}
        onChange={prepareData}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

InputDatePicker.defaultProps = {
  value: new Date(),
};

InputDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
};

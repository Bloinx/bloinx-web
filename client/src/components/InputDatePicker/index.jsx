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

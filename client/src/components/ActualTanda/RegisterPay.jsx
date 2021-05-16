import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import detectEthereumProvider from '@metamask/detect-provider';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RegisterPay = (props) => {
  const [turn, setTurn] = useState('1');
  const [account, setAccount] = useState('1');
  const [pagotardio, setPagoTardio] = React.useState({
    checkedA: true,
  });
  const turns = [
    '1',
    '2',
    '3',
    '4',
  ];
  useEffect(async () => {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({ method: 'eth_accounts' });
    setAccount(accounts[0]);
  }, [props.account]);
  // const handleChange = (event) => {
  //   setData({ ...data, [event.name]: event.value });
  // };

  // const handleStep = (step) => {
  //   setStep(step);
  // };

  const handlePass = (event) => {
    setTurn(event.target.value);
  };
  const handleSwitch = (event) => {
    setPagoTardio({ ...pagotardio, [event.target.name]: event.target.checked });
  };

  return (
    <Grid container justify="space-around" spacing={3}>
      <Grid item xs={4}>
        <div className="Register-pay-container">
          <h4 className="GeneralData-title">Cartera Digital</h4>
          <p className="GeneralData-subtitle">Tanda del LLOB</p>
          <p className="GeneralData-subtitle">Lucy Herrera</p>
          {
                account && account.startsWith('0x') ? (
                  <h4 className="mr-2">
                    {account}
                  </h4>
                ) : (
                  <h5 className="GeneralData-subtitle">Por favor ingresa tu wallet desde la barra de navegación</h5>
                )

          }
          <p className="GeneralData-subtitle">Registrar</p>
          <label htmlFor="periodicy" className="GeneralData-label">Turno</label>
          <FormControl size="medium" className="figmaInputStyles">
            <Select
              native
              name="longevity"
              value={turn}
              onChange={handlePass}
            >
              {
                turns.map((period) => (
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
          <Button
            style={{ marginTop: '5%' }}
            variant="outlined"
            color="primary"
            disabled={!account || !turn}
            // onClick={handleNextStep}
          >
            Registrar
          </Button>
        </div>
      </Grid>
      <Grid item xs={5}>
        <h2 className="GeneralData-title_white">Pago de Ronda</h2>
        <FormGroup>
          <FormControlLabel
            control={(
              <Switch
                checked={setPagoTardio.checkedA}
                onChange={handleSwitch}
                name="checkedA"
              />
            )}
            label="¿Pago Atrasado?"
            labelPlacement="top"
          />
        </FormGroup>
        <Grid container justify="center">
          <Grid item xs={10}>
            <hr className="divider-pay" />
          </Grid>
          <Grid item xs={10}>
            <Grid container justify="space-between">
              {
                pagotardio.checkedA ? (
                  <Grid item xs={12} sm={6} className="pay-Datalabel">Pago tardío:</Grid>
                ) : (
                  null
                )
              }
              {
                pagotardio.checkedA ? (
                  <Grid item xs={12} sm={6} className="pay-Data">$1000.00 MXN</Grid>
                ) : (
                  null
                )
              }
              <Grid item xs={12} sm={6} className="pay-Datalabel">Pago de garantía:</Grid>
              <Grid item xs={12} sm={6} className="pay-Data">$500.00 MXN</Grid>
              <Grid item xs={12} sm={6} className="pay-Datalabel">Pago de Ronda 1:</Grid>
              <Grid item xs={12} sm={6} className="pay-Data">$500.00 MXN</Grid>
              <Grid item xs={12} sm={6} className="pay-Datalabel">Comisión de Red:</Grid>
              <Grid item xs={12} sm={6} className="pay-Data">$5.00 MXN</Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <hr className="divider-pay" />
          </Grid>
          <Grid item xs={10}>
            <Grid container justify="space-between">
              <Grid item xs={6} className="pay-DataTotal">
                Total a cobrar
              </Grid>
              <Grid item xs={6} className="pay-DataTotal">
                { pagotardio.checkedA ? '$2,005.00MXN' : '$1,005.00MXN' }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
};
export default RegisterPay;

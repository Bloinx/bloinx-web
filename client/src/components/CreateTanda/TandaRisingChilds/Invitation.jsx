import axios from 'axios';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Summary = (props) => {
  if (props.currentStep !== 4) {
    return null;
  }
  const sendEmail = async () => {
    try {
      const userEmail = 'gho0thubun@gmail.com';
      const subject = 'Invitaasdasdasdas';
      // await axios.post(`${this.urlEndpoints}/sendEmail`, {
      await axios.post('http://localhost:5001/bloinxfunctions/us-central1/sendEmail', {
        personalizations: [
          {
            to: [
              {
                email: userEmail,
              },
            ],
            dynamic_template_data: {
              user: userEmail,
              title: subject,
              // link: linkToVerify.data,
              name: 'perroLoco',
              name_tanda: props.data.name,
              date: props.data.date,
              type: props.data.type,
              longevity: props.data.longevity,
              participant: props.data.participant - 1,
              amount: props.data.amount,
            },
            subject,
          },
        ],
      });
      // this.snackbar.show = true;
      // this.snackbar.text = 'Se te ha enviado un correo electrónico.';
      // this.snackbar.color = 'success';
    } catch {
      // this.snackbar.show = true;
      // this.snackbar.text = 'El mail no pudo ser enviado. Por favor intenta nuevamente.';
      // this.snackbar.color = 'error';
    }
  };

  return (
    <div className="GeneralData-container">
      <h4 className="GeneralData-title">Invitación</h4>
      <span className="GeneralData-subtitle">
        Compartela con la gente con la que quieres inciar este círculo de ahorro enviandoles un correo electrónico.
      </span>
      <Grid container justifyContent="center" alignItems="center">
        <Grid container justifyContent="center" alignItems="center" className="Summary-Datalabel">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<MailOutlineIcon />}
            onClick={sendEmail}
          >
            Email
          </Button>
        </Grid>
      </Grid>
      {/* <Button
        variant="outlined"
        color="primary"
        onClick={handleNextStep}
      >
        Crear Tanda
      </Button> */}
    </div>
  );
};
export default Summary;

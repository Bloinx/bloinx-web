import axios from 'axios';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Summary = (props) => {
  const [mailList, setMailList] = useState('');
  const [open, setOpen] = React.useState(false);

  if (props.currentStep !== 4) {
    return null;
  }
  const sendEmail = async () => {
    try {
      // const userEmail = ['gho0thubun@gmail.com', 'gho0thubun@hotmail.com'];
      const userEmail = mailList.trim().split(',');
      const subject = `Inviación a la tanda ${props.data.name}`;
      await userEmail.forEach((mail) => {
        axios.post('https://wtb2taazv8.execute-api.us-east-2.amazonaws.com/mandarMail/sendMail', {
          personalizations: [
            {
              to: [
                {
                  email: mail,
                },
              ],
              dynamic_template_data: {
                user: userEmail,
                title: subject,
                // link: linkToVerify.data,
                name: 'Bloinx Team',
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
      });
      await setOpen(true);
      await setMailList('');
    } catch (error) {
      console.log(error);
    }
  };
  const handleMail = (e) => {
    setMailList(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="GeneralData-container">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Se invitaron correctamente :)
        </Alert>
      </Snackbar>
      <h4 className="GeneralData-title">Invitación</h4>
      <span className="GeneralData-subtitle">
        Compartela con la gente con la que quieres inciar este círculo de ahorro enviandoles un correo electrónico.
      </span>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <h4>¡Invita a tus contactos!</h4>
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="figmaInputStyles"
            style={{ paddingLeft: '1%' }}
            name="name"
            type="email"
            value={mailList}
            onChange={handleMail}
            size="small"
          />
        </Grid>
        <Grid container alignItems="center" className="Summary-Datalabel">
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
    </div>
  );
};
export default Summary;

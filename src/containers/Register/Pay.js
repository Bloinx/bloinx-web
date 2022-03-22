import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import PageHeader from '../../components/PageHeader';
import styles from './Pay.module.scss';
import { setRegisterUser } from './utils';
import { Grid, Link } from '@mui/material';
import ButtonOnlyOneStep from '../../components/ButtonOnlyOneStep';

function Pay({ dataForm }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /*   const handleOnSubmit = async () => {
    setRegisterUser(dataForm)
      .then(() => {
        navigate(`/register/${dataForm.roundData.id}/status/success`);
      })
      .catch(() => {
        navigate(`/register/${dataForm.roundData.id}/status/error`);
      });
  }; */

  return (
    <>
      <PageHeader title={t('stepper.title.pay')} />
      <div className={styles.PayCard}>
        <div>
          <Typography variant="subtitle1" component="h1">
            {t('resume.title')}
          </Typography>
          <Typography variant="subtitle1" component="p">
            <Link onClick={() => navigate('/register/')}>Editar</Link>
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" component="p">
            {t('createRound.form.label.name')}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {/* {dataForm.form.name} */}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" component="p">
            {t('resume.motivation')}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {/* {dataForm.form.motive} */}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" component="p">
            {t('resume.turn')}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {/* {dataForm.form.position} */}
          </Typography>
        </div>
      </div>
      <div className={styles.PayCard}>
        <Typography variant="subtitle2" component="p">
          {t('payments.details.title')}
        </Typography>
        <div>
          <Typography variant="subtitle2" component="p">
            {t('payments.details.securityDeposit')}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {/* {dataForm.roundData.cashIn} */} cUSD
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" component="p">
            {t('payments.details.serviceFee')}
          </Typography>
          <Typography variant="subtitle2" component="p">
            {/* {dataForm.roundData.feeCost} */} cUSD
          </Typography>
        </div>
      </div>
      <Grid container rowSpacing={1} justifyContent={'center'}>
        <Grid item>
          <ButtonOnlyOneStep
            label={t('createRound.actions.pay')}
            /* onClick={handlerOnSubmit} */
          />
        </Grid>
      </Grid>
    </>
  );
}

export default React.memo(Pay);

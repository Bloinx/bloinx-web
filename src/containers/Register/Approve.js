import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

import PageHeader from '../../components/PageHeader';
import Checkbox from '../../components/Checkbox';

import styles from './Approve.module.scss';
import { validationsApprove } from './validations';
import { setRegisterUserStable } from './utils';
import { Grid } from '@mui/material';
import ButtonOnlyOneStep from '../../components/ButtonOnlyOneStep';

function Approve({ dataForm, setDataForm }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlerOnSubmit = (data) => {
    setRegisterUserStable({ contract: dataForm.roundData.contract })
      .then((approvalData) => {
        setDataForm({
          ...dataForm,
          form: { ...dataForm.form, ...data },
          approvalData,
        });
        navigate(`/register/${dataForm.roundData.id}/pay`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={{
        approve: false,
      }}
      validate={validationsApprove}
      onSubmit={handlerOnSubmit}
    >
      {(props) => {
        const { values, errors, handleChange, touched, handleSubmit } = props;

        return (
          <form onSubmit={handleSubmit}>
            <PageHeader title={t('stepper.title.approve')} />
            <div className={styles.ApproveCard}>
              <Typography variant="body1" component="p">
                {t('infoLabels.securityDeposit')}
              </Typography>
              <ol>
                <Typography variant="body1" component="li" mb={2}>
                  {t('infoLabels.paymentInfo')}
                </Typography>
                <Typography variant="body1" component="li">
                  {t('infoLabels.paymentRefound')}
                </Typography>
              </ol>
              <Checkbox
                name="approve"
                onChange={handleChange}
                label={t('createRound.labels.terms')}
                error={touched.approve && errors.approve}
                helperText={touched.approve && errors.approve}
                checked={values.approve}
              />
            </div>
            <Grid container rowSpacing={1} justifyContent={'center'}>
              <Grid item>
                <ButtonOnlyOneStep
                  label={t('stepper.actions.approve')}
                  onClick={handlerOnSubmit}
                />
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
}

export default React.memo(Approve);

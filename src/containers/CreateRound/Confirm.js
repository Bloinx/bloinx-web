import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ButtonOnlyOneStep from '../../components/ButtonOnlyOneStep';
import Loader from '../../components/Loader';

import styles from './Receipt.module.scss';
import { WEEKLY, BIWEEKLY, MONTHLY } from './constants';
import setCreateRound from './utils';
import { Card, Grid, IconButton, Link, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Confirm = ({ formData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const periodicityOptions = {
    [WEEKLY]: 'createRound.form.label.periodicityOptions.weekly',
    [BIWEEKLY]: 'createRound.form.label.periodicityOptions.biweekly',
    [MONTHLY]: 'createRound.form.label.periodicityOptions.monthly',
  };

  const paymentTime = {
    [WEEKLY]: 7,
    [BIWEEKLY]: 14,
    [MONTHLY]: 30,
  };

  const handlerOnSubmit = () => {
    const currentWallet = localStorage.getItem('currentWallet');
    if (currentWallet) {
      setLoading(true);
      setCreateRound({
        warranty: formData.amount,
        saving: formData.amount,
        groupSize: formData.participants,
        payTime: paymentTime[formData.periodicity],
        isPublic: false,
        walletAddress: currentWallet,
      })
        .then(() => {
          setLoading(false);
          navigate('/create-round/status/success');
        })
        .catch((err) => {
          setLoading(false);
          navigate('/create-round/status/error');
        });
    }
  };

  return (
    <>
      <div></div>
      {loading && <Loader />}
      {!loading && (
        <>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt={2}
          >
            <Grid item xs={1} md={1}>
              <IconButton>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>
            <Grid item xs={11} md={11}>
              <Typography variant="h5" component="h1">
                {t('createRound.title')}
              </Typography>
            </Grid>
          </Grid>
          <Card className={styles.ReceiptCard}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justifyContent={'space-between'}
              alignContent={'center'}
            >
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItem}
                  variant="h6"
                  component="h1"
                >
                  {t('createRound.subtitleConfirm')}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} className={styles.ReceiptCardItemRight}>
                <Link onClick={() => navigate('/create-round/')}>Editar</Link>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItem}
                  variant="subtitle2"
                  component="p"
                >
                  {t('createRound.form.label.participants')}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItemRight}
                  variant="subtitle2"
                  component="p"
                >
                  {formData.participants}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItem}
                  variant="subtitle2"
                  component="p"
                >
                  {t('createRound.labels.amount')}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItemRight}
                  variant="subtitle2"
                  component="p"
                >
                  {`$ ${formData.amount} cUSD`}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItem}
                  variant="subtitle2"
                  component="p"
                >
                  {t('createRound.labels.receiptAmount')}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItemRight}
                  variant="subtitle2"
                  component="p"
                >
                  {`$ ${formData.amount * (formData.participants - 1)} cUSD`}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItem}
                  variant="subtitle2"
                  component="p"
                >
                  {t('createRound.labels.roundTime')}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography
                  className={styles.ReceiptCardItemRight}
                  variant="subtitle2"
                  component="p"
                >
                  {t(periodicityOptions[formData.periodicity])}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Grid
            container
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Grid item>
              <ButtonOnlyOneStep
                loading={loading}
                label={t('createRound.actions.payGuarantee')}
                onClick={handlerOnSubmit}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

Confirm.propTypes = {
  formData: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(Confirm);

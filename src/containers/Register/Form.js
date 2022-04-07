import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import PageHeader from '../../components/PageHeader';
import TextField from '../../components/TextField';
import Select from '../../components/Select';
import InputParticipantSelect from '../../components/InputParticipantSelect/InputParticipantSelect';

import { validations } from './validations';
import { getRegisterDetail } from './utils';
import { Grid, IconButton, Typography } from '@mui/material';
import { ArrowBackIosOutlined } from '@mui/icons-material';
import ButtonOnlyOneStep from '../../components/ButtonOnlyOneStep';

function Form({ setDataForm }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { roundID } = useParams();
  const [roundData, setRoundData] = useState({});

  const getRoundData = async () => {
    getRegisterDetail(roundID)
      .then((data) => setRoundData(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const handlerOnSubmit = (data) => {
    setDataForm({ form: data, roundData });
    navigate('/approve');
  };

  useEffect(() => {
    getRoundData();
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        motive: '',
        position: 1,
      }}
      validate={validations}
      onSubmit={handlerOnSubmit}
    >
      {(props) => {
        const { values, errors, handleChange, touched, handleSubmit, isValid } =
          props;

        return (
          <form onSubmit={handleSubmit}>
            <PageHeader title={t('createRound.titleConfirm')} />
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="name"
              size="small"
              label={t('createRound.form.label.name')}
              value={values.name}
              onChange={handleChange}
              error={touched.name && errors.name}
              helperText={touched.name && errors.name}
            />

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="motive"
              onChange={handleChange}
              value={values.motive}
              fullWidth
              size="small"
              label={t('createRound.form.label.motivation')}
              error={touched.motive && errors.motive}
              helperText={touched.motive && errors.motive}
            >
              <MenuItem value="debts">Deudas</MenuItem>
              <MenuItem value="gifts">Regalos</MenuItem>
              <MenuItem value="entertainment">Entretenimiento</MenuItem>
              <MenuItem value="health">Salud</MenuItem>
              <MenuItem value="car/home">Auto/Casa</MenuItem>
              <MenuItem value="business">Negocio</MenuItem>
              <MenuItem value="education">Educación</MenuItem>
            </Select>
            <InputParticipantSelect
              label={t('createRound.form.label.turn')}
              name="position"
              onChange={handleChange}
              value={values.position}
              options={
                roundData.positionsAvailable?.map((available) => ({
                  label: available.position,
                  value: available.position,
                })) || []
              }
              error={errors.participants}
            />
            <Grid container rowSpacing={1} justifyContent={'center'}>
              <Grid item>
                <ButtonOnlyOneStep
                  label={t('createRound.actions.continue')}
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

export default React.memo(Form);

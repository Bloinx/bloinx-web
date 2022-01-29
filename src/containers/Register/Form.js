import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import PageHeader from "../../components/PageHeader";
import TextField from "../../components/TextField";
import Select from "../../components/Select";
import InputOptionSelect from "../../components/InputOptionSelect";

import { validations } from "./validations";
import { getRegisterDetail } from "./utils";

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
    navigate(`/register/${roundID}/approve`);
  };

  useEffect(() => {
    getRoundData();
  }, []);

  return (
    <Formik
      initialValues={{
        name: "",
        motive: "",
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
            <PageHeader title={t("createRound.title")} />
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="name"
              size="small"
              label="Nombre de la ronda"
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
              label="Motivo de la ronda"
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

            <InputOptionSelect
              label={t("createRound.form.label.participants")}
              name="position"
              onChange={handleChange}
              value={values.position}
              options={
                roundData.positionsAvailable?.map((available) => ({
                  label: available.position,
                  value: available.position,
                })) || []
              }
            />

            <Button variant="outlined" type="submit">
              Continuar
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}

export default React.memo(Form);

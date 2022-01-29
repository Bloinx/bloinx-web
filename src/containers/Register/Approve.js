import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import PageHeader from "../../components/PageHeader";
import Checkbox from "../../components/Checkbox";

import styles from "./Approve.module.scss";
import { validationsApprove } from "./validations";
import { setRegisterUserStable } from "./utils";

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
            <PageHeader title={t("createRound.title")} />
            <div className={styles.ApproveCard}>
              <Typography variant="body1" component="p">
                ¿Qué es el depósito de seguridad?
              </Typography>
              <ul>
                <Typography variant="body1" component="li">
                  Este pago se devolverá al terminar la rosca y se utilizará en
                  caso de que pierda uno de sus pagos comprometidos.
                </Typography>
                <Typography variant="body1" component="li">
                  Si omite más de un pago, puede afectar la devolución del
                  depósito de seguridad de otros participantes en su grupo.
                </Typography>
              </ul>
              <Checkbox
                name="approve"
                onChange={handleChange}
                label="Entiendo cómo funciona el depósito"
                error={touched.approve && errors.approve}
                helperText={touched.approve && errors.approve}
                checked={values.approve}
              />
            </div>
            <Button variant="contained" type="submit">
              Aprobar
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}

export default React.memo(Approve);

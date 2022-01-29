import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import PageHeader from "../../components/PageHeader";
import styles from "./Pay.module.scss";
import { setRegisterUser } from "./utils";

function Pay({ dataForm }) {
  const { t } = useTranslation();

  const handleOnSubmit = async () => {
    setRegisterUser(dataForm)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PageHeader title={t("createRound.title")} />
      <div className={styles.PayCard}>
        <div>
          <Typography variant="body1" component="p">
            Detalles ronda
          </Typography>
          <Typography variant="body1" component="p">
            Editar
          </Typography>
        </div>
        <div>
          <Typography variant="body1" component="p">
            Nombre de la ronda
          </Typography>
          <Typography variant="body1" component="p">
            {dataForm.form.name}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" component="p">
            Motivo de la ronda
          </Typography>
          <Typography variant="body1" component="p">
            {dataForm.form.motive}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" component="p">
            Turno para recibir
          </Typography>
          <Typography variant="body1" component="p">
            {dataForm.form.position}
          </Typography>
        </div>
      </div>
      <div className={styles.PayCard}>
        <Typography variant="body1" component="p">
          Detalles de pago
        </Typography>
        <div>
          <Typography variant="body1" component="p">
            Déposito de seguridad
          </Typography>
          <Typography variant="body1" component="p">
            {dataForm.roundData.cashIn} sUSD
          </Typography>
        </div>
        <div>
          <Typography variant="body1" component="p">
            Tarifa de servicio
          </Typography>
          <Typography variant="body1" component="p">
            {dataForm.roundData.feeCost} sUSD
          </Typography>
        </div>
      </div>
      <Button variant="contained" onClick={handleOnSubmit}>
        Pagar
      </Button>
    </>
  );
}

export default React.memo(Pay);

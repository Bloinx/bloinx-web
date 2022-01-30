import React from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import styles from "./RoundCard.module.scss";

function RoundCard() {
  return (
    <div className={styles.RoundCard}>
      <Typography
        variant="h5"
        component="div"
        className={styles.RoundCardTitle}
      >
        Turno
      </Typography>
      <div>
        <Typography variant="caption" component="div">
          A pagar
        </Typography>
        <Typography variant="subtitle1" component="div">
          $0 cUSD
        </Typography>
      </div>
      <div className={styles.RoundCardInfo}>
        <div>
          <Typography variant="caption" component="div">
            Estatus pago
          </Typography>
          <Typography variant="subtitle1" component="div">
            Pagado
          </Typography>
        </div>
        <div>
          <Typography variant="caption" component="div">
            Tiempo restante
          </Typography>
          <Typography variant="subtitle1" component="div">
            1 Semana
          </Typography>
        </div>
      </div>
      <div className={styles.RoundCardBar}>
        <i>3 de 5 participantes</i>
        <Typography variant="caption" component="p">
          Total de pagos del turno actual
        </Typography>
        <LinearProgress variant="determinate" value={0} />
      </div>
      <div className={styles.RoundCardInfo}>
        <div>
          <Typography variant="caption" component="div">
            Recibe
          </Typography>
          <Typography variant="subtitle1" component="div">
            Gabriela G
          </Typography>
        </div>
        <div>
          <Typography variant="caption" component="div">
            Monto
          </Typography>
          <Typography variant="subtitle1" component="div">
            $50 cUSD
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default React.memo(RoundCard);

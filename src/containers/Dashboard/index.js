import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import withAuthProvider from "../../providers/withAuthProvider";
import Notification from "./Notification";
import Markup from "../Markup";
import RoundsList from "./RoundsList";
import RegisterList from "./RegisterList";
import WalletList from "./WalletList";
import styles from "./index.module.scss";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Markup>
        <Notification />
        <Button className={styles.createRound} variant="contained" onClick={() => navigate("/create-round")}>
          Crear una ronda
        </Button>

        <Typography variant="h5" component="p">
          Mis Rondas Activas
        </Typography>
        <RoundsList />
        <br/>
        <Typography variant="h5" component="p">
          Mis Registros pendientes
        </Typography>
        <RegisterList />
        <br/>
        <Typography variant="h5" component="p">
          Mis Billetera Digital
        </Typography>
        <WalletList />
    </Markup>
  );
}

export default React.memo(withAuthProvider(Dashboard));
//export default React.memo(Dashboard);

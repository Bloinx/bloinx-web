import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { getRoundsList } from "./utils";
import styles from "./DataList.module.scss";

function RegisterList() {
  const navigate = useNavigate();

  const [RegisterList, setRegisterList] = useState([]);

  const getRegister = () => {
    getRoundsList()
      .then((data) => {
        console.log(data);
        setRegisterList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRegister();
  }, []);

  return (
    <Card variant="outlined" className={styles.DataBorder}>
      <div className={styles.DataList}>
        <div className={styles.DataListHead}>
          <div className={styles.DataListHeader}>Nombre de Ronda</div>
          <div className={styles.DataListHeader}>Creada por:</div>
        </div>
        {RegisterList.map((round) => (
          <div key={round.contract} className={styles.DataListRow}>
            <div className={styles.DataListItem}>
              {round.isAdmin && !round.isRegistered && "Nueva ronda vacia"}
              {round.isAdmin && round.isRegistered && round.positions[0]?.name}
            </div>
            <div className={styles.DataListItem}>
              {round.isAdmin && !round.isRegistered && "Personaliza"}
              {round.isAdmin && round.isRegistered && "En espera de iniciar"}
              <IconButton
                onClick={
                  !round.isRegistered
                    ? () => navigate(`/register/${round.id}`)
                    : () => navigate(`/round-detail/${round.id}`)
                }
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default React.memo(RegisterList);

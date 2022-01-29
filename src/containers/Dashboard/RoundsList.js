import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { getRoundsList } from "./utils";
import styles from "./RoundsList.module.scss";

function RoundsList() {
  const navigate = useNavigate();

  const [roundsList, setRoundsList] = useState([]);

  const getRounds = () => {
    getRoundsList()
      .then((data) => {
        console.log(">>>", data);
        setRoundsList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRounds();
  }, []);

  return (
    <Card variant="outlined">
      <div className={styles.RoundsList}>
        <div className={styles.RoundsListHead}>
          <div className={styles.RoundsListHeader}>asdsad</div>
          <div className={styles.RoundsListHeader}>asdsad</div>
        </div>
        {roundsList.map((round) => (
          <div key={round.contract} className={styles.RoundsListRow}>
            <div className={styles.RoundsListItem}>
              {round.isAdmin && !round.isRegistered && "Nueva ronda vacia"}
            </div>
            <div className={styles.RoundsListItem}>
              {round.isAdmin && !round.isRegistered && "Personaliza"}
              <IconButton onClick={() => navigate(`/register/${round.id}`)}>
                <ChevronRightIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default React.memo(RoundsList);

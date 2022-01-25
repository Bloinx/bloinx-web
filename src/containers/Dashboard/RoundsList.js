import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";

import { getRoundsList } from "./utils";
import styles from "./RoundsList.module.scss";

function RoundsList() {
  const [roundsList, setRoundsList] = useState([]);

  const getRounds = async () => {
    const data = await getRoundsList();
    setRoundsList(data);
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
          <div className={styles.RoundsListRow}>
            <div className={styles.RoundsListItem}>{round.contract}</div>
            <div className={styles.RoundsListItem}>{round.createTime}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default React.memo(RoundsList);

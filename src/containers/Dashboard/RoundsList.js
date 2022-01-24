import React, { useEffect } from "react";
import Card from "@mui/material/Card";

import supabase from "../../supabase";
import styles from "./RoundsList.module.scss";

function RoundsList() {
  const getRounds = async () => {
    const user = supabase.auth.user();
    console.log(user);
    const { data, error } = await supabase.from("round").select();
    console.log(data, error);
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
        <div className={styles.RoundsListRow}>
          <div className={styles.RoundsListItem}>asdasd</div>
          <div className={styles.RoundsListItem}>asdasd</div>
        </div>
        <div className={styles.RoundsListRow}>
          <div className={styles.RoundsListItem}>asdasd</div>
          <div className={styles.RoundsListItem}>asdasd</div>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(RoundsList);

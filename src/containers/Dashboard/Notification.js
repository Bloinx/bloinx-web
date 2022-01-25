import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import styles from "./Notification.module.scss";

function Notification() {
  return (
    <div className={styles.Notification}>
      <Typography variant="body1" component="p">
        h1. Heading <Link href="#">Link</Link>
      </Typography>
      <Typography variant="body1" component="p">
        h1. Heading
      </Typography>
    </div>
  );
}

export default React.memo(Notification);

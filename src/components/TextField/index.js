import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import styles from "./index.module.scss";

function TextFieldInput({ label, ...other }) {
  return (
    <div className={styles.TextFieldInput}>
      <Typography variant="body1" component="label">
        {label}
      </Typography>
      <TextField {...other} />
    </div>
  );
}

export default React.memo(TextFieldInput);

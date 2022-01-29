import React from "react";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

import styles from "./index.module.scss";

function SelectInput({ label, children, error, helperText, ...other }) {
  return (
    <div className={styles.SelectInput}>
      <Typography variant="body1" component="label">
        {label}
      </Typography>
      <Select error={error} {...other}>
        {children}
      </Select>
      {error && (
        <FormHelperText className={styles.SelectInputError}>
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}

export default React.memo(SelectInput);

import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

import styles from "./index.module.scss";

function CheckboxInput({ error, helperText, checked, ...other }) {
  return (
    <>
      <FormControlLabel {...other} control={<Checkbox checked={checked} />} />
      {error && (
        <FormHelperText className={styles.CheckboxInputError}>
          {helperText}
        </FormHelperText>
      )}
    </>
  );
}
export default React.memo(CheckboxInput);

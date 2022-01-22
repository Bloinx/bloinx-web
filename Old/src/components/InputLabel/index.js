import React from "react";
import PropTypes from "prop-types";

import styles from "./index.module.scss";

export default function InputLabel({ value, label }) {
  const stageLabels = {
    ON_REGISTER_STAGE: "Registro",
    ON_ROUND_ACTIVE: "En Progreso",
    ON_ROUND_FINISHED: "Finalizada",
  };

  return (
    <div className={styles.InputLabel}>
      <div className={styles.InputLabelLabel}>{label}</div>
      <div className={styles.InputLabelValue}>
        {!stageLabels[value] ? value : stageLabels[value]}
      </div>
    </div>
  );
}

InputLabel.defaultProps = {
  value: null,
  label: "",
};

InputLabel.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
};

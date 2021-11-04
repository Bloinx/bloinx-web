import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

import styles from "./RoundCardNew.module.scss";

export default function RoundCardNew({ stage, onClick }) {
  return (
    <div className={styles.RoundCardNew}>
      <p className={styles.RoundCardNewText}>
        Start your saving circle with your friends or family now.
      </p>
      <p className={styles.RoundCardNewText}>Start connecting your wallet.</p>
      <p className={styles.RoundCardNewText}>
        {stage === "ON_REGISTER_STAGE"
          ? "Tanda en espera de ser inciada"
          : null}
      </p>
      <div className={styles.RoundCardNewOptions}>
        <Button type="primary" onClick={onClick}>
          Unirme a la ronda
        </Button>
      </div>
    </div>
  );
}

RoundCardNew.defaultProps = {
  stage: undefined,
};

RoundCardNew.propTypes = {
  stage: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

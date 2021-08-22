import React from "react";
import PropTypes from "prop-types";
import { Button, Typography } from "antd";

import styles from "./RoundCardNew.module.scss";

const { Title, Paragraph } = Typography;

export default function RoundCardNew({ stage, onClick }) {
  return (
    <div className={styles.RoundCardNew}>
      <Title level={4} className={styles.RoundCardNewTitle}>
        Add new rosca
      </Title>
      <Paragraph className={styles.RoundCardNewText}>
        Start your saving circle with your friends or family now.
      </Paragraph>
      <Paragraph className={styles.RoundCardNewText}>
        Start connecting your wallet.
      </Paragraph>
      <Paragraph className={styles.RoundCardNewText}>{stage}</Paragraph>
      <div className={styles.RoundCardNewOptions}>
        <Button type="primary" onClick={onClick}>
          Unirme a la ronda
        </Button>
      </div>
    </div>
  );
}

RoundCardNew.defaultProps = {
  stage: "",
};

RoundCardNew.propTypes = {
  stage: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

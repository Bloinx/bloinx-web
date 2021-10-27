import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Link } from "react-router-dom";

import styles from "./RoundCard.module.scss";
import Stepper from "../../components/Stepper";
import { formatAddress } from "../../utils/format";

export default function RoundCard({
  name,
  description,
  contractKey,
  groupSize,
  turn,
  linkTo,
  onClick,
  buttonText,
  positionToWithdrawPay,
  loading,
  buttonDisabled,
}) {
  const handleGetSteps = () => {
    const indents = [];
    for (let i = 1; i <= groupSize; i += 1) {
      indents.push({ turn: i });
    }
    return indents;
  };

  return (
    <div className={styles.RoundCard}>
      <Link to={linkTo}>
        <div className={styles.RoundCardHeader}>
          <div className={styles.RoundCardTitle}>{name}</div>
          <div className={styles.RoundCardKeys}>
            {formatAddress(contractKey)}
          </div>
        </div>
        <Stepper
          current={turn}
          steps={handleGetSteps()}
          turnWithDraw={positionToWithdrawPay}
        />
        <div className={styles.RoundCardDescription}>{description}</div>
      </Link>
      <div className={styles.RoundCardFooter}>
        <div className={styles.RoundCardTitleFooter}>{`Ronda ${turn}`}</div>
        <Button
          loading={loading}
          className={styles.RoundCardAction}
          type="primary"
          disabled={loading || buttonDisabled}
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

RoundCard.defaultProps = {
  name: undefined,
  description: undefined,
  linkTo: "",
  buttonText: undefined,
  onClick: undefined,
  positionToWithdrawPay: 0,
  loading: false,
  buttonDisabled: false,
};

RoundCard.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  contractKey: PropTypes.string.isRequired,
  groupSize: PropTypes.number.isRequired,
  turn: PropTypes.number.isRequired,
  linkTo: PropTypes.string,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  positionToWithdrawPay: PropTypes.number,
  loading: PropTypes.bool,
  buttonDisabled: PropTypes.bool,
};

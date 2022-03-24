/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { CubeSpinner } from "react-spinners-kit";

import styles from "./RoundCard.module.scss";
import Stepper from "../../components/Stepper";
import { formatAddress } from "../../utils/format";
import logoIcon from "../../assets/icon.png";

export function RoundCard({
  name,
  contractKey,
  groupSize,
  missingPositions,
  turn,
  linkTo,
  onClick,
  buttonText,
  positionToWithdrawPay,
  loading,
  buttonDisabled,
  withdraw,
  onWithdraw,
  stage,
  saveAmount,
}) {
  const handleGetSteps = () => {
    const indents = [];
    for (let i = 1; i <= groupSize; i += 1) {
      indents.push({ label: i });
    }
    return indents;
  };

  const arePending = missingPositions > 0;

  return (
    <div className={styles.RoundCard}>
      <div className={styles.RoundCardHeader}>
        <div className={styles.RoundCardHeaderImage}>
          <img src={logoIcon} alt="logo" />
        </div>
        <div>
          <Link to={linkTo} className={styles.RoundCardTitle}>
            <div className={styles.RoundCardTitleTitle}>{name}</div>
            <div className={styles.RoundCardTitleIcon}>
              <RightOutlined />
            </div>
          </Link>
          <div className={styles.RoundCardSubject}>
            Creado por {formatAddress(contractKey)}
          </div>
          <div className={styles.RoundCardSubject}>
            Podran iniciarla cuando todos los participantes se hayan unido
          </div>
        </div>
      </div>
      <div className={styles.RoundCardSeparation}>
        <Stepper
          current={turn}
          steps={handleGetSteps()}
          turnWithDraw={positionToWithdrawPay}
        />
      </div>
      {arePending && (
        <p>
          Necesitas invitar a {missingPositions} amigos para para poder inciar
          la ronda
        </p>
      )}
      <div className={styles.RoundCardFooter}>
        <div className={styles.RoundCardTitleFooter}>
          {arePending &&
            `${groupSize - missingPositions} de ${groupSize} unidos`}
          {!arePending &&
            missingPositions === 0 &&
            stage !== "ON_ROUND_ACTIVE" &&
            "Esperando iniciar..."}
          {!arePending &&
            missingPositions === 0 &&
            stage === "ON_ROUND_ACTIVE" &&
            `Turno ${turn}`}
          <div style={{ display: "block" }}>
            {!arePending &&
              missingPositions === 0 &&
              stage === "ON_ROUND_ACTIVE" &&
              `$ ${saveAmount} cUSD a pagar`}
          </div>
        </div>
        <div>
          {loading && (
            <div className={styles.RoundCardLoader}>
              <CubeSpinner frontColor="#F58F98" size={20} />
              <span>Espere...</span>
            </div>
          )}
          {!loading && (
            <>
              <Button
                className={styles.RoundCardAction}
                ghost={buttonText !== "Pagar"}
                type="primary"
                disabled={buttonDisabled}
                onClick={onClick}
              >
                {buttonText}
              </Button>
              {!arePending && (
                <Button
                  className={styles.RoundCardAction}
                  type="primary"
                  disabled={!withdraw}
                  onClick={onWithdraw}
                >
                  Cobrar
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

RoundCard.defaultProps = {
  name: undefined,
  linkTo: "",
  buttonText: undefined,
  onClick: undefined,
  positionToWithdrawPay: 0,
  loading: false,
  buttonDisabled: false,
  missingPositions: undefined,
  withdraw: undefined,
  onWithdraw: undefined,
  stage: "",
  saveAmount: "",
};

RoundCard.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  contractKey: PropTypes.string.isRequired,
  groupSize: PropTypes.number.isRequired,
  turn: PropTypes.number.isRequired,
  linkTo: PropTypes.string,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  positionToWithdrawPay: PropTypes.number,
  loading: PropTypes.bool,
  buttonDisabled: PropTypes.bool,
  missingPositions: PropTypes.number,
  withdraw: PropTypes.bool,
  onWithdraw: PropTypes.func,
  stage: PropTypes.string,
  saveAmount: PropTypes.string,
};

export default React.memo(RoundCard);

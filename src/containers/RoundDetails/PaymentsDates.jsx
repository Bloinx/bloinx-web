/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import APIGetRoundsPeriods from "../../api/getRoundsPeriods";
import Instance from "../../utils/contractInstance";
import styles from "./PaymentsDates.module.scss";

export default function PaymentsDates({ isOpen, onAccept, onCancel }) {
  const {
    contract: { methods },
  } = Instance();
  const [periodsData, setPeriodsData] = useState([]);

  const getRoundsPeriods = async () => {
    const periods = await APIGetRoundsPeriods(methods);
    setPeriodsData(periods);
  };

  useEffect(() => {
    getRoundsPeriods();
  }, []);

  return (
    <Modal visible={isOpen} onOk={onAccept} onCancel={onCancel}>
      <div className={styles.PaymentsDates}>
        <div className={styles.PaymentsDatesHeader}>
          <div>Ronda</div>
          <div>Inicia</div>
          <div>Termina</div>
        </div>
        {periodsData &&
          periodsData.map((item) => (
            <div className={styles.PaymentsDatesItem}>
              <div>{item.round}</div>
              <div>{item.startDate}</div>
              <div>{item.endDate}</div>
            </div>
          ))}
      </div>
    </Modal>
  );
}

PaymentsDates.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

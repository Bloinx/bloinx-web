/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, notification } from "antd";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import RoundCard from "./RoundCard";
import RoundCardNew from "./RoundCardNew";
import styles from "./index.module.scss";

import contracts from "../../constants/contracts";
import ContractInstance from "../../utils/contractInstance";
import APIGetContractDetail from "../../api/getContractDetail";
import APIGetRoundWithdrawPay from "../../api/getRoundWithdrawPay";
import APISetPayRound from "../../api/setPayRound";
import APISetWithdrawTurn from "../../api/setWithdrawTurn";
import Placeholder from "../../components/Placeholder";

const { Title } = Typography;

let interval = null;

function Dashboard({ currentAddress }) {
  const history = useHistory();
  const {
    contract: { methods },
    currentSaving,
  } = ContractInstance();

  const [contractDetail, setContractDetail] = useState({});
  const [payingLoader, setPayingLoader] = useState(false);
  const [drawValue, setDrawValue] = useState("Cobrar");

  const getContractStage = async () => {
    const data = await APIGetContractDetail(methods);
    const positionToWithdrawPay = await APIGetRoundWithdrawPay(
      methods,
      currentAddress
    );
    setContractDetail({ ...data, positionToWithdrawPay });
  };

  const handleRegisterMe = async () => {
    history.push("/registeruser");
  };

  const handleToPayAction = async () => {
    setPayingLoader(true);
    if (currentAddress === contractDetail.whoWithdrawPay) {
      const { status } = await APISetWithdrawTurn(methods, { currentAddress });
      if (status === "success") {
        notification.success({
          message: "Cobro correcto",
          description: "Cobraste correctamente",
        });
        history.push(`/batch-details/${currentSaving}`);
      } else if (status === "error") {
        notification.error({
          message: "Cobro fallido",
          description: "Error al realizar el cobro",
        });
      }
      setPayingLoader(false);
    } else {
      const { status } = await APISetPayRound(methods, { currentAddress });
      if (status === "success") {
        notification.success({
          message: "Pago correcto",
          description: "Pago realizado correctamente",
        });
        history.push(`/batch-details/${currentSaving}`);
      } else if (status === "error") {
        notification.error({
          message: "Pago fallido",
          description: "Error al realizar el pago",
        });
      }
      getContractStage();
      setPayingLoader(false);
    }
  };

  useEffect(() => {
    getContractStage();

    if (
      contractDetail.shouldWithDraw &&
      currentAddress !== contractDetail.whoWithdrawPay
    ) {
      interval = (limit) =>
        setInterval(() => {
          const current = new Date();
          if (limit > current) {
            let diffTime = Math.abs(limit - current) / 1000;
            const days = Math.floor(diffTime / 86400);
            diffTime -= days * 86400;
            const hours = Math.floor(diffTime / 3600) % 24;
            const fHours = hours > 9 ? hours : `0${hours}`;
            diffTime -= hours * 3600;
            const minutes = Math.floor(diffTime / 60) % 60;
            const fMinutes = minutes > 9 ? minutes : `0${minutes}`;
            diffTime -= minutes * 60;
            const seconds = Math.floor(diffTime) % 60;
            const fSeconds = seconds > 9 ? seconds : `0${seconds}`;

            setDrawValue(
              `${
                days > 0 ? `${days} dias ` : ""
              }${fHours}:${fMinutes}:${fSeconds}`
            );
          } else {
            interval = null;
            setDrawValue("Cobrar");
          }
        }, 1000);

      const limit = new Date(contractDetail.shouldWithDraw);
      interval(limit);
    } else {
      interval = null;
    }
  }, [currentAddress]);

  return (
    <>
      <Title level={4} className={styles.dashboardTitle}>
        <FormattedMessage id="dashboardPage.title" />
      </Title>
      {!currentAddress && <Placeholder />}
      {currentAddress && (
        <div className={styles.RoundCards}>
          {contractDetail.roundStage === "ON_REGISTER_STAGE" && (
            <RoundCardNew onClick={handleRegisterMe} />
          )}
          {contractDetail.roundStage !== "ON_REGISTER_STAGE" && (
            <RoundCard
              disabled={!currentAddress || drawValue !== "Cobrar"}
              contractKey={contractDetail.address}
              groupSize={contractDetail.groupSize}
              positionToWithdrawPay={contractDetail.positionToWithdrawPay}
              turn={contractDetail.turn}
              linkTo={`/batch-details/${contracts.savingGroups[43113]}`}
              toPay={handleToPayAction}
              buttonText={
                currentAddress !== contractDetail.whoWithdrawPay
                  ? drawValue
                  : "Pagar"
              }
              buttonDisabled={contractDetail.roundStage === "ON_ROUND_FINISHED"}
              loading={payingLoader}
            />
          )}
        </div>
      )}
    </>
  );
}

Dashboard.propTypes = {
  currentAddress: PropTypes.string,
};

Dashboard.defaultProps = {
  currentAddress: null,
};

const mapStateToProps = (state) => {
  const currentAddress = state?.main?.currentAddress;
  return { currentAddress };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

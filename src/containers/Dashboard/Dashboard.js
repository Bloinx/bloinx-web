/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, notification, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { useList } from "react-firebase-hooks/database";
import { connect } from "react-redux";
import firebase from "../../api/config.firebase";

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
// import APISetStartRound from "../../api/startRound";
import APISetCreateRound from "../../api/setCreateRound";
import APIGetRounds from "../../api/getRounds";

const { Title } = Typography;

// let interval = null;
// let refresh = null;

function Dashboard(props) {
  console.log(props);
  // const { currentAddress, userId } = props;
  const history = useHistory();
  // const {
  //   contract: { methods },
  //   currentSaving,
  // } = ContractInstance();

  // const [contractDetail, setContractDetail] = useState({});
  // const [payingLoader, setPayingLoader] = useState(false);
  // const [drawValue, setDrawValue] = useState(null);

  // const getContractStage = async () => {
  //   const data = await APIGetContractDetail(methods);
  //   const positionToWithdrawPay = await APIGetRoundWithdrawPay(
  //     methods,
  //     currentAddress
  //   );
  //   setContractDetail({ ...data, positionToWithdrawPay });
  // };

  // const handleRegisterMe = async () => {
  //   history.push("/registeruser");
  // };

  // const handleToPayAction = async () => {
  //   setPayingLoader(true);
  //   if (
  //     currentAddress === contractDetail.whoWithdrawPay &&
  //     new Date().getHours() >= 8 &&
  //     new Date().getHours() <= 13
  //   ) {
  //     const { status } = await APISetWithdrawTurn(methods, { currentAddress });
  //     if (status === "success") {
  //       notification.success({
  //         message: "Cobro correcto",
  //         description: "Cobraste correctamente",
  //       });
  //       history.push(`/batch-details/${currentSaving}`);
  //     } else if (status === "error") {
  //       notification.error({
  //         message: "Cobro fallido",
  //         description: "Error al realizar el cobro",
  //       });
  //     }
  //     setPayingLoader(false);
  //   } else if (
  //     currentAddress === contractDetail.whoWithdrawPay &&
  //     new Date().getHours() < 8
  //   ) {
  //     notification.warning({
  //       message: "Por favor espera",
  //       description: "El tiempo de cobro aun no ha inciado.",
  //     });
  //   } else if (
  //     currentAddress === contractDetail.whoWithdrawPay &&
  //     new Date().getHours() >= 14
  //   ) {
  //     notification.warning({
  //       message: "El tiempo de cobro a terminado",
  //       description: "Por favor espera el cambio de ronda",
  //     });
  //   } else {
  //     const { status } = await APISetPayRound(methods, { currentAddress });
  //     if (status === "success") {
  //       notification.success({
  //         message: "Pago correcto",
  //         description: "Pago realizado correctamente",
  //       });
  //       history.push(`/batch-details/${currentSaving}`);
  //     } else if (status === "error") {
  //       notification.error({
  //         message: "Pago fallido",
  //         description: "Error al realizar el pago",
  //       });
  //     }
  //     getContractStage();
  //     setPayingLoader(false);
  //   }
  // };

  // useEffect(() => {
  //   getContractStage();

  //   if (!refresh) {
  //     refresh = setInterval(() => {
  //       console.log("Refresh auto");
  //       getContractStage();
  //     }, 60000);
  //   }

  //   if (
  //     contractDetail.shouldWithDraw &&
  //     currentAddress === contractDetail.whoWithdrawPay
  //   ) {
  //     interval = (limit) =>
  //       setInterval(() => {
  //         const current = new Date();
  //         if (limit > current) {
  //           let diffTime = Math.abs(limit - current) / 1000;
  //           const days = Math.floor(diffTime / 86400);
  //           diffTime -= days * 86400;
  //           const hours = Math.floor(diffTime / 3600) % 24;
  //           const fHours = hours > 9 ? hours : `0${hours}`;
  //           diffTime -= hours * 3600;
  //           const minutes = Math.floor(diffTime / 60) % 60;
  //           const fMinutes = minutes > 9 ? minutes : `0${minutes}`;
  //           diffTime -= minutes * 60;
  //           const seconds = Math.floor(diffTime) % 60;
  //           const fSeconds = seconds > 9 ? seconds : `0${seconds}`;

  //           setDrawValue(
  //             `${
  //               days > 0 ? `${days} dias ` : ""
  //             }${fHours}:${fMinutes}:${fSeconds}`
  //           );
  //         } else {
  //           interval = null;
  //           setDrawValue(null);
  //         }
  //       }, 1000);

  //     const limit = new Date(contractDetail.shouldWithDraw);
  //     interval(limit);
  //   } else {
  //     interval = null;
  //   }
  // }, [currentAddress]);

  // const cobro =
  //   new Date().getHours() >= 8 && new Date().getHours() <= 14
  //     ? "Cobrar"
  //     : "Espere";

  const roundsRef = firebase.database().ref("rounds/");
  const [snapshots, loading, error] = useList(roundsRef);

  return (
    <>
      <div>
        <div>
          <Title level={5} className={styles.dashboardTitle}>
            <FormattedMessage id="dashboardPage.title" />
          </Title>
        </div>
        <div>
          <Button onClick={() => APISetCreateRound({ name: "test" })}>
            Crear tanda
          </Button>
        </div>
      </div>
      <div className={styles.RoundCards}>
        {!loading &&
          snapshots &&
          snapshots.map((round, index) => {
            if (round.val().stage === 0) {
              return <RoundCardNew stage={null} onClick={() => {}} />;
            }
            return <div>sdfdsf</div>;
          })}
      </div>
      {/* 
      {!currentAddress && <Placeholder />}
      {currentAddress && (
        <div className={styles.RoundCards}>
          {contractDetail.roundStage === "ON_REGISTER_STAGE" && (
            <RoundCardNew
              stage={contractDetail.roundStage}
              onClick={handleRegisterMe}
            />
          )}
          {contractDetail.roundStage !== "ON_REGISTER_STAGE" && (
            <RoundCard
              disabled={!currentAddress}
              contractKey={contractDetail.address}
              groupSize={contractDetail.groupSize}
              positionToWithdrawPay={contractDetail.positionToWithdrawPay}
              turn={contractDetail.turn}
              linkTo={`/batch-details/${contracts.savingGroups[43113]}`}
              toPay={handleToPayAction}
              buttonText={
                currentAddress === contractDetail.whoWithdrawPay
                  ? cobro
                  : "Pagar"
              }
              buttonDisabled={contractDetail.roundStage === "ON_ROUND_FINISHED"}
              loading={payingLoader}
            />
          )}
        </div>
      )}
      <button
        type="button"
        onClick={() => APISetCreateRound({ description: "prueba", userId })}
      >
        Crear
      </button> */}
    </>
  );
}

// Dashboard.propTypes = {
//   currentAddress: PropTypes.string,
//   userId: PropTypes.string,
// };

// Dashboard.defaultProps = {
//   currentAddress: null,
//   userId: null,
// };

export default Dashboard;

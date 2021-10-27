/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, notification, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useList } from "react-firebase-hooks/database";
import { connect } from "react-redux";
import firebase from "../../api/config.firebase";

import RoundCard from "./RoundCard";
import RoundCardNew from "./RoundCardNew";
import PageHeader from "../../components/PageHeader";
import styles from "./Dashboard.scss";

import contracts from "../../constants/contracts";
import ContractInstance from "../../utils/contractInstance";
import APIGetRounds from "../../api/getRounds";
import APISetStartRound from "../../api/setStartRound";
import APIGetContractDetail from "../../api/getContractDetail";
import APIGetRoundWithdrawPay from "../../api/getRoundWithdrawPay";
import APISetPayRound from "../../api/setPayRound";
import APISetWithdrawTurn from "../../api/setWithdrawTurn";
import Placeholder from "../../components/Placeholder";
// import APISetStartRound from "../../api/startRound";
import APISetCreateRound from "../../api/setCreateRound";

const { Title } = Typography;

// let interval = null;
// let refresh = null;

function Dashboard(props) {
  const history = useHistory();
  const user = getAuth().currentUser;
  const [roundList, setRoundList] = useState([]);
  // console.log(props);
  const { currentAddress } = props;
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

  const handleToPayAction = async () => {
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
  };

  const handleStartRound = (roundId) => {
    APISetStartRound(roundId)
      .then((receip) => {
        console.log(receip);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleButton = (roundData) => {
    console.log(roundData);
    const { stage, isAdmin } = roundData;
    if (stage === "ON_REGISTER_STAGE" && isAdmin) {
      return {
        text: "Iniciar",
        disable: false,
        action: () => handleStartRound(roundData.roundKey),
      };
    }
    if (stage === "ON_REGISTER_STAGE" && !isAdmin) {
      return {
        text: "Pendiente",
        disable: true,
        action: () => {},
      };
    }
    return null;
  };

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

  const goToCreate = () => {
    history.push("/create-round");
  };

  const goToJoin = (roundKey) => {
    history.push(`/register-user/join?roundId=${roundKey}`);
  };

  useEffect(() => {
    if (user && user.uid) {
      APIGetRounds({
        userId: user.uid,
        walletAddress: currentAddress,
      }).then((rounds) => {
        setRoundList(rounds);
      });
    }
  }, [user, currentAddress]);

  if (!currentAddress) {
    return <Placeholder />;
  }

  console.log(roundList);

  return (
    <>
      <PageHeader
        title={<FormattedMessage id="dashboardPage.title" />}
        action={
          <PlusCircleOutlined
            onClick={goToCreate}
            style={{ fontSize: "20px", color: "white" }}
          />
        }
      />
      <div className={styles.RoundCards}>
        {currentAddress &&
          roundList.map((round) => {
            if (round.stage === "ON_REGISTER_STAGE" && round.toRegister) {
              return <RoundCardNew onClick={() => goToJoin(round.roundKey)} />;
            }
            const { text, disable, action } = handleButton(round);
            return (
              <RoundCard
                name={round.name}
                description={<FormattedMessage id="dashboardPage.title" />}
                groupSize={round.groupSize}
                // contractKey={round.contract}
                // // positionToWithdrawPay={round.positionToWithdrawPay}
                turn={round.turn}
                // linkTo={`/batch-details/${round.roundKey}`}
                onClick={action}
                buttonText={text}
                buttonDisabled={disable}
                // loading={payingLoader}
              />
            );
          })}
      </div>
      {/* 
      
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

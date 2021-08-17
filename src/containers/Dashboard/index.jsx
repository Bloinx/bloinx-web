import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";
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

function Dashboard({ currentAddress }) {
  const history = useHistory();
  const {
    contract: { methods },
  } = ContractInstance();

  const [contractDetail, setContractDetail] = useState({});
  const [payingLoader, setPayingLoader] = useState(false);

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
      const data = await APISetWithdrawTurn(methods);
      console.log(1, data);
      setPayingLoader(false);
    } else {
      const data = await APISetPayRound(methods, { currentAddress });
      console.log(2, data);
      getContractStage();
      setPayingLoader(false);
    }
  };

  useEffect(() => {
    getContractStage();
  }, [currentAddress]);

  console.log(contractDetail, currentAddress);

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
              disabled={!currentAddress}
              contractKey={contractDetail.address}
              groupSize={contractDetail.groupSize}
              positionToWithdrawPay={contractDetail.positionToWithdrawPay}
              turn={contractDetail.turn}
              linkTo={`/batch-details/${contracts.savingGroups[43113]}`}
              toPay={handleToPayAction}
              buttonText={
                currentAddress === contractDetail.whoWithdrawPay
                  ? "Cobrar"
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

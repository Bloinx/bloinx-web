/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// eslint-disable no-unused-vars

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import RoundCard from './RoundCard';
import RoundCardNew from './RoundCardNew';
import styles from './index.module.scss';

import contracts from '../../constants/contracts';
import ContractInstance from '../../utils/contractInstance';
import APIGetContractDetail from '../../api/getContractDetail';
import APIGetRoundWithdrawPay from '../../api/getRoundWithdrawPay';
import APISetPayLatedRound from '../../api/setPayLatedRound';
import APISetPayRound from '../../api/setPayRound';

const { Title } = Typography;

function Dashboard({ currentAddress }) {
  const history = useHistory();
  const { contract: { methods } } = ContractInstance();

  const [contractDetail, setContractDetail] = useState({});

  const getContractStage = async () => {
    const data = await APIGetContractDetail(methods);
    const positionToWithdrawPay = await APIGetRoundWithdrawPay(methods, currentAddress);
    setContractDetail({ ...data, positionToWithdrawPay });
  };

  const handleRegisterMe = () => {
    history.push('/registeruser');
  };

  const handleToPayAction = async () => {
    // if (currentAddress === contractDetail.whoWithdrawPay) {

    // } else if () {

    // }
    // // if (contractDetail.totalSaveAmount > 0) {
    // const data = await APISetPayLatedRound(methods, { currentAddress });
    // // } else {
    // //   const data = await APISetPayRound(methods, { currentAddress });
    // // }
  };

  console.log(contractDetail);

  useEffect(() => {
    getContractStage();
  }, [currentAddress]);

  return (
    <>
      <Title level={4} className={styles.dashboardTitle}><FormattedMessage id="dashboardPage.title" /></Title>
      <div className={styles.RoundCards}>
        {contractDetail.roundStage === 'ON_REGISTER_STAGE' && (
          <RoundCardNew onClick={handleRegisterMe} />
        )}
        {contractDetail.roundStage === 'ON_ROUND_ACTIVE' && (
          <RoundCard
            disabled={!currentAddress}
            contractKey={contractDetail.address}
            groupSize={contractDetail.groupSize}
            positionToWithdrawPay={contractDetail.positionToWithdrawPay}
            turn={contractDetail.turn}
            linkTo={`/batch-details/${contracts.savingGroups[43113]}`}
            toPay={handleToPayAction}
            buttonText={currentAddress === contractDetail.whoWithdrawPay ? 'Cobrar' : 'Pagar'}
          />
        )}
      </div>
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

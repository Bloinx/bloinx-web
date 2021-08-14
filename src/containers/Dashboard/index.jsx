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
import APIGetContractStage from '../../api/getContractStage';
import APIGetContractDetail from '../../api/getContractDetail';
import APISetPayLatedRound from '../../api/setPayLatedRound';
import APISetPayRound from '../../api/setPayRound';

const { Title } = Typography;

function Dashboard({ currentAddress }) {
  const history = useHistory();
  const { contract: { methods } } = ContractInstance();

  const [batchStatus, setBatchStatus] = useState(null);
  const [contractDetail, setContractDetail] = useState({});

  const getContractStage = async () => {
    const { roundStage } = await APIGetContractStage(methods);
    setBatchStatus(roundStage);

    const data = await APIGetContractDetail(methods);
    console.log(data);
    setContractDetail(data);
  };

  const handleRegisterMe = () => {
    history.push('/registeruser');
  };

  const handleToPay = async () => {
    // if (contractDetail.totalSaveAmount > 0) {
    const data = await APISetPayLatedRound(methods, { currentAddress });
    // } else {
    //   const data = await APISetPayRound(methods, { currentAddress });
    // }
  };

  useEffect(() => {
    getContractStage();
  }, []);

  return (
    <>
      <Title level={4} className={styles.dashboardTitle}><FormattedMessage id="dashboardPage.title" /></Title>
      <div className={styles.RoundCards}>
        {batchStatus === 'ON_REGISTER_STAGE' && (
          <RoundCardNew onClick={handleRegisterMe} />
        )}
        {batchStatus === 'ON_ROUND_ACTIVE' && (
          <RoundCard
            disabled={!currentAddress}
            contractKey={contractDetail.address}
            groupSize={contractDetail.groupSize}
            turn={contractDetail.turn}
            linkTo={`/batch-details/${contracts.savingGroups[43113]}`}
            toPay={handleToPay}
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

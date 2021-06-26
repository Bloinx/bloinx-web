import React, { useState } from 'react';

import Dashboard from './Dashboard/Dashboard';
import Stepper from './CreateTanda/Stepper/Stepper';
import TandaRising from './CreateTanda/TandaRising/TandaRising';
import RegisterPay from './ActualTanda/RegisterPay';

import savingGroups from '../abis/SavingGroups.json';
import { getSavingGroupsAddress } from '../utils/addressHelpers';

export const MainController = (props) => {
  const { account } = props;
  const [contract, setContract] = useState(null);

  const useContract = async (abi, address) => {
    const { web3 } = account;
    const { eth } = web3;
    const { Contract } = eth;

    setContract(await new Contract(abi, address));
    console.log('Contract -->> ', contract);
    return contract;
  };

  const getContracts = () => {
    const savingGroupsAbi = savingGroups;
    return useContract(savingGroupsAbi, getSavingGroupsAddress());
  };

  return (
    <div className="createTanda-container">
      <div className="createTanda-header">Dashboard</div>
      <div className="dashboardTanda-container">
        <Dashboard account={account} getContracts={getContracts} />
      </div>
      <div className="createTanda-TandaANDStepper-container">
        <Stepper />
        <TandaRising />
      </div>
      <div className="createTanda-TandaANDStepper-container">
        <RegisterPay account={account} />
      </div>
    </div>
  );
};
export default MainController;

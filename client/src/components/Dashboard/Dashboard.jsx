import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import savingGroups from '../../abis/SavingGroups.json';
import { getFactoryAddress, getSavingGroupsAddress } from '../../utils/addressHelpers';

export const Dashboard = (props) => {
  const { account } = props;
  const [contract, setContract] = useState(null);
  const [admin, setAdmin] = useState('');

  const useContract = async (abi, address) => {
    setContract(await new account.web3.eth.Contract(abi, address));
    console.log('Contract -->> ', contract);
    return contract;
  };

  const getContracts = () => {
    const savingGroupsAbi = savingGroups;
    return useContract(savingGroupsAbi, getSavingGroupsAddress());
  };

  // useEffect(() => {
  //   getContracts();
  // }, []);

  const getAdmin = async () => {
    try {
      const admon = await contract.methods.admin().call();
      setAdmin(admon);
    } catch (error) {
      console.log(error);
      return 'Ocurrio un error inesperado';
    }
  };

  return (
    <div>
      Dashboard
      <div className="GeneralData-buttons">
        <Button
          variant="contained"
          id="getContract"
          name="type"
          onClick={getContracts}
        >
          GetContract
        </Button>
        <Button
          variant="contained"
          id="getContract"
          name="type"
          onClick={getAdmin}
        >
          GetAdmin
        </Button>
        <p>{admin}</p>
      </div>
    </div>
  );
};

export default Dashboard;

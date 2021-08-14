import Web3 from 'web3';
import SavingGroups from '../abis/SavingGroups.json';
import contracts from '../constants/contracts';

const contractInstance = () => {
  let web3 = null;
  let contract = null;
  const currentSaving = contracts.savingGroups[43113];

  if (window.web3) {
    const web3Provider = new Web3(window.web3.currentProvider);
    web3 = web3Provider;
    contract = new web3Provider.eth.Contract(SavingGroups, currentSaving);
  }

  return ({ contract, web3, currentSaving });
};

export default contractInstance;

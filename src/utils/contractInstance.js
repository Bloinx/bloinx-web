import Web3 from "web3";
import SavingGroups from "../abis/SavingGroups.json";
import contracts from "../constants/contracts";
import { getWeb3 } from "./web3";

const contractInstance = () => {
  let web3 = null;
  let contract = {};
  const currentSaving = contracts.savingGroups[43113];

  try {
    if (window && !window.web3) {
      const web3Instance = getWeb3();
      const web3Provider = new Web3(web3Instance);
      web3 = web3Provider;
      contract = new web3Provider.eth.Contract(SavingGroups, currentSaving);
    }
    if (window.web3) {
      const web3Provider = new Web3(window?.web3?.currentProvider);
      web3 = web3Provider;
      contract = new web3Provider.eth.Contract(SavingGroups, currentSaving);
    }
  } catch (err) {
    alert(err);
  }

  return { contract, web3, currentSaving };
};

export default contractInstance;

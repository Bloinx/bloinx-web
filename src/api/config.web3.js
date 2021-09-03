import Web3 from "web3";
// import SavingGroups from "../abis/SavingGroups.json";
import Main from "../abis/Main.json";
// import contracts from "../constants/contracts";

export default function config() {
  const httpProvider = new Web3.providers.HttpProvider(
    "https://api.avax-test.network/ext/bc/C/rpc",
    {
      timeout: 10000,
    }
  );

  const currentMainFactory = "0x3D7D023400cAF0Ad5f77162A4F201AeF9d334dE6"; // Factory
  // const currentSaving = contracts.savingGroups[43113];
  const web3Provider = new Web3(window?.web3?.currentProvider || httpProvider);
  const contract = new web3Provider.eth.Contract(
    // SavingGroups,
    Main,
    currentMainFactory
  );

  return contract;
}

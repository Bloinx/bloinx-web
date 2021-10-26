import Web3 from "web3";
import SavingGroups from "../abis/SavingGroups.json";

import { MAIN_FACTORY_FIJI_TEST_NET } from "./config.main.web3";

export default function config() {
  const httpProvider = new Web3.providers.HttpProvider(
    "https://api.avax-test.network/ext/bc/C/rpc",
    {
      timeout: 10000,
    }
  );

  const web3Provider = new Web3(window?.web3?.currentProvider || httpProvider);
  const contract = new web3Provider.eth.Contract(
    SavingGroups,
    MAIN_FACTORY_FIJI_TEST_NET
  );

  return contract;
}

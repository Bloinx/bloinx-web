import Web3 from "web3";
import Main from "../abis/Main.json";

export const MAIN_FACTORY_FIJI_TEST_NET =
  "0x02A94E4fC94A58a55477b27423482aB53CEf12e2";

export default function config() {
  const httpProvider = new Web3.providers.HttpProvider(
    "https://api.avax-test.network/ext/bc/C/rpc",
    {
      timeout: 10000,
    }
  );

  const web3Provider = new Web3(window?.web3?.currentProvider || httpProvider);
  const contract = new web3Provider.eth.Contract(
    Main,
    MAIN_FACTORY_FIJI_TEST_NET
  );

  return contract;
}

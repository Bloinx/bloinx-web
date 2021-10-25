import Web3 from "web3";
import Main from "../abis/Main.json";

export const MAIN_FACTORY_FIJI_TEST_NET =
  "0x2F6497021e3Ef81587D94B805CaA90B5e3e8d72e";

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

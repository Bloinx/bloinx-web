import Web3 from "web3";
import Main from "./abis/Main.json";
import cUSD from "./abis/cUSD.json";

export const MAIN_FACTORY_FUJI_TEST_NET =
  "0x93D4bfF05EEBa0De8Ad486B7837DD11A10810d6C";
export const MIM_TOKEN_FUJI_TEST_NET =
  "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"; // cUSD

export function configMin() {
  const httpProvider = new Web3.providers.HttpProvider(
    "https://api.avax-test.network/ext/bc/C/rpc",
    {
      timeout: 10000,
    }
  );

  const web3Provider = new Web3(window?.web3?.currentProvider || httpProvider);
  const contract = new web3Provider.eth.Contract(cUSD, MIM_TOKEN_FUJI_TEST_NET);

  return contract;
}

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
    MAIN_FACTORY_FUJI_TEST_NET
  );

  const a = { contract, web3Provider };
  console.log("->>>>>>>", a);
  return a;
}

import Web3 from "web3";
import Main from "../abis/Main.json";
import cUSD from "../abis/cUSD.json";

export const MAIN_FACTORY_ALFAJORES =
  "0xC5E571593e94780bA74878f70b899004189E48c3";
export const CUSD_TOKEN_ALFAJORES =
  "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"; // cUSD

export const MAIN_FACTORY_CELO_MAINNET =
  "0x58a261C38FC43384AaF6C4968426CDFd4be83f29";
export const CUSD_TOKEN_CELO_MAINNET =
  "0x765DE816845861e75A25fCA122bb6898B8B1282a"; // cUSD

export function configCUSD() {
  const httpProvider = new Web3.providers.HttpProvider(
    "https://forno.celo.org",
    {
      timeout: 10000,
    }
  );
  const web3Provider = new Web3(window?.web3?.currentProvider || httpProvider);
  const contract = new web3Provider.eth.Contract(cUSD, CUSD_TOKEN_CELO_MAINNET);
  return contract;
}

export default function config() {
  const httpProvider = new Web3.providers.HttpProvider(
    "https://forno.celo.org",
    {
      timeout: 10000,
    }
  );

  const web3Provider = new Web3(window?.web3?.currentProvider || httpProvider);
  const contract = new web3Provider.eth.Contract(
    Main,
    MAIN_FACTORY_CELO_MAINNET
  );

  return contract;
}

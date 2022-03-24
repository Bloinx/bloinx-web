import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { newKitFromWeb3 } from "@celo/contractkit";
import Main from "../abis/Main.json";
import cUSD from "../abis/cUSD.json";

export const MAIN_FACTORY_ALFAJORES =
  "0xD154C2C4F1b72B3CFDD3d0076B867671a3D124Bb";
export const CUSD_TOKEN_ALFAJORES =
  "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"; // cUSD

export const MAIN_FACTORY_CELO_MAINNET =
  "0x58a261C38FC43384AaF6C4968426CDFd4be83f29";
export const CUSD_TOKEN_CELO_MAINNET =
  "0x765DE816845861e75A25fCA122bb6898B8B1282a"; // cUSD

export async function getContract(provider, abi, contractAddress) {
  const contract = await new provider.eth.Contract(abi, contractAddress);
  return contract;
}

export async function configCUSD(walletProvider) {
  let httpProvider;
  if (walletProvider !== "WalletConnect") {
    httpProvider = new Web3.providers.HttpProvider("https://forno.celo.org", {
      timeout: 10000,
    });
  } else {
    httpProvider = new WalletConnectProvider({
      rpc: {
        44787: "https://alfajores-forno.celo-testnet.org",
        42220: "https://forno.celo.org",
      },
    });
    await httpProvider.enable();
    const web3Provider = new Web3(httpProvider);
    const kit = newKitFromWeb3(web3Provider);
    // eslint-disable-next-line prefer-destructuring
    kit.defaultAccount = httpProvider.accounts[0];
    kit.defaultFeeCurrency = await kit.contracts.getStableToken();
  }

  const web3Provider = new Web3(httpProvider);
  const contract = getContract(web3Provider, cUSD, CUSD_TOKEN_CELO_MAINNET);
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
  const contract = getContract(web3Provider, Main, MAIN_FACTORY_CELO_MAINNET);

  return { contract, web3Provider };
}

export async function walletConnect() {
  const provider = new WalletConnectProvider({
    rpc: {
      44787: "https://alfajores-forno.celo-testnet.org",
      42220: "https://forno.celo.org",
    },
  });
  await provider.enable();
  const web3Provider = new Web3(provider);
  const kit = newKitFromWeb3(web3Provider);
  // eslint-disable-next-line prefer-destructuring
  kit.defaultAccount = provider.accounts[0];
  kit.defaultFeeCurrency = await kit.contracts.getStableToken();

  const contract = await getContract(kit.web3, Main, MAIN_FACTORY_CELO_MAINNET);
  return { contract, provider };
}

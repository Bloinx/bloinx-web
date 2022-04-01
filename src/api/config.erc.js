import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { newKitFromWeb3 } from "@celo/contractkit";
import cUSD from "../abis/cUSD.json";

export const CUSD_TOKEN_ALFAJORES =
  "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"; // cUSD

export const CUSD_TOKEN_CELO_MAINNET =
  "0x765DE816845861e75A25fCA122bb6898B8B1282a"; // cUSD

export async function configCUSD() {
  try {
    const httpProvider = new Web3.providers.HttpProvider(
      "https://forno.celo.org",
      {
        timeout: 10000,
      }
    );

    const web3Provider = new Web3(
      window?.web3?.currentProvider || httpProvider
    );
    const contract = new web3Provider.eth.Contract(
      cUSD,
      CUSD_TOKEN_CELO_MAINNET
    );

    return contract;
  } catch (error) {
    console.log(error);
    return error;
  }
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

  const contract = new web3Provider.eth.Contract(cUSD, CUSD_TOKEN_CELO_MAINNET);

  return contract;
}

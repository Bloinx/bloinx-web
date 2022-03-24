import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { newKitFromWeb3 } from "@celo/contractkit";
import SavingGroups from "../abis/SavingGroups.json";

export default async function config(savingGroupAddress) {
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
      SavingGroups,
      savingGroupAddress
    );

    return contract;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function walletConnect(savingGroupAddress) {
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

  const contract = new web3Provider.eth.Contract(
    SavingGroups,
    savingGroupAddress
  );

  return contract;
}

import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { newKitFromWeb3 } from "@celo/contractkit";
import SavingGroups from "../abis/SavingGroups.json";

export default async function config(savingGroupAddress, walletProvider) {
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
  const contract = new web3Provider.eth.Contract(
    SavingGroups,
    savingGroupAddress
  );

  return contract;
}

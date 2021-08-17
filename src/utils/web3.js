import Web3 from "web3";

import getRpcUrl from "./getRpcUrl";

const RPC_URL = getRpcUrl();
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000,
});

/**
 * Provides a web3 instance using our own private provider httpProver
 */
const getWeb3 = () => {
  const web3 = new Web3(httpProvider);
  return web3;
};

const getContract = (abi, address) => {
  const web3 = getWeb3();
  return new web3.eth.Contract(abi, address);
};

export { getWeb3, getContract };

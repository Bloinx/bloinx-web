import Web3 from 'web3';
// import { HttpProviderOptions } from 'web3-core-helpers'
// import { AbiItem } from 'web3-utils'
// import { ContractOptions } from 'web3-eth-contract'
import getRpcUrl from './getRpcUrl';

const RPC_URL = getRpcUrl();
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 });

/**
 * Provides a web3 instance using our own private provider httpProver
 */
const getWeb3 = () => {
  const web3 = new Web3(httpProvider);
  return web3;
};

export default getWeb3;

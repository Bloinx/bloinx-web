import Web3 from 'web3';
import OneRoundReusable from '../contracts/oneRoundReusable.json';

const drizzleOptions = {
  web3: {
    block: false,
    customProvider: new Web3('http://localhost:7545'),
  },
  contracts: [OneRoundReusable],
  // events: {
      // Aqui van los eventos del SC
  // }
};

export default drizzleOptions;
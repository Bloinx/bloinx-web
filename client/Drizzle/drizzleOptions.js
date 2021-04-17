import Web3 from 'web3';
import SavingGroups from '../src/contracts/SavingGroups.json';

const drizzleOptions = {
  web3: {
    block: false,
    customProvider: new Web3('http://localhost:7545'),
  },
  contracts: [SavingGroups],
  // events: {
  // Aqui van los eventos del SC
  // }
};

export default drizzleOptions;

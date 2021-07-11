import Web3 from 'web3';

import t from '../types';
import SavingGroups from '../../contracts/SavingGroups.json';

const initialState = {
  web3: {
    block: false,
    customProvider: new Web3('http://localhost:7545'),
  },
  contracts: [SavingGroups],
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}

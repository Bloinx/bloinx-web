import {
  INITIAL_CONTRACT_INSTANCE,
  CURRENT_ADDRESS_WALLET,
} from '../types';

const initialState = {
  contract: null,
  currentAddress: null,
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case CURRENT_ADDRESS_WALLET:
      return {
        ...state,
        currentAddress: action.payload,
      };
    case INITIAL_CONTRACT_INSTANCE:
      return {
        ...state,
        contract: action.payload,
      };
    default:
      return state;
  }
}

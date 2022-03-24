import {
  INITIAL_CONTRACT_INSTANCE,
  CURRENT_ADDRESS_WALLET,
  CURRENT_PROVIDER,
} from "../types";

const initialState = {
  contract: null,
  currentAddress: null,
  currentProvider: null,
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
    case CURRENT_PROVIDER:
      return {
        ...state,
        currentProvider: action.payload,
      };
    default:
      return state;
  }
}

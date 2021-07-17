import {
  INITIAL_CONTRACT_INSTANCE,
} from '../types';

const initialState = {
  contract: null,
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case INITIAL_CONTRACT_INSTANCE:
      return {
        ...state,
        contract: action.payload,
      };
    default:
      return state;
  }
}

import getSavingGroupsMethods from '../../utils/getSGContract';

import t from '../types';

const initialState = {
  contract: getSavingGroupsMethods(),
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

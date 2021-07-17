import {
  INITIAL_CONTRACT_INSTANCE
} from '../types';

const getInitialContractInstance = (instance) => {
  return {
    type: INITIAL_CONTRACT_INSTANCE,
    payload: instance,
  };
};

export default getInitialContractInstance;

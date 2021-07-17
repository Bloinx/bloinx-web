import {
  INITIAL_CONTRACT_INSTANCE,
} from '../types';

const getInitialContractInstance = (instance) => ({
  type: INITIAL_CONTRACT_INSTANCE,
  payload: instance,
});

export default getInitialContractInstance;

import {
  INITIAL_CONTRACT_INSTANCE,
  CURRENT_ADDRESS_WALLET,
  CURRENT_PROVIDER,
} from "../types";

const getInitialContractInstance = (instance) => ({
  type: INITIAL_CONTRACT_INSTANCE,
  payload: instance,
});

const getCurrentWallet = (address) => ({
  type: CURRENT_ADDRESS_WALLET,
  payload: address,
});

const getCurrentProvider = (provider) => ({
  type: CURRENT_PROVIDER,
  payload: provider,
});

export { getInitialContractInstance, getCurrentWallet, getCurrentProvider };

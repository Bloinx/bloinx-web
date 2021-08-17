import { INITIAL_CONTRACT_INSTANCE, CURRENT_ADDRESS_WALLET } from "../types";

const getInitialContractInstance = (instance) => ({
  type: INITIAL_CONTRACT_INSTANCE,
  payload: instance,
});

const getCurrentWallet = (address) => ({
  type: CURRENT_ADDRESS_WALLET,
  payload: address,
});

export { getInitialContractInstance, getCurrentWallet };

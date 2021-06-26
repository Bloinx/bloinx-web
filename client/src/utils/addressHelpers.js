import addresses from '../constants/contracts';

export const getAddress = (address) => {
  const mainNetChainId = 43114;
  const chainId = 43113; // process.env.REACT_APP_CHAIN_ID;
  return address[chainId] ? address[chainId] : address[mainNetChainId];
};

export const getFactoryAddress = () => getAddress(addresses.mainFactory);

export const getSavingGroupsAddress = () => getAddress(addresses.savingGroups);

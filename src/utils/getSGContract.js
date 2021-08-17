import SavingGroups from "../abis/SavingGroups.json";
import { getSavingGroupsAddress } from "./addressHelpers";
import { getContract } from "./web3";

const getSavingGroupsMethods = async () => {
  const abiContract = SavingGroups;
  const addressContract = getSavingGroupsAddress();
  const contract = await getContract(abiContract, addressContract);
  return contract;
};

export default getSavingGroupsMethods;

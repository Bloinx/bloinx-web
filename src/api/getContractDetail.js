import contracts from '../constants/contracts';
import { formatAddress } from '../utils/format';
import { stages } from './constants';

const getContractDetail = (methods) => new Promise((resolve) => {
  Promise.all([
    methods.groupSize().call(),
    methods.turn().call(),
    methods.totalSaveAmount().call(),
    methods.totalCashIn().call(),
    methods.stage().call(),
  ]).then((responces) => {
    resolve({
      address: formatAddress(contracts.savingGroups[43113]),
      groupSize: Number(responces[0]),
      turn: Number(responces[1]),
      totalSaveAmount: parseFloat(responces[2]),
      totalCashIn: parseFloat(responces[3]),
      roundStage: stages[responces[4]],
    });
  });
});

export default getContractDetail;

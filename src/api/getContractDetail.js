import contracts from '../constants/contracts';
import { formatAddress } from '../utils/format';
import APIGetContractStage from './getContractStage';
import APIGetUsersList from './getUsersList';

const getContractDetail = (methods) => new Promise((resolve) => {
  Promise.all([
    methods.groupSize().call(),
    methods.turn().call(),
    methods.totalSaveAmount().call(),
    methods.totalCashIn().call(),
    APIGetContractStage(methods),
    APIGetUsersList(methods),
    methods.users('0xee1750b0911a515fac4aeca89a4…8667c3161')[0],
  ]).then((responces) => {
    const turn = Number(responces[1]);
    resolve({
      address: formatAddress(contracts.savingGroups[43113]),
      groupSize: Number(responces[0]),
      turn,
      totalSaveAmount: parseFloat(responces[2]),
      totalCashIn: parseFloat(responces[3]),
      roundStage: responces[4].roundStage,
      whoWithdrawPay: (
        responces[5].users.filter((user) => user.position === turn)[0]?.address || null
      ),
      latePayments: responces[6],
    });
  });
});

export default getContractDetail;

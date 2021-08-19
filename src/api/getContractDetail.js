import web3 from "web3";

import contracts from "../constants/contracts";
import { formatAddress } from "../utils/format";
import APIGetContractStage from "./getContractStage";
import APIGetUsersList from "./getUsersList";

const getContractDetail = (methods) =>
  new Promise((resolve) => {
    Promise.all([
      methods.groupSize().call(),
      methods.turn().call(),
      methods.totalSaveAmount().call(),
      methods.totalCashIn().call(),
      APIGetContractStage(methods),
      APIGetUsersList(methods),
    ]).then((responces) => {
      const turn = Number(responces[1]);
      resolve({
        address: formatAddress(contracts.savingGroups[43113]),
        groupSize: Number(responces[0]),
        turn,
        totalSaveAmount: `${web3.utils.fromWei(responces[2], "ether")} AVAX`,
        totalCashIn: `${web3.utils.fromWei(responces[3], "ether")} AVAX`,
        roundStage: responces[4].roundStage,
        whoWithdrawPay:
          responces[5].users
            .filter((user) => user.position === turn)[0]
            ?.address.toLowerCase() || null,
        usersLatePayments: responces[5].users.map(
          ({ address, latePayments }) => ({
            address,
            latePayments: Number(latePayments),
          })
        ),
      });
    });
  });

export default getContractDetail;

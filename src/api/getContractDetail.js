import web3 from "web3";

import contracts from "../constants/contracts";
import { formatAddress } from "../utils/format";
import APIGetContractStage from "./getContractStage";
import APIGetUsersList from "./getUsersList";
import APIGetRoundsPeriods from "./getRoundsPeriods";
import { reverseDateToOperation } from "./constants";

const getContractDetail = (methods) =>
  new Promise((resolve) => {
    Promise.all([
      methods.groupSize().call(),
      methods.turn().call(),
      methods.totalSaveAmount().call(),
      methods.totalCashIn().call(),
      APIGetContractStage(methods),
      APIGetUsersList(methods),
      APIGetRoundsPeriods(methods),
    ]).then((responses) => {
      const turn = Number(responses[1]);
      console.log(
        new Date(),

        responses[6].find((time) => {
          console.log(time.round, turn);
          return time.round === turn;
        }).startToDraw
      );
      resolve({
        address: formatAddress(contracts.savingGroups[43113]),
        groupSize: Number(responses[0]),
        turn,
        totalSaveAmount: `${web3.utils.fromWei(responses[2], "ether")} AVAX`,
        totalCashIn: `${web3.utils.fromWei(responses[3], "ether")} AVAX`,
        roundStage: responses[4].roundStage,
        whoWithdrawPay:
          responses[5].users
            .find((user) => user.position === turn)[0]
            ?.address.toLowerCase() || null,
        usersLatePayments: responses[5].users.map(
          ({ address, latePayments }) => ({
            address,
            latePayments: Number(latePayments),
          })
        ),
        shouldWithDraw: reverseDateToOperation(
          responses[6].find((time) => time.round === turn).startToDraw
        ),
      });
    });
  });

export default getContractDetail;

/* eslint-disable no-unused-vars */

import { doc, getDoc, getFirestore } from "firebase/firestore";

import config from "./config.sg.web3";
import MethodGetRealTurn from "./methods/getRealTurn";
import MethodGetGroupSize from "./methods/getGroupSize";
import MethodSetEndRound from "./methods/setEndRound";

// const db = getFirestore();

const setWithdrawTurn = async (roundId, walletAddress) => {
  // const docRef = doc(db, "round", roundId);
  // const docSnap = await getDoc(docRef);
  // const data = await docSnap.data();
  const data = {};
  // const roundData =
  //   data.positions.find(
  //     (position) => position.walletAddress === walletAddress
  //   ) || {};

  const sg = config(data.contract);
  const groupSize = await MethodGetGroupSize(sg.methods);
  const realTurn = await MethodGetRealTurn(sg.methods);

  return new Promise((resolve, reject) => {
    sg.methods
      .withdrawTurn()
      .send({
        from: walletAddress,
        to: data.contract,
      })
      .once("receipt", async (receipt) => {
        console.log(">>>>>>", realTurn, groupSize);
        if (Number(realTurn) > Number(groupSize)) {
          MethodSetEndRound(sg.methods, {
            walletAddress,
            contract: data.contract,
          })
            .then((endReceipt) => {
              console.log("OK END", endReceipt);
              resolve([receipt, endReceipt]);
            })
            .catch((endErr) => {
              console.log("ERR END", endErr);
              const er = [receipt, endErr];
              reject(er);
            });
        } else {
          resolve(receipt);
        }
      })
      .on("error", async (error) => {
        reject(error);
      });
  });
};

export default setWithdrawTurn;

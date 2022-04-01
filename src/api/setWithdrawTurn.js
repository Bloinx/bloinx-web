/* eslint-disable no-unused-vars */

import { doc, getDoc, getFirestore } from "firebase/firestore";

import config, { walletConnect } from "./config.sg.web3";
import MethodGetRealTurn from "./methods/getRealTurn";
import MethodGetGroupSize from "./methods/getGroupSize";
import MethodSetEndRound from "./methods/setEndRound";

const db = getFirestore();

const setWithdrawTurn = async (roundId, walletAddress, provider) => {
  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const sg = await new Promise((resolve, reject) => {
    try {
      if (provider !== "WalletConnect") {
        resolve(config(data.contract));
      } else {
        resolve(walletConnect(data.contract));
      }
    } catch (error) {
      reject(error);
    }
  });

  // const sg = await config(data.contract);
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
        if (Number(realTurn) > Number(groupSize)) {
          MethodSetEndRound(sg.methods, {
            walletAddress,
            contract: data.contract,
          })
            .then((endReceipt) => {

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

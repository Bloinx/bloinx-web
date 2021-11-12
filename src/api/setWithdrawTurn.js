/* eslint-disable no-unused-vars */

import { doc, getDoc, getFirestore } from "firebase/firestore";
import config from "./config.sg.web3";

const db = getFirestore();

const setWithdrawTurn = async (roundId, walletAddress) => {
  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();
  // const roundData =
  //   data.positions.find(
  //     (position) => position.walletAddress === walletAddress
  //   ) || {};

  const sg = config(data.contract);

  return new Promise((resolve, reject) => {
    sg.methods
      .withdrawTurn()
      .send({
        from: walletAddress,
        to: data.contract,
      })
      .once("receipt", async (receipt) => {
        resolve(receipt);
      })
      .on("error", async (error) => {
        reject(error);
      });
  });
};

export default setWithdrawTurn;

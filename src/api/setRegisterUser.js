/* eslint-disable no-unused-vars */
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getWeb3 } from "../utils/web3";

import config from "./config.sg.web3";
import MethodGetCashIn from "./methods/getCashIn";
import MethodGetFeeCost from "./methods/getFeeCost";

const db = getFirestore();

const setRegisterUser = async (props) => {
  const { userId, walletAddress, roundId, name, motivation, position } = props;
  console.log(props);

  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  const sg = config(data.contract);
  const cashIn = await MethodGetCashIn(sg.methods);
  const feeCost = await MethodGetFeeCost(sg.methods);

  return new Promise((resolve, reject) => {
    const amount = Number(cashIn) + Number(feeCost);
    sg.methods
      .registerUser(position)
      .send({
        from: walletAddress,
        value: amount.toString(),
      })
      .once("receipt", async (receipt) => {
        const positions = [
          ...data.positions,
          {
            userId,
            position: Number(position),
            walletAddress,
            motivation,
            name,
          },
        ].sort();
        await updateDoc(docRef, {
          positions,
        });
        resolve(receipt);
      })
      .on("error", async (error) => {
        reject(error);
      });
  });
};

export default setRegisterUser;

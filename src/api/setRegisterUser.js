/* eslint-disable no-unused-vars */
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getWeb3 } from "../utils/web3";

import config from "./config.sg.web3";
import MethodGetCashIn from "./methods/getCashIn";
import MethodGetFeeCost from "./methods/getFeeCost";

const db = getFirestore();

const setRegisterUser = async (props) => {
  const { userId, walletAddress, roundId, name, motivation, position } = props;

  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  const sg = config(data.contract);
  console.log(sg);

  const cashIn = await MethodGetCashIn(sg.methods);
  console.log(cashIn);

  // const feeCost = await MethodGetFeeCost(sg.methods);
  // console.log(feeCost);

  return new Promise((resolve, reject) => {
    //   sg.methods
    //     .registerUser(position)
    //     .send({
    //       from: walletAddress,
    //       value: getWeb3().utils.toWei(data.saving.toString(), "ether"),
    //     })
    //     .once("receipt", async (receipt) => {
    //       const positions = [
    //         ...data.positions,
    //         { userId, position: Number(position), walletAddress },
    //       ].sort();
    //       await updateDoc(docRef, {
    //         name,
    //         motivation,
    //         positions,
    //       });
    //       resolve(receipt);
    //     })
    //     .on("error", async (error) => {
    //       reject(error);
    //     });
  });
};

export default setRegisterUser;

// const api = (methods, payload) =>
//   new Promise((resolve) => {
//     methods
//       .registerUser(payload.turnSelected)
//       .send({
//         from: payload.currentAddress,
//         value: getWeb3().utils.toWei("1", "ether"),
//       })
//       .once("receipt", async (receipt) => {
//         resolve({ status: "success", receipt });
//       })
//       .on("error", async (error) => {
//         resolve({ status: "error", error });
//       });
//   });

// export default api;

/* eslint-disable no-unused-vars */
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getWeb3 } from "../utils/web3";

import config from "./config.sg.web3";

const db = getFirestore();

const setRoundParticipant = (props) =>
  new Promise((resolve, reject) => {
    const {
      userId,
      walletAddress,
      roundId,
      name,
      motivation,
      position,
      cashInAmount,
    } = props;
    console.log(props);
    const a = config();

    a.methods
      .registerUser(position)
      .send({
        from: walletAddress,
        value: getWeb3().utils.toWei(cashInAmount.toString(), "ether"),
      })
      .once("receipt", async (receipt) => {
        resolve({ status: "success", receipt });
      })
      .on("error", async (error) => {
        reject(error);
      });
    // const docRef = doc(db, "round", roundId);
    // const docSnap = await getDoc(docRef);
    // const data = await docSnap.data();
    // const positions = [
    //   ...data.positions,
    //   { userId, position: Number(position), walletAddress },
    // ];
    // await updateDoc(docRef, {
    //   name,
    //   motivation,
    //   positions,
    // });
  });

export default setRoundParticipant;

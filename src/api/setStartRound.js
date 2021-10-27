/* eslint-disable no-unused-vars */
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import config from "./config.sg.web3";

const db = getFirestore();

const api = async (roundId) => {
  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  console.log(data);

  const sg = config(data.contract);
  console.log(sg);

  return new Promise((resolve, reject) => {
    sg.methods
      .startRound()
      .send({
        from: data.createByWallet,
        to: data.contract,
      })
      .once("receipt", async (receipt) => {
        console.log(receipt);
        // const positions = [
        //   ...data.positions,
        //   { userId, position: Number(position), walletAddress },
        // ].sort();
        // await updateDoc(docRef, {
        //   name,
        //   motivation,
        //   positions,
        // });
        // resolve(receipt);
      })
      .on("error", async (error) => {
        reject(error);
      });
  });
};

export default api;

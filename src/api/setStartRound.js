/* eslint-disable no-unused-vars */
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import config, { walletConnect } from "./config.sg.web3";

const db = getFirestore();

const api = async (roundId, provider) => {
  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

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
  return new Promise((resolve, reject) => {
    sg.methods
      .startRound()
      .send({
        from: data.createByWallet,
        to: data.contract,
      })
      .once("receipt", async (receipt) => {
        await updateDoc(docRef, {
          invitations: [],
        });
        resolve(receipt);
      })
      .on("error", async (error) => {
        reject(error);
      });
  });
};

export default api;

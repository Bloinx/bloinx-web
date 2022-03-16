/* eslint-disable no-unused-vars */
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { CUSD_TOKEN_CELO_MAINNET, configCUSD } from "./config.main.web3";

const db = getFirestore();

const setRegisterUser = async (props) => {
  const { walletAddress, roundId, provider } = props;
  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();
  const cUSD = await configCUSD(provider);

  return new Promise((resolve, reject) => {
    cUSD.methods
      .approve(data.contract, "300000000000000000000")
      .send({ from: walletAddress, to: CUSD_TOKEN_CELO_MAINNET })
      .once("receipt", async (receipt) => {
        resolve(receipt);
      })
      .on("error", async (err) => {
        console.log(err);
        reject(err);
      });
  });
};

export default setRegisterUser;

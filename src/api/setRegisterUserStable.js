/* eslint-disable no-unused-vars */
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { MIM_TOKEN_FUJI_TEST_NET, configMin } from "./config.main.web3";

const db = getFirestore();

const setRegisterUser = async (props) => {
  const { walletAddress, roundId } = props;

  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  return new Promise((resolve, reject) => {
    const mim = configMin();
    mim.methods
      .approve(
        data.contract,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      )
      .send({ from: walletAddress, to: MIM_TOKEN_FUJI_TEST_NET })
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

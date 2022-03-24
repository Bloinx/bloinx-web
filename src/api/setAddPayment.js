import { doc, getDoc, getFirestore } from "firebase/firestore";

import config from "./config.sg.web3";
import MethodGetSaveAmount from "./methods/saveAmount";

const db = getFirestore();

const setAddPayment = async (props) => {
  const { walletAddress, roundId } = props;

  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  const sg = await config(data.contract);
  const saveAmount = await MethodGetSaveAmount(sg.methods);
  // const cashIn = await MethodGetCashIn(sg.methods);

  return new Promise((resolve, reject) => {
    sg.methods
      .addPayment(saveAmount)
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

export default setAddPayment;

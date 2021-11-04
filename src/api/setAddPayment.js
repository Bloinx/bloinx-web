import { doc, getDoc, getFirestore } from "firebase/firestore";

import config from "./config.sg.web3";
import MethodGetCashIn from "./methods/getCashIn";

const db = getFirestore();

const setAddPayment = async (props) => {
  const { walletAddress, roundId } = props;

  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  const sg = config(data.contract);
  const cashIn = await MethodGetCashIn(sg.methods);

  return new Promise((resolve) => {
    sg.methods
      .addPayment()
      .send({
        from: walletAddress,
        value: cashIn,
      })
      .once("receipt", async (receipt) => {
        resolve(receipt);
      })
      .on("error", async (error) => {
        resolve(error);
      });
  });
};

export default setAddPayment;

import { doc, getFirestore, getDoc } from "firebase/firestore";
import config, { walletConnect } from "./config.sg.web3";

import MethodGetFuturePayments from "./methods/getFuturePayments";

const db = getFirestore();

const getFuturePayments = async (roundId, currentAddress, currentProvider) => {
  try {
    const docRef = doc(db, "round", roundId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const sg = await new Promise((resolve, reject) => {
      try {
        if (currentProvider !== "WalletConnect") {
          resolve(config(data.contract));
        } else {
          resolve(walletConnect(data.contract));
        }
      } catch (error) {
        reject(error);
      }
    });
    // const sg = await config(data.contract);

    const futurePayments = await MethodGetFuturePayments(
      sg.methods,
      currentAddress
    );
    const result = (Number(futurePayments) * 10 ** -18).toFixed(2);

    return result;
  } catch (err) {
    return err;
  }
};

export default getFuturePayments;

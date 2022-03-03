import { doc, getDoc, getFirestore } from "firebase/firestore";

import MethodGetAvailablePlaces from "./methods/getAvailablePlaces";
import MethodGetCashIn from "./methods/getCashIn";
import MethodGetFeeCost from "./methods/getFeeCost";
import config from "./config.sg.web3";

const getRoundRegisterDetail = async (roundId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "round", roundId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    const sg = await config(data.contract);
    const positionsAvailable = await MethodGetAvailablePlaces(sg.methods);
    const cashIn = await MethodGetCashIn(sg.methods);
    const feeCost = await MethodGetFeeCost(sg.methods);

    return {
      ...data,
      roundId,
      positionsAvailable,
      cashIn: (Number(cashIn) * 10 ** -18).toFixed(2),
      feeCost: (Number(feeCost) * 10 ** -18).toFixed(2),
    };
  } catch (err) {
    return err;
  }
};

export default getRoundRegisterDetail;

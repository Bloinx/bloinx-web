import { doc, getDoc, getFirestore } from "firebase/firestore";

import MethodGetAvailablePlaces from "./methods/getAvailablePlaces";
import config from "./config.sg.web3";

const getRoundRegisterDetail = async (roundId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "round", roundId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    const sg = config(data.contract);
    const positionsAvailable = await MethodGetAvailablePlaces(sg.methods);

    return {
      ...data,
      roundId,
      positionsAvailable,
    };
  } catch (err) {
    return err;
  }
};

export default getRoundRegisterDetail;

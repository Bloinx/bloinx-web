import { doc, getDoc, getFirestore } from "firebase/firestore";

import MethodGetAvailablePlaces from "./methods/getAvailablePlaces";
import MethodGetAdmin from "./methods/getAdmin";
import config from "./config.sg.web3";

const getContractDetail = async (roundId, walletAddress) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "round", roundId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    const sg = config(data.contract);
    const positionsAvailable = await MethodGetAvailablePlaces(sg.methods);
    const admin = await MethodGetAdmin(sg.methods);

    return {
      ...data,
      roundId,
      positionsAvailable,
      isAdmin: walletAddress === data.createByWallet && walletAddress === admin,
    };
  } catch (err) {
    return err;
  }
};

export default getContractDetail;

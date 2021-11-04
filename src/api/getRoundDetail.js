/* eslint-disable no-unused-vars */
import { doc, getDoc, getFirestore } from "firebase/firestore";

import MethodGetAvailablePlaces from "./methods/getAvailablePlaces";
import config from "./config.sg.web3";

const getRoundDetail = async (roundId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "round", roundId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const { contract, positions, createByUser } = data;

    const positionData =
      positions.find((position) => position.userId === createByUser) || {};

    const sg = config(contract);
    const positionsAvailable = await MethodGetAvailablePlaces(sg.methods);

    const a = {
      //   ...data,
      ...positionData,
      roundId,
      //   positionsAvailable,
    };
    console.log(a);
    return a;
  } catch (err) {
    return err;
  }
};

export default getRoundDetail;

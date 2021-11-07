/* eslint-disable no-unused-vars */
import { doc, getDoc, getFirestore } from "firebase/firestore";

import MethodGetAddressOrderList from "./methods/getAddressOrderList";
import MethodGetAdmin from "./methods/getAdmin";
import MethodGetStage from "./methods/getStage";
import config from "./config.sg.web3";

const getRoundDetail = async (roundId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "round", roundId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const { contract, positions, createByUser, ...other } = data;

    const positionData =
      positions.find((position) => position.userId === createByUser) || {};

    const sg = config(contract);
    const admin = await MethodGetAdmin(sg.methods);
    const orderList = await MethodGetAddressOrderList(sg.methods);
    const stage = await MethodGetStage(sg.methods);

    const participantsData = orderList.map((user) => {
      const roundData =
        positions.find(
          (position) => position.walletAddress === user.address.toLowerCase()
        ) || [];
      return {
        ...user,
        address:
          user.address === "0x0000000000000000000000000000000000000000"
            ? null
            : user.address,
        userId: roundData.userId,
        walletAddress: roundData.walletAddress,
        admin: admin === user.address,
      };
    });
    const a = {
      ...other,
      stage,
      contract,
      createByUser,
      positionData,
      participantsData,
    };
    console.log(a);
    return a;
  } catch (err) {
    return err;
  }
};

export default getRoundDetail;

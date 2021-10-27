/* eslint-disable no-unused-vars */
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import config from "./config.sg.web3";

import MethodGetAddressOrderList from "./methods/getAddressOrderList";
import MethodGetGroupSize from "./methods/getGroupSize";
import MethodGetUsers from "./methods/getUsers";
import MethodGetStage from "./methods/getStage";
import MethodGetTurn from "./methods/getTurn";

const db = getFirestore();

const getRounds = async ({ userId, walletAddress }) => {
  const querySnapshot = await getDocs(
    query(collection(db, "round"), where("createByUser", "==", userId))
  );
  return new Promise((resolve, reject) => {
    const rounds = [];
    let i = 0;

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      const sg = config(data.contract);
      console.log(sg);

      const orderList = await MethodGetAddressOrderList(sg.methods);
      const groupSize = await MethodGetGroupSize(sg.methods);
      const stage = await MethodGetStage(sg.methods);
      const turn = await MethodGetTurn(sg.methods);

      const exist =
        walletAddress &&
        orderList.find(
          (item) => item.address.toLowerCase() === walletAddress.toLowerCase()
        );
      const roundData = {
        name: data.name,
        roundKey: doc.id,
        toRegister: Boolean(!exist),
        groupSize,
        stage,
        turn,
        isAdmin: walletAddress === data.createByWallet,
      };
      rounds.push(roundData);

      if (i === querySnapshot.size - 1) {
        resolve(rounds);
      } else {
        i += 1;
      }
    });
  });
};

export default getRounds;

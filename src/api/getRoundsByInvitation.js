/* eslint-disable no-unused-vars */
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import config from "./config.sg.web3";

import MethodGetAddressOrderList from "./methods/getAddressOrderList";
import MethodGetGroupSize from "./methods/getGroupSize";
import MethodGetStage from "./methods/getStage";
import MethodGetTurn from "./methods/getTurn";
import MethodGetRealTurn from "./methods/getRealTurn";
import MethodGetUserAvailableSavings from "./methods/getUserAvailableSavings";
import MethodGetAdmin from "./methods/getAdmin";

const db = getFirestore();

const getData = async (doc, walletAddress) => {
  console.log(doc);

  // const positionData =
  //   data.positions.find((pos) => pos.walletAddress === walletAddress) || {};

  // const admin = await MethodGetAdmin(sg.methods);
  // const orderList = await MethodGetAddressOrderList(sg.methods);
  // const groupSize = await MethodGetGroupSize(sg.methods);

  // const turn = await MethodGetTurn(sg.methods);
  // const savings = await MethodGetUserAvailableSavings(
  //   sg.methods,
  //   positionData.position || 1
  // );

  // const available = orderList.filter(
  //   (item) => item.address === "0x0000000000000000000000000000000000000000"
  // );

  // const exist =
  //   walletAddress &&
  //   orderList.find(
  //     (item) => item.address.toLowerCase() === walletAddress.toLowerCase()
  //   );

  // let realTurn = "0";
  // if (stage === "ON_ROUND_ACTIVE") {
  //   realTurn = await MethodGetRealTurn(sg.methods);
  // }

  return {
    a: 2,
    // name: positionData.name,
    // roundKey: doc.id,
    // toRegister: Boolean(!exist),
    // groupSize,
    // missingPositions: available.length,
    // stage,
    // turn,
    // isAdmin: walletAddress === data.createByWallet && walletAddress === admin,
    // positionToWithdrawPay: positionData.position,
    // realTurn,
    // withdraw: Number(realTurn) > positionData.position && Number(savings) > 0,
  };
};

const getRounds = async ({ email, walletAddress }) => {
  console.log(email);
  const queryByEmailSnapshot = await getDocs(
    query(
      collection(db, "round"),
      where("invitations", "array-contains", email)
    )
  );
  console.log(queryByEmailSnapshot);

  return new Promise((resolve) => {
    const rounds = [];
    let i = 0;

    queryByEmailSnapshot.forEach(async (doc) => {
      const data = doc.data();
      console.log(data);

      const sg = config(data.contract);

      const stage = await MethodGetStage(sg.methods);

      const roundData = {
        stage,
        roundKey: doc.id,
        toRegister: true,
        fromInvitation: true,
      };
      rounds.push(roundData);

      if (i === queryByEmailSnapshot.size - 1) {
        resolve(rounds);
      } else {
        i += 1;
      }
    });
  });
};

export default getRounds;

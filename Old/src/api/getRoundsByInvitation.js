/* eslint-disable no-unused-vars */
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import config from "./config.sg.web3";

import MethodGetStage from "./methods/getStage";

// const db = getFirestore();

const getRounds = async ({ email }) => {
  const queryByEmailSnapshot = [];
  // const queryByEmailSnapshot = await getDocs(
  //   query(
  //     collection(db, "round"),
  //     where("invitations", "array-contains", email)
  //   )
  // );

  return new Promise((resolve) => {
    const rounds = [];
    let i = 0;

    queryByEmailSnapshot.forEach(async (document) => {
      const data = document.data();

      // const docRef = doc(db, "users", data.createByUser);
      // const docSnap = await getDoc(docRef);
      // const userData = docSnap.data();
      const userData = {};

      const sg = config(data.contract);

      const stage = await MethodGetStage(sg.methods);

      const roundData = {
        stage,
        roundKey: document.id,
        toRegister: true,
        fromInvitation: true,
        fromEmail: userData.email,
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

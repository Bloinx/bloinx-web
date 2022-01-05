/* eslint-disable no-unused-vars */

import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import config, { MAIN_FACTORY_FUJI_TEST_NET } from "./config.main.web3";

const setCreateRound = ({
  name,
  warranty,
  saving,
  groupSize,
  payTime,
  isPublic,
  walletAddress,
}) =>
  new Promise((resolve, reject) => {
    const m = config();
    const db = getFirestore();
    const { uid } = getAuth().currentUser;

    m.methods
      .createRound(
        warranty,
        saving,
        groupSize,
        payTime,
        "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"
      )
      .send({
        from: walletAddress,
        to: MAIN_FACTORY_FUJI_TEST_NET,
      })
      .once("receipt", async (receipt) => {
        const contract =
          receipt?.events?.RoundCreated?.returnValues?.childRound;
        const admin = receipt.from;
        const folio = receipt.transactionHash;

        const params = {
          createByUser: uid,
          createByWallet: admin,
          contract,
          folio,
          isPublic,
          positions: [],
          invitations: [],
        };
        addDoc(collection(db, "round"), params)
          .then((docRef) => {
            resolve(docRef);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .on("error", async (error) => {
        reject(error);
      });
  });

export default setCreateRound;

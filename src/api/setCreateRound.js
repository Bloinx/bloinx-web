/* eslint-disable no-unused-vars */

import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import config, { MAIN_FACTORY_FIJI_TEST_NET } from "./config.main.web3";

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
    const a = config();
    const db = getFirestore();
    const { uid } = getAuth().currentUser;

    a.methods
      .createRound(warranty, saving, groupSize, payTime)
      .send({
        from: walletAddress,
        to: MAIN_FACTORY_FIJI_TEST_NET,
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
          name,
          saving,
          isPublic,
          motivation: "other",
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

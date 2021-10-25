/* eslint-disable no-unused-vars */

import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import config, { MAIN_FACTORY_FIJI_TEST_NET } from "./config.web3";

const setCreateRound = ({
  name,
  warranty = 1,
  saving = 1,
  groupSize = 3,
  payTime = 518400,
  isPublic = false,
}) =>
  new Promise((resolve, reject) => {
    const a = config();
    const db = getFirestore();
    const { uid } = getAuth().currentUser;

    a.methods
      .createRound(warranty, saving, groupSize, payTime)
      .send({
        from: "0xCfbc744B87Aac00Ec2Faf5D08bBA52E70835B484",
        to: MAIN_FACTORY_FIJI_TEST_NET,
      })
      .once("receipt", async (receipt) => {
        const contract =
          receipt?.events?.RoundCreated?.returnValues?.childRound;
        const admin = receipt.from;
        const folio = receipt.transactionHash;

        addDoc(collection(db, "round"), {
          firebase_user: uid,
          create_by: admin,
          blockchain_address: contract,
          folio,
          name,
          warranty,
          saving,
          groupSize,
          payTime,
          isPublic,
          stage: 0,
        })
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

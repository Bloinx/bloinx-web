/* eslint-disable no-unused-vars */

import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import config, {
  MAIN_FACTORY_CELO_MAINNET,
  CUSD_TOKEN_CELO_MAINNET,
} from "./config.main.web3";

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
    const factory = config();
    const db = getFirestore();
    const { uid } = getAuth().currentUser;
    console.log("walletAddress ", walletAddress);
    console.log("Factory ", factory);

    factory.methods
      .createRound(
        warranty,
        saving,
        groupSize,
        payTime,
        CUSD_TOKEN_CELO_MAINNET
      )
      .send({
        from: walletAddress,
        to: MAIN_FACTORY_CELO_MAINNET,
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

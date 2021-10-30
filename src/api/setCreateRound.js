/* eslint-disable no-unused-vars */

import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import config, {
  MAIN_FACTORY_FUJI_TEST_NET,
  configMin,
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
    const m = config();
    const db = getFirestore();
    const { uid } = getAuth().currentUser;

    m.methods
      .createRound(warranty, saving, groupSize, payTime)
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
        // const mim = configMin();
        // console.log(mim);
        // mim.methods
        //   .approve(
        //     contract,
        //     115792089237316195423570985008687907853269984665640564039457584007913129639935
        //   )
        //   .once("receipt", async (mimReceipt) => {
        //     console.log(mimReceipt);
        //   })
        //   .on("errro", async (mimError) => {
        //     console.log(mimError);
        //   });
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

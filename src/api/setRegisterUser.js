/* eslint-disable no-unused-vars */
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getWeb3 } from "../utils/web3";
import { MIM_TOKEN_FUJI_TEST_NET, configMin } from "./config.main.web3";

import config from "./config.sg.web3";
import MethodGetCashIn from "./methods/getCashIn";
import MethodGetFeeCost from "./methods/getFeeCost";

const db = getFirestore();

const setRegisterUser = async (props) => {
  const { userId, walletAddress, roundId, name, motivation, position } = props;
  console.log(props);

  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  const sg = config(data.contract);
  const cashIn = await MethodGetCashIn(sg.methods);
  const feeCost = await MethodGetFeeCost(sg.methods);

  return new Promise((resolve, reject) => {
    const mim = configMin();
    console.log(mim);
    mim.methods
      .approve(
        data.contract,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      )
      .send({ from: walletAddress, to: MIM_TOKEN_FUJI_TEST_NET })
      .once("receipt", async (receipt) => {
        sg.methods
          .registerUser(position)
          .send({
            from: walletAddress,
            to: data.contract,
          })
          .once("receipt", async (recpt) => {
            const positions = [
              ...data.positions,
              {
                userId,
                position: Number(position),
                walletAddress,
                motivation,
                name,
              },
            ].sort();
            await updateDoc(docRef, {
              positions,
            });
            resolve(recpt);
          })
          .on("error", async (error) => {
            reject(error);
          });
      })
      .on("error", async (err) => {
        console.log("error ", err);
      });
    // sg.methods
    //   .registerUser(position)
    //   .send({
    //     from: walletAddress,
    //     to: data.contract,
    //   })
    //   .once("receipt", async (receipt) => {
    //     const positions = [
    //       ...data.positions,
    //       {
    //         userId,
    //         position: Number(position),
    //         walletAddress,
    //         motivation,
    //         name,
    //       },
    //     ].sort();
    //     await updateDoc(docRef, {
    //       positions,
    //     });
    //     resolve(receipt);
    //   })
    //   .on("error", async (error) => {
    //     reject(error);
    //   });
  });
};

export default setRegisterUser;

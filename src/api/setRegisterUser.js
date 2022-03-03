/* eslint-disable no-unused-vars */
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";

import config from "./config.sg.web3";

const db = getFirestore();

const setRegisterUser = async (props) => {
  const {
    userId,
    walletAddress,
    roundId,
    name,
    motivation,
    position,
    provider,
  } = props;

  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = await docSnap.data();

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = await userSnap.data();

  const sg = await config(data.contract, provider);

  return new Promise((resolve, reject) =>
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
        const invitations = data.invitations.filter(
          (email) => email !== userData.email
        );
        await updateDoc(docRef, {
          positions,
          invitations,
        });
        resolve(recpt);
      })
      .on("error", async (error) => {
        reject(error);
      })
  );
};

export default setRegisterUser;

/* eslint-disable no-unused-vars */
import axios from "axios";
import Web3 from "web3";

import { doc, updateDoc, getDoc, getFirestore } from "firebase/firestore";
import config, { walletConnect } from "./config.sg.web3";

import MethodGetGroupSize from "./methods/getGroupSize";
import MethodGetPayTime from "./methods/getPayTime";
import MethodSaveAmount from "./methods/saveAmount";

const dayInSeconds = 86400;
const db = getFirestore();

const setSaveInvitations = async (mailList, roundId, provider) => {
  const docRef = doc(db, "round", roundId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  const dataArr = new Set([...data.invitations, ...mailList]);
  const invitations = [...dataArr];
  await updateDoc(docRef, { invitations });
  const positionData =
    data.positions.find((position) => position.userId === data.createByUser) ||
    {};
  const sg = await new Promise((resolve, reject) => {
    try {
      if (provider !== "WalletConnect") {
        resolve(config(data.contract));
      } else {
        resolve(walletConnect(data.contract));
      }
    } catch (error) {
      reject(error);
    }
  });

  const groupSize = await MethodGetGroupSize(sg.methods);
  const payTime = await MethodGetPayTime(sg.methods);
  const saveAmount = await MethodSaveAmount(sg.methods);
  const longevity = (payTime / dayInSeconds) * groupSize;
  const totalAmount =
    Number(Web3.utils.fromWei(saveAmount)) * Number(groupSize);

  try {
    await mailList.forEach((mail) => {
      axios
        .post(
          "https://wtb2taazv8.execute-api.us-east-2.amazonaws.com/mandarMail/sendMail",
          {
            personalizations: [
              {
                to: [
                  {
                    email: mail,
                  },
                ],
                dynamic_template_data: {
                  user: mail,
                  title: "Inviación a la Ronda",
                  link: "https://bloinx.app/login",
                  name: "Bloinx Team",
                  name_tanda: positionData.name,
                  // type: "Public/Private",
                  longevity: `${longevity} días`,
                  participant: `${groupSize - 1}`,
                  amount: `${totalAmount} cUSD`,
                },
                subject: "Inviación a la Ronda",
              },
            ],
          }
        )
        .then(() => {
          return true;
        })
        .catch((e) => {
          return false;
        });
    });
  } catch (error) {
    return false;
  }
  return null;
};

export default setSaveInvitations;

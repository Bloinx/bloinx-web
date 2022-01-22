/* eslint-disable no-unused-vars */
import axios from "axios";

import { doc, updateDoc, getDoc, getFirestore } from "firebase/firestore";

// const db = getFirestore();

const setSaveInvitations = async (mailList, roundId) => {
  // const docRef = doc(db, "round", roundId);
  // const docSnap = await getDoc(docRef);
  // const data = await docSnap.data();
  const data = {};

  const dataArr = new Set([...data.invitations, ...mailList]);
  const invitations = [...dataArr];
  // await updateDoc(docRef, { invitations });

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
                  title: "Inviación a la tanda",
                  link: "https://bloinx.app/login",
                  name: "Bloinx Team",
                  name_tanda: "test",
                  date: "test",
                  type: "test",
                  longevity: "test",
                  participant: "test",
                  amount: "test",
                },
                subject: "Inviación a la tanda",
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

import { doc, getDoc, getFirestore } from "firebase/firestore";

const getContractDetail = async (roundId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, "round", roundId);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data();
    const tempUserList = [];

    for (let index = 1; index <= data.groupSize; index += 1) {
      if (!data.positions.find((position) => position.position === index)) {
        tempUserList.push({ position: index, userId: null });
      }
    }

    return {
      ...data,
      roundId,
      positionsAvailable: tempUserList,
    };
  } catch (err) {
    return err;
  }
};

export default getContractDetail;

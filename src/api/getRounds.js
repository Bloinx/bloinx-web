import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import config from "./config.sg.web3";

import MethodGetAddressOrderList from "./methods/getAddressOrderList";
import MethodGetGroupSize from "./methods/getGroupSize";
import MethodGetStage from "./methods/getStage";
import MethodGetTurn from "./methods/getTurn";
import MethodGetRealTurn from "./methods/getRealTurn";
import MethodGetUserAvailableSavings from "./methods/getUserAvailableSavings";
import MethodGetUserAmountPaid from "./methods/getUserAmountPaid";
import MethodGetObligationAtTime from "./methods/getObligationAtTime";
import MethodGetUserUnassignedPayments from "./methods/getUserUnassignedPayments";
import MethodGetUserAvailableCashIn from "./methods/getUserAvailableCashIn";
import MethodGetSaveAmount from "./methods/saveAmount";
import MethodGetCashIn from "./methods/getCashIn";
import MethodGetAdmin from "./methods/getAdmin";

const db = getFirestore();

const getRounds = async ({ userId, walletAddress }) => {
  const querySnapshot = await getDocs(
    query(collection(db, "round"), where("createByUser", "==", userId))
  );

  return new Promise((resolve) => {
    const rounds = [];
    let i = 0;

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      const sg = await config(data.contract);
      console.log(sg);

      const positionData =
        data.positions.find((pos) => pos.walletAddress === walletAddress) || {};

      const admin = await MethodGetAdmin(sg.methods);
      const orderList = await MethodGetAddressOrderList(sg.methods);
      const groupSize = await MethodGetGroupSize(sg.methods);
      const stage = await MethodGetStage(sg.methods);
      const turn = await MethodGetTurn(sg.methods);
      const cashIn = await MethodGetCashIn(sg.methods);
      const saveAmount = await MethodGetSaveAmount(sg.methods);
      const savings = await MethodGetUserAvailableSavings(
        sg.methods,
        positionData.position || 1
      );

      const available = orderList.filter(
        (item) => item.address === "0x0000000000000000000000000000000000000000"
      );

      const exist =
        walletAddress &&
        orderList.find(
          (item) => item.address.toLowerCase() === walletAddress.toLowerCase()
        );

      let realTurn = "0";
      if (stage === "ON_ROUND_ACTIVE") {
        realTurn = await MethodGetRealTurn(sg.methods);
      }

      let paymentStatus;
      // let amount;
      if (positionData.position) {
        // Todos los pagos que ya se han asignado, por un pago real o por la toma del cash in.
        const amountPaid = await MethodGetUserAmountPaid(
          sg.methods,
          positionData.position
        );
        const obligationAtTime = await MethodGetObligationAtTime(
          sg.methods,
          walletAddress
        );
        const unassignedPayments = await MethodGetUserUnassignedPayments(
          sg.methods,
          positionData.position
        );
        const availableCashIn = await MethodGetUserAvailableCashIn(
          sg.methods,
          positionData.position
        );
        const turnosPagadas =
          (Number(amountPaid) +
            Number(unassignedPayments) -
            (Number(cashIn) - Number(availableCashIn))) /
          Number(saveAmount);

        const ads = () => {
          if (turnosPagadas === Number(obligationAtTime) / Number(saveAmount)) {
            return "payments_on_time";
          }
          if (turnosPagadas > Number(obligationAtTime) / Number(saveAmount)) {
            return "payments_advanced";
          }
          if (turnosPagadas < Number(obligationAtTime) / Number(saveAmount)) {
            return "payments_late";
          }
          return null;
        };

        // amount = turnosPagadas - Number(obligationAtTime);
        paymentStatus = ads();
      }

      const roundData = {
        paymentStatus,
        // amount,
        name: positionData.name,
        roundKey: doc.id,
        toRegister: Boolean(!exist),
        groupSize,
        missingPositions: available.length,
        stage,
        turn,
        isAdmin:
          walletAddress === data.createByWallet &&
          walletAddress === admin.toLowerCase(),
        positionToWithdrawPay: positionData.position,
        realTurn,
        withdraw:
          Number(realTurn) > positionData.position && Number(savings) > 0,
        fromInvitation: false,
        saveAmount: (Number(cashIn) * 10 ** -18).toFixed(2),
      };
      rounds.push(roundData);

      if (i === querySnapshot.size - 1) {
        console.log("Rondas::", rounds);
        resolve(rounds.sort());
      } else {
        i += 1;
      }
    });
  });
};

export default getRounds;

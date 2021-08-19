import contracts from "../constants/contracts";

const setWithdrawTurn = (methods, payload) =>
  new Promise((resolve) => {
    methods
      .withdrawTurn()
      .send({
        from: payload.currentAddress,
        to: contracts.savingGroups[43113],
      })
      .once("receipt", async (receipt) => {
        resolve({ status: "success", receipt });
      })
      .on("error", async (error) => {
        resolve({ status: "error", error });
      });
  });

export default setWithdrawTurn;

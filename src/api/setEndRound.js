// import { getWeb3 } from "../utils/web3";

const api = (methods, payload) =>
  new Promise((resolve) => {
    methods
      .endRound()
      .send({
        // cualquiera puede ejecutar endRound
        from: payload.currentAddress,
        to: methods._address,
      })
      .once("receipt", async (receipt) => {
        resolve({ status: "success", receipt });
      })
      .on("error", async (error) => {
        resolve({ status: "error", error });
      });
  });

export default api;

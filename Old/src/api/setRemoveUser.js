// import { getWeb3 } from "../utils/web3";

const api = (methods, payload) =>
  new Promise((resolve) => {
    methods
      .removeUser(payload.turnSelected)
      .send({
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

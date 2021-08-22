import contracts from "../constants/contracts";

const api = (methods, payload) =>
  new Promise(() => {
    methods.startRound().send({
      from: payload.currentAddress,
      to: contracts.savingGroups[43113],
    });
  });

export default api;

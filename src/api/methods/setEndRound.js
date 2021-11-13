const setEndRound = (methods, payload) =>
  new Promise((resolve) => {
    methods
      .endRound()
      .send({
        from: payload.currentAddress,
        to: methods._address,
      })
      .once("receipt", async (receipt) => {
        resolve(receipt);
      })
      .on("error", async (error) => {
        resolve(error);
      });
  });

export default setEndRound;

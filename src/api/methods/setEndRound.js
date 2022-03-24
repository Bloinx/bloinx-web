const setEndRound = (methods, { walletAddress, contract }) =>
  new Promise((resolve, reject) => {
    methods
      .endRound()
      .send({
        from: walletAddress,
        to: contract,
      })
      .once("receipt", async (receipt) => {
        resolve(receipt);
      })
      .on("error", async (error) => {
        reject(error);
      });
  });

export default setEndRound;

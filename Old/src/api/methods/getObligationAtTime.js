const getObligationAtTime = async (methods, walletAddress) => {
  return new Promise((resolve) => {
    methods
      .obligationAtTime(walletAddress)
      .call()
      .then((userAmountPaid) => {
        resolve(userAmountPaid);
      });
  });
};

export default getObligationAtTime;

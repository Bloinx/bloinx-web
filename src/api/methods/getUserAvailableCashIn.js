const getUserAvailableCashIn = async (methods, userTurn) => {
  return new Promise((resolve) => {
    methods
      .getUserAvailableCashIn(userTurn)
      .call()
      .then((userAmountPaid) => {
        resolve(userAmountPaid);
      });
  });
};

export default getUserAvailableCashIn;

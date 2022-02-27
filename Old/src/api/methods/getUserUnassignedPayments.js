const getUserUnassignedPayments = (methods, userTurn) =>
  new Promise((resolve) => {
    methods
      .getUserUnassignedPayments(userTurn)
      .call()
      .then((userAmountPaid) => {
        resolve(userAmountPaid);
      });
  });

export default getUserUnassignedPayments;

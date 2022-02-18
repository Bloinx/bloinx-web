const getFuturePayments = (methods) =>
  new Promise((resolve) => {
    methods
      .futurePayments()
      .call()
      .then((remainingAmount) => {
        resolve(remainingAmount);
      });
  });

export default getFuturePayments;

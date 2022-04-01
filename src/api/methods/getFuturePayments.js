const getFuturePayments = (methods, address) =>
  new Promise((resolve) => {
    methods
      .futurePayments()
      .call({ from: address })
      .then((remainingAmount) => {
        resolve(remainingAmount);
      });
  });
export default getFuturePayments;

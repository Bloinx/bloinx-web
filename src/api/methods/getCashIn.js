const getCashIn = (methods) =>
  new Promise((resolve) => {
    methods
      .saveAmount()
      .call()
      .then((cashIn) => {
        resolve(cashIn);
      });
  });

export default getCashIn;

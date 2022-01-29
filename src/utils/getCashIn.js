const getCashIn = (methods) =>
  new Promise((resolve) => {
    methods
      .cashIn()
      .call()
      .then((cashIn) => {
        resolve(cashIn);
      });
  });

export default getCashIn;

const saveAmount = (methods) =>
  new Promise((resolve) => {
    methods
      .saveAmount()
      .call()
      .then((amount) => {
        resolve(amount);
      });
  });

export default saveAmount;

const getPayTime = (methods) =>
  new Promise((resolve) => {
    methods
      .payTime()
      .call()
      .then((payTime) => {
        resolve(payTime);
      });
  });

export default getPayTime;

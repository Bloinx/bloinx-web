const getFeeCost = (methods) =>
  new Promise((resolve) => {
    methods
      .feeCost()
      .call()
      .then((feeCost) => {
        resolve(feeCost);
      });
  });

export default getFeeCost;

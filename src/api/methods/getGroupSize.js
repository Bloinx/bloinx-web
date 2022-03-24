const getTurn = (methods) =>
  new Promise((resolve) => {
    methods
      .groupSize()
      .call()
      .then((groupSize) => {
        resolve(groupSize);
      });
  });

export default getTurn;

const getTurn = (methods) =>
  new Promise((resolve) => {
    methods
      .turn()
      .call()
      .then((turn) => {
        resolve(turn);
      });
  });

export default getTurn;

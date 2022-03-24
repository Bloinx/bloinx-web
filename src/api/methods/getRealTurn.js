const getRealTurn = (methods) =>
  new Promise((resolve) => {
    methods
      .getRealTurn()
      .call()
      .then((realTurn) => {
        resolve(realTurn);
      });
  });

export default getRealTurn;

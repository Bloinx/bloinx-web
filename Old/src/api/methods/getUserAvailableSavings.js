const getUserAvailableSavings = (methods, userTurn) =>
  new Promise((resolve) => {
    methods
      .getUserAvailableSavings(userTurn)
      .call()
      .then((realTurn) => {
        resolve(realTurn);
      });
  });

export default getUserAvailableSavings;
